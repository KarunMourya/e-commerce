import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import sequelize from './config/db.config.js';
import { requestuestLogger } from './middlewares/request.logger.middleware.js';
import authRoutes from './routes/auth.routes.js';
import v1Routes from './routes/v1/index.js';
import { errorHandler } from './middlewares/error.middleware.js';
import "./workers/productBulk.worker.js";

import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { Queue } from 'bullmq';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
requestuestLogger(app);
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/v1", v1Routes);

// Sample route
app.get('/', (_, response) => {
  response.send('Welcome to the E-commerce Backend!');
});

const productQueue = new Queue('product-bulk-queue', {
  connection: {
    host: '127.0.0.1',
    port: 6379,
  },
});

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullMQAdapter(productQueue)],
  serverAdapter,
});

app.use('/admin/queues', serverAdapter.getRouter());

app.use(errorHandler);

sequelize.authenticate()
  .then(() => sequelize.sync()) 
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🧭 Bull Board available at http://localhost:${PORT}/admin/queues`);
    });
  })
  .catch(error => {
    console.error('DB connection failed:', error);
  });
