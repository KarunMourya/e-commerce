import { Worker } from "bullmq";
import { parseCSV } from "../utils/csvParser.util.js";
import fs from "fs";
import db from "../models/index.js";

const Product = db.Product;

const connection = {
  host: "127.0.0.1",
  port: 6379,
};

new Worker(
  "product-bulk-queue",
  async (job) => {
    const { filePath } = job.data;

    const rows = await parseCSV(filePath);

    const batchSize = 500;

    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      await Product.bulkCreate(batch, { validate: true });
    }

    fs.unlinkSync(filePath);

    return { totalInserted: rows.length };
  },
  { connection }
);
