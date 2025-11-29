#!/bin/bash
set -e

# Base directory apps/auth olduğu için root'a gitmemize gerek yok
# Netlify zaten apps/auth dizininde başlatıyor
cd ../..
pnpm install --prod=false
pnpm --filter auth build

# _headers ve _redirects dosyalarını kopyala
# Root'tan çalıştığımız için apps/auth/dist kullanıyoruz
cp apps/auth/public/_headers apps/auth/dist/_headers

# _redirects dosyasını kopyala - Netlify için kritik
cp apps/auth/public/_redirects apps/auth/dist/_redirects

# Debug: Dosyaların kopyalandığını kontrol et
echo "=== _redirects dosyası kontrol ==="
ls -la apps/auth/dist/_redirects || echo "_redirects dosyası bulunamadı!"
echo "=== _headers dosyası kontrol ==="
ls -la apps/auth/dist/_headers || echo "_headers dosyası bulunamadı!"
