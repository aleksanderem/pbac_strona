#!/bin/bash
# Download all product images from remote URLs to local files
# Usage: bash download_images.sh

DIR="/Users/alex/projects/pbac_main/public/images/products"
mkdir -p "$DIR"

SUCCESS=0
FAIL=0
SKIP=0

download() {
  local url="$1"
  local dest="$2"

  if [ -f "$dest" ] && [ -s "$dest" ]; then
    echo "SKIP (exists): $(basename "$dest")"
    SKIP=$((SKIP + 1))
    return 0
  fi

  echo "Downloading: $(basename "$dest")"
  if curl -sL --connect-timeout 10 --max-time 30 -o "$dest" "$url"; then
    # Check if file is valid (not empty, not HTML error page)
    if [ ! -s "$dest" ]; then
      echo "  FAIL (empty): $(basename "$dest")"
      rm -f "$dest"
      FAIL=$((FAIL + 1))
      return 1
    fi
    # Check if it's an HTML error page
    if file "$dest" | grep -q "HTML"; then
      echo "  FAIL (HTML): $(basename "$dest")"
      rm -f "$dest"
      FAIL=$((FAIL + 1))
      return 1
    fi
    echo "  OK: $(basename "$dest")"
    SUCCESS=$((SUCCESS + 1))
    return 0
  else
    echo "  FAIL (curl): $(basename "$dest")"
    rm -f "$dest"
    FAIL=$((FAIL + 1))
    return 1
  fi
}

echo "=== MAIN PRODUCT IMAGES ==="

# ---- AUX (7 products) ----
download "https://pbac.pl/wp-content/uploads/2024/01/aux-klimatyzator.webp" "$DIR/aux-q-smart.webp"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-aux-q-smart-premium-aux-q-smart-premium-1652435347.png" "$DIR/aux-q-smart-premium.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-aux-q-smart-premium-grey-aux-q-smart-premium-grey-1652684016.png" "$DIR/aux-q-smart-premium-grey.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-aux-halo-klimatyzator-scienny-split-aux-halo-16227.png" "$DIR/aux-halo.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-aux-halo-kopia-7815.png" "$DIR/aux-halo-deluxe.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-aux-freedom-plus-aux-freedom-plus-1683269105.png" "$DIR/aux-freedom-plus.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-aux-j-smart-aux-j-smart-1644852061.png" "$DIR/aux-j-smart.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-aux-j-smart-art-klimatyzator-scienny-aux-j-smart-art-1616955229.png" "$DIR/aux-j-smart-art.png"

# ---- Kaisai (4 products) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-kaisai-fly-klimatyzator-kaisai-fly-1689161665.png" "$DIR/kaisai-fly.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-kaisai-ice-white-kaisai-ice-white-klimatyzator-1692707222.png" "$DIR/kaisai-ice-white.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-kaisai-ice-black-kaisai-ice-black-1689227235.png" "$DIR/kaisai-ice-black.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-kaisai-geo-kaisai-geo-1689229369.png" "$DIR/kaisai-geo.png"

# ---- Daikin (1 product) ----
download "https://pbac.pl/wp-content/uploads/2024/05/1-1.png" "$DIR/daikin-stylish-white.png"

# ---- Mitsubishi (6 products) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-premium-white-16163.png" "$DIR/mitsubishi-premium-white.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-diamond-16174.png" "$DIR/mitsubishi-diamond-natural-white.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-diamond-pearl-white-mitsubishi-diamond-onyx-black-1616955167.png" "$DIR/mitsubishi-diamond-pearl-white.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-diamond-pearl-white-mitsubishi-diamond-pearl-white-1616955175.png" "$DIR/mitsubishi-diamond-pearl-white-2.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-diamond-ruby-red-mitsubishi-diamond-ruby-red-1616955158.png" "$DIR/mitsubishi-diamond-ruby-red.png"
download "https://pbac.pl/wp-content/uploads/2024/06/msi.png" "$DIR/mitsubishi-heavy-premium.png"
download "https://pbac.pl/wp-content/uploads/2024/06/MS12.png" "$DIR/klimatyzato-mitsubishi-heavy-diamond-srk25zsx-wf.png"

