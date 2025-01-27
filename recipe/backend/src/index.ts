import express from 'express';
import { errorHandler } from './middlewares/handler.middleware.js'
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import Router from './router.js';
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';



dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontend = process.env.FRONTEND_WEB
const corsOptions = {
  origin: frontend, // Allow requests from this origin (Frontend URL)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, 
};

const app = express();
const port = 3000;
// const prisma = new PrismaClient({
//   log: ['query', 'info', 'warn', 'error'], // Enable logging
// });
const prisma = new PrismaClient();

app.use(express.static(path.join(__dirname, '../../frontend/dist')));



app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = new Router(prisma);

let routers = router.AllRoutes()
for (const route of routers) {
  app.use('/api',route.getRouter());
}

// Handle client-side routing - serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.use(errorHandler);


app.listen(port,"0.0.0.0", () => {
  console.log(`server is listening on ${port} !!!`);
});
