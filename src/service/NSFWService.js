const axios = require("axios"); //you can use any http client
const tf = require("@tensorflow/tfjs-node");
const nsfw = require("nsfwjs");
const {promises: {readFile}} = require('fs');

let msfwModel = undefined;

const picTest = async (url) => {
  if (!msfwModel) {
    msfwModel = await nsfw.load("file://D:/code/happyGarden/model/", {
      size: 299,
    }); // To load a local model, nsfw.load('file://./path/to/model/')
  }
  let pic = undefined;
  if(!url.startsWith('http')) // localfile
  {
    pic = {}
    pic.data = await readFile(url);
  } else {
    pic = await axios.get(`${url}`, {
      responseType: "arraybuffer",
    });
    console.log(JSON.stringify(pic))
  }
  // Image must be in tf.tensor3d format
  // you can convert image to tf.tensor3d with tf.node.decodeImage(Uint8Array,channels)
  const image = await tf.node.decodeImage(pic.data, 3);
  const predictions = await msfwModel.classify(image);
  image.dispose(); // Tensor memory must be managed explicitly (it is not sufficient to let a tf.Tensor go out of scope for its memory to be released).
  console.log(predictions);
  return predictions;
};

const bufTest = async (buf) => {
  if (!msfwModel) {
    msfwModel = await nsfw.load("file://D:/code/happyGarden/model/", {
      size: 299,
    }); // To load a local model, nsfw.load('file://./path/to/model/')
  }
  // Image must be in tf.tensor3d format
  // you can convert image to tf.tensor3d with tf.node.decodeImage(Uint8Array,channels)
  const image = await tf.node.decodeImage(buf, 3);
  const predictions = await msfwModel.classify(image);
  image.dispose(); // Tensor memory must be managed explicitly (it is not sufficient to let a tf.Tensor go out of scope for its memory to be released).
  console.log(predictions);
  return predictions;
};


module.exports.picTest = picTest;
module.exports.bufTest = bufTest;
