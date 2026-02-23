#!/bin/sh
set -e

echo "⏳ Waiting for database to be ready..."
sleep 5  # segurança extra além do healthcheck

echo "🔄 Running Prisma migrations..."
npx prisma migrate deploy

echo "🚀 Starting application..."
exec node dist/main