// controllers/productController.js
import Product from "../models/Product.js";

/**
 * GET /api/products
 */
export const get = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

/**
 * GET /api/products/:id
 */
export const getOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid id" });
  }
};

/**
 * POST /api/products
 */
export const create = async (req, res) => {
  try {
    // ensure arrays are arrays
    const body = {
      ...req.body,
      suggestions: Array.isArray(req.body.suggestions) ? req.body.suggestions : [],
      flags: Array.isArray(req.body.flags) ? req.body.flags : [],
    };

    const product = new Product(body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to create product", error: err.message });
  }
};

/**
 * PATCH /api/products/:id
 */
export const updatePartial = async (req, res) => {
  try {
    const updates = { ...req.body };
    // keep the createdAt if not provided
    if (updates.createdAt === undefined) delete updates.createdAt;

    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to update", error: err.message });
  }
};

/**
 * DELETE /api/products/:id
 */
export const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to delete", error: err.message });
  }
};

/**
 * POST /api/products/_seed/load
 * Accepts an array in body.products to seed
 */
export const seedFromBody = async (req, res) => {
  try {
    const products = Array.isArray(req.body.products) ? req.body.products : [];
    if (!products.length) return res.status(400).json({ message: "No products to seed" });

    // Optional: remove existing (comment out if not desired)
    // await Product.deleteMany({});

    const created = await Product.insertMany(
      products.map((p) => ({
        ...p,
        createdAt: p.createdAt ? p.createdAt : new Date().toISOString(),
      }))
    );
    res.json({ created: created.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Seeding failed", error: err.message });
  }
};


