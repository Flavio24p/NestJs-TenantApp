FROM node:16

WORKDIR apple/src/app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5050
CMD [ "node", "dist/main" ]