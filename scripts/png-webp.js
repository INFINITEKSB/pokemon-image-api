import sharp from "sharp";
import { glob } from "glob";
import fs from "fs";
import path from "path";

const INPUT_DIR = "./public/pokemon";
const OUTPUT_DIR = "./public/cdn";

async function run() {
  const files = await glob(`${INPUT_DIR}/**/*.png`);
  console.log(`Found ${files.length} PNG files`);

  for (const file of files) {
    const name = path.basename(file, ".png");
    const out = path.join(OUTPUT_DIR, `${name}.webp`);

    fs.mkdirSync(path.dirname(out), { recursive: true });

    await sharp(file)
      .webp({
        quality: 80,
        effort: 6
      })
      .toFile(out);

    console.log(`✔ ${name}.webp`);
    console.log(`✔ done ✅`);
  }

  console.log("✅ Conversion complete ..");
}

run().catch(console.error);