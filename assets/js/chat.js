document.getElementById('chat-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const userInput = document.getElementById('user-input').value;
  displayMessage('You', userInput);
  document.getElementById('user-input').value = '';

  try {
    const response = await fetch('https://vbejdnajxe.execute-api.us-east-2.amazonaws.com/prod/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userInput }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    displayMessage('ChatGPT', data.reply);
  } catch (error) {
    console.error('Error:', error);
    displayMessage('ChatGPT', 'Sorry, an error occurred.');
  }
});

function displayMessage(sender, text) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender.toLowerCase());
  messageDiv.textContent = `${sender}: ${text}`;
  document.getElementById('messages').appendChild(messageDiv);
}
