#!/bin/bash
set -e

cd ../..
pnpm install --prod=false
pnpm --filter shell build
