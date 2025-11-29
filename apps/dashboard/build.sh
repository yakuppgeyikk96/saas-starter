#!/bin/bash
set -e

cd ../..
pnpm install --prod=false
pnpm --filter dashboard build
cp apps/dashboard/public/_redirects apps/dashboard/dist/_redirects
cp apps/dashboard/public/_headers apps/dashboard/dist/_headers
