const tf = require('@tensorflow/tfjs-node');
const { load } = require('@tensorflow-models/universal-sentence-encoder');

let tokenizer, model;

async function loadTokenizer() {
  tokenizer = await tf.data.textLineDataset('./tokenizer.txt');
  return tokenizer;
}

async function loadModel() {
  model = await load();
  return model;
}

module.exports = {
  loadTokenizer,
  loadModel
};
