FROM node:14-alpine3.16

# Create app directory
WORKDIR /app

COPY . ./
ENV NODE_OPTIONS=--max-old-space-size=1536
RUN npm install

EXPOSE 3000
CMD [ "npm", "run", "build" ]