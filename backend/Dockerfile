FROM node:18

WORKDIR /app

COPY backend/package*.json .

RUN echo "npm i"

COPY backend/ .

RUN npm run build

RUN echo "HASURA_GRAPHQL_ADMIN_SECRET=azerty\nCLIENT_URL=http://graphql-engine:8080/v1/graphql" > .env

EXPOSE 4000

CMD ["npm", "run", "start"]
