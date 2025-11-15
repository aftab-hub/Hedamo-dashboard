import {ConnectDB} from "./config/db.js";
import Product from "./models/Product.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Fix dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read JSON file
const seedData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data.json"), "utf-8")
);

async function seedDB() {
  try {
    await ConnectDB(); // <-- VERY IMPORTANT

    await Product.deleteMany();
    console.log("Old products removed");

    await Product.insertMany(seedData.products);
    console.log("New products added successfully!");

    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedDB();
