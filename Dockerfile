FROM node:alpine as builder
WORKDIR /app
RUN npm config set "@fortawesome:registry" https://npm.fontawesome.com/
RUN npm config set "//npm.fontawesome.com/:_authToken" "D2086F15-75EA-42B1-B6A2-19E387DA3759"
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
 
FROM nginx:1.17.8-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]