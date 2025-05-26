import prisma from "../prisma/client";
import { defineEventHandler } from "h3";

export default defineEventHandler(async () => {
  try {
    const compras = await prisma.compra.findMany({
      include: {
        cliente: true,
        producto: true,
      },
    });

    return {
      success: true,
      message: "ok",
      errorCode: "",
      data: compras,
    };
  } catch (error) {
    console.error("Error obteniendo compras:", error);
    return {
      success: false,
      message: "Error al obtener compras",
      errorCode: "GET_COMPRAS_ERROR",
      data: {},
    };
  }
});
