FROM node:17

WORKDIR /insta-app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY prisma ./prisma/

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
RUN pnpm install
RUN npx prisma generate

COPY . .

RUN pnpm run build

ENV PORT=${APP_PORT}

EXPOSE ${PORT}

CMD ["pnpm", "run", "start:prod"]