# ---- GE (2 products) ----
download "https://pbac.pl/wp-content/uploads/2024/05/1.png" "$DIR/klimatyzator-scienny-ge-future-white.png"
download "https://pbac.pl/wp-content/uploads/2024/05/klimatyzator-scienny-ge-appliances-prime-25-kw.png" "$DIR/klimatyzator-ge-prime.png"

# ---- Rotenso (1 product) ----
download "https://pbac.pl/wp-content/uploads/2024/01/rotenso.webp" "$DIR/rotenso-imoto-x.webp"

# ---- Gree (12 products) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-pular-matt-gree-pular-1645080452.png" "$DIR/gree-pular-matt.png"
# gree-pular-matt-2 uses same image
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-pular-matt-gree-pular-1645080452.png" "$DIR/gree-pular-matt-2.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-silver-imageid.webp" "$DIR/gree-clivia-silver.webp"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-navy-blue-imageid.webp" "$DIR/gree-clivia-navy-blue.webp"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-white-17431.jpg" "$DIR/gree-clivia-white.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-amber-standard-silver-gree-amber-standard-silver-14362.webp" "$DIR/gree-amber-standard-silver.webp"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-amber-prestige-14387.png" "$DIR/gree-amber-prestige.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-white-gree-fairy-white-1652171039.png" "$DIR/gree-fairy-white.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-silver-gree-fairy-silver-1618932258.png" "$DIR/gree-fairy-silver.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-dark-gree-fairy-dark-1618932259.png" "$DIR/gree-fairy-dark.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-lomo-luxury-plus-14370.jpg" "$DIR/gree-lomo-luxury-plus.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-soyal-gree-soyal-zestawy-1624370659.png" "$DIR/gree-soyal.png"

# ---- Haier (6 products) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-haier-flexis-plus-white-matt-1645080657.jpg" "$DIR/haier-flexis-plus-white-matt.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-haier-jade-plus-1646383711.png" "$DIR/haier-jade-plus.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-expert-plus-haier-expert-plus-1651176174-1.png" "$DIR/haier-expert-plus.png"
# haier-arctic-expert-plus uses same image as expert-plus
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-expert-plus-haier-expert-plus-1651176174-1.png" "$DIR/haier-arctic-expert-plus.png"
download "https://pbac.pl/wp-content/uploads/2024/05/profile.png" "$DIR/haier-revive-plus.png"
# haier-flexis-plus-white-matt-2 uses same image as flexis-plus-white-matt
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-haier-flexis-plus-white-matt-1645080657.jpg" "$DIR/haier-flexis-plus-white-matt-2.jpg"

# ---- LG (7 products) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-standard-plus-lg-standard-plus-1646913754.png" "$DIR/lg-standard-2.png"
# lg-standard-plus uses same image
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-standard-plus-lg-standard-plus-1646913754.png" "$DIR/lg-standard-plus.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-deluxe-lg-deluxe-1645079386.png" "$DIR/lg-deluxe.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-dualcool-klimatyzator-scienny-lg-dualcool-1616955292.png" "$DIR/lg-dualcool.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-beige-kopia-klimatyzator-lg-artcool-mirror-1616955286.png" "$DIR/lg-artcool-mirror.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-beige-lg-artcool-beige-1683721922.png" "$DIR/lg-artcool-beige.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-gallery-klimatyzator-scienny-lg-artcool-gallery-1616955270.png" "$DIR/lg-artcool-gallery.png"

# ---- Toshiba (6 products) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-standard-2-kopia-toshiba-seiya-klimatyzator-1692950465.png" "$DIR/toshiba-seiya-2.png"
# toshiba-shorai-edge-white uses same image as seiya-2
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-standard-2-kopia-toshiba-seiya-klimatyzator-1692950465.png" "$DIR/toshiba-shorai-edge-white.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-shorai-edge-white-kopia-toshiba-shorai-edge-black-klimatyzator-1691744930.png" "$DIR/toshiba-shorai-edge-black.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-shorai-edge-black-kopia-toshiba-haori-klimatyzator-1692948156.png" "$DIR/toshiba-haori.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-haori-kopia-toshiba-daiseikai-9-1689074880.png" "$DIR/toshiba-daiseikai-9.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-konsola-bi-flow-big-konsola-toshiba.jpg" "$DIR/toshiba-konsola-bi-flow.jpg"

