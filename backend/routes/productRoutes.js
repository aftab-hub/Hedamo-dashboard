// routes/productRoutes.js
import express from "express"

import {get, getOne, create, updatePartial, remove, seedFromBody} from "../controllers/productController.js"
const router = express.Router();

// CRUD
router.get("/products", get);
router.get("/products/:id", getOne);
router.post("/create", create);
router.patch("/products/:id", updatePartial);
router.delete("/products/:id", remove);

// optional seed endpoint (call once to load demo data if you want)
router.post("/_seed/load", seedFromBody);

export default router;

