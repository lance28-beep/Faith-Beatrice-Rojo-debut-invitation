import fs from "fs";
import path from "path";
import sharp from "sharp";

const VALID_INPUT_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".JPG",
  ".JPEG",
  ".PNG",
]);

async function convertImageToWebp(
  inputPath: string,
  quality: number = 80,
): Promise<void> {
  const ext = path.extname(inputPath);
  const baseName = path.basename(inputPath, ext);
  const outputPath = path.join(path.dirname(inputPath), `${baseName}.webp`);

  if (fs.existsSync(outputPath)) {
    return; // skip if already converted
  }

  const image = sharp(inputPath, { failOn: "none" });
  await image.webp({ quality }).toFile(outputPath);
}

async function convertDirectory(dir: string): Promise<void> {
  const absDir = path.resolve(process.cwd(), dir);

  if (!fs.existsSync(absDir)) {
    console.error(`Directory not found: ${absDir}`);
    return;
  }

  const entries = fs.readdirSync(absDir);

  const targets = entries
    .filter((name) => VALID_INPUT_EXTENSIONS.has(path.extname(name)))
    .map((name) => path.join(absDir, name));

  if (targets.length === 0) {
    console.log(`No JPG/PNG images found to convert in ${absDir}.`);
    return;
  }

  console.log(`Converting ${targets.length} images in ${absDir} to WebP...`);

  let converted = 0;
  for (const file of targets) {
    try {
      await convertImageToWebp(file, 82);
      converted += 1;
    } catch (err) {
      console.error(`Failed to convert ${file}:`, err);
    }
  }

  console.log(`Done. Converted ${converted}/${targets.length} images in ${absDir}.`);
}

async function main(): Promise<void> {
  // Convert both desktop and mobile background images.
  await convertDirectory("public/desktop-background");
  await convertDirectory("public/mobile-background");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

