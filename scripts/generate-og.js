const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const svg = `<svg width="1200" height="627" viewBox="0 0 1200 627" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&amp;family=JetBrains+Mono:wght@500&amp;display=swap');
    </style>
  </defs>

  <!-- Background -->
  <rect width="1200" height="627" fill="#F5F1EA"/>

  <!-- Subtle grain texture via noise pattern -->
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
    <feBlend in="SourceGraphic" mode="multiply" result="blend"/>
    <feComposite in="blend" in2="SourceGraphic" operator="in"/>
  </filter>
  <rect width="1200" height="627" fill="#F5F1EA" filter="url(#grain)" opacity="0.04"/>

  <!-- Decorative thin horizontal rule -->
  <line x1="80" y1="480" x2="560" y2="480" stroke="#1A1815" stroke-width="1" opacity="0.2"/>

  <!-- Corner marks -->
  <line x1="80" y1="80" x2="110" y2="80" stroke="#1A1815" stroke-width="1.5" opacity="0.3"/>
  <line x1="80" y1="80" x2="80" y2="110" stroke="#1A1815" stroke-width="1.5" opacity="0.3"/>
  <line x1="1120" y1="80" x2="1090" y2="80" stroke="#1A1815" stroke-width="1.5" opacity="0.3"/>
  <line x1="1120" y1="80" x2="1120" y2="110" stroke="#1A1815" stroke-width="1.5" opacity="0.3"/>
  <line x1="80" y1="547" x2="110" y2="547" stroke="#1A1815" stroke-width="1.5" opacity="0.3"/>
  <line x1="80" y1="547" x2="80" y2="517" stroke="#1A1815" stroke-width="1.5" opacity="0.3"/>
  <line x1="1120" y1="547" x2="1090" y2="547" stroke="#1A1815" stroke-width="1.5" opacity="0.3"/>
  <line x1="1120" y1="547" x2="1120" y2="517" stroke="#1A1815" stroke-width="1.5" opacity="0.3"/>

  <!-- SHREYAM -->
  <text x="80" y="280" font-family="Georgia, 'Times New Roman', serif" font-weight="700"
    font-size="148" fill="#1A1815" letter-spacing="-4">SHREYAM</text>

  <!-- BORAH -->
  <text x="80" y="420" font-family="Georgia, 'Times New Roman', serif" font-weight="700"
    font-size="148" fill="#1A1815" letter-spacing="-4">BORAH</text>

  <!-- Product Manager pill -->
  <rect x="80" y="497" width="310" height="36" rx="3" fill="#1A1815"/>
  <text x="245" y="521" font-family="'Courier New', monospace" font-size="14" font-weight="600"
    fill="#F5F1EA" letter-spacing="3" text-anchor="middle" text-transform="uppercase">PRODUCT MANAGER · NYC</text>

  <!-- Domain -->
  <text x="80" y="576" font-family="'Courier New', monospace" font-size="15"
    fill="#1A1815" opacity="0.45" letter-spacing="1">shreyamborah.com</text>
</svg>`;

const outputPath = path.join(__dirname, "../public/og-image.png");

sharp(Buffer.from(svg))
  .png()
  .toFile(outputPath)
  .then(() => console.log("✓ OG image generated at public/og-image.png"))
  .catch((err) => console.error("Error:", err));