echo ""
echo "=== GALLERY IMAGES ==="

# ---- AUX Q-Smart Premium gallery (2 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-aux-q-smart-premium-16414.jpg" "$DIR/aux-q-smart-premium-gallery-0.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-aux-q-smart-premium-16417.jpg" "$DIR/aux-q-smart-premium-gallery-1.jpg"

# ---- Kaisai Fly gallery (5 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-kaisai-fly-kaisai-fly-2.webp" "$DIR/kaisai-fly-gallery-0.webp"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-kaisai-fly-kaisai-fly-3.webp" "$DIR/kaisai-fly-gallery-1.webp"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-kaisai-fly-17729.jpg" "$DIR/kaisai-fly-gallery-2.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-kaisai-fly-17731.jpg" "$DIR/kaisai-fly-gallery-3.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-kaisai-fly-kaisai-fly-5.webp" "$DIR/kaisai-fly-gallery-4.webp"

# ---- Kaisai Ice Black gallery (1 image) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-kaisai-ice-black-kaisai-ice-black-7.webp" "$DIR/kaisai-ice-black-gallery-0.webp"

# ---- Daikin Stylish White gallery (1 image) ----
download "https://pbac.pl/wp-content/uploads/2024/05/daikin.png" "$DIR/daikin-stylish-white-gallery-0.png"

# ---- Mitsubishi Premium White gallery (5 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-premium-white-7467.jpg" "$DIR/mitsubishi-premium-white-gallery-0.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-premium-white-7468.jpg" "$DIR/mitsubishi-premium-white-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-premium-white-7469.jpg" "$DIR/mitsubishi-premium-white-gallery-2.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-premium-white-16160.jpg" "$DIR/mitsubishi-premium-white-gallery-3.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-premium-white-16161.jpg" "$DIR/mitsubishi-premium-white-gallery-4.jpg"

# ---- Mitsubishi Diamond Pearl White 2 gallery (3 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-diamond-pearl-white-16189.jpg" "$DIR/mitsubishi-diamond-pearl-white-2-gallery-0.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-diamond-pearl-white-16191.jpg" "$DIR/mitsubishi-diamond-pearl-white-2-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-diamond-16175.jpg" "$DIR/mitsubishi-diamond-pearl-white-2-gallery-2.jpg"

# ---- Mitsubishi Heavy Diamond gallery (4 images) ----
download "https://pbac.pl/wp-content/uploads/2024/06/obraz_2024-06-21_004626686.png" "$DIR/klimatyzato-mitsubishi-heavy-diamond-srk25zsx-wf-gallery-0.png"
download "https://pbac.pl/wp-content/uploads/2024/06/obraz_2024-06-21_004637638.png" "$DIR/klimatyzato-mitsubishi-heavy-diamond-srk25zsx-wf-gallery-1.png"
download "https://pbac.pl/wp-content/uploads/2024/06/obraz_2024-06-21_004619219.png" "$DIR/klimatyzato-mitsubishi-heavy-diamond-srk25zsx-wf-gallery-2.png"
download "https://pbac.pl/wp-content/uploads/2024/06/obraz_2024-06-21_004611977.png" "$DIR/klimatyzato-mitsubishi-heavy-diamond-srk25zsx-wf-gallery-3.png"

# ---- GE Future White gallery (4 images) ----
download "https://pbac.pl/wp-content/uploads/2024/05/2.png" "$DIR/klimatyzator-scienny-ge-future-white-gallery-0.png"
download "https://pbac.pl/wp-content/uploads/2024/05/3.png" "$DIR/klimatyzator-scienny-ge-future-white-gallery-1.png"
download "https://pbac.pl/wp-content/uploads/2024/05/4.jpeg" "$DIR/klimatyzator-scienny-ge-future-white-gallery-2.jpeg"
download "https://pbac.pl/wp-content/uploads/2024/05/5.jpeg" "$DIR/klimatyzator-scienny-ge-future-white-gallery-3.jpeg"

