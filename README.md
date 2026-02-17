# Making E-commerce

**A type-safe, full-stack retail engine designed for performance and scalability.** Built with a **Next.js** frontend and a specialized **Express** backend to handle complex product relations and secure user workflows.

---

## Project Overview

Making E-commerce is a comprehensive project focused on solving core retail logic challenges: 

1.  **Complex Data Modeling:** Handling multi-variant products (size, color, stock) with high integrity using **Prisma** and **PostgreSQL**.
2.  **Environment Consistency:** Utilizing **Docker** to containerize the database, ensuring a "plug-and-play" setup for developers.
3.  **Security & State:** Implementing a custom **JWT** authentication flow with refresh tokens and secure cookie management.

---

## Tech Stack

### Frontend
* **Next.js** – Optimized routing and server-side rendering.
* **Tailwind CSS** – Modern, responsive UI design.
* **Context API** – Efficient state management for cart and user sessions.

### Backend
* **Node.js & Express** – High-performance API architecture.
* **TypeScript** – Full-stack type safety to catch errors during development.
* **Prisma ORM** – Type-safe database client for complex relational queries.
* **Multer** – Middleware for handling product imagery uploads.

### Infrastructure & DevOps
* **Docker** – Containerized PostgreSQL database for local development.
* **PostgreSQL** – Relational database for structured, reliable e-commerce data.
* **Swagger/OpenAPI** – Structured API documentation for seamless integration.

---

## Key Features

### Advanced Product Logic
* **Variant Management:** Support for products with multiple sizes and real-time stock tracking.
* **Dynamic Filtering:** Efficiently query items by category, gender, color, or price range.
* **Image Processing:** Robust handling and serving of product photos via localized storage.

### Secure Shopping Flow
* **Auth System:** Secure Register/Login flow with hashed passwords (**bcryptjs**) and protected API routes.
* **Cart Logic:** Stateless cart validation with backend checks for prices and item availability.
* **Order Management:** Comprehensive tracking of user purchases and payment statuses.
