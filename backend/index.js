import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import sequelize from './config/db.config.js';
import { requestuestLogger } from './middlewares/request.logger.middleware.js';
import authRoutes from './routes/auth.routes.js';
import v1Routes from './routes/v1/index.js'
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
requestuestLogger(app);
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/v1", v1Routes)

// Sample route
app.get('/', (_, response) => {
  response.send('Welcome to the E-commerce Backend!');
});

app.use(errorHandler);

sequelize.authenticate()
  .then(() => sequelize.sync()) 
  .then(() => {
    app.listen(PORT, ()=> console.log(`Server listening ${PORT}`));
  })
  .catch(error => {
    console.error('DB connection failed:', error);
  });