import prisma from "../prisma/client";
import { defineEventHandler } from "h3";
export default defineEventHandler(async () => {
  try {
    const pipocas = await prisma.producto.findMany();
    return {
      success: true,
      message: "ok",
      errorCode: "",
      data: pipocas,
    };
  } catch (error) {
    console.error("Error obteniendo pipocas:", error);
    return {
      success: false,
      message: "Error al obtener pipocas",
      errorCode: "GET_PIPOCAS_ERROR",
      data: {},
    };
  }
});
