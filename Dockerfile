FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Instala o servidor estático
RUN npm install -g serve

# Railway define PORT, então usamos ele aqui
CMD ["sh", "-c", "serve -s dist -l $PORT"]
