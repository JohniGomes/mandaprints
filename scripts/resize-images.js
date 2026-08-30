const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dirs = ["indonesia", "islandia", "nyc"].map((d) =>
  path.join(__dirname, "..", "public", "images", d)
);

async function run() {
  for (const dir of dirs) {
    const files = fs.readdirSync(dir).filter((f) => /\.(jpg|jpeg|png)$/i.test(f));
    for (const file of files) {
      const filePath = path.join(dir, file);
      const buffer = fs.readFileSync(filePath);
      const resized = await sharp(buffer)
        .resize({ width: 1600, withoutEnlargement: true })
        .jpeg({ quality: 78 })
        .toBuffer();
      fs.writeFileSync(filePath, resized);
      console.log(`${dir}/${file}: ${(buffer.length / 1024 / 1024).toFixed(1)}MB -> ${(resized.length / 1024 / 1024).toFixed(1)}MB`);
    }
  }
}

run();