# ---- GE Prime gallery (4 images) ----
download "https://pbac.pl/wp-content/uploads/2024/05/2-1.png" "$DIR/klimatyzator-ge-prime-gallery-0.png"
download "https://pbac.pl/wp-content/uploads/2024/05/3-1.png" "$DIR/klimatyzator-ge-prime-gallery-1.png"
download "https://pbac.pl/wp-content/uploads/2024/05/4-1.jpeg" "$DIR/klimatyzator-ge-prime-gallery-2.jpeg"
download "https://pbac.pl/wp-content/uploads/2024/05/5-1.jpeg" "$DIR/klimatyzator-ge-prime-gallery-3.jpeg"

# ---- Gree Pular Matt gallery (3 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-pular-matt-gree-pular-1645080452.png" "$DIR/gree-pular-matt-gallery-0.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-pular-matt-13211.jpg" "$DIR/gree-pular-matt-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-pular-matt-13213.jpg" "$DIR/gree-pular-matt-gallery-2.jpg"

# ---- Gree Pular Matt 2 gallery (3 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-pular-matt-gree-pular-1645080452.png" "$DIR/gree-pular-matt-2-gallery-0.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-pular-matt-13211.jpg" "$DIR/gree-pular-matt-2-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-pular-matt-13213.jpg" "$DIR/gree-pular-matt-2-gallery-2.jpg"

# ---- Gree Clivia Silver gallery (4 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-silver-imageid.webp" "$DIR/gree-clivia-silver-gallery-0.webp"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-silver-gree-clivia-silver-17446.jpg" "$DIR/gree-clivia-silver-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-silver-gree-clivia-silver-7.webp" "$DIR/gree-clivia-silver-gallery-2.webp"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-silver-gree-clivia-silver-6.webp" "$DIR/gree-clivia-silver-gallery-3.webp"

# ---- Gree Clivia Navy Blue gallery (4 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-navy-blue-imageid.webp" "$DIR/gree-clivia-navy-blue-gallery-0.webp"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-navy-blue-gree-clivia-navy-blue-17427.jpg" "$DIR/gree-clivia-navy-blue-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-navy-blue-gree-clivia-navy-blue-1.webp" "$DIR/gree-clivia-navy-blue-gallery-2.webp"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-navy-blue-gree-clivia-navy-blue-2.webp" "$DIR/gree-clivia-navy-blue-gallery-3.webp"

# ---- Gree Clivia White gallery (4 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-white-17431.jpg" "$DIR/gree-clivia-white-gallery-0.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-white-gree-clivia-white-klimatyzator-1706282655.png" "$DIR/gree-clivia-white-gallery-1.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-white-gree-clivia-white-7.webp" "$DIR/gree-clivia-white-gallery-2.webp"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-white-gree-clivia-white-2.webp" "$DIR/gree-clivia-white-gallery-3.webp"

# ---- Gree Amber Standard Silver gallery (4 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-amber-standard-silver-gree-amber-standard-silver-14362.webp" "$DIR/gree-amber-standard-silver-gallery-0.webp"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-amber-standard-silver-gree-amber-standard-silver-1616955399.webp" "$DIR/gree-amber-standard-silver-gallery-1.webp"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-amber-standard-silver-gree-amber-standard-silver-14360.webp" "$DIR/gree-amber-standard-silver-gallery-2.webp"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-amber-standard-silver-gree-amber-standard-silver-grzalki-do-pracy-zimowej.webp" "$DIR/gree-amber-standard-silver-gallery-3.webp"

# ---- Gree Amber Prestige gallery (4 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-amber-prestige-14387.png" "$DIR/gree-amber-prestige-gallery-0.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-amber-prestige-gree-amber-prestige-front-1616955069.png" "$DIR/gree-amber-prestige-gallery-1.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-amber-prestige-14388.jpg" "$DIR/gree-amber-prestige-gallery-2.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-amber-prestige-14385.jpg" "$DIR/gree-amber-prestige-gallery-3.jpg"

# ---- Gree Fairy White gallery (4 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-white-gree-fairy-white-1652171039.png" "$DIR/gree-fairy-white-gallery-0.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-white-16400.jpg" "$DIR/gree-fairy-white-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-white-16399.jpg" "$DIR/gree-fairy-white-gallery-2.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-white-gree-fairy-white-jonizator-powietrza.webp" "$DIR/gree-fairy-white-gallery-3.webp"

