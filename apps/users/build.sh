#!/bin/bash
set -e

# Base directory apps/users olduğu için root'a gitmemize gerek yok
# Netlify zaten apps/users dizininde başlatıyor
cd ../..
pnpm install --prod=false
pnpm --filter users build

# _headers ve _redirects dosyalarını kopyala
# Root'tan çalıştığımız için apps/users/dist kullanıyoruz
cp apps/users/public/_headers apps/users/dist/_headers

# _redirects dosyasını kopyala - Netlify için kritik
cp apps/users/public/_redirects apps/users/dist/_redirects

# Debug: Dosyaların kopyalandığını kontrol et
echo "=== _redirects dosyası kontrol ==="
ls -la apps/users/dist/_redirects || echo "_redirects dosyası bulunamadı!"
echo "=== _headers dosyası kontrol ==="
ls -la apps/users/dist/_headers || echo "_headers dosyası bulunamadı!"
