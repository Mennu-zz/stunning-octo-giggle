FROM node:13.12.0-alpine as build-stage

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY . /app/

RUN npm run build

FROM node:13.12.0-alpine

WORKDIR /server

COPY --from=build-stage /app/dist/ /server/build/
COPY --from=build-stage /app/node_modules /server/node_modules/
COPY --from=build-stage /app/.env /server/

CMD ["node", "build/server"]