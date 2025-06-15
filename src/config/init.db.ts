import fs from 'fs';
import path from 'path';
import { dbConfig } from '../config/db.config';
import mysql from 'mysql2/promise';


export async function initializeDatabase(): Promise<void> {
  const connection = await mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS ecommerce`);
  await connection.query(`USE ecommerce`);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM('user', 'admin') DEFAULT 'user',
      last_logout DATETIME DEFAULT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      description TEXT NOT NULL,
      size VARCHAR(50) DEFAULT NULL,
      color VARCHAR(50) DEFAULT NULL,
      image VARCHAR(255) DEFAULT '',
      category VARCHAR(100) DEFAULT NULL,
      stock INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS cart_items (
      id INT NOT NULL AUTO_INCREMENT,
      user_id INT NOT NULL,
      product_id INT NOT NULL,
      quantity INT DEFAULT 1,
      created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY user_id (user_id),
      KEY product_id (product_id),
      CONSTRAINT cart_items_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id),
      CONSTRAINT cart_items_ibfk_2 FOREIGN KEY (product_id) REFERENCES products (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  `);

  console.log('✅ Database and tables created successfully');
  await connection.end();
}
