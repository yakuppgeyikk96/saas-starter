#!/bin/bash
set -e

cd ../..
pnpm install --prod=false
pnpm --filter auth build
cp apps/auth/public/_redirects apps/auth/dist/_redirects
cp apps/auth/public/_headers apps/auth/dist/_headers
