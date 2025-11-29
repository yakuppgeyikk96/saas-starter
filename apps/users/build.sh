#!/bin/bash
set -e

cd ../..
pnpm install --prod=false
pnpm --filter users build
cp apps/users/public/_redirects apps/users/dist/_redirects
cp apps/users/public/_headers apps/users/dist/_headers