# ---- Gree Fairy Silver gallery (4 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-silver-gree-fairy-silver-1618932258.png" "$DIR/gree-fairy-silver-gallery-0.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-silver-13168.jpg" "$DIR/gree-fairy-silver-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-silver-13180.jpg" "$DIR/gree-fairy-silver-gallery-2.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-silver-13177.jpg" "$DIR/gree-fairy-silver-gallery-3.jpg"

# ---- Gree Fairy Dark gallery (5 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-dark-gree-fairy-dark-1618932259.png" "$DIR/gree-fairy-dark-gallery-0.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-dark-13183.jpg" "$DIR/gree-fairy-dark-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-silver-13180.jpg" "$DIR/gree-fairy-dark-gallery-2.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-dark-gree-fairy-dark-grzalka-tacy-skroplin.webp" "$DIR/gree-fairy-dark-gallery-3.webp"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-dark-13194.jpg" "$DIR/gree-fairy-dark-gallery-4.jpg"

# ---- Gree Lomo Luxury Plus gallery (3 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-lomo-luxury-plus-14370.jpg" "$DIR/gree-lomo-luxury-plus-gallery-0.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-lomo-luxury-plus-14374.jpg" "$DIR/gree-lomo-luxury-plus-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-lomo-luxury-plus-gree-lomo-luxury-plus-front-1616955098.png" "$DIR/gree-lomo-luxury-plus-gallery-2.png"

# ---- Gree Soyal gallery (4 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-soyal-gree-soyal-zestawy-1624370659.png" "$DIR/gree-soyal-gallery-0.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-soyal-14043.png" "$DIR/gree-soyal-gallery-1.png"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-soyal-14042.jpg" "$DIR/gree-soyal-gallery-2.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-soyal-14039.jpg" "$DIR/gree-soyal-gallery-3.jpg"

# ---- Haier Flexis Plus White Matt gallery (10 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-haier-flexis-plus-white-matt-utrzymanie-temperatury-10-stopni-c.webp" "$DIR/haier-flexis-plus-white-matt-gallery-0.webp"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-haier-flexis-plus-white-matt-automatyczne-sterowanie-nadmuchem-3d.webp" "$DIR/haier-flexis-plus-white-matt-gallery-1.webp"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9285.jpg" "$DIR/haier-flexis-plus-white-matt-gallery-2.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9288.jpg" "$DIR/haier-flexis-plus-white-matt-gallery-3.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9291.jpg" "$DIR/haier-flexis-plus-white-matt-gallery-4.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9293.jpg" "$DIR/haier-flexis-plus-white-matt-gallery-5.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9290.jpg" "$DIR/haier-flexis-plus-white-matt-gallery-6.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9287.jpg" "$DIR/haier-flexis-plus-white-matt-gallery-7.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9289.jpg" "$DIR/haier-flexis-plus-white-matt-gallery-8.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9305.jpg" "$DIR/haier-flexis-plus-white-matt-gallery-9.jpg"

# ---- Haier Jade Plus gallery (13 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15905.jpg" "$DIR/haier-jade-plus-gallery-0.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15906.jpg" "$DIR/haier-jade-plus-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15907.jpg" "$DIR/haier-jade-plus-gallery-2.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15908.jpg" "$DIR/haier-jade-plus-gallery-3.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15910.jpg" "$DIR/haier-jade-plus-gallery-4.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15911.jpg" "$DIR/haier-jade-plus-gallery-5.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15912.jpg" "$DIR/haier-jade-plus-gallery-6.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15913.jpg" "$DIR/haier-jade-plus-gallery-7.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15914.jpg" "$DIR/haier-jade-plus-gallery-8.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15915.jpg" "$DIR/haier-jade-plus-gallery-9.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15916.jpg" "$DIR/haier-jade-plus-gallery-10.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15917.jpg" "$DIR/haier-jade-plus-gallery-11.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15918.jpg" "$DIR/haier-jade-plus-gallery-12.jpg"

