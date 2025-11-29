#!/bin/bash
set -e

# Base directory apps/dashboard olduğu için root'a gitmemize gerek yok
# Netlify zaten apps/dashboard dizininde başlatıyor
cd ../..
pnpm install --prod=false
pnpm --filter dashboard build

# _headers ve _redirects dosyalarını kopyala
# Root'tan çalıştığımız için apps/dashboard/dist kullanıyoruz
cp apps/dashboard/public/_headers apps/dashboard/dist/_headers

# _redirects dosyasını kopyala - Netlify için kritik
cp apps/dashboard/public/_redirects apps/dashboard/dist/_redirects

# Debug: Dosyaların kopyalandığını kontrol et
echo "=== _redirects dosyası kontrol ==="
ls -la apps/dashboard/dist/_redirects || echo "_redirects dosyası bulunamadı!"
echo "=== _headers dosyası kontrol ==="
ls -la apps/dashboard/dist/_headers || echo "_headers dosyası bulunamadı!"
