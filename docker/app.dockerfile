FROM node:12
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install 
COPY dist ./
COPY app/lib/common-keys/ ./app/lib/common-keys/
CMD ["node", "app.js"]
