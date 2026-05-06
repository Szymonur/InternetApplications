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
    const [result] = await pool.query(
        `
		UPDATE shop.products
		SET stock = stock - ?
		WHERE id = ? AND stock >= ?;`,
        [decreaseBy, id, decreaseBy],
    );

    if (result.affectedRows === 0) {
        throw new Error("Brak wystarczającej ilości towaru w magazynie!");
    }

    return result;
}

export async function checkout(items) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        for (const item of items) {
            const [result] = await connection.query(
                "UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?",
                [item.quantity, item.id, item.quantity],
            );

            if (result.affectedRows === 0) {
                throw new Error(
                    `Produkt ${item.title} jest już niedostępny w tej ilości.`,
                );
            }
        }

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
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
