FROM node:20 as builder
WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 3100
CMD ["nginx", "-g", "daemon off;"]
