#!/bin/bash
set -e

cd ../..
pnpm install --prod=false
pnpm --filter shell build
cp apps/shell/public/_redirects apps/shell/dist/_redirects
cp apps/shell/public/_headers apps/shell/dist/_headers
