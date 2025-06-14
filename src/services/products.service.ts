
import { db } from '../config/db';

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
}

export const getProducts = async (): Promise<Product[]> => {
  const [rows]: any = await db.query('SELECT * FROM products');
  return rows;
};

export const getProductById = async (id: number): Promise<Product | null> => {
  const [rows]: any = await db.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0] || null;
};

export const createProduct = async (product: Product): Promise<void> => {
  const { name, description, price, image } = product;
  await db.query(
    'INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)',
    [name, description, price, image]
  );
};

export const updateProduct = async (id: number, product: Product): Promise<void> => {
  const { name, description, price, image } = product;
  await db.query(
    'UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?',
    [name, description, price, image, id]
  );
};

export const deleteProduct = async (id: number): Promise<void> => {
  await db.query('DELETE FROM products WHERE id = ?', [id]);
};


