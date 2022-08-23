
FROM node:18-alpine as development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm install

RUN chown -R node:node /usr/src/app/node_modules

COPY --chown=node:node . .

USER node

CMD ["npm", "start"]   


FROM node:18-alpine as build

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY --chown=node:node package*.json ./

RUN npm install

RUN chown -R node:node /usr/src/app/node_modules

COPY --chown=node:node . .

ARG REACT_APP_API_URL

ENV REACT_APP_API_URL $REACT_APP_API_URL

RUN npm run build

# Nginx static server to react SPA
FROM nginx:1.17.8-alpine as production

COPY --from=build /usr/src/app/build /usr/share/nginx/html 

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]