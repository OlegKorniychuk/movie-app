FROM node:22-slim

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build
RUN npm prune --production

RUN touch db.sqlite

EXPOSE 8050

CMD ["node", "dist/main.js"]