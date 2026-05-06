import express from "express";
import { getProducts, getProduct } from "../db/db.js";
const router = express.Router();

router.get("/", async (req, res) => {
    const result = await getProducts();
    if (!result) {
        res.status(404);
    }
    res.send(result);
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
