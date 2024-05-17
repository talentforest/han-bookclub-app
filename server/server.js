import express from 'express';
import dotenv from 'dotenv';
import { initializeApp } from 'firebase-admin/app';

const firebaseApp = initializeApp();

const app = express();
const PORT = process.env.PORT || 8080;

dotenv.config();

app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.send({ message: 'Hello from server!!!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
