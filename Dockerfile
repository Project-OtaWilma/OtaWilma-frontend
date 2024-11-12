ARG NODE_VERSION=18.0.0

FROM node:${NODE_VERSION}-alpine AS build

ENV NODE_ENV production


WORKDIR /otawilma

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./scripts/ ./scripts
COPY ./config ./config
COPY ./public ./public
COPY ./src ./src

RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
    
RUN npm run build

FROM nginx:latest

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /otawilma/build /usr/share/nginx/html/

WORKDIR /app
RUN chown -R nginx:nginx /app && chmod -R 755 /app && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 80
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]