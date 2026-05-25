FROM oven/bun:1.3 AS base
WORKDIR /usr/src/app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

RUN DATABASE_URL=postgresql://dummy:dummy@localhost:5432/dummy bun db:generate

ENV NODE_ENV=production

EXPOSE 3000

CMD ["bun", "src/server.ts"]
