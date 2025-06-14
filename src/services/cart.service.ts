// services/cart.service.ts
import { db } from '../config/db';

interface CartItem {
  product_id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export const getCartItems = async (userId: number): Promise<{ items: CartItem[]; total: number }> => {
  const [rows]: any = await db.query(
    `SELECT c.product_id, p.name, p.price, p.image, c.quantity
     FROM carts c
     JOIN products p ON c.product_id = p.id
     WHERE c.user_id = ?`,
    [userId]
  );

  const total = rows.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
  return { items: rows, total };
};

export const addToCart = async (userId: number, productId: number, quantity: number): Promise<void> => {
  const [rows]: any = await db.query(
    'SELECT * FROM carts WHERE user_id = ? AND product_id = ?',
    [userId, productId]
  );

  if (rows.length > 0) {
    await db.query(
      'UPDATE carts SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
      [quantity, userId, productId]
    );
  } else {
    await db.query(
      'INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?)',
      [userId, productId, quantity]
    );
  }
};

export const updateCartItem = async (userId: number, productId: number, quantity: number): Promise<void> => {
  await db.query(
    'UPDATE carts SET quantity = ? WHERE user_id = ? AND product_id = ?',
    [quantity, userId, productId]
  );
};

export const removeCartItem = async (userId: number, productId: number): Promise<void> => {
  await db.query(
    'DELETE FROM carts WHERE user_id = ? AND product_id = ?',
    [userId, productId]
  );
};
