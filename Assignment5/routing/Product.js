import express from "express";
import { getProducts, getProduct, checkout } from "../db/db.js";
const router = express.Router();

router.get("/", async (req, res) => {
    const result = await getProducts();
    if (!result) {
        return res.status(404).send();
    }
    const availableProducts = result.filter((p) => p.stock > 0);
    res.send(availableProducts);
});

router.post("/checkout", async (req, res) => {
    const { items } = req.body;
    try {
        await checkout(items);
        res.redirect(303, "/product");
    } catch (error) {
        const products = await getProducts();
        const availableProducts = products.filter((p) => p.stock > 0);
        res.status(400).send({ 
            error: error.message, 
            products: availableProducts 
        });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const result = await getProduct(id);
    if (!result) {
        res.status(404);
    }
    res.send(result);
});

export default router;
