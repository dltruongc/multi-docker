FROM node:14.19-alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install --production
COPY ./ ./
RUN npm run build


FROM nginx:1.21-alpine
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html/