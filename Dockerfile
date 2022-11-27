FROM node:19-alpine

WORKDIR /spotify-clone

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]