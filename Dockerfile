# Gunakan base image Node LTS (Alpine 3.21)
FROM node:lts-alpine3.21 AS builder

WORKDIR /app

# Salin file dependency dan install
COPY package*.json ./
RUN npm install

# Salin seluruh source code
COPY . .

# Jalankan Vite di mode dev (untuk compose dev setup)
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

