import { db } from '../config/db';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
}

export interface GetProductsFilterParams {
  search?: string;
  category?: string;
  limit?: number;
  offset?: number;
}

export const getFilteredProducts = async (
  params: GetProductsFilterParams
): Promise<{ products: Product[]; total: number }> => {
  const { search, category, limit = 10, offset = 0 } = params;

  let whereClause = 'WHERE 1=1';
  const queryParams: any[] = [];

  if (search) {
    whereClause += ' AND name LIKE ?';
    queryParams.push(`%${search}%`);
  }

  if (category) {
    whereClause += ' AND category = ?';
    queryParams.push(category);
  }

  // Obtener total
  const [countRows]: any = await db.query(
    `SELECT COUNT(*) AS total FROM products ${whereClause}`,
    queryParams
  );
  const total = countRows[0]?.total || 0;

  // Obtener productos paginados
  const [rows]: any = await db.query(
    `SELECT * FROM products ${whereClause} LIMIT ? OFFSET ?`,
    [...queryParams, limit, offset]
  );

  return { products: rows as Product[], total };
};
