FROM node:alpine as base

WORKDIR /myfuturecareer-website

COPY package.json package-lock.json ./

RUN rm -rf node_modules && npm install --frozen-lockfile && npm cache verify 

COPY . .

CMD ["node", "app.js"]