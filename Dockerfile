FROM node:18 AS backend

WORKDIR /usr/src/app/backend
COPY recipe/backend/package*.json recipe/backend/tsconfig.json ./
RUN npm install
COPY recipe/backend ./

# Frontend build stage
FROM node:18 AS frontend

WORKDIR /usr/src/app/frontend
COPY recipe/frontend/package*.json ./
RUN npm install
COPY recipe/frontend ./
RUN npm run build


# Final stage
FROM node:18

WORKDIR /usr/src/app

# Copy backend with its node_modules
COPY --from=backend /usr/src/app/backend ./backend
COPY --from=frontend /usr/src/app/frontend ./frontend

# Install ts-node globally in the final stage
RUN npm install -g typescript ts-node nodemon

WORKDIR /usr/src/app/backend/src/prisma
RUN npx prisma generate

WORKDIR /usr/src/app/backend

EXPOSE 3000
EXPOSE 5173
EXPOSE 80

# Start the application
CMD ["npm","start"]
# CMD ["nodemon", "--watch", "src", "--exec", "npx ts-node/esm backend/src/index.ts"]

