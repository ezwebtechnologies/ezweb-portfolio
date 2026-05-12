import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const logoPath = path.join(root, "public/logo/logo.png");

async function squarePng(size) {
  return sharp(logoPath).resize(size, size, { fit: "cover" }).png().toBuffer();
}

async function main() {
  await writeFile(path.join(root, "public/icon.png"), await squarePng(512));
  await writeFile(path.join(root, "public/icon-192.png"), await squarePng(192));
  await writeFile(path.join(root, "public/apple-touch-icon.png"), await squarePng(180));

  const buf32 = await squarePng(32);
  const buf16 = await squarePng(16);
  await writeFile(path.join(root, "public/favicon.ico"), await toIco([buf32, buf16]));

  const w = 1200;
  const h = 630;
  const logoMax = 380;
  const logoBuf = await sharp(logoPath)
    .resize(logoMax, logoMax, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const og = await sharp({
    create: {
      width: w,
      height: h,
      channels: 3,
      background: { r: 5, g: 5, b: 8 },
    },
  })
    .composite([{ input: logoBuf, gravity: "centre" }])
    .png()
    .toBuffer();

  await writeFile(path.join(root, "public/og-image.png"), og);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
