/* RAVUKSA AI ASSISTANT
   Free Educational Knowledge Chatbot
*/

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

आप Stock Market, Shares, Mutual Funds, SIP, Banking, Personal Finance और Financial Education से जुड़े सवाल पूछ सकते हैं।

Hello! Ask me your financial education questions in English, Hindi or Hinglish.
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

  // FINANCIAL EDUCATION KNOWLEDGE BASE

  const knowledge = [
    {
      keywords: ["stock market", "share market", "stock exchange", "शेयर बाजार", "शेयर मार्केट"],
      english: "The Stock Market is a marketplace where shares of publicly listed companies are bought and sold. It helps companies raise capital and gives investors an opportunity to participate in company ownership. Stock prices can rise or fall depending on demand, supply, company performance and other factors.",
      hindi: "स्टॉक मार्केट या शेयर बाजार वह जगह है जहाँ सूचीबद्ध कंपनियों के शेयर खरीदे और बेचे जाते हैं। इसके माध्यम से कंपनियाँ पूँजी जुटाती हैं और निवेशक कंपनी में हिस्सेदारी प्राप्त कर सकते हैं। शेयरों की कीमत माँग, आपूर्ति और कंपनी के प्रदर्शन सहित कई कारणों से बदलती है।"
    },
    {
      keywords: ["what is share", "what are shares", "shares", "equity", "शेयर क्या", "हिस्सेदारी"],
      english: "A share represents a unit of ownership in a company. When someone owns shares, they own a small portion of that company. Shareholders may benefit if the share price rises or dividends are declared, but losses are also possible.",
      hindi: "शेयर किसी कंपनी में हिस्सेदारी की एक इकाई है। शेयर खरीदने पर व्यक्ति उस कंपनी का छोटा हिस्सा मालिक बनता है। शेयर की कीमत बढ़ने या कंपनी द्वारा Dividend देने पर लाभ हो सकता है, लेकिन नुकसान की संभावना भी रहती है।"
    },
    {
      keywords: ["nse", "national stock exchange"],
      english: "NSE stands for National Stock Exchange of India. It is one of India's major stock exchanges where eligible securities are traded through an electronic trading system.",
      hindi: "NSE का पूरा नाम National Stock Exchange of India है। यह भारत के प्रमुख स्टॉक एक्सचेंजों में से एक है, जहाँ इलेक्ट्रॉनिक सिस्टम के माध्यम से योग्य प्रतिभूतियों का कारोबार होता है।"
    },
    {
      keywords: ["bse", "bombay stock exchange"],
      english: "BSE stands for Bombay Stock Exchange. It is one of India's major stock exchanges. It operates a platform for trading in listed securities.",
      hindi: "BSE का पूरा नाम Bombay Stock Exchange है। यह भारत के प्रमुख स्टॉक एक्सचेंजों में से एक है, जहाँ सूचीबद्ध प्रतिभूतियों का कारोबार होता है।"
    },
    {
      keywords: ["nifty 50", "nifty"],
      english: "NIFTY 50 is a benchmark stock market index of the National Stock Exchange of India. It represents 50 selected companies from different sectors and is used to understand the broad movement of the Indian equity market.",
      hindi: "NIFTY 50, National Stock Exchange का प्रमुख शेयर बाजार सूचकांक है। इसमें अलग-अलग क्षेत्रों की 50 चुनी हुई कंपनियाँ शामिल होती हैं। इसका उपयोग भारतीय शेयर बाजार की सामान्य दिशा समझने के लिए किया जाता है।"
    },
    {
      keywords: ["sensex", "sensitive index"],
      english: "SENSEX is a benchmark index of the BSE. It tracks the performance of 30 selected companies listed on the Bombay Stock Exchange.",
      hindi: "SENSEX, BSE का प्रमुख शेयर बाजार सूचकांक है। यह Bombay Stock Exchange में सूचीबद्ध 30 चुनी हुई कंपनियों के प्रदर्शन को दर्शाता है।"
    },
    {
      keywords: ["ipo", "initial public offering"],
      english: "An IPO, or Initial Public Offering, is when a company offers its shares to the public for the first time and becomes publicly listed, subject to applicable rules.",
      hindi: "IPO यानी Initial Public Offering वह प्रक्रिया है जिसमें कोई कंपनी पहली बार आम जनता को अपने शेयर जारी करती है और निर्धारित नियमों के अनुसार स्टॉक एक्सचेंज पर सूचीबद्ध हो सकती है।"
    },
    {
      keywords: ["mutual fund", "mutual funds", "म्यूचुअल फंड"],
      english: "A Mutual Fund collects money from multiple investors and invests it in assets such as shares, bonds or money market instruments according to its investment objective. Returns are not guaranteed and market risk applies.",
      hindi: "म्यूचुअल फंड कई निवेशकों से पैसा इकट्ठा करके अपने उद्देश्य के अनुसार शेयर, बॉन्ड या अन्य वित्तीय साधनों में निवेश करता है। इसमें रिटर्न की गारंटी नहीं होती और बाजार का जोखिम रहता है।"
    },
    {
      keywords: ["what is sip", "sip", "systematic investment plan"],
      english: "SIP stands for Systematic Investment Plan. It is a method of investing a fixed amount at regular intervals in a mutual fund. SIP does not guarantee profit or protect against market losses.",
      hindi: "SIP का पूरा नाम Systematic Investment Plan है। इसमें निवेशक नियमित अंतराल पर म्यूचुअल फंड में एक निश्चित राशि निवेश करता है। SIP लाभ की गारंटी नहीं देता और बाजार के नुकसान से पूरी सुरक्षा भी नहीं देता।"
    },
    {
      keywords: ["trading", "intraday", "day trading"],
      english: "Trading means buying and selling financial instruments such as shares. Intraday trading involves buying and selling within the same trading day. Trading carries risk and can result in losses.",
      hindi: "Trading का अर्थ शेयर जैसे वित्तीय साधनों को खरीदना और बेचना है। Intraday Trading में एक ही कारोबारी दिन के भीतर खरीद और बिक्री की जाती है। इसमें जोखिम होता है और नुकसान भी हो सकता है।"
    },
    {
      keywords: ["investment", "investing", "निवेश"],
      english: "Investment means putting money into an asset or financial instrument with the expectation of potential future benefits. Every investment involves some form of risk, and returns are not guaranteed.",
      hindi: "निवेश का अर्थ भविष्य में संभावित लाभ पाने के उद्देश्य से किसी संपत्ति या वित्तीय साधन में पैसा लगाना है। हर निवेश में किसी न किसी प्रकार का जोखिम होता है और रिटर्न की गारंटी नहीं होती।"
    },
    {
      keywords: ["dividend", "डिविडेंड"],
      english: "A dividend is a portion of a company's profits or reserves distributed to eligible shareholders when declared by the company. Companies are not required to declare dividends regularly.",
      hindi: "Dividend कंपनी द्वारा पात्र शेयरधारकों को वितरित की जाने वाली लाभ या रिजर्व की एक राशि होती है। कंपनी के लिए नियमित रूप से Dividend देना अनिवार्य नहीं है।"
    },
    {
      keywords: ["bull market", "bullish", "तेजी का बाजार"],
      english: "A Bull Market is a period when market prices generally show an upward trend and investor sentiment is relatively positive. It does not mean that prices will always rise.",
      hindi: "Bull Market वह स्थिति है जब बाजार में कीमतें सामान्यतः ऊपर की ओर बढ़ रही होती हैं और निवेशकों का रुझान सकारात्मक होता है। इसका अर्थ यह नहीं है कि कीमतें हमेशा बढ़ेंगी।"
    },
    {
      keywords: ["bear market", "bearish", "मंदी का बाजार"],
      english: "A Bear Market is a period of sustained weakness or decline in market prices. It is generally associated with negative investor sentiment.",
      hindi: "Bear Market वह स्थिति है जब बाजार की कीमतों में लगातार कमजोरी या गिरावट देखी जाती है। इसे सामान्यतः नकारात्मक बाजार भावना से जोड़ा जाता है।"
    },
    {
      keywords: ["risk management", "investment risk", "जोखिम प्रबंधन"],
      english: "Risk Management means identifying, understanding and managing possible losses. Common educational principles include diversification, understanding your risk capacity and avoiding decisions based only on rumours.",
      hindi: "Risk Management का अर्थ संभावित नुकसान को पहचानना, समझना और नियंत्रित करने के तरीके अपनाना है। इसमें Diversification, अपनी जोखिम क्षमता समझना और अफवाहों के आधार पर निर्णय न लेना शामिल है।"
    },
    {
      keywords: ["compound interest", "चक्रवृद्धि ब्याज"],
      english: "Compound Interest is interest calculated on the original amount as well as previously accumulated interest. Over time, compounding can make savings or debt grow faster.",
      hindi: "Compound Interest यानी चक्रवृद्धि ब्याज में मूल राशि के साथ पहले से जुड़ा ब्याज भी आगे ब्याज कमाने या देने के आधार में शामिल होता है। समय के साथ इसका प्रभाव बढ़ सकता है।"
    },
    {
      keywords: ["inflation", "महंगाई", "मुद्रास्फीति"],
      english: "Inflation is the general increase in prices of goods and services over time. It reduces the purchasing power of money.",
      hindi: "Inflation यानी मुद्रास्फीति का अर्थ समय के साथ वस्तुओं और सेवाओं की सामान्य कीमतों में वृद्धि है। इससे पैसे की खरीदने की क्षमता कम हो जाती है।"
    },
    {
      keywords: ["banking", "bank account", "बैंकिंग", "बैंक खाता"],
      english: "Banking refers to services provided by banks, such as accepting deposits, maintaining accounts, processing payments and providing loans, subject to applicable rules.",
      hindi: "Banking में बैंक द्वारा दी जाने वाली सेवाएँ शामिल हैं, जैसे जमा स्वीकार करना, खाते चलाना, भुगतान करना और नियमों के अनुसार ऋण उपलब्ध कराना।"
    },
    {
      keywords: ["etf", "exchange traded fund"],
      english: "An ETF, or Exchange Traded Fund, is an investment fund whose units are traded on a stock exchange. Many ETFs track an index, but their market prices can fluctuate.",
      hindi: "ETF यानी Exchange Traded Fund एक निवेश फंड है जिसकी यूनिट स्टॉक एक्सचेंज पर खरीदी और बेची जाती हैं। कई ETF किसी इंडेक्स को ट्रैक करते हैं, लेकिन उनकी कीमतों में उतार-चढ़ाव हो सकता है।"
    }
  ];

  function getAnswer(question) {
    const q = question.toLowerCase().trim();
    const isHindi =
  /[\u0900-\u097F]/.test(question) ||
  /\b(kya|kaise|kyun|kyu|hai|hain|hota|hoti|hote|samjhao|samjhaiye|batao|bataiye|hindi|mein|me|ka|ki|ke|aur|kya)\b/i.test(question);

    let bestMatch = null;
    let bestScore = 0;

    knowledge.forEach(function (item) {
      let score = 0;

      item.keywords.forEach(function (keyword) {
        if (q.includes(keyword.toLowerCase())) {
          score += keyword.length;
        }
      });

      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    });

    if (bestMatch) {
      return isHindi
        ? bestMatch.hindi
        : bestMatch.english;
    }

    return "माफ कीजिए, इस सवाल का उत्तर अभी मेरे उपलब्ध Financial Knowledge Base में नहीं है। कृपया सवाल को Stock Market, Shares, Mutual Funds, SIP, Banking या Personal Finance जैसे किसी विषय से जोड़कर पूछें।\n\nSorry, I don't have enough information to answer this question yet. Please try asking about Stock Market, Shares, Mutual Funds, SIP, Banking or Personal Finance.";
  }

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

    const answer = getAnswer(question);
    addMessage(answer, "bot");
  }

  chat.querySelector("#ravuksa-ai-send").addEventListener("click", sendMessage);

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") sendMessage();
  });
})();
