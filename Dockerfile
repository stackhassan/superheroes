# Stage 1: Build Backend (NestJS)
FROM node:20 AS backend-builder
WORKDIR /app/backend

COPY superhero-app/package*.json ./
RUN npm install
COPY superhero-app ./
RUN npm run build

# Stage 2: Build Frontend (Vite)
FROM node:20 AS frontend-builder
WORKDIR /app/frontend

COPY superhero-frontend/package*.json ./
RUN npm install
COPY superhero-frontend ./
RUN npm run build

# Ensure the correct folder exists
RUN ls -la /app/frontend/dist || (echo "Frontend build directory missing!" && exit 1)

# Stage 3: Run Both Backend & Frontend
FROM node:20 AS runtime
WORKDIR /app

RUN npm install -g pm2 serve

# Copy backend from builder
COPY --from=backend-builder /app/backend /app/backend

# Copy frontend from builder (Vite uses `dist/`)
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# Expose necessary ports
EXPOSE 3000 5000

# Start both backend and frontend
CMD ["sh", "-c", "pm2 start /app/backend/dist/main.js --name backend && serve -s /app/frontend/dist -l 5000"]
