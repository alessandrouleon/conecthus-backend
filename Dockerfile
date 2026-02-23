FROM node:lts-slim AS builder

WORKDIR /usr/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --silent

COPY . .

RUN npx prisma generate
RUN npm run build

# --- Imagem final ---
FROM node:lts-slim AS production

RUN apt-get update && apt-get install -y openssl tzdata --no-install-recommends \
    && ln -sf /usr/share/zoneinfo/America/Manaus /etc/localtime \
    && echo "America/Manaus" > /etc/timezone \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --only=production --silent

COPY --from=builder /usr/app/dist ./dist
COPY --from=builder /usr/app/node_modules/.prisma ./node_modules/.prisma

COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

EXPOSE 4050

CMD ["./entrypoint.sh"]