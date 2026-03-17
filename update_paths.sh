#!/bin/bash
# Update product files to use local image paths instead of remote URLs
# This script performs exact replacements in each product file.

SCRAPED="/Users/alex/projects/pbac_main/lib/products-scraped.ts"
GREE="/Users/alex/projects/pbac_main/lib/products-gree.ts"
HAIER="/Users/alex/projects/pbac_main/lib/products-haier.ts"
LG_TOSHIBA="/Users/alex/projects/pbac_main/lib/products-lg-toshiba.ts"

# =====================================================
# products-scraped.ts — main imageUrl replacements
# =====================================================

# AUX Q-Smart
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/01/aux-klimatyzator.webp"|imageUrl: "/images/products/aux-q-smart.webp"|' "$SCRAPED"

# AUX Q-Smart Premium
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-aux-q-smart-premium-aux-q-smart-premium-1652435347.png"|imageUrl: "/images/products/aux-q-smart-premium.png"|' "$SCRAPED"

# AUX Q-Smart Premium Grey
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-aux-q-smart-premium-grey-aux-q-smart-premium-grey-1652684016.png"|imageUrl: "/images/products/aux-q-smart-premium-grey.png"|' "$SCRAPED"

# AUX Halo
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-aux-halo-klimatyzator-scienny-split-aux-halo-16227.png"|imageUrl: "/images/products/aux-halo.png"|' "$SCRAPED"

# AUX Halo Deluxe
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-aux-halo-kopia-7815.png"|imageUrl: "/images/products/aux-halo-deluxe.png"|' "$SCRAPED"

# AUX Freedom Plus
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-aux-freedom-plus-aux-freedom-plus-1683269105.png"|imageUrl: "/images/products/aux-freedom-plus.png"|' "$SCRAPED"

# AUX J-Smart
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-aux-j-smart-aux-j-smart-1644852061.png"|imageUrl: "/images/products/aux-j-smart.png"|' "$SCRAPED"

# AUX J-Smart ART
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-aux-j-smart-art-klimatyzator-scienny-aux-j-smart-art-1616955229.png"|imageUrl: "/images/products/aux-j-smart-art.png"|' "$SCRAPED"

# Kaisai Fly
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-kaisai-fly-klimatyzator-kaisai-fly-1689161665.png"|imageUrl: "/images/products/kaisai-fly.png"|' "$SCRAPED"

# Kaisai Ice White
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-kaisai-ice-white-kaisai-ice-white-klimatyzator-1692707222.png"|imageUrl: "/images/products/kaisai-ice-white.png"|' "$SCRAPED"

# Kaisai Ice Black
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-kaisai-ice-black-kaisai-ice-black-1689227235.png"|imageUrl: "/images/products/kaisai-ice-black.png"|' "$SCRAPED"

# Kaisai Geo
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-kaisai-geo-kaisai-geo-1689229369.png"|imageUrl: "/images/products/kaisai-geo.png"|' "$SCRAPED"

# Daikin Stylish White
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/05/1-1.png"|imageUrl: "/images/products/daikin-stylish-white.png"|' "$SCRAPED"

# Mitsubishi Premium White
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-premium-white-16163.png"|imageUrl: "/images/products/mitsubishi-premium-white.png"|' "$SCRAPED"

# Mitsubishi Diamond Natural White
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-diamond-16174.png"|imageUrl: "/images/products/mitsubishi-diamond-natural-white.png"|' "$SCRAPED"

# Mitsubishi Diamond Onyx Black (slug: mitsubishi-diamond-pearl-white)
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-diamond-pearl-white-mitsubishi-diamond-onyx-black-1616955167.png"|imageUrl: "/images/products/mitsubishi-diamond-pearl-white.png"|' "$SCRAPED"

# Mitsubishi Diamond Pearl White 2
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-diamond-pearl-white-mitsubishi-diamond-pearl-white-1616955175.png"|imageUrl: "/images/products/mitsubishi-diamond-pearl-white-2.png"|' "$SCRAPED"

