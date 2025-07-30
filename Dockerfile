# Backend
FROM node:18
WORKDIR /app
COPY server/package.json .
RUN npm install
COPY server/ .
EXPOSE 5000 8080
CMD ["node", "src/server.js"]
