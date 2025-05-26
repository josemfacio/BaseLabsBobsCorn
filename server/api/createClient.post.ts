import { faker } from "@faker-js/faker";
import prisma from "../prisma/client";
import { defineEventHandler } from "h3";
export default defineEventHandler(async (event) => {
  try {
    const cliente = await prisma.cliente.create({
      data: {
        name: faker.person.fullName(),
      },
    });
    return {
      success: true,
      message: "Cliente creado correctamente",
      errorCode: "",
      data: cliente,
    };
  } catch (error) {
    console.error("ERROR al iniciar sesión:", error);
    return {
      success: false,
      message: "Error al crear cliente",
      errorCode: "createCLient_ERROR",
      data: {},
    };
  }
});
