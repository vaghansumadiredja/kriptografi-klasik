FROM node:19-alpine3.16 AS deps
USER 0
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then npm i -g yarn && yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then npm i -g pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi


FROM node:19-alpine3.16 AS builder
USER 0
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build


FROM node:19-alpine3.16 AS runner
USER 0
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public
COPY --from=builder --chown=1001:1001 /app/.next/standalone ./
COPY --from=builder --chown=1001:1001 /app/.next/static ./.next/static

USER 1001

EXPOSE 3000

ENV PORT 3000

ENTRYPOINT ["node", "server.js"]
