/* RAVUKSA AI ASSISTANT */

(function () {
  if (document.getElementById("ravuksa-ai-button")) return;

  const button = document.createElement("button");
  button.id = "ravuksa-ai-button";
  button.innerHTML =
    '<span class="ai-icon">🤖</span><span>RAVUKSA AI Assistant</span>';
  button.setAttribute("aria-label", "Open RAVUKSA AI Assistant");

  const chat = document.createElement("div");
  chat.id = "ravuksa-ai-chat";
  chat.setAttribute("role", "dialog");
  chat.setAttribute("aria-label", "RAVUKSA AI Assistant Chat");

  chat.innerHTML = `
    <div class="ravuksa-ai-header">
      <div>
        <h3>🤖 RAVUKSA AI Assistant</h3>
        <p>Financial Education & Market Learning</p>
      </div>
      <button id="ravuksa-ai-close" aria-label="Close chat">×</button>
    </div>

    <div id="ravuksa-ai-messages" aria-live="polite">
      <div class="ravuksa-ai-message bot">
        नमस्ते! 🙏 मैं RAVUKSA AI Assistant हूँ।

        आप Stock Market, Mutual Funds, SIP, Banking, Personal Finance और Financial Education से जुड़े सवाल पूछ सकते हैं।

        Hello! You can ask me questions in Hindi or English.
      </div>
    </div>

    <div class="ravuksa-ai-input-area">
      <input
        id="ravuksa-ai-input"
        type="text"
        placeholder="अपना सवाल लिखें..."
        aria-label="Type your question"
      >
      <button id="ravuksa-ai-send">Send</button>
    </div>

    <div class="ravuksa-ai-disclaimer">
      केवल शैक्षणिक उद्देश्य के लिए। व्यक्तिगत निवेश सलाह नहीं।
    </div>
  `;

  document.body.appendChild(button);
  document.body.appendChild(chat);

  const messages = chat.querySelector("#ravuksa-ai-messages");
  const input = chat.querySelector("#ravuksa-ai-input");

  button.addEventListener("click", function () {
    chat.classList.toggle("open");
    if (chat.classList.contains("open")) input.focus();
  });

  chat.querySelector("#ravuksa-ai-close").addEventListener("click", function () {
    chat.classList.remove("open");
  });

  function addMessage(text, type) {
    const message = document.createElement("div");
    message.className = "ravuksa-ai-message " + type;
    message.textContent = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }

  function sendMessage() {
    const question = input.value.trim();
    if (!question) return;

    addMessage(question, "user");
    input.value = "";

    addMessage(
      "धन्यवाद! आपका सवाल प्राप्त हुआ है। अभी मेरा Financial Knowledge Base तैयार किया जा रहा है। अगले चरण में मैं इस विषय पर उपलब्ध जानकारी के आधार पर जवाब देना सीखूँगा।",
      "bot"
    );
  }

  chat.querySelector("#ravuksa-ai-send").addEventListener("click", sendMessage);

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") sendMessage();
  });
})();
