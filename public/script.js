const form = document.querySelector('form');
const result = document.querySelector('#result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const textInput = document.querySelector('#text-input').value;

  const response = await fetch('/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: textInput })
  });

  const data = await response.json();
  const sentiment = data.sentiment;
  const confidence = data.confidence.toFixed(4);

  result.innerHTML = `Sentiment: ${sentiment}, Confidence: ${confidence}`;
});
