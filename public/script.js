document.addEventListener('DOMContentLoaded', function() {
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  const pdfUpload = document.getElementById('pdf-upload');
  const messagesContainer = document.getElementById('messages');
  const loadingIndicator = document.getElementById('loading');
  const chatContainer = document.getElementById('chat-container');

  // Scroll to bottom of chat
  function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  // Add message to chat
  function addMessage(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;
    messageDiv.textContent = content;
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
  }

  // Handle send message
  async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage('user', message);
    userInput.value = '';
    loadingIndicator.classList.remove('hidden');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      
      const data = await response.json();
      addMessage('bot', data.response || "Sorry, I couldn't process your request.");
    } catch (error) {
      console.error('Error:', error);
      addMessage('bot', "An error occurred. Please try again later.");
    } finally {
      loadingIndicator.classList.add('hidden');
    }
  }

  // Handle PDF upload
  pdfUpload.addEventListener('change', async function(e) {
    const file = e.target.files[0];
    if (!file) return;

    loadingIndicator.classList.remove('hidden');
    
    try {
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await fetch('/api/process-pdf', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      if (data.summary) {
        addMessage('bot', `PDF Analysis (${data.pageCount} pages):\n${data.summary}`);
      } else {
        addMessage('bot', "Sorry, I couldn't process the PDF.");
      }
    } catch (error) {
      console.error('PDF Upload Error:', error);
      addMessage('bot', "An error occurred while processing the PDF.");
    } finally {
      loadingIndicator.classList.add('hidden');
      pdfUpload.value = '';
    }
  });

  // Event listeners
  sendButton.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
  });

  // Initial greeting
  setTimeout(() => {
    addMessage('bot', "Hello! I'm your legal assistant. You can ask me questions or upload PDFs for analysis.");
  }, 500);
});