# Mitsubishi Diamond Ruby Red
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-diamond-ruby-red-mitsubishi-diamond-ruby-red-1616955158.png"|imageUrl: "/images/products/mitsubishi-diamond-ruby-red.png"|' "$SCRAPED"

# Mitsubishi Heavy Premium
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/06/msi.png"|imageUrl: "/images/products/mitsubishi-heavy-premium.png"|' "$SCRAPED"

# Mitsubishi Heavy Diamond
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/06/MS12.png"|imageUrl: "/images/products/klimatyzato-mitsubishi-heavy-diamond-srk25zsx-wf.png"|' "$SCRAPED"

# GE Future White
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/05/1.png"|imageUrl: "/images/products/klimatyzator-scienny-ge-future-white.png"|' "$SCRAPED"

# GE Prime
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/05/klimatyzator-scienny-ge-appliances-prime-25-kw.png"|imageUrl: "/images/products/klimatyzator-ge-prime.png"|' "$SCRAPED"

# Rotenso Imoto X
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/01/rotenso.webp"|imageUrl: "/images/products/rotenso-imoto-x.webp"|' "$SCRAPED"

# =====================================================
# products-scraped.ts — gallery replacements
# =====================================================

# AUX Q-Smart Premium gallery
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-aux-q-smart-premium-16414.jpg"|{ src: "/images/products/aux-q-smart-premium-gallery-0.jpg"|' "$SCRAPED"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-aux-q-smart-premium-16417.jpg"|{ src: "/images/products/aux-q-smart-premium-gallery-1.jpg"|' "$SCRAPED"

# Kaisai Fly gallery
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-kaisai-fly-kaisai-fly-2.webp"|{ src: "/images/products/kaisai-fly-gallery-0.webp"|' "$SCRAPED"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-kaisai-fly-kaisai-fly-3.webp"|{ src: "/images/products/kaisai-fly-gallery-1.webp"|' "$SCRAPED"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-kaisai-fly-17729.jpg"|{ src: "/images/products/kaisai-fly-gallery-2.jpg"|' "$SCRAPED"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-kaisai-fly-17731.jpg"|{ src: "/images/products/kaisai-fly-gallery-3.jpg"|' "$SCRAPED"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-kaisai-fly-kaisai-fly-5.webp"|{ src: "/images/products/kaisai-fly-gallery-4.webp"|' "$SCRAPED"

# Kaisai Ice Black gallery
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-kaisai-ice-black-kaisai-ice-black-7.webp"|{ src: "/images/products/kaisai-ice-black-gallery-0.webp"|' "$SCRAPED"

# Daikin Stylish White gallery
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/05/daikin.png"|{ src: "/images/products/daikin-stylish-white-gallery-0.png"|' "$SCRAPED"

# Mitsubishi Premium White gallery
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-premium-white-7467.jpg"|{ src: "/images/products/mitsubishi-premium-white-gallery-0.jpg"|' "$SCRAPED"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-premium-white-7468.jpg"|{ src: "/images/products/mitsubishi-premium-white-gallery-1.jpg"|' "$SCRAPED"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-premium-white-7469.jpg"|{ src: "/images/products/mitsubishi-premium-white-gallery-2.jpg"|' "$SCRAPED"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-premium-white-16160.jpg"|{ src: "/images/products/mitsubishi-premium-white-gallery-3.jpg"|' "$SCRAPED"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-premium-white-16161.jpg"|{ src: "/images/products/mitsubishi-premium-white-gallery-4.jpg"|' "$SCRAPED"

# Mitsubishi Diamond Pearl White 2 gallery
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-diamond-pearl-white-16189.jpg"|{ src: "/images/products/mitsubishi-diamond-pearl-white-2-gallery-0.jpg"|' "$SCRAPED"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-diamond-pearl-white-16191.jpg"|{ src: "/images/products/mitsubishi-diamond-pearl-white-2-gallery-1.jpg"|' "$SCRAPED"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-mitsubishi-diamond-16175.jpg"|{ src: "/images/products/mitsubishi-diamond-pearl-white-2-gallery-2.jpg"|' "$SCRAPED"

# Mitsubishi Heavy Diamond gallery
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/06/obraz_2024-06-21_004626686.png"|{ src: "/images/products/klimatyzato-mitsubishi-heavy-diamond-srk25zsx-wf-gallery-0.png"|' "$SCRAPED"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/06/obraz_2024-06-21_004637638.png"|{ src: "/images/products/klimatyzato-mitsubishi-heavy-diamond-srk25zsx-wf-gallery-1.png"|' "$SCRAPED"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/06/obraz_2024-06-21_004619219.png"|{ src: "/images/products/klimatyzato-mitsubishi-heavy-diamond-srk25zsx-wf-gallery-2.png"|' "$SCRAPED"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/06/obraz_2024-06-21_004611977.png"|{ src: "/images/products/klimatyzato-mitsubishi-heavy-diamond-srk25zsx-wf-gallery-3.png"|' "$SCRAPED"

# GE Future White gallery
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/05/2.png"|{ src: "/images/products/klimatyzator-scienny-ge-future-white-gallery-0.png"|' "$SCRAPED"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/05/3.png"|{ src: "/images/products/klimatyzator-scienny-ge-future-white-gallery-1.png"|' "$SCRAPED"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/05/4.jpeg"|{ src: "/images/products/klimatyzator-scienny-ge-future-white-gallery-2.jpeg"|' "$SCRAPED"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/05/5.jpeg"|{ src: "/images/products/klimatyzator-scienny-ge-future-white-gallery-3.jpeg"|' "$SCRAPED"

# GE Prime gallery
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/05/2-1.png"|{ src: "/images/products/klimatyzator-ge-prime-gallery-0.png"|' "$SCRAPED"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/05/3-1.png"|{ src: "/images/products/klimatyzator-ge-prime-gallery-1.png"|' "$SCRAPED"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/05/4-1.jpeg"|{ src: "/images/products/klimatyzator-ge-prime-gallery-2.jpeg"|' "$SCRAPED"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/05/5-1.jpeg"|{ src: "/images/products/klimatyzator-ge-prime-gallery-3.jpeg"|' "$SCRAPED"

echo "Updated products-scraped.ts"

# =====================================================
# products-gree.ts
# =====================================================

# Main imageUrl replacements
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-pular-matt-gree-pular-1645080452.png"|"/images/products/gree-pular-matt.png"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-silver-imageid.webp"|"/images/products/gree-clivia-silver.webp"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-navy-blue-imageid.webp"|"/images/products/gree-clivia-navy-blue.webp"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-white-17431.jpg"|"/images/products/gree-clivia-white.jpg"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-amber-standard-silver-gree-amber-standard-silver-14362.webp"|"/images/products/gree-amber-standard-silver.webp"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-amber-prestige-14387.png"|"/images/products/gree-amber-prestige.png"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-white-gree-fairy-white-1652171039.png"|"/images/products/gree-fairy-white.png"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-silver-gree-fairy-silver-1618932258.png"|"/images/products/gree-fairy-silver.png"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-dark-gree-fairy-dark-1618932259.png"|"/images/products/gree-fairy-dark.png"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-lomo-luxury-plus-14370.jpg"|"/images/products/gree-lomo-luxury-plus.jpg"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-soyal-gree-soyal-zestawy-1624370659.png"|"/images/products/gree-soyal.png"|g' "$GREE"

# Gree gallery replacements - unique URLs only
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-pular-matt-13211.jpg"|"/images/products/gree-pular-matt-gallery-1.jpg"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-pular-matt-13213.jpg"|"/images/products/gree-pular-matt-gallery-2.jpg"|g' "$GREE"

sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-silver-gree-clivia-silver-17446.jpg"|"/images/products/gree-clivia-silver-gallery-1.jpg"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-silver-gree-clivia-silver-7.webp"|"/images/products/gree-clivia-silver-gallery-2.webp"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-silver-gree-clivia-silver-6.webp"|"/images/products/gree-clivia-silver-gallery-3.webp"|g' "$GREE"

sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-navy-blue-gree-clivia-navy-blue-17427.jpg"|"/images/products/gree-clivia-navy-blue-gallery-1.jpg"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-navy-blue-gree-clivia-navy-blue-1.webp"|"/images/products/gree-clivia-navy-blue-gallery-2.webp"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-navy-blue-gree-clivia-navy-blue-2.webp"|"/images/products/gree-clivia-navy-blue-gallery-3.webp"|g' "$GREE"

sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-white-gree-clivia-white-klimatyzator-1706282655.png"|"/images/products/gree-clivia-white-gallery-1.png"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-white-gree-clivia-white-7.webp"|"/images/products/gree-clivia-white-gallery-2.webp"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-clivia-white-gree-clivia-white-2.webp"|"/images/products/gree-clivia-white-gallery-3.webp"|g' "$GREE"

sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-amber-standard-silver-gree-amber-standard-silver-1616955399.webp"|"/images/products/gree-amber-standard-silver-gallery-1.webp"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-amber-standard-silver-gree-amber-standard-silver-14360.webp"|"/images/products/gree-amber-standard-silver-gallery-2.webp"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-amber-standard-silver-gree-amber-standard-silver-grzalki-do-pracy-zimowej.webp"|"/images/products/gree-amber-standard-silver-gallery-3.webp"|g' "$GREE"

sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-amber-prestige-gree-amber-prestige-front-1616955069.png"|"/images/products/gree-amber-prestige-gallery-1.png"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-amber-prestige-14388.jpg"|"/images/products/gree-amber-prestige-gallery-2.jpg"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-amber-prestige-14385.jpg"|"/images/products/gree-amber-prestige-gallery-3.jpg"|g' "$GREE"

sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-white-16400.jpg"|"/images/products/gree-fairy-white-gallery-1.jpg"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-white-16399.jpg"|"/images/products/gree-fairy-white-gallery-2.jpg"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-white-gree-fairy-white-jonizator-powietrza.webp"|"/images/products/gree-fairy-white-gallery-3.webp"|g' "$GREE"

sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-silver-13168.jpg"|"/images/products/gree-fairy-silver-gallery-1.jpg"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-silver-13180.jpg"|"/images/products/gree-fairy-silver-gallery-2.jpg"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-silver-13177.jpg"|"/images/products/gree-fairy-silver-gallery-3.jpg"|g' "$GREE"

sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-dark-13183.jpg"|"/images/products/gree-fairy-dark-gallery-1.jpg"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-dark-gree-fairy-dark-grzalka-tacy-skroplin.webp"|"/images/products/gree-fairy-dark-gallery-3.webp"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-fairy-dark-13194.jpg"|"/images/products/gree-fairy-dark-gallery-4.jpg"|g' "$GREE"

sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-lomo-luxury-plus-14374.jpg"|"/images/products/gree-lomo-luxury-plus-gallery-1.jpg"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-lomo-luxury-plus-gree-lomo-luxury-plus-front-1616955098.png"|"/images/products/gree-lomo-luxury-plus-gallery-2.png"|g' "$GREE"

sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-soyal-14043.png"|"/images/products/gree-soyal-gallery-1.png"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-soyal-14042.jpg"|"/images/products/gree-soyal-gallery-2.jpg"|g' "$GREE"
sed -i '' 's|"https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-gree-soyal-14039.jpg"|"/images/products/gree-soyal-gallery-3.jpg"|g' "$GREE"

echo "Updated products-gree.ts"

# =====================================================
# products-haier.ts
# =====================================================

# Main imageUrl
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-haier-flexis-plus-white-matt-1645080657.jpg"|imageUrl: "/images/products/haier-flexis-plus-white-matt.jpg"|g' "$HAIER"
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-haier-jade-plus-1646383711.png"|imageUrl: "/images/products/haier-jade-plus.png"|' "$HAIER"
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-expert-plus-haier-expert-plus-1651176174-1.png"|imageUrl: "/images/products/haier-expert-plus.png"|g' "$HAIER"
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/05/profile.png"|imageUrl: "/images/products/haier-revive-plus.png"|' "$HAIER"

# Haier gallery replacements
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-haier-flexis-plus-white-matt-utrzymanie-temperatury-10-stopni-c.webp"|{ src: "/images/products/haier-flexis-plus-white-matt-gallery-0.webp"|g' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-haier-flexis-plus-white-matt-automatyczne-sterowanie-nadmuchem-3d.webp"|{ src: "/images/products/haier-flexis-plus-white-matt-gallery-1.webp"|g' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9285.jpg"|{ src: "/images/products/haier-flexis-plus-white-matt-gallery-2.jpg"|g' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9288.jpg"|{ src: "/images/products/haier-flexis-plus-white-matt-gallery-3.jpg"|g' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9291.jpg"|{ src: "/images/products/haier-flexis-plus-white-matt-gallery-4.jpg"|g' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9293.jpg"|{ src: "/images/products/haier-flexis-plus-white-matt-gallery-5.jpg"|g' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9290.jpg"|{ src: "/images/products/haier-flexis-plus-white-matt-gallery-6.jpg"|g' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9287.jpg"|{ src: "/images/products/haier-flexis-plus-white-matt-gallery-7.jpg"|g' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9289.jpg"|{ src: "/images/products/haier-flexis-plus-white-matt-gallery-8.jpg"|g' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-flexis-plus-white-matt-9305.jpg"|{ src: "/images/products/haier-flexis-plus-white-matt-gallery-9.jpg"|g' "$HAIER"

# Haier Jade Plus gallery
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15905.jpg"|{ src: "/images/products/haier-jade-plus-gallery-0.jpg"|' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15906.jpg"|{ src: "/images/products/haier-jade-plus-gallery-1.jpg"|' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15907.jpg"|{ src: "/images/products/haier-jade-plus-gallery-2.jpg"|' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15908.jpg"|{ src: "/images/products/haier-jade-plus-gallery-3.jpg"|' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15910.jpg"|{ src: "/images/products/haier-jade-plus-gallery-4.jpg"|' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15911.jpg"|{ src: "/images/products/haier-jade-plus-gallery-5.jpg"|' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15912.jpg"|{ src: "/images/products/haier-jade-plus-gallery-6.jpg"|' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15913.jpg"|{ src: "/images/products/haier-jade-plus-gallery-7.jpg"|' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15914.jpg"|{ src: "/images/products/haier-jade-plus-gallery-8.jpg"|' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15915.jpg"|{ src: "/images/products/haier-jade-plus-gallery-9.jpg"|' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15916.jpg"|{ src: "/images/products/haier-jade-plus-gallery-10.jpg"|' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15917.jpg"|{ src: "/images/products/haier-jade-plus-gallery-11.jpg"|' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-jade-plus-15918.jpg"|{ src: "/images/products/haier-jade-plus-gallery-12.jpg"|' "$HAIER"

# Haier Expert Plus gallery (used by both expert-plus and arctic-expert-plus)
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-expert-plus-16379-1.jpg"|{ src: "/images/products/haier-expert-plus-gallery-0.jpg"|g' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-expert-plus-16380-1.jpg"|{ src: "/images/products/haier-expert-plus-gallery-1.jpg"|g' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-expert-plus-16381-1.jpg"|{ src: "/images/products/haier-expert-plus-gallery-2.jpg"|g' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-expert-plus-16382-1.jpg"|{ src: "/images/products/haier-expert-plus-gallery-3.jpg"|g' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-expert-plus-16383-1.jpg"|{ src: "/images/products/haier-expert-plus-gallery-4.jpg"|g' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-haier-expert-plus-haier-expert-plus-utrzmanie-temperatury-plus-10-1.webp"|{ src: "/images/products/haier-expert-plus-gallery-5.webp"|g' "$HAIER"

# Haier Revive Plus gallery
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/05/1-2.png"|{ src: "/images/products/haier-revive-plus-gallery-0.png"|' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/05/2-2.png"|{ src: "/images/products/haier-revive-plus-gallery-1.png"|' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/05/4.png"|{ src: "/images/products/haier-revive-plus-gallery-2.png"|' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/05/5.png"|{ src: "/images/products/haier-revive-plus-gallery-3.png"|' "$HAIER"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/05/7.png"|{ src: "/images/products/haier-revive-plus-gallery-4.png"|' "$HAIER"

echo "Updated products-haier.ts"

# =====================================================
# products-lg-toshiba.ts
# =====================================================

# Main imageUrl
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-standard-plus-lg-standard-plus-1646913754.png"|imageUrl: "/images/products/lg-standard-2.png"|' "$LG_TOSHIBA"

# Fix: lg-standard-plus also used same image — need second occurrence
# Since both have the exact same imageUrl string, we need a different approach
# Let's use line-specific replacements

sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-deluxe-lg-deluxe-1645079386.png"|imageUrl: "/images/products/lg-deluxe.png"|' "$LG_TOSHIBA"
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-dualcool-klimatyzator-scienny-lg-dualcool-1616955292.png"|imageUrl: "/images/products/lg-dualcool.png"|' "$LG_TOSHIBA"
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-beige-kopia-klimatyzator-lg-artcool-mirror-1616955286.png"|imageUrl: "/images/products/lg-artcool-mirror.png"|' "$LG_TOSHIBA"
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-beige-lg-artcool-beige-1683721922.png"|imageUrl: "/images/products/lg-artcool-beige.png"|' "$LG_TOSHIBA"
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-gallery-klimatyzator-scienny-lg-artcool-gallery-1616955270.png"|imageUrl: "/images/products/lg-artcool-gallery.png"|' "$LG_TOSHIBA"
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-standard-2-kopia-toshiba-seiya-klimatyzator-1692950465.png"|imageUrl: "/images/products/toshiba-seiya-2.png"|' "$LG_TOSHIBA"
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-shorai-edge-white-kopia-toshiba-shorai-edge-black-klimatyzator-1691744930.png"|imageUrl: "/images/products/toshiba-shorai-edge-black.png"|' "$LG_TOSHIBA"
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-shorai-edge-black-kopia-toshiba-haori-klimatyzator-1692948156.png"|imageUrl: "/images/products/toshiba-haori.png"|' "$LG_TOSHIBA"
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-haori-kopia-toshiba-daiseikai-9-1689074880.png"|imageUrl: "/images/products/toshiba-daiseikai-9.png"|' "$LG_TOSHIBA"
sed -i '' 's|imageUrl: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-konsola-bi-flow-big-konsola-toshiba.jpg"|imageUrl: "/images/products/toshiba-konsola-bi-flow.jpg"|' "$LG_TOSHIBA"

# LG gallery
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-standard-plus-15951.jpg"|{ src: "/images/products/lg-standard-2-gallery-0.jpg"|' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-standard-plus-15945.jpg"|{ src: "/images/products/lg-standard-plus-gallery-0.jpg"|g' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-standard-plus-15946.jpg"|{ src: "/images/products/lg-standard-plus-gallery-1.jpg"|g' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-standard-plus-15947.jpg"|{ src: "/images/products/lg-standard-plus-gallery-2.jpg"|' "$LG_TOSHIBA"

sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-deluxe-16062.jpg"|{ src: "/images/products/lg-deluxe-gallery-0.jpg"|' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-deluxe-16055.jpg"|{ src: "/images/products/lg-deluxe-gallery-1.jpg"|' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-deluxe-16049.jpg"|{ src: "/images/products/lg-deluxe-gallery-2.jpg"|' "$LG_TOSHIBA"

sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-dualcool-8204.jpg"|{ src: "/images/products/lg-dualcool-gallery-0.jpg"|' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-dualcool-8205.jpg"|{ src: "/images/products/lg-dualcool-gallery-1.jpg"|' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-dualcool-8206.jpg"|{ src: "/images/products/lg-dualcool-gallery-2.jpg"|' "$LG_TOSHIBA"

sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-beige-kopia-16100.jpg"|{ src: "/images/products/lg-artcool-mirror-gallery-0.jpg"|' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-beige-kopia-16091.jpg"|{ src: "/images/products/lg-artcool-mirror-gallery-1.jpg"|' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-beige-kopia-16093.jpg"|{ src: "/images/products/lg-artcool-mirror-gallery-2.jpg"|' "$LG_TOSHIBA"

sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-beige-17457.jpg"|{ src: "/images/products/lg-artcool-beige-gallery-0.jpg"|' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-beige-17458.jpg"|{ src: "/images/products/lg-artcool-beige-gallery-1.jpg"|' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-beige-17459.jpg"|{ src: "/images/products/lg-artcool-beige-gallery-2.jpg"|' "$LG_TOSHIBA"

sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-gallery-8047.jpg"|{ src: "/images/products/lg-artcool-gallery-gallery-0.jpg"|' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-gallery-8049.jpg"|{ src: "/images/products/lg-artcool-gallery-gallery-1.jpg"|' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachce.renj1b3t64-yjr3ovgyr61m.p.temp-site.link-lg-artcool-gallery-16106.jpg"|{ src: "/images/products/lg-artcool-gallery-gallery-2.jpg"|' "$LG_TOSHIBA"

# Toshiba gallery
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-standard-2-kopia-17677.jpg"|{ src: "/images/products/toshiba-seiya-2-gallery-0.jpg"|' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-standard-2-kopia-17674.jpg"|{ src: "/images/products/toshiba-seiya-2-gallery-1.jpg"|' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-lg-standard-2-kopia-17678.jpg"|{ src: "/images/products/toshiba-seiya-2-gallery-2.jpg"|' "$LG_TOSHIBA"

sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-seiya-2-kopia-17679.jpg"|{ src: "/images/products/toshiba-shorai-edge-white-gallery-0.jpg"|' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-seiya-2-kopia-17680.jpg"|{ src: "/images/products/toshiba-shorai-edge-white-gallery-1.jpg"|' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-seiya-2-kopia-17682.jpg"|{ src: "/images/products/toshiba-shorai-edge-white-gallery-2.jpg"|' "$LG_TOSHIBA"

sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-shorai-edge-white-kopia-17688.jpg"|{ src: "/images/products/toshiba-shorai-edge-black-gallery-0.jpg"|' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-shorai-edge-white-kopia-17690.jpg"|{ src: "/images/products/toshiba-shorai-edge-black-gallery-1.jpg"|' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-shorai-edge-white-kopia-toshiba-shorai-edge-black-1.webp"|{ src: "/images/products/toshiba-shorai-edge-black-gallery-2.webp"|' "$LG_TOSHIBA"

sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-shorai-edge-black-kopia-17693.jpg"|{ src: "/images/products/toshiba-haori-gallery-0.jpg"|' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-shorai-edge-black-kopia-17707.jpg"|{ src: "/images/products/toshiba-haori-gallery-1.jpg"|' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-shorai-edge-black-kopia-17694.jpg"|{ src: "/images/products/toshiba-haori-gallery-2.jpg"|' "$LG_TOSHIBA"

sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-haori-kopia-17716.jpg"|{ src: "/images/products/toshiba-daiseikai-9-gallery-0.jpg"|' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-haori-kopia-17708.jpg"|{ src: "/images/products/toshiba-daiseikai-9-gallery-1.jpg"|' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-haori-kopia-17711.jpg"|{ src: "/images/products/toshiba-daiseikai-9-gallery-2.jpg"|' "$LG_TOSHIBA"

sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-konsola-bi-flow-ras-ufvconsole-top.webp"|{ src: "/images/products/toshiba-konsola-bi-flow-gallery-0.webp"|' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-konsola-bi-flow-60dfce787f5b961eda8f0a18215d8869.jpg"|{ src: "/images/products/toshiba-konsola-bi-flow-gallery-1.jpg"|' "$LG_TOSHIBA"
sed -i '' 's|{ src: "https://pbac.pl/wp-content/uploads/2024/03/jachceklime.pl-toshiba-konsola-bi-flow-varrmepumpe-gulvmodell-ute-av-syne.webp"|{ src: "/images/products/toshiba-konsola-bi-flow-gallery-2.webp"|' "$LG_TOSHIBA"

echo "Updated products-lg-toshiba.ts"

echo ""
echo "=== All product files updated ==="
