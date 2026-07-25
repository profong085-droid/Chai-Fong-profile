const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'Join for faceless income secrets! 🔥.webp');
const destPublic = path.join(__dirname, '..', 'public', 'Join for faceless income secrets! 🔥.webp');
const destPublicImg = path.join(__dirname, '..', 'public', 'images', 'hero.webp');
const destImagesHero = path.join(__dirname, '..', 'images', 'hero.webp');

if (fs.existsSync(src)) {
  fs.copyFileSync(src, destPublic);
  fs.copyFileSync(src, destPublicImg);
  fs.copyFileSync(src, destImagesHero);
  console.log('Successfully copied images to public/ and public/images/!');
} else {
  console.log('Source file not found:', src);
}
