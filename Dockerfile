FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --include=dev
COPY . .
RUN npm run build

FROM node:16-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR  /app
COPY package*.json ./
RUN npm install --only=prod
COPY . .
COPY --from=builder /app/dist ./dist
EXPOSE 6000
CMD ["node","dist/main"]
