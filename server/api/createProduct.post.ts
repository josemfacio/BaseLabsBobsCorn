import prisma from "../prisma/client";
import { defineEventHandler, readBody } from "h3";
export default defineEventHandler(async (event) => {
  const { nameProduct, img, estado } = await readBody(event);
  try {
    const cliente = await prisma.producto.create({
      data: {
        name: nameProduct,
        img: img,
        activo: estado,
      },
    });
    return {
      success: true,
      message: "Producto creado correctamente",
      errorCode: "",
      data: cliente,
    };
  } catch (error) {
    console.error("ERROR al iniciar sesión:", error);
    return {
      success: false,
      message: "Error iniciando sesión del cliente",
      errorCode: "SESSION_ERROR",
      data: {},
    };
  }
});
