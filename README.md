# Backend de E-Commerce

![Estado del Backend](https://img.shields.io/badge/Estado-Completo-green)  
Un backend seguro y escalable para una plataforma de comercio electrónico, desarrollado con **Node.js**, **Express** y **TypeScript**. Proporciona una API RESTful con autenticación basada en **JWT**, control de acceso por roles y operaciones CRUD completas para productos y gestión de usuarios. Se integra con una base de datos **MySQL**, garantizando una arquitectura limpia, modular y con seguridad de tipos estricta para facilitar el mantenimiento y la robustez.

## 📋 Descripción

Este backend impulsa una aplicación de comercio electrónico, manejando autenticación de usuarios, gestión de productos y operaciones del carrito. Utiliza **JSON Web Tokens (JWT)** para una autenticación y autorización seguras, con control de acceso basado en roles que restringe operaciones sensibles (por ejemplo, CRUD de productos) a usuarios administradores. La API sigue principios RESTful, con endpoints modularizados, validación exhaustiva de entradas y seguridad de tipos gracias a TypeScript. Se conecta a una base de datos MySQL para almacenamiento persistente, diseñada con escalabilidad y prácticas de código limpio.

## 🌟 Características Principales

### Autenticación y Control de Acceso por Roles
- **Registro e Inicio de Sesión**: Endpoints seguros para registro e inicio de sesión, con hash de contraseñas (usando `bcrypt`) y generación de JWT.
- **Implementación de JWT**: Los tokens incluyen roles de usuario (`admin` o `customer`) y se validan mediante middleware para rutas protegidas.
- **Autorización por Roles**:
  - Solo usuarios `admin` pueden acceder a endpoints de gestión de productos (crear, actualizar, eliminar).
  - Usuarios autenticados (`customer` o `admin`) pueden interactuar con funcionalidades del carrito y compras.
- **Rutas Protegidas**: Middleware asegura que solo usuarios autorizados con tokens válidos y roles adecuados accedan a endpoints específicos.

### Gestión de Productos (Solo Admin)
- **Operaciones CRUD**: Crear, leer, actualizar y eliminar productos, con campos para `name`, `description`, `price`, `size`, `color`, `category` e `image`.
- **Validación de Entradas**: Validación completa de todos los campos (por ejemplo, precio debe ser positivo, nombre no vacío) usando librerías como `Joi` o `express-validator`.
- **Restricción de Admin**: Middleware limita las rutas de gestión de productos al rol `admin`.

### Carrito y Compras
- **Gestión del Carrito**: Endpoints para agregar productos al carrito, ver contenido (nombre, precio, cantidad) y eliminar elementos.
- **Cálculo de Compras**: Calcula el costo total de los elementos en el carrito.
- **Acceso Autenticado**: Requiere autenticación para acceder a endpoints del carrito.

### API y Base de Datos
- **Endpoints RESTful**: Organizados por módulos (por ejemplo, `/auth`, `/products`, `/cart`) para claridad y escalabilidad.
- **Integración con MySQL**: Almacena datos de usuarios, productos y carrito con esquemas relacionales, consultas optimizadas e indexación adecuada.
- **Manejo de Errores**: Respuestas de error consistentes con mensajes claros y códigos de estado HTTP (por ejemplo, `401 Unauthorized`, `400 Bad Request`).
- **TypeScript**: Garantiza seguridad de tipos en cuerpos de solicitud/respuesta, modelos de base de datos y middleware, reduciendo errores en tiempo de ejecución.

## 🛠 Tecnologías Utilizadas

- **Entorno de Ejecución**: Node.js 18.x
- **Framework**: Express.js
- **Lenguaje**: TypeScript
- **Base de Datos**: MySQL 8.x
- **Autenticación**: JSON Web Tokens (`jsonwebtoken`), bcrypt para hash de contraseñas
- **Validación**: Joi o express-validator
- **ORM/Driver**: `mysql2` (o TypeORM/Sequelize para soporte opcional de ORM)
- **Variables de Entorno**: `dotenv`
- **Herramientas de Desarrollo**: Nodemon, ESLint, Prettier, ts-node
- **Pruebas**: Jest (opcional, para pruebas de endpoints)
- **Otros**: CORS, Morgan (para registro de logs)

## 📂 Estructura del Proyecto

```plaintext
├── src/
│   ├── config/
│   │   └── database.ts        # Configuración de conexión a la base de datos
│   ├── controllers/
│   │   ├── authController.ts  # Lógica de autenticación
│   │   ├── productController.ts # Lógica CRUD de productos
│   │   └── cartController.ts  # Lógica de gestión del carrito
│   ├── middleware/
│   │   ├── authMiddleware.ts  # Validación de JWT y roles
│   │   └── errorMiddleware.ts # Manejo global de errores
│   ├── models/
│   │   ├── User.ts           # Modelo/interfaz de usuario
│   │   ├── Product.ts        # Modelo/interfaz de producto
│   │   └── Cart.ts           # Modelo/interfaz de carrito
│   ├── routes/
│   │   ├── authRoutes.ts     # Endpoints de autenticación
│   │   ├── productRoutes.ts  # Endpoints de productos
│   │   └── cartRoutes.ts     # Endpoints de carrito
│   ├── utils/
│   │   └── jwt.ts            # Generación y validación de JWT
│   ├── app.ts                # Configuración de la app Express
│   └── server.ts             # Punto de entrada del servidor
├── scripts/
│   └── init.sql              # Esquema de base de datos y datos iniciales
├── .env.example              # Plantilla de variables de entorno
├── .eslintrc.json            # Configuración de ESLint
├── .prettierrc               # Configuración de Prettier
├── tsconfig.json             # Configuración de TypeScript
├── package.json
└── README.md
```

## 🚀 Instalación

### Requisitos Previos
- Node.js 18.x o superior
- MySQL 8.x o superior
- Git

### Pasos
1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/e-commerce-backend.git
   cd e-commerce-backend
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**:
   Copia `.env.example` a `.env` y configura:
   ```plaintext
   PORT=5000
   DATABASE_HOST=localhost
   DATABASE_USER=tu_usuario
   DATABASE_PASSWORD=tu_contraseña
   DATABASE_NAME=ecommerce
   JWT_SECRET=tu_clave_secreta_jwt
   ```

4. **Configura la base de datos**:
   - Crea una base de datos MySQL llamada `ecommerce`.
   - Ejecuta el script SQL proporcionado para inicializar el esquema:
     ```bash
     mysql -u tu_usuario -p ecommerce < scripts/init.sql
     ```

5. **Inicia el servidor**:
   ```bash
   npm run dev
   ```
   El servidor se ejecutará en `http://localhost:5000`.

## 📖 Configuración de la Base de Datos

A continuación, un ejemplo de script `init.sql` para crear las tablas necesarias en MySQL:

```sql
CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'customer') NOT NULL DEFAULT 'customer'
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  size VARCHAR(20),
  color VARCHAR(50),
  category VARCHAR(50),
  image VARCHAR(255)
);

CREATE TABLE cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Datos de ejemplo
INSERT INTO users (name, email, password, role) VALUES
('Usuario Admin', 'admin@ejemplo.com', '$2b$10$contraseñaHasheadaEjemplo', 'admin'),
('Usuario Cliente', 'cliente@ejemplo.com', '$2b$10$contraseñaHasheadaEjemplo', 'customer');

INSERT INTO products (name, description, price, size, color, category, image) VALUES
('Camiseta Básica', 'Camiseta de algodón 100% para uso diario', 15.99, 'M', 'Azul', 'Ropa', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a');
```

Ejecuta el script:
```bash
mysql -u tu_usuario -p ecommerce < scripts/init.sql
```

## 🌐 Endpoints de la API

### Autenticación
- **POST /api/auth/register**
  - Cuerpo: `{ "name": string, "email": string, "password": string }`
  - Respuesta: `{ "token": string }`
- **POST /api/auth/login**
  - Cuerpo: `{ "email": string, "password": string }`
  - Respuesta: `{ "token": string, "user": { "name": string, "role": string } }`

### Productos (Solo Admin para Operaciones de Escritura)
- **GET /api/products** (Público)
  - Consulta: `?page=1&limit=10&search=termino&category=categoria`
  - Respuesta: `{ "products": [], "totalPages": number }`
- **POST /api/products** (Admin)
  - Cuerpo: `{ "name": string, "description": string, "price": number, "size": string, "color": string, "category": string, "image": string }`
  - Respuesta: `{ "product": {} }`
- **PUT /api/products/:id** (Admin)
  - Cuerpo: `{ "name": string, ... }`
  - Respuesta: `{ "product": {} }`
- **DELETE /api/products/:id** (Admin)
  - Respuesta: `{ "message": "Producto eliminado" }`

### Carrito (Usuarios Autenticados)
- **GET /api/cart** (Usuario)
  - Respuesta: `{ "cart": [{ "productId": number, "name": string, "price": number, "quantity": number }], "total": number }`
- **POST /api/cart** (Usuario)
  - Cuerpo: `{ "productId": number, "quantity": number }`
  - Respuesta: `{ "message": "Producto añadido al carrito" }`
- **DELETE /api/cart/:productId** (Usuario)
  - Respuesta: `{ "message": "Producto eliminado del carrito" }`

## 🧪 Pruebas

El proyecto soporta pruebas unitarias e integrales para endpoints y middleware usando **Jest**. Para ejecutar las pruebas:
```bash
npm run test
```

## 🌟 Contribuciones

¡Las contribuciones son bienvenidas! Sigue estos pasos:
1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad: `git checkout -b feature/nueva-funcionalidad`.
3. Realiza tus cambios y haz commit: `git commit -m "Añade nueva funcionalidad"`.
4. Envía tus cambios: `git push origin feature/nueva-funcionalidad`.
5. Abre un Pull Request.

Asegúrate de seguir las guías de estilo de ESLint y Prettier.

## 📝 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).

## 🙌 Agradecimientos

- [Node.js](https://nodejs.org/) y [Express](https://expressjs.com/) por un framework backend robusto.
- [TypeScript](https://www.typescriptlang.org/) por la seguridad de tipos.
- [MySQL](https://www.mysql.com/) por un almacenamiento de datos confiable.

## 📬 Contacto

Para preguntas o comentarios:
- GitHub: [tu-usuario](https://github.com/tu-usuario)
- Correo: tu.correo@ejemplo.com

¡Gracias por explorar este proyecto! 🚀
</xaiArtifact>

### Detalles de la Traducción y Maximización:
1. **Traducción Completa**: Traduje todo el contenido a español, manteniendo un tono profesional y técnico, adecuado para un README en GitHub.
2. **Adaptaciones Culturales**: Usé términos comunes en español para desarrolladores (por ejemplo, "endpoints" en lugar de "puntos finales", "middleware" en lugar de "intermediario").
3. **Consistencia con el Original**: Conservé la estructura, características y detalles técnicos del README en inglés, incluyendo TypeScript y MySQL.
4. **Personalización**: Mantuve placeholders (`tu-usuario`, `tu.correo@ejemplo.com`) para que los reemplaces con tus datos reales.
5. **Script SQL**: Incluí el mismo script SQL para MySQL, traducido con comentarios en español para mayor claridad.
6. **Endpoints**: Traduje los mensajes de respuesta (e.g., "Product deleted" a "Producto eliminado") para consistencia.

### Notas:
- **Fecha**: Verificado como válido al 14 de junio de 2025, 12:20 AM CST.
- **Suposiciones**: Asumí que usaste `mysql2` como driver, pero si usaste un ORM como TypeORM o Sequelize, puedo actualizar el README.
- **Pruebas**: Mencioné Jest como opcional, ya que no se especificó en los requisitos, pero es una buena práctica.
- **Validación**: Incluí Joi o express-validator como opciones; si usaste otra librería, indícala para ajustes.

Si necesitas más modificaciones (por ejemplo, añadir detalles específicos, cambiar la estructura, o generar otro archivo como un controlador de ejemplo en TypeScript), o si quieres que traduzca el README del frontend al español, házmelo saber.