import prisma from "../prisma/client";
import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { clienteId, productoId } = body;
  if (!clienteId || !productoId) {
    return {
      success: false,
      message: "Faltan clientId o productoId",
      errorCode: "INVALID_INPUT",
      data: {},
    };
  }
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
  //Verificamos si el cliente realizo una compra sin importar el producto
  const ultimaCompra = await prisma.compra.findFirst({
    where: {
      clienteId,
      createdAt: {
        gte: oneMinuteAgo,
      },
    },
  });
  if (ultimaCompra) {
    return {
      success: false,
      message: "Ya has comprado esta pipoca hace menos de un minuto",
      errorCode: "ALREADY_PURCHASED",
      data: {
        ultimaCompra: ultimaCompra.createdAt,
      },
    };
  }
  try {
    const compra = await prisma.compra.create({
      data: {
        clienteId,
        productoId,
      },
    });
    return {
      success: true,
      message: "Producto comprada con éxito",
      errorCode: null,
      data: {
        compra,
      },
    };
  } catch (error) {
    console.error("ERROR al comprar:", error);
    return {
      success: false,
      message: "Error al comprar del producto",
      errorCode: "PURCHASE_ERROR",
      data: {},
    };
  }
});
