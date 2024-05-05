// Function to send a message to the chat API
async function sendMessage(message) {
  const uid = "61557770857518"; // Your user ID
  const name = "Ayto Islam"; // Your name
  const url = `https://gpt-four.vercel.app/gpt?prompt=${encodeURIComponent(message)}&uid=${uid}&name=${encodeURIComponent(name)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch response from the API');
    }
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error:', error);
    return 'An error occurred while processing your request';
  }
}

// Function to display the response in the chat interface
function displayResponse(response) {
  const chatContainer = document.getElementById('chat-container');
  const responseElement = document.createElement('div');
  responseElement.classList.add('message');
  responseElement.textContent = response;
  chatContainer.appendChild(responseElement);
}

// Function to handle user input and send message to API
function handleUserInput() {
  const userInput = document.getElementById('user-input');
  const message = userInput.value.trim();
  if (message !== '') {
    // Display user's message
    displayResponse(message);
    // Clear input field
    userInput.value = '';
    // Send message to API and display response
    sendMessage(message)
      .then(response => displayResponse(response))
      .catch(error => console.error('Error:', error));
  }
}

// Event listener for user input
document.getElementById('send-button').addEventListener('click', handleUserInput);
document.getElementById('user-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    handleUserInput();
  }
});