# ---- Haier Expert Plus gallery (6 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-expert-plus-16379-1.jpg" "$DIR/haier-expert-plus-gallery-0.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-expert-plus-16380-1.jpg" "$DIR/haier-expert-plus-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-expert-plus-16381-1.jpg" "$DIR/haier-expert-plus-gallery-2.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-expert-plus-16382-1.jpg" "$DIR/haier-expert-plus-gallery-3.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-expert-plus-16383-1.jpg" "$DIR/haier-expert-plus-gallery-4.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-expert-plus-haier-expert-plus-utrzmanie-temperatury-plus-10-1.webp" "$DIR/haier-expert-plus-gallery-5.webp"

# ---- Haier Arctic Expert Plus gallery (6 images, same as expert plus) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-expert-plus-16379-1.jpg" "$DIR/haier-arctic-expert-plus-gallery-0.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-expert-plus-16380-1.jpg" "$DIR/haier-arctic-expert-plus-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-expert-plus-16381-1.jpg" "$DIR/haier-arctic-expert-plus-gallery-2.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-expert-plus-16382-1.jpg" "$DIR/haier-arctic-expert-plus-gallery-3.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-expert-plus-16383-1.jpg" "$DIR/haier-arctic-expert-plus-gallery-4.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-expert-plus-haier-expert-plus-utrzmanie-temperatury-plus-10-1.webp" "$DIR/haier-arctic-expert-plus-gallery-5.webp"

# ---- Haier Revive Plus gallery (5 images) ----
download "https://pbac.pl/wp-content/uploads/2024/05/1-2.png" "$DIR/haier-revive-plus-gallery-0.png"
download "https://pbac.pl/wp-content/uploads/2024/05/2-2.png" "$DIR/haier-revive-plus-gallery-1.png"
download "https://pbac.pl/wp-content/uploads/2024/05/4.png" "$DIR/haier-revive-plus-gallery-2.png"
download "https://pbac.pl/wp-content/uploads/2024/05/5.png" "$DIR/haier-revive-plus-gallery-3.png"
download "https://pbac.pl/wp-content/uploads/2024/05/7.png" "$DIR/haier-revive-plus-gallery-4.png"

# ---- Haier Flexis Plus White Matt 2 gallery (10 images, same as first flexis) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-haier-flexis-plus-white-matt-utrzymanie-temperatury-10-stopni-c.webp" "$DIR/haier-flexis-plus-white-matt-2-gallery-0.webp"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-haier-flexis-plus-white-matt-automatyczne-sterowanie-nadmuchem-3d.webp" "$DIR/haier-flexis-plus-white-matt-2-gallery-1.webp"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9285.jpg" "$DIR/haier-flexis-plus-white-matt-2-gallery-2.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9288.jpg" "$DIR/haier-flexis-plus-white-matt-2-gallery-3.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9291.jpg" "$DIR/haier-flexis-plus-white-matt-2-gallery-4.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9293.jpg" "$DIR/haier-flexis-plus-white-matt-2-gallery-5.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9290.jpg" "$DIR/haier-flexis-plus-white-matt-2-gallery-6.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9287.jpg" "$DIR/haier-flexis-plus-white-matt-2-gallery-7.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9289.jpg" "$DIR/haier-flexis-plus-white-matt-2-gallery-8.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9305.jpg" "$DIR/haier-flexis-plus-white-matt-2-gallery-9.jpg"

# ---- LG Standard 2 gallery (3 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-standard-plus-15951.jpg" "$DIR/lg-standard-2-gallery-0.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-standard-plus-15945.jpg" "$DIR/lg-standard-2-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-standard-plus-15946.jpg" "$DIR/lg-standard-2-gallery-2.jpg"

# ---- LG Standard Plus gallery (3 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-standard-plus-15945.jpg" "$DIR/lg-standard-plus-gallery-0.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-standard-plus-15946.jpg" "$DIR/lg-standard-plus-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-standard-plus-15947.jpg" "$DIR/lg-standard-plus-gallery-2.jpg"

# ---- LG Deluxe gallery (3 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-deluxe-16062.jpg" "$DIR/lg-deluxe-gallery-0.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-deluxe-16055.jpg" "$DIR/lg-deluxe-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-deluxe-16049.jpg" "$DIR/lg-deluxe-gallery-2.jpg"

