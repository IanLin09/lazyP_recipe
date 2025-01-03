import express from 'express';
import { errorHandler } from './middlewares/handler.middleware.ts'
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import Router from './router.ts';

const app = express();
const port = 3001;
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Enable logging
});
// const prisma = new PrismaClient();

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
