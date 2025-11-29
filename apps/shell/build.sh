#!/bin/bash
set -e

# Base directory apps/shell olduğu için root'a gitmemize gerek yok
# Netlify zaten apps/shell dizininde başlatıyor
cd ../..
pnpm install --prod=false
pnpm --filter shell build

# _headers ve _redirects dosyalarını kopyala
# Root'tan çalıştığımız için apps/shell/dist kullanıyoruz
cp apps/shell/public/_headers apps/shell/dist/_headers

# _redirects dosyasını kopyala - Netlify için kritik
cp apps/shell/public/_redirects apps/shell/dist/_redirects

# Debug: Dosyaların kopyalandığını kontrol et
echo "=== _redirects dosyası kontrol ==="
ls -la apps/shell/dist/_redirects || echo "_redirects dosyası bulunamadı!"
echo "=== _headers dosyası kontrol ==="
ls -la apps/shell/dist/_headers || echo "_headers dosyası bulunamadı!"