# ---- LG DualCool gallery (3 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-dualcool-8204.jpg" "$DIR/lg-dualcool-gallery-0.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-dualcool-8205.jpg" "$DIR/lg-dualcool-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-dualcool-8206.jpg" "$DIR/lg-dualcool-gallery-2.jpg"

# ---- LG Artcool Mirror gallery (3 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-beige-kopia-16100.jpg" "$DIR/lg-artcool-mirror-gallery-0.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-beige-kopia-16091.jpg" "$DIR/lg-artcool-mirror-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-beige-kopia-16093.jpg" "$DIR/lg-artcool-mirror-gallery-2.jpg"

# ---- LG Artcool Beige gallery (3 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-beige-17457.jpg" "$DIR/lg-artcool-beige-gallery-0.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-beige-17458.jpg" "$DIR/lg-artcool-beige-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-beige-17459.jpg" "$DIR/lg-artcool-beige-gallery-2.jpg"

# ---- LG Artcool Gallery gallery (3 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-gallery-8047.jpg" "$DIR/lg-artcool-gallery-gallery-0.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-gallery-8049.jpg" "$DIR/lg-artcool-gallery-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-gallery-16106.jpg" "$DIR/lg-artcool-gallery-gallery-2.jpg"

# ---- Toshiba Seiya 2 gallery (3 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-standard-2-kopia-17677.jpg" "$DIR/toshiba-seiya-2-gallery-0.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-standard-2-kopia-17674.jpg" "$DIR/toshiba-seiya-2-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-standard-2-kopia-17678.jpg" "$DIR/toshiba-seiya-2-gallery-2.jpg"

# ---- Toshiba Shorai Edge White gallery (3 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-seiya-2-kopia-17679.jpg" "$DIR/toshiba-shorai-edge-white-gallery-0.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-seiya-2-kopia-17680.jpg" "$DIR/toshiba-shorai-edge-white-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-seiya-2-kopia-17682.jpg" "$DIR/toshiba-shorai-edge-white-gallery-2.jpg"

# ---- Toshiba Shorai Edge Black gallery (3 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-shorai-edge-white-kopia-17688.jpg" "$DIR/toshiba-shorai-edge-black-gallery-0.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-shorai-edge-white-kopia-17690.jpg" "$DIR/toshiba-shorai-edge-black-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-shorai-edge-white-kopia-toshiba-shorai-edge-black-1.webp" "$DIR/toshiba-shorai-edge-black-gallery-2.webp"

# ---- Toshiba Haori gallery (3 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-shorai-edge-black-kopia-17693.jpg" "$DIR/toshiba-haori-gallery-0.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-shorai-edge-black-kopia-17707.jpg" "$DIR/toshiba-haori-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-shorai-edge-black-kopia-17694.jpg" "$DIR/toshiba-haori-gallery-2.jpg"

# ---- Toshiba Daiseikai 9 gallery (3 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-haori-kopia-17716.jpg" "$DIR/toshiba-daiseikai-9-gallery-0.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-haori-kopia-17708.jpg" "$DIR/toshiba-daiseikai-9-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-haori-kopia-17711.jpg" "$DIR/toshiba-daiseikai-9-gallery-2.jpg"

# ---- Toshiba Konsola Bi-Flow gallery (3 images) ----
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-konsola-bi-flow-ras-ufvconsole-top.webp" "$DIR/toshiba-konsola-bi-flow-gallery-0.webp"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-konsola-bi-flow-60dfce787f5b961eda8f0a18215d8869.jpg" "$DIR/toshiba-konsola-bi-flow-gallery-1.jpg"
download "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-konsola-bi-flow-varrmepumpe-gulvmodell-ute-av-syne.webp" "$DIR/toshiba-konsola-bi-flow-gallery-2.webp"

echo ""
echo "=== SUMMARY ==="
echo "Success: $SUCCESS"
echo "Failed:  $FAIL"
echo "Skipped: $SKIP"
echo "Total size:"
du -sh "$DIR"
echo ""
echo "File count: $(ls -1 "$DIR" | wc -l)"
