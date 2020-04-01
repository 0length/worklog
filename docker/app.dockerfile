FROM alpine:latest
RUN apk add --no-cache nodejs npm
WORKDIR /app
COPY package.json /app
COPY dist /app/dist
RUN npm install 
ENTRYPOINT [ "node" ]
CMD ["/app/dist/app.js"]
