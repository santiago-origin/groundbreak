FROM node:20-alpine AS build
WORKDIR /app
ENV NODE_ENV=development

COPY client/package*.json ./client/
RUN cd client && npm ci

COPY client/ ./client/
RUN cd client && npm run build

FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/client/dist ./client/dist
COPY server.js db.js ./

EXPOSE 3000
CMD ["node", "server.js"]
