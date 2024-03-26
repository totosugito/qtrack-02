# ------------:
# --- /server :
# ------------:

FROM node:18-alpine AS server-dependencies

RUN apk -U upgrade \
  && apk add build-base python3 \
  --no-cache

WORKDIR /app

COPY server/package.json ./

RUN npm install



# ------------------:
# --- client_planka :
# ------------------:

FROM node:lts  AS client

WORKDIR /app

COPY client_planka/package.json  ./

RUN npm install

COPY client_planka .

RUN DISABLE_ESLINT_PLUGIN=true npm run build



# ---------------:
# --- /app       :
# ---------------:
FROM node:18-alpine

RUN apk -U upgrade \
  && apk add bash \
  --no-cache

USER node
WORKDIR /app

COPY --chown=node:node server .

COPY --from=server-dependencies --chown=node:node /app/node_modules node_modules

COPY --from=client --chown=node:node /app/build public
COPY --from=client --chown=node:node /app/build/index.html views/index.ejs


VOLUME /app/public/user-avatars
VOLUME /app/public/project-background-images
VOLUME /app/private/attachments

EXPOSE 1337

CMD [ "npm", "run", "server" ]
