import express from "express";
import { getProducts, getProduct, checkout } from "../db/db.js";
const router = express.Router();

router.get("/", async (req, res) => {
    const result = await getProducts();
    if (!result) {
        res.status(404);
    }
    res.send(result);
});

router.post("/checkout", async (req, res) => {
    const { items } = req.body;
    try {
        await checkout(items);
        res.status(200).send({ message: "Zakup zakończony pomyślnie!" });
    } catch (error) {
        res.status(400).send({ error: error.message });
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
