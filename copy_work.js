import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const destDir = path.join(__dirname, 'public', 'images');

// Copy from ส្នាដៃ១
const srcDir1 = path.join(__dirname, 'public', 'ស្នាដៃ១');
for (let i = 271; i <= 279; i++) {
  const fileName = `Screenshot (${i}).png`;
  const srcFile = path.join(srcDir1, fileName);
  const destFile = path.join(destDir, `screenshot_${i}.png`);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
  }
}

// Copy from ส្នាដៃ២
const srcDir2 = path.join(__dirname, 'public', 'ស្នាដៃ២');
for (let i = 281; i <= 286; i++) {
  const fileName = `Screenshot (${i}).png`;
  const srcFile = path.join(srcDir2, fileName);
  const destFile = path.join(destDir, `screenshot_${i}.png`);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
  }
}

// Copy from ส្នាដៃ៣
const srcDir3 = path.join(__dirname, 'public', 'ស្នាដៃ៣');
for (let i = 287; i <= 290; i++) {
  const fileName = `Screenshot (${i}).png`;
  const srcFile = path.join(srcDir3, fileName);
  const destFile = path.join(destDir, `screenshot_${i}.png`);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
  }
}

// Copy from ส្នាដៃ4
const srcDir4 = path.join(__dirname, 'public', 'ស្នាដៃ4');
for (let i = 288; i <= 295; i++) {
  const fileName = `Screenshot (${i}).png`;
  const srcFile = path.join(srcDir4, fileName);
  const destFile = path.join(destDir, `screenshot_${i}.png`);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
  }
}

// Copy from ส្នាដៃ5
const srcDir5 = path.join(__dirname, 'public', 'ស្នាដៃ5');
for (let i = 289; i <= 295; i++) {
  const fileName = `Screenshot (${i}).png`;
  const srcFile = path.join(srcDir5, fileName);
  const destFile = path.join(destDir, `screenshot_${i}.png`);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
  }
}

// Copy from ส្នាដៃ៦
const srcDir6 = path.join(__dirname, 'public', 'ស្នាដៃ៦');
for (let i = 291; i <= 299; i++) {
  const fileName = `Screenshot (${i}).png`;
  const srcFile = path.join(srcDir6, fileName);
  const destFile = path.join(destDir, `screenshot_${i}.png`);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
  }
}

// Copy from ส្នាដៃ7
const srcDir7 = path.join(__dirname, 'public', 'ស្នាដៃ7');
for (let i = 294; i <= 299; i++) {
  const fileName = `Screenshot (${i}).png`;
  const srcFile = path.join(srcDir7, fileName);
  const destFile = path.join(destDir, `screenshot_${i}.png`);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
    console.log(`Copied ${fileName} -> screenshot_${i}.png`);
  }
}
