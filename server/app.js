const express = require('express');
const tf = require('@tensorflow/tfjs-node');
const { loadTokenizer, loadModel } = require('./model');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/analyze', async (req, res) => {
  const text = req.body.text;

  const tokenizer = await loadTokenizer();
  const model = await loadModel();
  const sequence = tokenizer.textsToSequences([text]);
  const input = tf.sequential().add(tf.layers.embedding({
    inputDim: tokenizer.word_index,
    outputDim: 32,
    inputLength: 50
  })).add(tf.layers.flatten());

  const prediction = model.predict(input.predict(tf.tensor2d(sequence, [1, 50])));
  const score = prediction.dataSync()[0];

  let sentiment;
  if (score > 0.5) {
    sentiment = 'Positive';
  } else if (score < 0.5) {
    sentiment = 'Negative';
  } else {
    sentiment = 'Neutral';
  }

  const confidence = (score * 100).toFixed(2);

  res.json({
    sentiment,
    confidence
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
