#!/bin/bash
set -e

cd ../..
pnpm install --prod=false
pnpm --filter users build
cp apps/users/public/_redirects apps/users/dist/_redirects
