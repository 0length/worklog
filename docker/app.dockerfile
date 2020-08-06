FROM alpine:latest
RUN apk add --no-cache nodejs yarn
WORKDIR /app
COPY package.json /app
COPY dist /app/dist
RUN yarn install 
ENTRYPOINT [ "node" ]
CMD ["/app/dist/app.js"]
