#  Sistema de Compras de Productos (Maiz)🌽🌽🌽

Este proyecto es una aplicación web desarrollada con **Vue 3**, **Pinia** y **Prisma**, que permite a los usuarios (clientes) visualizar productos disponibles (como pipocas), realizar compras, y gestionar dichas compras de forma dinámica e interactiva.

---

## 🚀 Tecnologías utilizadas

- **Vue 3 + Vite** – Framework moderno para frontend.
- **Pinia** – Manejo de estado de forma simple y modular.
- **Prisma** – ORM para el manejo de base de datos con migraciones y relaciones.
- **Tailwind CSS** – Estilos rápidos, responsivos y personalizables.
- **TypeScript** – Tipado estático para mayor robustez.

---

## ⚙️ Funcionalidades

- ✅ Registro de cliente.
- ✅ Visualización de productos activos.
- ✅ Compra de productos (limitada a una compra por minuto por cliente-producto).
- ✅ Alerta visual de compra exitosa o error.
- ✅ Imagen en base64 para productos.
- ✅ Contador regresivo antes de poder volver a comprar el mismo producto.
- ✅ Pantalla administrativa que agrupa compras por producto.
- ✅ Sistema de rutas con protección básica según estado del cliente.

---

## 🏁 Iniciar el proyecto localmente

1. Clona el repositorio
   
2. Instala dependencias:
```bash
npm install
```

3. Configura tu base de datos (PostgreSQL, MySQL o SQLite):
```bash
npx prisma migrate dev --name init
```
4. Inicia el proyecto:
```bash
npm run dev
```

## Analisis del proyecto
```bash
https://drive.google.com/file/d/1BiNWJwz3MN3Ig7iK00jO19p8vG4Q3C8u/view?usp=sharing
```

¡Gracias por usar este proyecto!
¡Disfruta comprando maíz y que tengas una experiencia increíble! 🌽🚀
