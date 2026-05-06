import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
    .createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    })
    .promise();

export async function getProducts() {
    const [rows] = await pool.query("SELECT * FROM shop.products;");
    return rows;
}

export async function getProduct(id) {
    const [rows] = await pool.query(
        `
		SELECT * 
		FROM shop.products
		where shop.products.id = ?`,
        [id],
    );
    return rows[0];
}

export async function createProduct(
    title,
    description,
    price,
    stock,
    category_id,
) {
    const [result] = await pool.query(
        `
	INSERT INTO shop.products (title, description, price, stock, category_id)
	VALUES (?, ?, ?, ?, ?)	
	`,
        [title, description, price, stock, category_id],
    );

    return getProduct(result.insertId);
}

export async function deleteProduct(id) {
    const [result] = await pool.query(
        `
		DELETE FROM shop.products
		WHERE id = ?;`,
        [id],
    );
    return result.affectedRows;
}

export async function decreaseProductStock(id, decreaseBy) {
    const product = await getProduct(id);

    if (product.stock < decreaseBy) {
        throw new Error("decreaseProductStock: not enought stock!");
    }

    const [result] = await pool.query(
        `
		UPDATE shop.products
		SET stock = stock - ?
		WHERE id = ?;`,
        [decreaseBy, id],
    );
    return result;
}

export async function increaseProductStock(id, increaseBy) {
    const [result] = await pool.query(
        `
		UPDATE shop.products
		SET stock = stock + ?
		WHERE id = ?;`,
        [increaseBy, id],
    );
    return result;
}
