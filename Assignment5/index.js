import express from "express";
import product from "./routing/Product.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use("/product", product);

app.all("/", (req, res) => {
    res.status(200);
    res.send("Hello world");
});

app.listen(PORT, () => {
    console.log(`SERWER IS RUNNING AT: http://localhost:${PORT}/`);
});
