import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import sequelize from './config/dbConfig.js';
import { requestuestLogger } from './middlewares/requestLogger.js';

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
requestuestLogger(app);
app.use(cors());
app.use(express.json());

// Sample route
app.get('/', (_, res) => {
  res.send('Welcome to the E-commerce Backend!');
});

sequelize.authenticate()
  .then(() => sequelize.sync()) 
  .then(() => {
    app.listen(PORT, ()=> console.log(`Server listening ${PORT}`));
  })
  .catch(err => {
    console.error('DB connection failed:', err);
  });