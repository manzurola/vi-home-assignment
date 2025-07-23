# Dockerfile for marvel-webapp (React frontend)
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm run install:legacy

COPY . .

RUN npm run build

# Production image
FROM node:20-alpine
WORKDIR /app

RUN npm install -g serve
COPY --from=build /app/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"] 