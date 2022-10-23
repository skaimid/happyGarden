const Jimp = require("jimp");
const {
  promises: { readFile, writeFile },
} = require("fs");

const { bufTest } = require("./NSFWService");
const { isNsfw } = require("../utils/nsfw");


const splitFile = async (path) => {
  const bitMap = await readFile(path);
  const img = await Jimp.read(bitMap);
  const h = img.getHeight(),
    w = img.getWidth();
  const ia = img.clone().crop(0, 0, w, h / 2);
  const ib = img.clone().crop(0, h / 2, w, h / 2);
  const bfA = await ia.getBufferAsync(Jimp.MIME_JPEG);
  const bfB = await ib.getBufferAsync(Jimp.MIME_JPEG);

  if (isNsfw(await bufTest(bfA))) {
    ia.blur(4);
  }

  if (isNsfw(await bufTest(bfB))) {
    ib.blur(4);
  }

  await writeFile(`${path}_a.jpg`, await ia.getBufferAsync(Jimp.MIME_JPEG));

  await writeFile(`${path}_b.jpg`, await ib.getBufferAsync(Jimp.MIME_JPEG));

  return [`${path}_a.jpg`, `${path}_b.jpg`,]
};

module.exports.splitFile = splitFile;