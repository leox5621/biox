document.addEventListener('DOMContentLoaded', function() {
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');

  sendButton.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  function sendMessage() {
    const message = userInput.value.trim();
    if (message !== '') {
      displayMessage(message, 'user');
      userInput.value = '';
      fetchMessageFromAPI(message)
        .then(response => displayMessage(response, 'bot'))
        .catch(error => displayError(error));
    }
  }

  function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    const bubble = document.createElement('div');
    bubble.classList.add('message-bubble');
    bubble.textContent = message;
    messageElement.appendChild(bubble);
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function displayError(error) {
    displayMessage(error.message, 'error');
  }

  async function fetchMessageFromAPI(message) {
    const uid = "61557770857518"; // Your user ID
    const name = "Ayto Islam"; // Your name
    const url = `https://gpt-four.vercel.app/gpt?prompt=${encodeURIComponent(message)}&uid=${uid}&name=${encodeURIComponent(name)}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch response from the API');
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data.response;
    } catch (error) {
      console.error('Error:', error);
      return 'An error occurred while processing your request';
    }
  }
});
