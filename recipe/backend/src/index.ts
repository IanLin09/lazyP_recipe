import express from 'express';
import { errorHandler } from './middlewares/handler.middleware.js'
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import Router from './router.js';
import cors from "cors";

dotenv.config();
const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from this origin (Frontend URL)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow cookies to be sent
};

const app = express();
const port = 3000;
// const prisma = new PrismaClient({
//   log: ['query', 'info', 'warn', 'error'], // Enable logging
// });
const prisma = new PrismaClient();

app.get('/', (req, res) => {
  res.send('Backend is running');
});


// Serve static files from the frontend dist folder
app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = new Router(prisma);

let routers = router.AllRoutes()
for (const route of routers) {
  app.use('/api',route.getRouter());
}

app.use(errorHandler);


app.listen(port,"0.0.0.0", () => {
  console.log(`server is listening on ${port} !!!`);
});
