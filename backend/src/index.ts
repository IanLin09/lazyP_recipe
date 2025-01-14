import express from 'express';
import { errorHandler } from './middlewares/handler.middleware.ts'
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import Router from './router.ts';
import cors from "cors";

const corsOptions = {
  origin: "http://127.0.0.1:5173", // Allow requests from this origin (Frontend URL)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow cookies to be sent
};

const app = express();
const port = 3001;
// const prisma = new PrismaClient({
//   log: ['query', 'info', 'warn', 'error'], // Enable logging
// });
const prisma = new PrismaClient();

app.use(cors(corsOptions));
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = new Router(prisma);
let routers = router.AllRoutes()
for (const route of routers) {
  app.use(route.getRouter());
}
app.use(errorHandler);


app.listen(port, () => {
  if (port === 3001) {
    console.log('true')
  }
  console.log(`server is listening on ${port} !!!`);
});
