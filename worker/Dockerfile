FROM node:14.19-alpine

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]
RUN npm install --production
COPY ./ ./

CMD ["npm", "run", "start"]
