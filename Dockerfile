FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY client/package*.json ./client/
RUN cd client && npm ci

COPY . .
RUN cd client && npm run build

EXPOSE 3000
CMD ["node", "server.js"]
