/* =========================================================
   RAVUKSA AI ASSISTANT
   Offline educational knowledge assistant
   No paid API | No external AI service
   Financial education only — not investment advice
========================================================= */

(function () {
  'use strict';

  if (document.getElementById('ravuksa-ai-button')) return;

  const button = document.createElement('button');
  button.id = 'ravuksa-ai-button';
  button.type = 'button';
  button.innerHTML = '<span class="ai-icon">🤖</span><span>RAVUKSA AI Assistant</span>';
  button.setAttribute('aria-label', 'Open RAVUKSA AI Assistant');

  const chat = document.createElement('section');
  chat.id = 'ravuksa-ai-chat';
  chat.setAttribute('role', 'dialog');
  chat.setAttribute('aria-label', 'RAVUKSA AI Assistant Chat');

  chat.innerHTML = `
    <div class="ravuksa-ai-header">
      <div>
        <h3>🤖 RAVUKSA AI Assistant</h3>
        <p>Financial Education &amp; Market Learning</p>
      </div>
      <button id="ravuksa-ai-close" type="button" aria-label="Close chat">×</button>
    </div>

    <div id="ravuksa-ai-messages" aria-live="polite">
      <div class="ravuksa-ai-message bot">
        नमस्ते! 🙏 मैं RAVUKSA AI Assistant हूँ।

        आप हिंदी, English या Roman Hindi में सवाल पूछ सकते हैं।

        Hello! You can ask me about financial education,
        stock markets, investing concepts, banking,
        personal finance and RAVUKSA website features.

        उदाहरण:
        • SIP kya hai?
        • शेयर बाजार क्या है?
        • What is mutual fund?
        • RAVUKSA Goal Planner kya karta hai?
      </div>
    </div>

    <div class="ravuksa-ai-input-area">
      <input
        id="ravuksa-ai-input"
        type="text"
        maxlength="500"
        autocomplete="off"
        placeholder="अपना सवाल लिखें... / Type your question"
        aria-label="Type your question"
      >
      <button id="ravuksa-ai-send" type="button">Send</button>
    </div>

    <div class="ravuksa-ai-disclaimer">
      केवल शैक्षणिक जानकारी। व्यक्तिगत निवेश, टैक्स या कानूनी सलाह नहीं।
      कोई रिटर्न गारंटीड नहीं।
    </div>
  `;

  document.body.append(button, chat);

  const messages = chat.querySelector('#ravuksa-ai-messages');
  const input = chat.querySelector('#ravuksa-ai-input');

  let lastRecord = null;
  let lastLanguage = 'hi';
  let learningTopics = [];
  let knowledge = [];

  function addMessage(message, type) {
    const el = document.createElement('div');
    el.className = 'ravuksa-ai-message ' + type;
    el.textContent = message;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }

  function record(keys, en, hi) {
    return {
      keys: Array.isArray(keys) ? keys : [keys],
      en: en,
      hi: hi
    };
  }

  /* =========================================================
     KNOWLEDGE BASE — PART 1
     Stock market and investment basics
  ========================================================= */

  knowledge = [

    record(
      ['stock market','share market','शेयर बाजार','शेयर मार्केट','stock bazaar'],
      'The stock market is a regulated marketplace where shares and other securities are bought and sold. Prices may rise or fall due to demand, company performance, news and economic conditions. Returns are not guaranteed.',
      'शेयर बाजार एक व्यवस्थित बाजार है जहाँ कंपनियों के शेयर और अन्य प्रतिभूतियाँ खरीदी-बेची जाती हैं। कीमतें मांग, कंपनी के प्रदर्शन, खबरों और आर्थिक स्थितियों के कारण घट-बढ़ सकती हैं। लाभ की गारंटी नहीं होती।'
    ),

    record(
      ['share','shares','equity','ownership','शेयर क्या','हिस्सेदारी'],
      'A share represents a unit of ownership in a company. A shareholder may have certain rights depending on the type of share and applicable rules. Share prices can fluctuate.',
      'Share यानी शेयर किसी कंपनी में आंशिक हिस्सेदारी की एक इकाई है। शेयरधारक के अधिकार शेयर के प्रकार और लागू नियमों पर निर्भर करते हैं। शेयर की कीमत घट-बढ़ सकती है।'
    ),

    record(
      ['nse','national stock exchange'],
      'NSE stands for National Stock Exchange of India. It is a recognised Indian stock exchange where eligible securities are traded under applicable market regulations.',
      'NSE का पूरा नाम National Stock Exchange of India है। यह भारत का मान्यता प्राप्त स्टॉक एक्सचेंज है जहाँ नियमों के अनुसार प्रतिभूतियों का कारोबार होता है।'
    ),

    record(
      ['bse','bombay stock exchange'],
      'BSE is a recognised Indian stock exchange, formerly known as Bombay Stock Exchange. Its well-known benchmark index is the Sensex.',
      'BSE भारत का मान्यता प्राप्त स्टॉक एक्सचेंज है। इसका पुराना नाम Bombay Stock Exchange था। इसका प्रसिद्ध प्रमुख सूचकांक Sensex है।'
    ),

    record(
      ['nifty','nifty 50'],
      'Nifty 50 is an index of 50 selected large and liquid companies listed on NSE. It is a market indicator and does not represent the performance of every listed company.',
      'Nifty 50, NSE पर सूचीबद्ध 50 चुनिंदा बड़ी और तरल कंपनियों का सूचकांक है। यह बाजार का एक संकेतक है, सभी कंपनियों के प्रदर्शन को नहीं दर्शाता।'
    ),

    record(
      ['sensex','bse sensex'],
      'Sensex is a benchmark index of 30 selected companies listed on BSE. It represents a segment of the stock market, not the entire economy.',
      'Sensex, BSE की 30 चुनिंदा कंपनियों का प्रमुख सूचकांक है। यह शेयर बाजार के एक हिस्से को दर्शाता है, पूरी अर्थव्यवस्था को नहीं।'
    ),

    record(
      ['ipo','initial public offering'],
      'An IPO is when a company offers its shares to the public for the first time and seeks listing on a stock exchange. Read the offer document, risks and financial information before making a decision.',
      'IPO में कोई कंपनी पहली बार जनता को अपने शेयर जारी करती है और स्टॉक एक्सचेंज पर लिस्ट होने की प्रक्रिया अपनाती है। निर्णय से पहले Offer Document, जोखिम और वित्तीय जानकारी पढ़ें।'
    ),

    record(
      ['demat','demat account','डीमैट अकाउंट'],
      'A Demat account holds securities such as shares in electronic form. In India, investors use a Depository Participant connected to a depository such as NSDL or CDSL.',
      'Demat Account में शेयर जैसी प्रतिभूतियाँ इलेक्ट्रॉनिक रूप में रखी जाती हैं। भारत में यह खाता NSDL या CDSL जैसी Depository से जुड़े Depository Participant के माध्यम से चलता है।'
    ),

    record(
      ['trading account'],
      'A trading account is used to place buy and sell orders through a broker. A Demat account holds eligible securities electronically. The two accounts serve different purposes.',
      'Trading Account का उपयोग ब्रोकर के माध्यम से खरीदने और बेचने के ऑर्डर देने के लिए होता है। Demat Account में प्रतिभूतियाँ इलेक्ट्रॉनिक रूप में रखी जाती हैं। दोनों का काम अलग है।'
    ),

    record(
      ['mutual fund','mutual funds','म्यूचुअल फंड'],
      'A mutual fund pools money from investors and invests it according to the scheme objective. It is managed by an Asset Management Company. Returns are market-linked and not guaranteed.',
      'Mutual Fund कई निवेशकों का पैसा एकत्र करके योजना के उद्देश्य के अनुसार निवेश करता है। इसे Asset Management Company चलाती है। इसका रिटर्न बाजार पर निर्भर करता है और गारंटीड नहीं होता।'
    ),

    record(
      ['sip','systematic investment plan','एसआईपी'],
      'SIP is a method of investing a fixed amount periodically in a mutual fund. It can encourage disciplined investing, but it does not eliminate market risk or guarantee profit.',
      'SIP म्यूचुअल फंड में नियमित अंतराल पर एक निश्चित राशि निवेश करने का तरीका है। इससे निवेश में अनुशासन आ सकता है, लेकिन बाजार का जोखिम खत्म नहीं होता और लाभ की गारंटी नहीं मिलती।'
    ),

    record(
      ['lump sum','lumpsum','एकमुश्त निवेश'],
      'Lump-sum investing means investing an amount at one time instead of spreading contributions over multiple dates. The timing of investment can affect outcomes.',
      'Lump Sum का अर्थ पूरी राशि एक ही बार में निवेश करना है, न कि अलग-अलग तारीखों पर किस्तों में। निवेश का समय परिणाम को प्रभावित कर सकता है।'
    ),

    record(
      ['trading','trader','ट्रेडिंग'],
      'Trading means buying and selling financial instruments. It may involve price, liquidity, leverage and execution risks. Learn order types and risk controls before participating.',
      'Trading में वित्तीय साधनों को खरीदना और बेचना शामिल है। इसमें कीमत, तरलता, Leverage और ऑर्डर निष्पादन के जोखिम होते हैं। भाग लेने से पहले इन जोखिमों को समझें।'
    ),

    record(
      ['investing','investment','निवेश','निवेश क्या'],
      'Investing means committing money to an asset with an expectation of future value or income while accepting uncertainty and risk. Goals, time horizon, diversification and costs matter.',
      'निवेश का अर्थ भविष्य में मूल्य या आय की उम्मीद से किसी संपत्ति में पैसा लगाना है। इसमें अनिश्चितता और जोखिम होते हैं। लक्ष्य, समय, विविधीकरण और लागत महत्वपूर्ण हैं।'
    ),

    record(
      ['dividend','डिविडेंड'],
      'A dividend is a distribution a company may make to eligible shareholders from profits or reserves, subject to applicable law and approvals. Companies are not required to pay dividends every year.',
      'Dividend कंपनी द्वारा पात्र शेयरधारकों को लाभ या रिजर्व से दिया जाने वाला वितरण है। यह नियमों और मंजूरियों पर निर्भर करता है। हर कंपनी हर साल डिविडेंड दे, यह जरूरी नहीं।'
    ),

    record(
      ['bull market','तेजी का बाजार'],
      'A bull market generally describes a period of broadly rising market prices and positive sentiment. It does not mean every share will rise.',
      'Bull Market ऐसी अवधि है जिसमें सामान्यतः बाजार की कीमतें बढ़ती हैं और सकारात्मक भावना रहती है। इसका अर्थ यह नहीं कि हर शेयर की कीमत बढ़ेगी।'
    ),

    record(
      ['bear market','मंदी का बाजार'],
      'A bear market generally describes a period of sustained broad decline in market prices and weak sentiment. Definitions can vary.',
      'Bear Market में सामान्यतः बाजार की कीमतों में लंबे समय तक व्यापक गिरावट और कमजोर भावना रहती है। इसकी परिभाषा अलग-अलग हो सकती है।'
    ),

    record(
      ['market capitalisation','market cap','बाजार पूंजीकरण'],
      'Market capitalisation is the total market value of a company’s outstanding shares. A common calculation is share price multiplied by the number of outstanding shares.',
      'Market Capitalisation किसी कंपनी के जारी शेयरों का कुल बाजार मूल्य है। सामान्य गणना: शेयर की कीमत × कुल जारी शेयरों की संख्या।'
    ),

    record(
      ['face value','अंकित मूल्य'],
      'Face value is the nominal value assigned to a share by the company. It is different from the current market price.',
      'Face Value कंपनी द्वारा शेयर को दिया गया नाममात्र मूल्य है। यह शेयर की वर्तमान बाजार कीमत से अलग होता है।'
    ),

    record(
      ['bonus share','bonus shares','बोनस शेयर'],
      'Bonus shares are additional shares issued to existing eligible shareholders without receiving fresh payment, subject to company approvals and applicable rules.',
      'Bonus Shares कंपनी द्वारा मौजूदा पात्र शेयरधारकों को बिना नई रकम लिए अतिरिक्त शेयर के रूप में दिए जाते हैं। यह कंपनी की मंजूरी और नियमों पर निर्भर करता है।'
    ),

    record(
      ['stock split','share split','स्टॉक स्प्लिट'],
      'A stock split increases the number of shares and proportionately adjusts the face value. By itself, it does not automatically increase the total value of an investor’s holding.',
      'Stock Split में शेयरों की संख्या बढ़ती है और Face Value उसी अनुपात में बदलती है। केवल स्प्लिट होने से निवेश की कुल कीमत अपने आप नहीं बढ़ती।'
    ),

    record(
      ['rights issue','राइट्स इश्यू'],
      'A rights issue gives existing shareholders an opportunity to buy additional shares in proportion to their eligible holdings, under stated terms.',
      'Rights Issue में मौजूदा पात्र शेयरधारकों को तय अनुपात और शर्तों के अनुसार अतिरिक्त शेयर खरीदने का अवसर दिया जाता है।'
    ),

    record(
      ['fpo','follow on public offer'],
      'An FPO is a further public issue of shares by a company that is already listed. Review the offer documents and risks carefully.',
      'FPO पहले से सूचीबद्ध कंपनी द्वारा जनता को आगे जारी किए जाने वाले शेयरों का प्रस्ताव है। Offer Document और जोखिम ध्यान से पढ़ें।'
    ),

    record(
      ['broker','stock broker','ब्रोकर'],
      'A stock broker is an intermediary authorised to provide access to recognised stock exchanges, subject to applicable registration and regulations. Verify registration before using a broker.',
      'Stock Broker ऐसा मध्यस्थ है जो लागू पंजीकरण और नियमों के अधीन मान्यता प्राप्त स्टॉक एक्सचेंज तक पहुँच देता है। ब्रोकर इस्तेमाल करने से पहले उसका पंजीकरण जाँचें।'
    ),

    record(
      [' sebi','securities and exchange board of india','सेबी'],
      'SEBI is the Securities and Exchange Board of India. It regulates the securities market and works to protect investors and promote market development under Indian law.',
      'SEBI का पूरा नाम Securities and Exchange Board of India है। यह भारतीय कानून के तहत प्रतिभूति बाजार को नियंत्रित करता है और निवेशकों के हितों की सुरक्षा तथा बाजार के विकास पर काम करता है।'
    ),

        record(
      ['risk management','risk','investment risk','जोखिम प्रबंधन','जोखिम क्या है'],
      'Risk management means identifying, measuring and managing possible losses. Common methods include diversification, position sizing, understanding products and avoiding excessive leverage.',
      'Risk Management का अर्थ संभावित नुकसान को पहचानना, समझना और नियंत्रित करना है। इसके तरीकों में Diversification, सही Position Size, उत्पादों की जानकारी और अधिक Leverage से बचना शामिल है।'
    ),

    record(
      ['diversification','diversified portfolio','विविधीकरण'],
      'Diversification means spreading investments across different assets, sectors or categories. It can reduce concentration risk, but it cannot eliminate all investment risk.',
      'Diversification का अर्थ अलग-अलग संपत्तियों, क्षेत्रों या श्रेणियों में निवेश फैलाना है। इससे एक ही जगह निवेश का जोखिम कम हो सकता है, लेकिन सभी जोखिम समाप्त नहीं होते।'
    ),

    record(
      ['portfolio','investment portfolio','पोर्टफोलियो'],
      'A portfolio is the collection of investments held by an individual or institution. It may include shares, mutual funds, bonds, deposits and other assets.',
      'Portfolio किसी व्यक्ति या संस्था के सभी निवेशों का समूह होता है। इसमें शेयर, म्यूचुअल फंड, बॉन्ड, जमा और अन्य संपत्तियाँ हो सकती हैं।'
    ),

    record(
      ['asset allocation','एसेट एलोकेशन'],
      'Asset allocation is the process of dividing investments among asset classes such as equity, debt and cash. It depends on goals, time horizon and risk tolerance.',
      'Asset Allocation का अर्थ निवेश को Equity, Debt और Cash जैसी अलग-अलग संपत्ति श्रेणियों में बाँटना है। यह लक्ष्य, समय और जोखिम सहने की क्षमता पर निर्भर करता है।'
    ),

    record(
      ['compound interest','compounding','चक्रवृद्धि ब्याज'],
      'Compound interest means earning interest on the original amount as well as on previously accumulated interest. The result depends on the rate, time and compounding frequency.',
      'Compound Interest में मूल राशि के साथ पहले से जुड़े ब्याज पर भी ब्याज मिलता है। इसका परिणाम ब्याज दर, समय और ब्याज जुड़ने की अवधि पर निर्भर करता है।'
    ),

    record(
      ['simple interest','साधारण ब्याज'],
      'Simple interest is calculated only on the original principal amount. Formula: Principal × Rate × Time ÷ 100.',
      'Simple Interest की गणना केवल मूलधन पर होती है। सूत्र: मूलधन × ब्याज दर × समय ÷ 100।'
    ),

    record(
      ['inflation','महंगाई','मुद्रास्फीति'],
      'Inflation is the general rise in prices of goods and services over time. It reduces the purchasing power of money.',
      'Inflation यानी महंगाई समय के साथ वस्तुओं और सेवाओं की सामान्य कीमतों में वृद्धि है। इससे पैसे की खरीदने की क्षमता घटती है।'
    ),

    record(
      ['purchasing power','खरीदने की क्षमता'],
      'Purchasing power is the quantity of goods and services that money can buy. Inflation generally reduces purchasing power when income does not keep pace with rising prices.',
      'Purchasing Power का अर्थ है कि किसी रकम से कितनी वस्तुएँ और सेवाएँ खरीदी जा सकती हैं। यदि आय कीमतों के साथ नहीं बढ़ती, तो महंगाई से खरीदने की क्षमता घट सकती है।'
    ),

    record(
      ['budget','budgeting','बजट','मासिक बजट'],
      'A budget is a plan for income and expenses over a period. It helps track spending, manage savings and prepare for financial goals.',
      'Budget एक निश्चित अवधि की आय और खर्च की योजना है। इससे खर्च पर नजर रखने, बचत करने और वित्तीय लक्ष्य पूरे करने में मदद मिलती है।'
    ),

    record(
      ['saving','savings','बचत','पैसे बचाना'],
      'Saving means keeping aside a portion of income instead of spending it immediately. Savings can help meet emergencies and short-term goals.',
      'Saving का अर्थ आय का कुछ हिस्सा तुरंत खर्च करने के बजाय बचाकर रखना है। बचत आपातकाल और छोटे समय के लक्ष्यों में मदद कर सकती है।'
    ),

    record(
      ['emergency fund','आपातकालीन फंड','इमरजेंसी फंड'],
      'An emergency fund is money kept aside for unexpected expenses such as medical needs, job loss or urgent repairs. It should generally be accessible and kept separate from routine spending.',
      'Emergency Fund अचानक आने वाले खर्चों जैसे चिकित्सा, नौकरी छूटने या जरूरी मरम्मत के लिए अलग रखी गई रकम है। इसे सामान्य खर्चों से अलग और आसानी से उपलब्ध रखना उपयोगी होता है।'
    ),

    record(
      ['financial goal','financial goals','वित्तीय लक्ष्य'],
      'A financial goal is a specific money-related target, such as education, a home, an emergency fund or retirement. Define the amount and time frame before planning.',
      'Financial Goal एक निश्चित आर्थिक लक्ष्य है, जैसे शिक्षा, घर, Emergency Fund या Retirement। योजना बनाने से पहले लक्ष्य की रकम और समय तय करें।'
    ),

    record(
      ['net worth','कुल संपत्ति','नेट वर्थ'],
      'Net worth is the value of what you own minus what you owe. Formula: Total Assets − Total Liabilities.',
      'Net Worth आपकी कुल संपत्ति में से कुल देनदारियाँ घटाने के बाद बची रकम है। सूत्र: कुल संपत्ति − कुल देनदारियाँ।'
    ),

    record(
      ['liability','liabilities','देनदारी','कर्ज'],
      'A liability is a financial obligation that a person or organisation owes, such as a loan, unpaid bill or other debt.',
      'Liability यानी ऐसी वित्तीय जिम्मेदारी या देनदारी जिसे व्यक्ति या संस्था को चुकाना होता है, जैसे लोन, बकाया बिल या अन्य कर्ज।'
    ),

    record(
      ['assets','asset','संपत्ति'],
      'An asset is something of value owned or controlled by a person or organisation. Examples may include cash, property, investments and equipment.',
      'Asset यानी मूल्यवान चीज जिस पर किसी व्यक्ति या संस्था का स्वामित्व या नियंत्रण हो। उदाहरण: नकद, संपत्ति, निवेश और उपकरण।'
    ),

    record(
      ['loan','लोन','ऋण'],
      'A loan is money borrowed from a lender that must be repaid according to agreed terms. Check the interest rate, fees, repayment schedule and penalties before borrowing.',
      'Loan यानी किसी संस्था या व्यक्ति से उधार लिया गया पैसा जिसे तय शर्तों के अनुसार लौटाना होता है। लेने से पहले ब्याज दर, फीस, किस्त और जुर्माने की जानकारी जाँचें।'
    ),

    record(
      ['emi','equated monthly instalment','ईएमआई'],
      'EMI is a fixed periodic payment made towards repaying a loan. It usually includes principal and interest. The amount depends on loan size, rate and tenure.',
      'EMI यानी लोन चुकाने के लिए नियमित रूप से दी जाने वाली किस्त। इसमें आमतौर पर मूलधन और ब्याज शामिल होते हैं। रकम लोन, ब्याज दर और अवधि पर निर्भर करती है।'
    ),

    record(
      ['credit score','cibil score','क्रेडिट स्कोर'],
      'A credit score is a numerical summary of credit history generated by a credit information company. Lenders may use it along with other information when assessing credit applications.',
      'Credit Score आपकी क्रेडिट हिस्ट्री का संख्यात्मक सार है। बैंक और लोन देने वाली संस्थाएँ लोन आवेदन का मूल्यांकन करते समय इसका उपयोग अन्य जानकारी के साथ कर सकती हैं।'
    ),

    record(
      ['debt','कर्ज','उधार'],
      'Debt is money owed to another person or institution. Managing debt involves understanding interest, repayment obligations and the effect of missed payments.',
      'Debt यानी किसी व्यक्ति या संस्था को चुकाई जाने वाली रकम। कर्ज संभालने के लिए ब्याज, भुगतान की जिम्मेदारी और किस्त छूटने के प्रभाव को समझना जरूरी है।'
    ),

    record(
      ['tax','taxation','कर','टैक्स'],
      'Tax is a compulsory payment imposed by the government under law. Tax rules depend on the type of income, transaction and applicable financial year. Check current official rules.',
      'Tax यानी सरकार द्वारा कानून के अनुसार लिया जाने वाला अनिवार्य भुगतान। टैक्स के नियम आय, लेन-देन और वित्तीय वर्ष के अनुसार बदल सकते हैं। वर्तमान आधिकारिक नियम जाँचें।'
    ),

    record(
      ['capital gains','पूंजीगत लाभ'],
      'Capital gain is the profit arising when a capital asset is sold for more than its cost, subject to applicable tax rules. A loss may occur if the sale value is lower.',
      'Capital Gain तब होता है जब कोई पूंजीगत संपत्ति उसकी लागत से अधिक कीमत पर बेची जाती है। लागू टैक्स नियमों के अनुसार इसका कर निर्धारण होता है। कम कीमत पर बेचने से नुकसान भी हो सकता है।'
    ),

    record(
      ['long term investment','long term','दीर्घकालीन निवेश','लंबी अवधि'],
      'Long-term investing means holding investments over an extended period. The appropriate duration depends on the goal and asset. Long-term holding does not remove market risk.',
      'Long-term Investing का अर्थ लंबे समय तक निवेश बनाए रखना है। सही अवधि लक्ष्य और संपत्ति पर निर्भर करती है। लंबे समय तक रखने से बाजार का जोखिम समाप्त नहीं होता।'
    ),

    record(
      ['short term investment','short term','अल्पकालीन निवेश','कम अवधि'],
      'Short-term investing refers to investing for a relatively brief period. Liquidity, price volatility, costs and the timing of the goal are important considerations.',
      'Short-term Investing का अर्थ कम अवधि के लिए निवेश करना है। इसमें पैसे की उपलब्धता, कीमतों में उतार-चढ़ाव, लागत और लक्ष्य का समय महत्वपूर्ण होते हैं।'
    ),

    record(
      ['liquidity','तरलता'],
      'Liquidity describes how easily an asset can be converted into cash without a major loss in value. Liquidity can vary across products and market conditions.',
      'Liquidity यानी किसी संपत्ति को बिना बहुत अधिक मूल्य खोए कितनी आसानी से नकद में बदला जा सकता है। यह उत्पाद और बाजार की स्थिति के अनुसार बदलती है।'
    ),

    record(
      ['volatility','अस्थिरता'],
      'Volatility describes the degree of variation in an asset’s price over time. Higher volatility means prices may move more sharply in either direction.',
      'Volatility यानी किसी संपत्ति की कीमत में समय के साथ होने वाले उतार-चढ़ाव की मात्रा। अधिक अस्थिरता में कीमत तेजी से ऊपर या नीचे जा सकती है।'
    ),

    record(
      ['leverage','margin trading','लीवरेज','मार्जिन'],
      'Leverage means using borrowed funds or exposure to control a larger position. It can magnify both gains and losses and may lead to losses beyond the initial amount in some products.',
      'Leverage में उधार के पैसे या अतिरिक्त Exposure से बड़ी Position ली जाती है। इससे लाभ और नुकसान दोनों बढ़ सकते हैं। कुछ उत्पादों में शुरुआती रकम से अधिक नुकसान भी हो सकता है।'
    ),

    record(
      ['stop loss','stop-loss','स्टॉप लॉस'],
      'A stop-loss is an order instruction intended to limit losses by triggering an order at a specified price. Execution is not guaranteed at the exact stop price, especially in fast or illiquid markets.',
      'Stop-Loss एक ऐसा ऑर्डर निर्देश है जिसका उद्देश्य तय कीमत पर ऑर्डर सक्रिय करके नुकसान सीमित करना है। तेज या कम तरलता वाले बाजार में ऑर्डर उसी कीमत पर पूरा होने की गारंटी नहीं होती।'
    ),

    record(
      ['limit order','लिमिट ऑर्डर'],
      'A limit order specifies the maximum price to pay when buying or the minimum price to accept when selling. It may not execute if the market does not reach the specified price.',
      'Limit Order में खरीदने की अधिकतम या बेचने की न्यूनतम कीमत तय की जाती है। बाजार उस कीमत तक न पहुँचे तो ऑर्डर पूरा नहीं हो सकता।'
    ),

    record(
      ['market order','मार्केट ऑर्डर'],
      'A market order requests immediate execution at the best available market price. The final execution price may differ from the displayed price.',
      'Market Order में उपलब्ध बाजार कीमत पर तुरंत ऑर्डर पूरा करने का अनुरोध किया जाता है। अंतिम कीमत स्क्रीन पर दिखाई गई कीमत से अलग हो सकती है।'
    ),

    record(
      ['etf','exchange traded fund'],
      'An ETF is a fund traded on an exchange like a share. It may track an index, commodity or other asset basket. Its market price can differ from its underlying value.',
      'ETF यानी Exchange Traded Fund, ऐसा फंड है जो शेयर की तरह एक्सचेंज पर ट्रेड होता है। यह किसी इंडेक्स, कमोडिटी या संपत्तियों के समूह को ट्रैक कर सकता है। इसकी बाजार कीमत वास्तविक अंतर्निहित मूल्य से अलग हो सकती है।'
    ),

    record(
      ['index fund','इंडेक्स फंड'],
      'An index fund aims to track the performance of a chosen market index, subject to tracking error and expenses. It does not try to actively select stocks to outperform the index.',
      'Index Fund किसी चुने हुए बाजार सूचकांक के प्रदर्शन को ट्रैक करने का प्रयास करता है। Tracking Error और खर्च हो सकते हैं। इसका उद्देश्य सक्रिय रूप से शेयर चुनकर सूचकांक से बेहतर प्रदर्शन करना नहीं होता।'
    ),

    record(
      ['expense ratio','एक्सपेंस रेशियो'],
      'Expense ratio is the annual operating cost of a mutual fund expressed as a percentage of its assets. It reduces the returns available to investors.',
      'Expense Ratio म्यूचुअल फंड के सालाना संचालन खर्च का प्रतिशत है। यह निवेशक को मिलने वाले रिटर्न को कम करता है।'
    ),

    record(
      ['nav','net asset value','एनएवी'],
      'NAV is the per-unit value of a mutual fund scheme, calculated using its assets minus liabilities divided by units outstanding, subject to applicable valuation rules.',
      'NAV यानी Net Asset Value म्यूचुअल फंड की प्रति यूनिट कीमत है। इसकी गणना योजना की संपत्तियों में से देनदारियाँ घटाकर कुल यूनिट से भाग देकर की जाती है।'
    ),

    record(
      ['exit load','एग्जिट लोड'],
      'Exit load is a fee that some mutual fund schemes may charge when units are redeemed within a specified period. Check the scheme documents for details.',
      'Exit Load वह शुल्क है जो कुछ म्यूचुअल फंड योजनाएँ तय अवधि के भीतर यूनिट बेचने या निकालने पर लगा सकती हैं। जानकारी के लिए Scheme Documents देखें।'
    ),

    record(
      ['elss','equity linked savings scheme'],
      'ELSS is an equity-oriented mutual fund category in India that offers tax benefits subject to applicable tax rules and has a lock-in period. Market risk remains.',
      'ELSS भारत में Equity आधारित म्यूचुअल फंड श्रेणी है जिसमें लागू टैक्स नियमों के अनुसार कर लाभ मिल सकता है और Lock-in अवधि होती है। इसमें बाजार का जोखिम बना रहता है।'
    ),

    record(
      ['fixed deposit','fd','फिक्स्ड डिपॉजिट'],
      'A fixed deposit is a bank or financial institution deposit kept for a chosen tenure at an agreed interest rate. Premature withdrawal conditions and applicable insurance limits should be checked.',
      'Fixed Deposit में बैंक या वित्तीय संस्था में तय अवधि के लिए निश्चित ब्याज दर पर पैसा जमा किया जाता है। समय से पहले निकालने की शर्तें और लागू बीमा सीमा जाँचें।'
    ),

    record(
      ['recurring deposit','rd','रिकरिंग डिपॉजिट'],
      'A recurring deposit allows a customer to deposit a fixed amount at regular intervals for a chosen tenure. Interest and withdrawal terms depend on the institution.',
      'Recurring Deposit में ग्राहक तय अवधि तक नियमित अंतराल पर एक निश्चित रकम जमा करता है। ब्याज और निकासी की शर्तें संस्था पर निर्भर करती हैं।'
    ),

    record(
      ['savings account','बचत खाता'],
      'A savings account is a bank account used to deposit money, make payments and maintain accessible savings. Interest rates, fees and limits vary by bank and account type.',
      'Savings Account बैंक का ऐसा खाता है जिसमें पैसा जमा, भुगतान और बचत रखी जा सकती है। ब्याज दर, शुल्क और सीमाएँ बैंक तथा खाते के प्रकार के अनुसार बदलती हैं।'
    ),

    record(
      ['current account','चालू खाता'],
      'A current account is generally designed for frequent transactions by businesses and professionals. It may have different fees, balance requirements and interest terms from a savings account.',
      'Current Account सामान्यतः व्यवसायों और पेशेवरों के बार-बार होने वाले लेन-देन के लिए बनाया जाता है। इसकी फीस, न्यूनतम बैलेंस और ब्याज की शर्तें Savings Account से अलग हो सकती हैं।'
    ),

    record(
      ['upi','unified payments interface','यूपीआई'],
      'UPI is an instant payment system in India that enables bank-to-bank transfers through supported apps. Never share your UPI PIN; entering a PIN generally authorises a payment, not receiving money.',
      'UPI भारत की तत्काल भुगतान प्रणाली है जिससे समर्थित ऐप के जरिए बैंक से बैंक पैसे भेजे जा सकते हैं। अपना UPI PIN कभी साझा न करें। सामान्यतः PIN डालना भुगतान की मंजूरी देता है, पैसा प्राप्त करने के लिए PIN डालने की जरूरत नहीं होती।'
    ),

    record(
      ['neft','national electronic funds transfer'],
      'NEFT is an electronic funds transfer system in India that enables money transfers between participating bank accounts. Check your bank for applicable limits, charges and processing details.',
      'NEFT भारत की इलेक्ट्रॉनिक फंड ट्रांसफर प्रणाली है जिससे भाग लेने वाले बैंकों के खातों के बीच पैसा भेजा जाता है। सीमा, शुल्क और प्रक्रिया के लिए अपने बैंक से जानकारी लें।'
    ),

    record(
      ['rtgs','real time gross settlement'],
      'RTGS is a payment system used for real-time gross settlement of fund transfers. Check the current RBI and bank rules for eligibility, minimum amount and operating details.',
      'RTGS फंड ट्रांसफर की Real-Time Gross Settlement प्रणाली है। पात्रता, न्यूनतम रकम और प्रक्रिया के लिए RBI तथा बैंक के वर्तमान नियम जाँचें।'
    ),

    record(
      ['imps','immediate payment service'],
      'IMPS is an instant interbank electronic funds transfer service in India, available through participating banks and channels, subject to bank rules.',
      'IMPS भारत की तत्काल Interbank इलेक्ट्रॉनिक फंड ट्रांसफर सेवा है। यह भाग लेने वाले बैंकों और उनके चैनलों के माध्यम से बैंक के नियमों के अनुसार उपलब्ध होती है।'
    ),

    record(
      ['kyc','know your customer','केवाईसी'],
      'KYC is a process used by regulated institutions to verify customer identity and address. Submit documents only through official and secure channels.',
      'KYC यानी Know Your Customer वह प्रक्रिया है जिसमें वित्तीय संस्थाएँ ग्राहक की पहचान और पते की पुष्टि करती हैं। दस्तावेज केवल आधिकारिक और सुरक्षित माध्यम से दें।'
    ),

    record(
      ['nominee','nomination','नॉमिनी'],
      'A nominee is a person named to receive or handle an asset or account claim according to applicable rules after the account holder’s death. Nomination does not always determine final beneficial ownership.',
      'Nominee वह व्यक्ति है जिसे खाताधारक की मृत्यु के बाद लागू नियमों के अनुसार संपत्ति या खाते से जुड़ा दावा प्राप्त करने या संभालने के लिए नामित किया जाता है। Nominee होना हमेशा अंतिम मालिक होना नहीं दर्शाता।'
    ),

    record(
      ['insurance','बीमा'],
      'Insurance is a contract under which an insurer provides specified financial protection against covered events in exchange for a premium. Read exclusions, limits and claim conditions.',
      'Insurance एक अनुबंध है जिसमें बीमा कंपनी प्रीमियम के बदले तय घटनाओं से होने वाले नुकसान पर निर्धारित वित्तीय सुरक्षा देती है। Exclusions, Limits और Claim Conditions ध्यान से पढ़ें।'
    ),

    record(
      ['term insurance','टर्म इंश्योरेंस'],
      'Term insurance provides life cover for a specified period. A death benefit is payable to eligible beneficiaries if the insured event occurs during the policy term, subject to policy conditions.',
      'Term Insurance एक निश्चित अवधि के लिए जीवन बीमा सुरक्षा देता है। पॉलिसी अवधि में बीमित घटना होने पर शर्तों के अनुसार पात्र लाभार्थियों को राशि मिल सकती है।'
    ),

    record(
      ['health insurance','स्वास्थ्य बीमा'],
      'Health insurance helps cover specified medical expenses according to policy terms. Waiting periods, exclusions, co-payments and network hospitals should be reviewed.',
      'Health Insurance पॉलिसी की शर्तों के अनुसार कुछ चिकित्सा खर्चों को कवर करने में मदद करता है। Waiting Period, Exclusions, Co-payment और Network Hospitals जाँचें।'
    ),

    record(
      ['retirement planning','retirement','रिटायरमेंट योजना'],
      'Retirement planning means preparing financially for life after regular employment. Consider expected expenses, inflation, income sources, healthcare and investment risks.',
      'Retirement Planning का अर्थ नौकरी या नियमित आय के बाद के जीवन के लिए आर्थिक तैयारी करना है। खर्च, महंगाई, आय के स्रोत, स्वास्थ्य और निवेश जोखिम पर विचार करें।'
    ),

     record(
      ['pension', 'पेंशन'],
      'A pension is a regular payment that may be provided after retirement under an eligible pension arrangement. Benefits and eligibility depend on the specific scheme.',
      'Pension यानी पात्र पेंशन योजना के अंतर्गत रिटायरमेंट के बाद मिलने वाली नियमित राशि। इसके लाभ और पात्रता संबंधित योजना पर निर्भर करते हैं।'
    ),

    record(
      ['provident fund', 'pf', 'भविष्य निधि'],
      'A Provident Fund is a savings arrangement in which contributions are accumulated for future financial security. Rules depend on the applicable scheme.',
      'Provident Fund यानी भविष्य निधि। इसमें भविष्य की आर्थिक सुरक्षा के लिए नियमित बचत जमा की जाती है।'
    ),

    record(
      ['epf', 'employee provident fund'],
      'EPF is a retirement savings scheme for eligible employees. Both employee and employer may contribute according to applicable rules.',
      'EPF यानी Employees Provident Fund। यह पात्र कर्मचारियों के लिए रिटायरमेंट बचत योजना है।'
    ),

    record(
      ['ppf', 'public provident fund'],
      'PPF is a government-backed long-term savings scheme with specified deposit, interest and withdrawal rules.',
      'PPF यानी Public Provident Fund। यह सरकार द्वारा समर्थित लंबी अवधि की बचत योजना है।'
    ),

    record(
      ['nps', 'national pension system'],
      'NPS is a retirement-focused investment and pension system regulated by PFRDA. Returns are market-linked and not guaranteed.',
      'NPS यानी National Pension System। यह रिटायरमेंट के लिए बनाई गई व्यवस्था है। इसका रिटर्न बाजार से जुड़ा होता है और गारंटीड नहीं होता।'
    ),

    record(
      ['emergency fund', 'आपातकालीन फंड'],
      'An emergency fund is money kept aside for unexpected expenses such as medical costs or sudden loss of income.',
      'Emergency Fund यानी आपातकालीन बचत। इसे अचानक आने वाले खर्चों और आर्थिक मुश्किलों के लिए रखा जाता है।'
    ),

    record(
      ['budget', 'बजट'],
      'A budget is a plan for managing income, expenses, savings and financial goals.',
      'Budget यानी बजट। यह आपकी आय, खर्च, बचत और वित्तीय लक्ष्यों को व्यवस्थित करने की योजना है।'
    ),

    record(
      ['income', 'आय'],
      'Income is money received from sources such as salary, business, rent or other earnings.',
      'Income यानी आय। वेतन, व्यापार, किराया या अन्य स्रोतों से मिलने वाली धनराशि आय कहलाती है।'
    ),

    record(
      ['expense', 'expenses', 'खर्च'],
      'An expense is money spent on goods, services, bills or other needs.',
      'Expense यानी खर्च। वस्तुओं, सेवाओं, बिलों और जरूरतों पर खर्च की गई राशि।'
    ),

    record(
      ['saving', 'savings', 'बचत'],
      'Savings are the part of income that remains after expenses and is kept for future needs.',
      'Saving यानी बचत। आय में से खर्च निकालने के बाद भविष्य के लिए बचाई गई राशि।'
    ),

    record(
      ['financial goal', 'वित्तीय लक्ष्य'],
      'A financial goal is a money-related objective, such as building an emergency fund, buying a home or planning for education.',
      'Financial Goal यानी वित्तीय लक्ष्य। जैसे घर खरीदना, शिक्षा के लिए बचत करना या Emergency Fund बनाना।'
    ),

    record(
      ['financial planning', 'वित्तीय योजना'],
      'Financial planning is the process of organizing income, expenses, savings and financial goals.',
      'Financial Planning यानी आय, खर्च, बचत और वित्तीय लक्ष्यों को व्यवस्थित करने की प्रक्रिया।'
    ),

    record(
      ['asset', 'संपत्ति'],
      'An asset is something of value that a person or organization owns or controls.',
      'Asset यानी संपत्ति। ऐसी चीज जिसकी आर्थिक कीमत हो और जिस पर किसी व्यक्ति या संस्था का स्वामित्व या नियंत्रण हो।'
    ),

    record(
      ['liability', 'देनदारी'],
      'A liability is a financial obligation or amount that a person or organization owes.',
      'Liability यानी देनदारी। वह राशि या वित्तीय जिम्मेदारी जिसे चुकाना बाकी हो।'
    ),

    record(
      ['net worth', 'कुल संपत्ति मूल्य'],
      'Net worth is the difference between total assets and total liabilities.',
      'Net Worth यानी कुल संपत्ति में से कुल देनदारियाँ घटाने के बाद बची हुई राशि।'
    ),

    record(
      ['loan', 'ऋण', 'कर्ज'],
      'A loan is money borrowed from a lender that must be repaid according to agreed terms, usually with interest.',
      'Loan यानी ऋण या कर्ज। उधार ली गई राशि जिसे तय शर्तों के अनुसार ब्याज सहित या बिना ब्याज के वापस करना होता है।'
    ),

    record(
      ['emi', 'equated monthly installment'],
      'EMI is a fixed periodic payment made by a borrower to repay a loan over an agreed period.',
      'EMI यानी Equated Monthly Installment। लोन चुकाने के लिए हर महीने दी जाने वाली निर्धारित किस्त।'
    ),

    record(
      ['credit score', 'क्रेडिट स्कोर'],
      'A credit score is a numerical summary of credit history used by lenders when assessing creditworthiness.',
      'Credit Score यानी आपकी क्रेडिट हिस्ट्री का संख्यात्मक आकलन, जिसका उपयोग बैंक और अन्य ऋणदाता करते हैं।'
    ),

    record(
      ['cibil', 'cibil score'],
      'CIBIL Score is a credit score provided by TransUnion CIBIL based on an individual credit history.',
      'CIBIL Score आपकी क्रेडिट हिस्ट्री के आधार पर तैयार किया गया क्रेडिट स्कोर है।'
    ),

    record(
      ['interest rate', 'ब्याज दर'],
      'An interest rate is the percentage charged on borrowed money or earned on certain savings and investments.',
      'Interest Rate यानी ब्याज दर। यह उधार ली गई राशि पर लगने वाला या कुछ बचत और निवेश पर मिलने वाला प्रतिशत है।'
    ),

    record(
      ['principal amount', 'मूलधन'],
      'Principal is the original amount borrowed or invested, excluding interest and other charges.',
      'Principal यानी मूलधन। यह उधार ली गई या निवेश की गई शुरुआती राशि होती है।'
    ),

    record(
      ['inflation', 'महंगाई'],
      'Inflation is a general rise in the prices of goods and services over time, reducing the purchasing power of money.',
      'Inflation यानी महंगाई। समय के साथ वस्तुओं और सेवाओं की कीमतें बढ़ने से पैसे की खरीदने की क्षमता कम हो सकती है।'
    ),

    record(
      ['purchasing power', 'क्रय शक्ति'],
      'Purchasing power is the amount of goods and services that a unit of money can buy.',
      'Purchasing Power यानी क्रय शक्ति। किसी निश्चित राशि से कितनी वस्तुएँ और सेवाएँ खरीदी जा सकती हैं।'
    ),

    record(
      ['diversification', 'विविधीकरण'],
      'Diversification means spreading investments across different assets to avoid depending on a single investment.',
      'Diversification यानी निवेश को अलग-अलग परिसंपत्तियों में बाँटना, ताकि पूरा पैसा एक ही निवेश पर निर्भर न रहे।'
    ),

    record(
      ['liquidity', 'तरलता'],
      'Liquidity refers to how easily an asset can be converted into cash without a significant loss in value.',
      'Liquidity यानी तरलता। किसी संपत्ति को बिना अधिक मूल्य-हानि के आसानी से नकदी में बदल पाने की क्षमता।'
    ),

    record(
      ['risk tolerance', 'जोखिम सहनशीलता'],
      'Risk tolerance is the level of investment risk a person is willing and able to accept.',
      'Risk Tolerance यानी व्यक्ति कितने निवेश जोखिम को स्वीकार करने के लिए तैयार और सक्षम है।'
    ),

    record(
      ['financial literacy', 'वित्तीय साक्षरता'],
      'Financial literacy is the ability to understand and use financial concepts to make informed money decisions.',
      'Financial Literacy यानी वित्तीय साक्षरता। पैसे, बचत, निवेश, बैंकिंग और जोखिम से जुड़े विषयों को समझकर सोच-समझकर निर्णय लेने की क्षमता।'
    ),

         record(
      ['bank', 'बैंक'],
      'A bank is a financial institution that accepts deposits, provides payment services and may offer loans.',
      'Bank यानी बैंक। यह एक वित्तीय संस्था है जहाँ पैसे जमा किए जाते हैं और भुगतान तथा लोन जैसी सेवाएँ मिलती हैं।'
    ),

    record(
      ['savings account', 'बचत खाता'],
      'A savings account is a bank account used to deposit money and make withdrawals. Interest may be paid according to the bank terms.',
      'Savings Account यानी बचत खाता। इसमें पैसे जमा और जरूरत के अनुसार निकाले जा सकते हैं। बैंक की शर्तों के अनुसार ब्याज भी मिल सकता है।'
    ),

    record(
      ['current account', 'चालू खाता'],
      'A current account is generally used by businesses and organizations for frequent transactions.',
      'Current Account यानी चालू खाता। इसका उपयोग आमतौर पर व्यवसाय और संस्थाएँ बार-बार लेनदेन करने के लिए करती हैं।'
    ),

    record(
      ['fixed deposit', 'fd', 'सावधि जमा'],
      'A Fixed Deposit is a bank deposit kept for a chosen period at an agreed interest rate, subject to applicable terms.',
      'Fixed Deposit यानी FD। इसमें एक निश्चित अवधि के लिए पैसा जमा किया जाता है और तय शर्तों के अनुसार ब्याज मिलता है।'
    ),

    record(
      ['recurring deposit', 'rd', 'आवर्ती जमा'],
      'A Recurring Deposit allows a person to deposit a fixed amount regularly for a selected period.',
      'Recurring Deposit यानी RD। इसमें हर महीने एक निश्चित राशि जमा की जाती है।'
    ),

    record(
      ['debit card', 'डेबिट कार्ड'],
      'A debit card allows payments and cash withdrawals using money available in a linked bank account.',
      'Debit Card से जुड़े बैंक खाते में उपलब्ध पैसे का उपयोग करके भुगतान और नकद निकासी की जा सकती है।'
    ),

    record(
      ['credit card', 'क्रेडिट कार्ड'],
      'A credit card allows eligible users to borrow money for purchases up to an approved credit limit. Outstanding dues must be repaid.',
      'Credit Card से स्वीकृत सीमा तक खरीदारी की जा सकती है। उपयोग की गई राशि का भुगतान निर्धारित समय पर करना होता है।'
    ),

    record(
      ['upi', 'unified payments interface'],
      'UPI is an instant payment system that enables bank-to-bank transfers through supported mobile applications.',
      'UPI यानी Unified Payments Interface। इसकी मदद से मोबाइल ऐप के माध्यम से एक बैंक खाते से दूसरे बैंक खाते में तुरंत पैसे भेजे जा सकते हैं।'
    ),

    record(
      ['neft', 'national electronic funds transfer'],
      'NEFT is an electronic system used to transfer funds between participating bank accounts.',
      'NEFT यानी National Electronic Funds Transfer। यह बैंकों के बीच इलेक्ट्रॉनिक तरीके से पैसे ट्रांसफर करने की सुविधा है।'
    ),

    record(
      ['rtgs', 'real time gross settlement'],
      'RTGS is an electronic funds transfer system generally used for high-value transactions, subject to applicable rules.',
      'RTGS यानी Real Time Gross Settlement। इसका उपयोग सामान्यतः बड़ी राशि के बैंक ट्रांसफर के लिए किया जाता है।'
    ),

    record(
      ['imps', 'immediate payment service'],
      'IMPS is an instant interbank electronic funds transfer service available through supported banking channels.',
      'IMPS यानी Immediate Payment Service। इससे उपलब्ध बैंकिंग माध्यमों के जरिए तुरंत पैसे ट्रांसफर किए जा सकते हैं।'
    ),

    record(
      ['kyc', 'know your customer'],
      'KYC is a verification process used by financial institutions to establish the identity and address of customers.',
      'KYC यानी Know Your Customer। यह बैंक और वित्तीय संस्थाओं द्वारा ग्राहक की पहचान और पते की पुष्टि करने की प्रक्रिया है।'
    ),

    record(
      ['nominee', 'नामांकित व्यक्ति'],
      'A nominee is a person nominated to receive eligible account or investment proceeds according to applicable rules.',
      'Nominee यानी नामांकित व्यक्ति। खाताधारक या निवेशक द्वारा नामित व्यक्ति, जिसे लागू नियमों के अनुसार राशि मिल सकती है।'
    ),

    record(
      ['insurance', 'बीमा'],
      'Insurance is a contract that provides financial protection against specified risks in exchange for a premium.',
      'Insurance यानी बीमा। इसमें प्रीमियम के बदले तय जोखिमों से आर्थिक सुरक्षा मिलती है।'
    ),

    record(
      ['life insurance', 'जीवन बीमा'],
      'Life insurance provides a defined financial benefit under specified conditions related to the insured person’s life.',
      'Life Insurance यानी जीवन बीमा। इसमें पॉलिसी की शर्तों के अनुसार बीमित व्यक्ति के जीवन से जुड़ी परिस्थितियों में आर्थिक लाभ मिलता है।'
    ),

    record(
      ['health insurance', 'स्वास्थ्य बीमा'],
      'Health insurance helps cover eligible medical expenses according to the policy terms, limits and exclusions.',
      'Health Insurance यानी स्वास्थ्य बीमा। यह पॉलिसी की शर्तों और सीमाओं के अनुसार पात्र चिकित्सा खर्चों को कवर कर सकता है।'
    ),

    record(
      ['premium', 'बीमा प्रीमियम'],
      'A premium is the amount paid to an insurance company to keep an insurance policy active.',
      'Premium यानी प्रीमियम। बीमा पॉलिसी को चालू रखने के लिए बीमा कंपनी को दी जाने वाली राशि।'
    ),

    record(
      ['claim', 'बीमा दावा'],
      'An insurance claim is a formal request made to an insurer for a benefit covered under the policy.',
      'Insurance Claim यानी बीमा दावा। पॉलिसी में शामिल लाभ प्राप्त करने के लिए बीमा कंपनी को दिया गया अनुरोध।'
    ),

    record(
      ['deductible', 'कटौती राशि'],
      'A deductible is the amount a policyholder may need to pay before insurance coverage applies, as specified in the policy.',
      'Deductible यानी वह राशि जिसे बीमा कवरेज लागू होने से पहले पॉलिसीधारक को खुद चुकाना पड़ सकता है।'
    ),

    record(
      ['term insurance', 'टर्म इंश्योरेंस'],
      'Term insurance provides life cover for a specified period. Benefits depend on policy conditions.',
      'Term Insurance यानी निश्चित अवधि का जीवन बीमा। इसमें पॉलिसी की शर्तों के अनुसार जीवन सुरक्षा मिलती है।'
    ),

    record(
      ['general insurance', 'सामान्य बीमा'],
      'General insurance covers specified risks other than life insurance, such as motor, home and travel-related risks.',
      'General Insurance यानी सामान्य बीमा। इसमें वाहन, घर और यात्रा जैसे विभिन्न जोखिमों का बीमा शामिल हो सकता है।'
    ),

    record(
      ['motor insurance', 'वाहन बीमा'],
      'Motor insurance provides coverage for specified vehicle-related risks according to the policy and applicable law.',
      'Motor Insurance यानी वाहन बीमा। यह पॉलिसी और लागू कानून के अनुसार वाहन से जुड़े कुछ जोखिमों को कवर करता है।'
    ),

    record(
      ['tax', 'कर'],
      'Tax is a compulsory payment collected by the government to fund public services and government activities.',
      'Tax यानी कर। सरकार द्वारा सार्वजनिक सेवाओं और अन्य सरकारी कार्यों के लिए लिया जाने वाला अनिवार्य भुगतान।'
    ),

    record(
      ['income tax', 'आयकर'],
      'Income tax is a tax charged on taxable income according to applicable tax laws.',
      'Income Tax यानी आयकर। लागू कर कानूनों के अनुसार कर योग्य आय पर लगाया जाने वाला कर।'
    ),

    record(
      ['gst', 'goods and services tax'],
      'GST is an indirect tax applied to the supply of goods and services under the applicable tax framework.',
      'GST यानी Goods and Services Tax। यह वस्तुओं और सेवाओं की आपूर्ति पर लागू अप्रत्यक्ष कर व्यवस्था है।'
    ),

    record(
      ['financial year', 'वित्तीय वर्ष'],
      'A financial year is a twelve-month period used for accounting and financial reporting. In India, it generally runs from April to March.',
      'Financial Year यानी वित्तीय वर्ष। भारत में यह सामान्यतः 1 अप्रैल से 31 मार्च तक होता है।'
    ),

    record(
      ['budget planning', 'बजट योजना'],
      'Budget planning means estimating income and expenses to manage money responsibly.',
      'Budget Planning यानी आय और खर्च का अनुमान लगाकर पैसे को सही तरीके से व्यवस्थित करना।'
    ),

    record(
      ['fraud', 'धोखाधड़ी'],
      'Financial fraud involves deception or dishonest activity intended to obtain money, assets or sensitive information.',
      'Financial Fraud यानी आर्थिक धोखाधड़ी। गलत जानकारी या छल के माध्यम से पैसे, संपत्ति या गोपनीय जानकारी हासिल करने का प्रयास।'
    ),

    record(
      ['cyber security', 'साइबर सुरक्षा'],
      'Cyber security means protecting digital devices, accounts, networks and information from unauthorized access and attacks.',
      'Cyber Security यानी डिजिटल उपकरणों, खातों और जानकारी को अनधिकृत पहुँच तथा ऑनलाइन हमलों से सुरक्षित रखना।'
    ),

    record(
      ['otp', 'one time password'],
      'An OTP is a temporary verification code. Never share it with another person, even if they claim to represent a bank.',
      'OTP यानी One Time Password। यह अस्थायी सत्यापन कोड है। इसे किसी के साथ साझा न करें, भले ही वह खुद को बैंक कर्मचारी बताए।'
    ),

    record(
      ['phishing', 'फिशिंग'],
      'Phishing is an attempt to steal sensitive information through fake messages, emails, websites or links.',
      'Phishing यानी नकली संदेशों, ईमेल, वेबसाइट या लिंक के जरिए गोपनीय जानकारी चुराने का प्रयास।'
    ),

         record(
      ['sebi', 'सेबी', 'securities and exchange board of india'],
      'SEBI is the regulator of the securities market in India. It works to protect investors and regulate the securities market.',
      'SEBI यानी Securities and Exchange Board of India। यह भारत के प्रतिभूति बाजार का नियामक है और निवेशकों के हितों की सुरक्षा के लिए काम करता है।'
    ),

    record(
      ['nse', 'national stock exchange'],
      'NSE is one of the major stock exchanges in India where eligible securities are traded.',
      'NSE यानी National Stock Exchange। यह भारत का प्रमुख स्टॉक एक्सचेंज है जहाँ सूचीबद्ध प्रतिभूतियों का कारोबार होता है।'
    ),

    record(
      ['bse', 'bombay stock exchange'],
      'BSE is a major stock exchange in India. It operates a platform for trading eligible listed securities.',
      'BSE यानी Bombay Stock Exchange। यह भारत का प्रमुख स्टॉक एक्सचेंज है।'
    ),

    record(
      ['rbi', 'reserve bank of india', 'भारतीय रिजर्व बैंक'],
      'RBI is the central bank of India. It is responsible for monetary policy and important banking and financial system functions.',
      'RBI यानी Reserve Bank of India। यह भारत का केंद्रीय बैंक है और मौद्रिक नीति तथा बैंकिंग व्यवस्था से जुड़े महत्वपूर्ण कार्य करता है।'
    ),

    record(
      ['nism', 'national institute of securities markets'],
      'NISM is an institution established by SEBI to promote education, training and certification in the securities markets.',
      'NISM यानी National Institute of Securities Markets। यह प्रतिभूति बाजार से जुड़ी शिक्षा, प्रशिक्षण और प्रमाणन को बढ़ावा देता है।'
    ),

    record(
      ['nsdl', 'national securities depository limited'],
      'NSDL is a securities depository that provides electronic holding and transfer services for securities.',
      'NSDL एक Securities Depository है जो प्रतिभूतियों को इलेक्ट्रॉनिक रूप में रखने और ट्रांसफर करने की सुविधा देती है।'
    ),

    record(
      ['cdsl', 'central depository services india limited'],
      'CDSL is a securities depository in India that provides electronic demat and related services.',
      'CDSL भारत की एक Securities Depository है जो Demat और संबंधित इलेक्ट्रॉनिक सेवाएँ प्रदान करती है।'
    ),

    record(
      ['irdai', 'insurance regulatory and development authority of india'],
      'IRDAI is the statutory regulator responsible for regulating and developing the insurance sector in India.',
      'IRDAI यानी Insurance Regulatory and Development Authority of India। यह भारत के बीमा क्षेत्र का नियामक है।'
    ),

    record(
      ['pfrda', 'pension fund regulatory and development authority'],
      'PFRDA regulates and promotes the development of the pension sector in India, including the National Pension System.',
      'PFRDA भारत में पेंशन क्षेत्र के नियमन और विकास का काम करता है।'
    ),

    record(
      ['demat account', 'डीमैट अकाउंट'],
      'A Demat account holds eligible securities in electronic form instead of physical certificates.',
      'Demat Account में शेयर और अन्य पात्र प्रतिभूतियाँ इलेक्ट्रॉनिक रूप में रखी जाती हैं।'
    ),

    record(
      ['trading account', 'ट्रेडिंग अकाउंट'],
      'A trading account is used to place buy and sell orders in the securities market through a registered broker.',
      'Trading Account का उपयोग रजिस्टर्ड ब्रोकर के माध्यम से शेयर बाजार में खरीदने और बेचने के ऑर्डर देने के लिए किया जाता है।'
    ),

    record(
      ['broker', 'stock broker', 'ब्रोकर'],
      'A stockbroker is an intermediary registered with the relevant regulator or exchange framework to facilitate securities transactions.',
      'Stock Broker यानी शेयर बाजार में खरीद-बिक्री की सुविधा देने वाला पंजीकृत मध्यस्थ।'
    ),

    record(
      ['ipo application', 'ipo apply', 'आईपीओ आवेदन'],
      'An IPO application is a request to subscribe to shares offered by a company to the public. Allotment is not guaranteed.',
      'IPO Application यानी कंपनी द्वारा जनता के लिए जारी शेयरों के लिए आवेदन करना। शेयर मिलना सुनिश्चित नहीं होता।'
    ),

    record(
      ['ipo allotment', 'आईपीओ अलॉटमेंट'],
      'IPO allotment is the process through which shares are assigned to applicants according to the issue rules and demand.',
      'IPO Allotment यानी IPO में आवेदन करने वालों को नियमों और मांग के अनुसार शेयर आवंटित करने की प्रक्रिया।'
    ),

    record(
      ['market capitalization', 'market cap', 'बाजार पूंजीकरण'],
      'Market capitalization is the total market value of a company’s outstanding shares.',
      'Market Capitalization यानी कंपनी के सभी जारी और बकाया शेयरों का कुल बाजार मूल्य।'
    ),

    record(
      ['face value', 'अंकित मूल्य'],
      'Face value is the nominal value assigned to a share by the issuing company.',
      'Face Value यानी कंपनी द्वारा किसी शेयर को दिया गया मूल या अंकित मूल्य।'
    ),

    record(
      ['book value', 'बुक वैल्यू'],
      'Book value generally refers to the value of a company’s assets minus its liabilities, based on accounting records.',
      'Book Value सामान्यतः कंपनी की लेखा पुस्तकों के अनुसार संपत्तियों में से देनदारियाँ घटाने के बाद बचा मूल्य है।'
    ),

    record(
      ['eps', 'earnings per share'],
      'EPS represents a company’s earnings attributable to each outstanding ordinary share, calculated using the relevant share count.',
      'EPS यानी Earnings Per Share। यह बताता है कि कंपनी की कमाई का कितना हिस्सा प्रत्येक शेयर से संबंधित है।'
    ),

    record(
      ['pe ratio', 'price to earnings ratio', 'पी ई रेशियो'],
      'The P/E ratio compares a company’s share price with its earnings per share. It is one valuation measure and should not be used alone.',
      'P/E Ratio शेयर की कीमत की तुलना प्रति शेयर कमाई से करता है। यह मूल्यांकन का एक तरीका है, इसे अकेले देखकर निर्णय नहीं लेना चाहिए।'
    ),

    record(
      ['portfolio', 'पोर्टफोलियो'],
      'A portfolio is the collection of investments held by an individual or institution.',
      'Portfolio यानी किसी व्यक्ति या संस्था के पास मौजूद सभी निवेशों का संग्रह।'
    ),

    record(
      ['asset allocation', 'एसेट एलोकेशन'],
      'Asset allocation means dividing investments among asset classes such as equity, debt and cash.',
      'Asset Allocation यानी निवेश को Equity, Debt और Cash जैसी अलग-अलग श्रेणियों में बाँटना।'
    ),

    record(
      ['stop loss', 'स्टॉप लॉस'],
      'A stop-loss order is designed to trigger an exit when a specified price condition is reached. Execution price may differ in fast markets.',
      'Stop Loss एक ऐसा ऑर्डर है जो तय कीमत की शर्त पूरी होने पर बाहर निकलने में मदद कर सकता है। तेज बाजार में वास्तविक निष्पादन कीमत अलग हो सकती है।'
    ),

    record(
      ['volatility', 'अस्थिरता'],
      'Volatility describes how much and how quickly the price of a financial asset changes over time.',
      'Volatility यानी कीमतों में उतार-चढ़ाव की मात्रा और गति।'
    ),

    record(
      ['market correction', 'बाजार में सुधार'],
      'A market correction is a decline in market prices after a period of rising prices. Definitions may vary by market convention.',
      'Market Correction यानी बाजार में पहले हुई बढ़त के बाद कीमतों में गिरावट। इसकी परिभाषा बाजार की परंपरा के अनुसार अलग हो सकती है।'
    ),

    record(
      ['financial scam', 'investment scam', 'निवेश धोखाधड़ी'],
      'An investment scam uses misleading claims or deception to obtain money. Be cautious of guaranteed high returns and pressure to invest quickly.',
      'Investment Scam यानी निवेश के नाम पर धोखाधड़ी। गारंटीड अधिक रिटर्न और तुरंत पैसा लगाने के दबाव से सावधान रहें।'
    ),

    record(
      ['guaranteed return', 'गारंटीड रिटर्न'],
      'Market-linked investments do not offer guaranteed returns. Always understand the product terms, risks and official disclosures.',
      'Market-linked निवेश में गारंटीड रिटर्न नहीं होता। किसी भी उत्पाद की शर्तें, जोखिम और आधिकारिक जानकारी समझना जरूरी है।'
    ),

    record(
      ['risk disclosure', 'जोखिम जानकारी'],
      'Risk disclosure explains the possible risks, limitations and important conditions of a financial product or service.',
      'Risk Disclosure यानी किसी वित्तीय उत्पाद या सेवा से जुड़े संभावित जोखिमों और सीमाओं की जानकारी।'
    ),

    record(
      ['ravuksa fintech', 'ravuksa', 'ravuksa finance'],
      'RAVUKSA FINTECH is a financial education and market learning platform focused on helping users understand financial concepts, markets, tools and risk awareness.',
      'RAVUKSA FINTECH एक Financial Education & Market Learning Platform है। इसका उद्देश्य लोगों को वित्तीय विषय, बाजार, टूल्स और जोखिम की जानकारी सरल भाषा में समझाना है।'
    ),

    record(
      ['ravuksa website', 'website', 'वेबसाइट'],
      'The RAVUKSA FINTECH website provides financial learning content, educational tools and market-related information.',
      'RAVUKSA FINTECH वेबसाइट पर वित्तीय शिक्षा, सीखने के टूल्स और बाजार से संबंधित शैक्षणिक जानकारी उपलब्ध है।'
    ),

    record(
      ['founder', 'ceo', 'founder ceo', 'संस्थापक'],
      'RAVUKSA FINTECH identifies Rajesh Kumar as its Founder & CEO.',
      'RAVUKSA FINTECH में Rajesh Kumar को Founder & CEO के रूप में दर्शाया गया है।'
    ),

    record(
      ['learning center', 'लर्निंग सेंटर'],
      'The Learning Center helps users study financial topics through educational lessons and learning material.',
      'Learning Center में उपयोगकर्ता वित्तीय विषयों को पाठों और शैक्षणिक सामग्री के माध्यम से सीख सकते हैं।'
    ),

    record(
      ['financial tools hub', 'tools hub', 'फाइनेंशियल टूल्स'],
      'The Financial Tools & Learning Hub brings together educational tools and interactive learning experiences.',
      'Financial Tools & Learning Hub में वित्तीय शिक्षा से जुड़े टूल्स और इंटरैक्टिव अभ्यास एक जगह मिलते हैं।'
    ),

    record(
      ['financial dictionary', 'वित्तीय शब्दकोश'],
      'The Financial Dictionary explains financial terms in simple language and supports financial learning.',
      'Financial Dictionary वित्तीय शब्दों का अर्थ सरल भाषा में समझाने वाला शैक्षणिक शब्दकोश है।'
    ),

    record(
      ['financial goal planner', 'goal planner', 'लक्ष्य योजना'],
      'The Financial Goal Planner helps users estimate how much they may need to save regularly to reach a target amount within a chosen period.',
      'Financial Goal Planner किसी तय लक्ष्य और समय के अनुसार आवश्यक बचत का अनुमान लगाने में मदद करता है।'
    ),

    record(
      ['decision lab', 'डिसीजन लैब'],
      'Decision Lab provides educational exercises to help users think through everyday budgeting, saving and financial decisions.',
      'Decision Lab में बजट, बचत और रोजमर्रा के वित्तीय फैसलों को समझने के लिए शैक्षणिक अभ्यास मिलते हैं।'
    ),

    record(
      ['market dashboard', 'मार्केट डैशबोर्ड'],
      'The Market Dashboard presents market-related information for educational awareness. Market data may be delayed or subject to availability.',
      'Market Dashboard में बाजार से जुड़ी जानकारी शैक्षणिक उद्देश्य से दिखाई जाती है। डेटा उपलब्धता और देरी के अधीन हो सकता है।'
    ),

    record(
      ['financial simulator', 'सिम्युलेटर'],
      'A financial simulator is an educational environment for exploring hypothetical financial situations without using real money.',
      'Financial Simulator एक शैक्षणिक अभ्यास है जिसमें वास्तविक पैसे का उपयोग किए बिना काल्पनिक वित्तीय स्थितियों को समझा जा सकता है।'
    ),

    record(
      ['risk and safety', 'risk management', 'जोखिम प्रबंधन'],
      'Risk management means identifying, understanding and managing possible financial risks. It cannot remove every risk.',
      'Risk Management यानी संभावित वित्तीय जोखिमों को पहचानना, समझना और संभालना। इससे सभी जोखिम समाप्त नहीं होते।'
    ),

    record(
      ['financial advice', 'निवेश सलाह'],
      'RAVUKSA FINTECH provides educational information, not personalized investment, trading, tax or legal advice.',
      'RAVUKSA FINTECH शैक्षणिक जानकारी प्रदान करता है। यह व्यक्तिगत निवेश, ट्रेडिंग, टैक्स या कानूनी सलाह नहीं है।'
    ),

    record(
      ['contact ravuksa', 'contact', 'संपर्क'],
      'For contact details, please visit the Contact section on the official RAVUKSA FINTECH website.',
      'संपर्क जानकारी के लिए RAVUKSA FINTECH की आधिकारिक वेबसाइट का Contact सेक्शन देखें।'
    ),

         record(
      ['how to use website', 'website kaise use kare', 'वेबसाइट कैसे चलाएं'],
      'You can use the RAVUKSA FINTECH navigation menu and Features & Tools Hub to explore learning topics, calculators and educational resources.',
      'RAVUKSA FINTECH वेबसाइट इस्तेमाल करने के लिए Navigation Menu और Features & Tools Hub खोलें। वहाँ Learning Topics, Calculators और शैक्षणिक सामग्री देख सकते हैं।'
    ),

    record(
      ['how to learn finance', 'finance kaise sikhe', 'फाइनेंस कैसे सीखें'],
      'Start with basic financial concepts, then study banking, saving, investments, market terminology and risk management step by step.',
      'Finance सीखने के लिए पहले बुनियादी वित्तीय विषय समझें। इसके बाद Banking, Saving, Investment, Market Terms और Risk Management क्रम से सीखें।'
    ),

    record(
      ['beginner', 'beginners', 'शुरुआती'],
      'Beginners should start with basic concepts such as income, expenses, budgeting, savings, inflation and the difference between saving and investing.',
      'शुरुआत करने वालों को Income, Expenses, Budget, Saving, Inflation और Saving तथा Investment के अंतर से सीखना चाहिए।'
    ),

    record(
      ['investment for beginners', 'निवेश की शुरुआत'],
      'Before investing, understand your goals, time horizon, risk tolerance, diversification and the features of the financial product.',
      'निवेश शुरू करने से पहले अपने लक्ष्य, समय अवधि, जोखिम सहनशीलता, Diversification और वित्तीय उत्पाद की विशेषताएँ समझें।'
    ),

    record(
      ['what is money', 'money kya hai', 'पैसा क्या है'],
      'Money is a medium of exchange, a unit of account and a store of value.',
      'Money यानी पैसा। इसका उपयोग वस्तुओं और सेवाओं के लेनदेन, मूल्य मापने और मूल्य सुरक्षित रखने के लिए किया जाता है।'
    ),

    record(
      ['difference between saving and investment', 'saving vs investment', 'बचत और निवेश में अंतर'],
      'Saving generally focuses on keeping money available and relatively secure. Investing involves putting money into assets that may grow or lose value.',
      'Saving में पैसे को सुरक्षित और उपलब्ध रखने पर ध्यान दिया जाता है। Investment में पैसा ऐसी संपत्तियों में लगाया जाता है जिनका मूल्य बढ़ या घट सकता है।'
    ),

    record(
      ['short term investment', 'अल्पकालीन निवेश'],
      'Short-term investing refers to financial goals with a relatively short time horizon. Product selection should consider liquidity and risk.',
      'Short-term Investment यानी कम समय के वित्तीय लक्ष्य के लिए निवेश। इसमें Liquidity और Risk को समझना जरूरी है।'
    ),

    record(
      ['long term investment', 'दीर्घकालीन निवेश'],
      'Long-term investing involves holding investments over an extended period. Values can fluctuate, and returns are not guaranteed.',
      'Long-term Investment यानी लंबे समय तक निवेश बनाए रखना। इस दौरान निवेश का मूल्य घट-बढ़ सकता है और रिटर्न की गारंटी नहीं होती।'
    ),

    record(
      ['sip calculator', 'sip calculation', 'एसआईपी कैलकुलेटर'],
      'An SIP calculator estimates the possible future value of regular mutual fund investments using an assumed rate of return. Actual returns may differ.',
      'SIP Calculator नियमित Mutual Fund निवेश की अनुमानित भविष्य की राशि दिखाता है। वास्तविक रिटर्न अलग हो सकता है।'
    ),

    record(
      ['compound interest calculator', 'चक्रवृद्धि ब्याज कैलकुलेटर'],
      'A compound interest calculator estimates growth when interest is added to the principal and future interest is calculated on the accumulated amount.',
      'Compound Interest Calculator चक्रवृद्धि ब्याज के आधार पर राशि की अनुमानित वृद्धि दिखाता है।'
    ),

    record(
      ['cagr calculator', 'cagr calculation'],
      'A CAGR calculator estimates the annualized growth rate of an investment over a specified period. It does not show the path of yearly fluctuations.',
      'CAGR Calculator किसी निवेश की निश्चित अवधि की वार्षिक औसत वृद्धि दर का अनुमान लगाता है। यह हर साल के उतार-चढ़ाव को नहीं दिखाता।'
    ),

    record(
      ['inflation calculator', 'महंगाई कैलकुलेटर'],
      'An inflation calculator estimates how purchasing power changes over time using an assumed inflation rate.',
      'Inflation Calculator अनुमानित महंगाई दर के आधार पर समय के साथ पैसे की खरीदने की क्षमता में बदलाव दिखाता है।'
    ),

    record(
      ['risk calculator', 'जोखिम कैलकुलेटर'],
      'A risk calculator can help illustrate possible gains and losses under selected assumptions. Its output is educational and not a prediction.',
      'Risk Calculator चुनी गई मान्यताओं के आधार पर संभावित लाभ और नुकसान समझाने में मदद करता है। इसका परिणाम भविष्यवाणी नहीं है।'
    ),

    record(
      ['what is learning path', 'learning path', 'लर्निंग पाथ'],
      'A learning path is an organized sequence of topics that helps learners progress from basic concepts to more advanced subjects.',
      'Learning Path यानी विषयों को क्रमबद्ध तरीके से सीखने की योजना, जिसमें शुरुआत से लेकर उन्नत स्तर तक के विषय शामिल होते हैं।'
    ),

    record(
      ['quiz', 'प्रश्नोत्तरी'],
      'A quiz is a short assessment that helps learners check their understanding of a topic.',
      'Quiz यानी प्रश्नोत्तरी। इससे आप किसी विषय की अपनी समझ जाँच सकते हैं।'
    ),

    record(
      ['learning progress', 'मेरी प्रगति'],
      'Learning progress helps you track topics you have started or completed, depending on the website features available.',
      'Learning Progress से आप वेबसाइट पर शुरू किए गए और पूरे किए गए विषयों की प्रगति देख सकते हैं।'
    ),

    record(
      ['login', 'लॉगिन'],
      'Use the Login option on the RAVUKSA FINTECH website to access your account, if account access is available.',
      'अपने अकाउंट में प्रवेश करने के लिए RAVUKSA FINTECH वेबसाइट पर Login विकल्प का उपयोग करें।'
    ),

    record(
      ['register', 'registration', 'रजिस्ट्रेशन'],
      'Use the Register option to create an account if registration is available on the website. Enter accurate information and protect your login details.',
      'यदि वेबसाइट पर Registration उपलब्ध है, तो Register विकल्प से अकाउंट बनाएँ। सही जानकारी दें और अपनी Login Details सुरक्षित रखें।'
    ),

    record(
      ['forgot password', 'पासवर्ड भूल गया'],
      'If you forget your password, use the password recovery option provided by the website or its authentication service.',
      'पासवर्ड भूलने पर वेबसाइट या उसकी Authentication Service में उपलब्ध Password Recovery विकल्प का उपयोग करें।'
    ),

    record(
      ['pwa', 'progressive web app'],
      'A Progressive Web App is a website built with features that can provide an app-like experience, such as installation and selected offline capabilities.',
      'PWA यानी Progressive Web App। यह ऐसी वेबसाइट होती है जो Install होने और कुछ Offline सुविधाओं के साथ ऐप जैसा अनुभव दे सकती है।'
    ),

    record(
      ['offline mode', 'बिना इंटरनेट'],
      'Offline access depends on which website pages and resources have been saved or cached on the device.',
      'Offline Mode में कौन-से पेज खुलेंगे, यह इस बात पर निर्भर करता है कि वेबसाइट की कौन-सी सामग्री डिवाइस में सेव हुई है।'
    ),

    record(
      ['mobile friendly', 'मोबाइल पर वेबसाइट'],
      'A mobile-friendly website adjusts its layout and controls to make content easier to use on smaller screens.',
      'Mobile Friendly Website मोबाइल की छोटी स्क्रीन के अनुसार अपना लेआउट और बटन व्यवस्थित करती है।'
    ),

    record(
      ['privacy', 'गोपनीयता'],
      'Privacy means handling personal information responsibly and explaining how data is collected, used and protected.',
      'Privacy यानी व्यक्तिगत जानकारी की सुरक्षा और उसका जिम्मेदारी से उपयोग। जानकारी के लिए वेबसाइट की Privacy Policy देखें।'
    ),

    record(
      ['terms and conditions', 'नियम और शर्तें'],
      'Terms and Conditions explain the rules that apply when using a website or service.',
      'Terms and Conditions यानी वेबसाइट या सेवा का उपयोग करने से जुड़े नियम और शर्तें।'
    ),

    record(
      ['disclaimer', 'अस्वीकरण'],
      'A disclaimer explains the limits and intended use of information provided by a website.',
      'Disclaimer यानी अस्वीकरण। इसमें वेबसाइट पर दी गई जानकारी के उद्देश्य और उसकी सीमाएँ बताई जाती हैं।'
    ),

    record(
      ['is ravuksa sebi registered', 'ravuksa sebi registration'],
      'Please check RAVUKSA FINTECH official disclosures for its current regulatory status. An educational website should not be assumed to be a SEBI-registered intermediary.',
      'RAVUKSA FINTECH की वर्तमान Regulatory स्थिति के लिए उसकी आधिकारिक जानकारी देखें। केवल Financial Education वेबसाइट होने से SEBI Registration मानकर नहीं चलना चाहिए।'
    ),

    record(
      ['does ravuksa give tips', 'stock tips', 'शेयर टिप्स'],
      'RAVUKSA FINTECH focuses on financial education and market learning. Educational information should not be treated as personalized stock tips or buy/sell recommendations.',
      'RAVUKSA FINTECH का उद्देश्य Financial Education और Market Learning है। यहाँ की शैक्षणिक जानकारी को व्यक्तिगत Stock Tips या Buy/Sell सलाह न मानें।'
    ),

    record(
      ['can i earn money', 'पैसे कमा सकते हैं'],
      'Learning financial concepts can improve understanding, but it does not guarantee income, investment profits or employment.',
      'वित्तीय विषय सीखने से आपकी समझ बेहतर हो सकती है, लेकिन इससे कमाई, निवेश में लाभ या नौकरी की गारंटी नहीं मिलती।'
    ),

    record(
      ['hello', 'hi', 'hey', 'नमस्ते', 'नमस्कार'],
      'Hello! Welcome to RAVUKSA FINTECH. Ask me about financial education, banking, stock markets, mutual funds, savings or website features.',
      'नमस्ते! RAVUKSA FINTECH में आपका स्वागत है। आप मुझसे Financial Education, Banking, Stock Market, Mutual Funds, Saving या वेबसाइट के Features के बारे में पूछ सकते हैं।'
    ),

    record(
      ['thank you', 'thanks', 'धन्यवाद', 'शुक्रिया'],
      'You are welcome! Keep learning with RAVUKSA FINTECH.',
      'आपका स्वागत है! RAVUKSA FINTECH के साथ सीखते रहिए।'
    ),

    record(
      ['who are you', 'tum kaun ho', 'आप कौन हैं'],
      'I am the RAVUKSA FINTECH AI Learning Assistant. I help explain website features and financial education topics using the knowledge available to me.',
      'मैं RAVUKSA FINTECH AI Learning Assistant हूँ। मैं उपलब्ध जानकारी के आधार पर वेबसाइट के Features और Financial Education विषय समझाने में मदद करता हूँ।'
    ),

    record(
      ['what can you do', 'tum kya kar sakte ho', 'आप क्या कर सकते हैं'],
      'I can explain financial concepts, website features, banking terms, market terminology and educational calculators covered in my knowledge base.',
      'मैं अपने Knowledge Base में उपलब्ध Financial Concepts, Website Features, Banking Terms, Market Terms और Educational Calculators समझा सकता हूँ।'
    ),

    record(
      ['answer in hindi', 'hindi mein jawab', 'हिंदी में बताओ'],
      'You can ask your question in Hindi. I will use the Hindi explanation available in my knowledge base.',
      'आप अपना सवाल हिंदी में पूछ सकते हैं। मैं उपलब्ध जानकारी के अनुसार हिंदी में समझाने की कोशिश करूँगा।'
    ),

    record(
      ['answer in english', 'english mein jawab'],
      'You can ask your question in English. I will use the English explanation available in my knowledge base.',
      'You can ask your question in English. I will try to explain it using the information available in my knowledge base.'
    ),

         record(
      ['share market', 'stock market', 'शेयर बाजार'],
      'The share market is a marketplace where shares and other eligible securities are bought and sold through recognized exchanges.',
      'Share Market यानी शेयर बाजार। यहाँ मान्यता प्राप्त एक्सचेंज के माध्यम से शेयर और अन्य पात्र प्रतिभूतियों की खरीद-बिक्री होती है।'
    ),

    record(
      ['nifty', 'nifty 50', 'निफ्टी'],
      'NIFTY 50 is a benchmark stock market index representing 50 selected companies listed on the NSE, subject to index methodology.',
      'NIFTY 50 NSE का प्रमुख इंडेक्स है, जिसमें इंडेक्स के नियमों के अनुसार चुनी गई 50 कंपनियाँ शामिल होती हैं।'
    ),

    record(
      ['sensex', 'सेंसेक्स'],
      'SENSEX is a benchmark index of the BSE that tracks a selection of major listed companies.',
      'SENSEX BSE का प्रमुख इंडेक्स है, जो चुनी हुई बड़ी सूचीबद्ध कंपनियों के प्रदर्शन को दर्शाता है।'
    ),

    record(
      ['index', 'market index', 'इंडेक्स'],
      'A market index measures the performance of a selected group of securities according to a defined methodology.',
      'Market Index यानी चुनी हुई प्रतिभूतियों के समूह के प्रदर्शन को मापने वाला सूचकांक।'
    ),

    record(
      ['bull market', 'तेजी का बाजार'],
      'A bull market is a period in which market prices generally show a sustained upward trend.',
      'Bull Market यानी ऐसा बाजार जिसमें कीमतों में सामान्यतः लगातार तेजी का रुझान रहता है।'
    ),

    record(
      ['bear market', 'मंदी का बाजार'],
      'A bear market is a period in which market prices generally show a sustained downward trend.',
      'Bear Market यानी ऐसा बाजार जिसमें कीमतों में सामान्यतः लगातार गिरावट का रुझान रहता है।'
    ),

    record(
      ['market order', 'मार्केट ऑर्डर'],
      'A market order instructs a broker to buy or sell immediately at the best available market price. The execution price may vary.',
      'Market Order में उपलब्ध बाजार कीमत पर तुरंत खरीदने या बेचने का निर्देश दिया जाता है। वास्तविक कीमत बदल सकती है।'
    ),

    record(
      ['limit order', 'लिमिट ऑर्डर'],
      'A limit order specifies the maximum price a buyer is willing to pay or the minimum price a seller is willing to accept.',
      'Limit Order में खरीदने की अधिकतम या बेचने की न्यूनतम कीमत तय की जाती है। ऑर्डर पूरा होना सुनिश्चित नहीं होता।'
    ),

    record(
      ['intraday trading', 'इंट्राडे ट्रेडिंग'],
      'Intraday trading means opening and closing a trading position within the same trading day.',
      'Intraday Trading में एक ही कारोबारी दिन के भीतर ट्रेडिंग पोजीशन खोली और बंद की जाती है। इसमें जोखिम अधिक हो सकता है।'
    ),

    record(
      ['delivery trading', 'डिलीवरी ट्रेडिंग'],
      'Delivery trading involves buying securities and holding them in a demat account beyond the trading day, subject to settlement rules.',
      'Delivery Trading में खरीदी गई प्रतिभूतियों को सेटलमेंट के बाद Demat Account में रखा जाता है।'
    ),

    record(
      ['trading volume', 'ट्रेडिंग वॉल्यूम'],
      'Trading volume is the number of shares or contracts traded during a specified period.',
      'Trading Volume यानी किसी निश्चित अवधि में खरीदे और बेचे गए शेयरों या कॉन्ट्रैक्ट की संख्या।'
    ),

    record(
      ['liquidity risk', 'लिक्विडिटी रिस्क'],
      'Liquidity risk is the possibility that an asset cannot be sold quickly at a reasonable price.',
      'Liquidity Risk यानी किसी संपत्ति को जल्दी और उचित कीमत पर बेच पाने में कठिनाई का जोखिम।'
    ),

    record(
      ['capital gain', 'पूंजीगत लाभ'],
      'A capital gain is the profit made when an asset is sold for more than its purchase cost, subject to applicable tax rules.',
      'Capital Gain यानी किसी संपत्ति को उसकी खरीद लागत से अधिक कीमत पर बेचने से होने वाला लाभ। इस पर लागू टैक्स नियम भी समझने चाहिए।'
    ),

    record(
      ['capital loss', 'पूंजीगत नुकसान'],
      'A capital loss occurs when an asset is sold for less than its purchase cost.',
      'Capital Loss यानी किसी संपत्ति को उसकी खरीद लागत से कम कीमत पर बेचने से होने वाला नुकसान।'
    ),

    record(
      ['real return', 'वास्तविक रिटर्न'],
      'Real return is the return on an investment after adjusting for inflation.',
      'Real Return यानी महंगाई के प्रभाव को घटाने के बाद निवेश से मिलने वाला वास्तविक रिटर्न।'
    ),

    record(
      ['nominal return', 'नाममात्र रिटर्न'],
      'Nominal return is the stated investment return before adjusting for inflation.',
      'Nominal Return यानी महंगाई का प्रभाव घटाने से पहले दिखाया गया निवेश रिटर्न।'
    ),

    record(
      ['expense ratio', 'एक्सपेंस रेशियो'],
      'The expense ratio is the annual operating expense charged by a mutual fund, expressed as a percentage of its assets.',
      'Expense Ratio यानी Mutual Fund के संचालन खर्च का वार्षिक प्रतिशत।'
    ),

    record(
      ['exit load', 'एग्जिट लोड'],
      'Exit load is a charge that may apply when an investor redeems mutual fund units within a specified period.',
      'Exit Load यानी तय अवधि से पहले Mutual Fund से पैसा निकालने पर लगने वाला शुल्क, यदि योजना में लागू हो।'
    ),

    record(
      ['aum', 'assets under management'],
      'AUM is the total market value of assets managed by a financial institution or investment fund.',
      'AUM यानी Assets Under Management। यह किसी फंड या वित्तीय संस्था द्वारा संभाली जा रही कुल संपत्ति का मूल्य है।'
    ),

    record(
      ['nav', 'net asset value'],
      'NAV is the per-unit value of a mutual fund scheme calculated using its assets and liabilities.',
      'NAV यानी Net Asset Value। यह Mutual Fund की प्रति यूनिट की गणना की गई कीमत होती है।'
    ),

    record(
      ['equity', 'इक्विटी'],
      'Equity represents ownership in a company. Equity shares may provide returns through price changes and dividends, but involve risk.',
      'Equity यानी कंपनी में हिस्सेदारी। इससे कीमत बढ़ने या Dividend के जरिए लाभ हो सकता है, लेकिन नुकसान का जोखिम भी रहता है।'
    ),

    record(
      ['debt fund', 'डेट फंड'],
      'A debt fund invests mainly in fixed-income securities such as bonds and money market instruments. It is not risk-free.',
      'Debt Fund मुख्यतः Bonds और Money Market Instruments में निवेश करता है। इसमें भी जोखिम हो सकता है।'
    ),

    record(
      ['hybrid fund', 'हाइब्रिड फंड'],
      'A hybrid fund invests in a combination of asset classes such as equity and debt.',
      'Hybrid Fund में Equity और Debt जैसी एक से अधिक Asset Classes में निवेश किया जाता है।'
    ),

    record(
      ['etf', 'exchange traded fund'],
      'An ETF is an investment fund whose units trade on a stock exchange. Its price can change during market hours.',
      'ETF यानी Exchange Traded Fund। इसकी यूनिट स्टॉक एक्सचेंज पर खरीदी और बेची जा सकती हैं तथा कीमत बदल सकती है।'
    ),

    record(
      ['index fund', 'इंडेक्स फंड'],
      'An index fund aims to track the performance of a selected market index, subject to tracking differences and expenses.',
      'Index Fund किसी चुने हुए Market Index के प्रदर्शन को दोहराने का प्रयास करता है। खर्च और Tracking Difference हो सकते हैं।'
    ),

    record(
      ['gold investment', 'सोने में निवेश'],
      'Gold investment can be made through different forms such as physical gold, gold ETFs and eligible gold-related products. Each has different costs and risks.',
      'सोने में निवेश Physical Gold, Gold ETF और अन्य पात्र माध्यमों से किया जा सकता है। हर माध्यम के खर्च और जोखिम अलग होते हैं।'
    ),

    record(
      ['real estate', 'रियल एस्टेट'],
      'Real estate refers to land and buildings. Property investments can involve liquidity, legal, maintenance and market risks.',
      'Real Estate यानी जमीन और इमारत जैसी अचल संपत्ति। इसमें Liquidity, कानूनी, रखरखाव और बाजार से जुड़े जोखिम हो सकते हैं।'
    ),

    record(
      ['financial independence', 'वित्तीय स्वतंत्रता'],
      'Financial independence means having sufficient financial resources to meet needs and goals without depending entirely on regular employment income.',
      'Financial Independence यानी अपनी जरूरतों और लक्ष्यों के लिए पर्याप्त वित्तीय संसाधन होना, ताकि केवल नियमित नौकरी की आय पर निर्भर न रहना पड़े।'
    ),

    record(
      ['retirement planning', 'रिटायरमेंट प्लानिंग'],
      'Retirement planning involves estimating future expenses and preparing savings and investments for life after employment.',
      'Retirement Planning यानी नौकरी या काम से रिटायर होने के बाद की जरूरतों के लिए पहले से बचत और निवेश की योजना बनाना।'
    ),

    record(
      ['passive income', 'निष्क्रिय आय'],
      'Passive income refers to earnings that may continue with limited ongoing involvement, although many sources require effort, capital or maintenance.',
      'Passive Income यानी ऐसी आय जिसमें लगातार सक्रिय काम कम हो सकता है, लेकिन इसके लिए शुरुआती मेहनत, पूंजी या रखरखाव की जरूरत हो सकती है।'
    ),

    record(
      ['active income', 'सक्रिय आय'],
      'Active income is money earned by directly providing work or services, such as salary or professional fees.',
      'Active Income यानी काम या सेवाएँ देकर कमाई गई आय, जैसे वेतन या प्रोफेशनल फीस।'
    ),

    record(
      ['financial discipline', 'वित्तीय अनुशासन'],
      'Financial discipline means following a consistent approach to budgeting, saving, spending and managing financial obligations.',
      'Financial Discipline यानी बजट, बचत, खर्च और वित्तीय जिम्मेदारियों को नियमित और अनुशासित तरीके से संभालना।'
    ),

    record(
      ['dividend yield', 'डिविडेंड यील्ड'],
      'Dividend yield compares the annual dividend per share with the current share price. It can change as either value changes.',
      'Dividend Yield वार्षिक प्रति शेयर Dividend की तुलना मौजूदा शेयर कीमत से करता है। दोनों में बदलाव होने पर यह भी बदल सकता है।'
    ),

    record(
      ['rights issue', 'राइट्स इश्यू'],
      'A rights issue is an offer by a company to its existing shareholders to buy additional shares under specified terms.',
      'Rights Issue में कंपनी अपने मौजूदा शेयरधारकों को तय शर्तों के अनुसार अतिरिक्त शेयर खरीदने का अवसर देती है।'
    ),

    record(
      ['bonus shares', 'बोनस शेयर'],
      'Bonus shares are additional shares issued to existing shareholders without a separate payment, according to the issue terms.',
      'Bonus Shares कंपनी द्वारा मौजूदा शेयरधारकों को जारी किए गए अतिरिक्त शेयर होते हैं। इनकी शर्तें कंपनी की घोषणा पर निर्भर करती हैं।'
    ),

    record(
      ['stock split', 'शेयर स्प्लिट'],
      'A stock split increases the number of shares by dividing existing shares into smaller units. It does not by itself increase the total investment value.',
      'Stock Split में मौजूदा शेयरों को छोटे हिस्सों में बाँटकर शेयरों की संख्या बढ़ाई जाती है। इससे अपने आप कुल निवेश मूल्य नहीं बढ़ता।'
    ),

    record(
      ['buyback', 'शेयर बायबैक'],
      'A buyback occurs when a company purchases its own shares according to applicable rules and announced terms.',
      'Buyback यानी कंपनी द्वारा लागू नियमों और घोषित शर्तों के अनुसार अपने ही शेयर वापस खरीदना।'
    ),

    record(
      ['wrong spelling', 'typing mistake', 'गलत स्पेलिंग'],
      'If your question contains a typing mistake, try using a short keyword or the full financial term. I will match it with the available knowledge.',
      'यदि सवाल में टाइपिंग की गलती हो, तो छोटा कीवर्ड या पूरा वित्तीय शब्द लिखकर पूछें। मैं उपलब्ध जानकारी से मिलाने की कोशिश करूँगा।'
    ),

         record(
      ['what is investment', 'investment kya hai', 'निवेश क्या है'],
      'Investment means putting money into an asset or financial product with the expectation of potential future returns. Losses are also possible.',
      'Investment यानी भविष्य में संभावित लाभ पाने की उम्मीद से किसी संपत्ति या वित्तीय उत्पाद में पैसा लगाना। इसमें नुकसान भी हो सकता है।'
    ),

    record(
      ['where to start', 'kahan se shuru kare', 'कहाँ से शुरू करें'],
      'Start with the Learning Center and study basic topics such as saving, budgeting, banking and risk before moving to advanced market topics.',
      'शुरुआत Learning Center से करें। पहले Saving, Budgeting, Banking और Risk जैसे बुनियादी विषय सीखें, फिर बाजार के उन्नत विषयों पर जाएँ।'
    ),

    record(
      ['is investment safe', 'kya investment safe hai', 'क्या निवेश सुरक्षित है'],
      'Every investment has some form of risk. Risk depends on the product, market conditions, time horizon and other factors. Read official documents before investing.',
      'हर निवेश में किसी न किसी प्रकार का जोखिम होता है। जोखिम उत्पाद, बाजार की स्थिति और निवेश अवधि पर निर्भर करता है। निवेश से पहले आधिकारिक दस्तावेज पढ़ें।'
    ),

    record(
      ['how to avoid fraud', 'fraud se kaise bache', 'धोखाधड़ी से कैसे बचें'],
      'Verify financial institutions and intermediaries through official sources. Never share OTP, PIN or passwords, and be cautious of guaranteed-return claims.',
      'वित्तीय संस्थाओं और मध्यस्थों की जानकारी आधिकारिक स्रोतों से जाँचें। OTP, PIN और Password साझा न करें। गारंटीड रिटर्न के दावों से सावधान रहें।'
    ),

    record(
      ['what is roi', 'return on investment'],
      'ROI, or Return on Investment, measures the gain or loss relative to the amount invested. The calculation method and time period should be considered.',
      'ROI यानी Return on Investment। यह निवेश की गई राशि की तुलना में हुए लाभ या नुकसान को मापता है। इसकी गणना में समय अवधि का ध्यान रखना चाहिए।'
    ),

    record(
      ['what is sip', 'sip kya hai', 'एसआईपी क्या है'],
      'SIP is a method of investing a fixed amount regularly in a mutual fund scheme. It does not guarantee profits or protect against losses.',
      'SIP यानी Systematic Investment Plan। इसमें Mutual Fund योजना में नियमित अंतराल पर एक निश्चित राशि निवेश की जाती है। लाभ की गारंटी नहीं होती।'
    ),

    record(
      ['what is mutual fund', 'mutual fund kya hai', 'म्यूचुअल फंड क्या है'],
      'A mutual fund pools money from investors and invests it according to the scheme objective. Its value can rise or fall.',
      'Mutual Fund में कई निवेशकों का पैसा एकत्र करके योजना के उद्देश्य के अनुसार निवेश किया जाता है। इसका मूल्य बढ़ या घट सकता है।'
    ),

    record(
      ['what is ipo', 'ipo kya hai', 'आईपीओ क्या है'],
      'An Initial Public Offering is when a company offers its shares to the public for the first time, subject to applicable rules.',
      'IPO यानी Initial Public Offering। जब कोई कंपनी पहली बार अपने शेयर जनता को खरीदने के लिए पेश करती है, तो उसे IPO कहते हैं।'
    ),

    record(
      ['what is dividend', 'dividend kya hai', 'डिविडेंड क्या है'],
      'A dividend is a distribution of a company’s profits or reserves to shareholders, when declared by the company.',
      'Dividend यानी कंपनी द्वारा घोषित लाभ या रिजर्व का वह हिस्सा जो पात्र शेयरधारकों को दिया जाता है।'
    ),

    record(
      ['what is demat', 'demat kya hai', 'डीमैट क्या है'],
      'A Demat account holds eligible securities electronically. It is commonly used for holding shares in electronic form.',
      'Demat Account में शेयर और अन्य पात्र प्रतिभूतियाँ इलेक्ट्रॉनिक रूप में रखी जाती हैं।'
    ),

    record(
      ['what is inflation', 'inflation kya hai', 'महंगाई क्या है'],
      'Inflation is the general increase in prices over time. It reduces the amount of goods and services that the same money can buy.',
      'Inflation यानी समय के साथ वस्तुओं और सेवाओं की कीमतों में सामान्य वृद्धि। इससे समान पैसे से कम सामान खरीदा जा सकता है।'
    ),

    record(
      ['what is compound interest', 'चक्रवृद्धि ब्याज क्या है'],
      'Compound interest is calculated on the original principal and on interest accumulated in earlier periods.',
      'Compound Interest यानी मूलधन के साथ पहले से जमा ब्याज पर भी ब्याज की गणना होना।'
    ),

    record(
      ['what is simple interest', 'साधारण ब्याज'],
      'Simple interest is calculated only on the original principal amount for the specified period.',
      'Simple Interest यानी साधारण ब्याज। इसकी गणना केवल मूलधन पर की जाती है।'
    ),

    record(
      ['what is diversification', 'diversification kya hai'],
      'Diversification means spreading investments across different assets or categories instead of depending on only one.',
      'Diversification यानी पूरे निवेश को एक जगह रखने के बजाय अलग-अलग संपत्तियों या श्रेणियों में बाँटना।'
    ),

    record(
      ['what is risk management', 'risk management kya hai'],
      'Risk management involves identifying and understanding possible risks and taking steps to manage their impact.',
      'Risk Management यानी संभावित जोखिमों को पहचानना, समझना और उनके प्रभाव को संभालने के उपाय करना।'
    ),

    record(
      ['what is financial goal planner', 'goal planner kaise use kare'],
      'Enter your financial goal, target amount, current savings and time period in the Financial Goal Planner to estimate the savings required.',
      'Financial Goal Planner में अपना लक्ष्य, Target Amount, Current Savings और समय अवधि दर्ज करें। इससे आवश्यक बचत का अनुमान मिलेगा।'
    ),

    record(
      ['what is decision lab', 'decision lab kya hai'],
      'Decision Lab provides educational practice for understanding budgeting, saving and everyday financial decisions.',
      'Decision Lab में Budgeting, Saving और रोजमर्रा के वित्तीय फैसलों को समझने के लिए अभ्यास दिए जाते हैं।'
    ),

    record(
      ['what is financial dictionary', 'dictionary kaise use kare'],
      'Use the Financial Dictionary search box or category filters to find explanations of financial terms.',
      'Financial Dictionary में Search Box या Category Filters का उपयोग करके वित्तीय शब्दों के अर्थ खोजें।'
    ),

    record(
      ['website not opening', 'site not working', 'वेबसाइट नहीं खुल रही'],
      'Check your internet connection and refresh the page. If the issue continues, try opening the website again after some time.',
      'अपना Internet Connection जाँचें और पेज Refresh करें। समस्या बनी रहे तो कुछ समय बाद वेबसाइट दोबारा खोलें।'
    ),

    record(
      ['chatbot not answering', 'assistant not working', 'चैटबॉट जवाब नहीं दे रहा'],
      'Try asking with a short, clear keyword. The assistant can answer only from the topics and matching phrases included in its knowledge base.',
      'छोटे और स्पष्ट शब्दों में सवाल पूछें। यह Assistant केवल अपने Knowledge Base में उपलब्ध विषयों और उनसे मेल खाने वाले शब्दों के आधार पर जवाब दे सकता है।'
    ),

    record(
      ['unknown question', 'not found', 'जवाब नहीं मिला'],
      'I could not find a reliable matching answer in my current knowledge base. Try another wording or visit the relevant RAVUKSA FINTECH learning section.',
      'मुझे अपने मौजूदा Knowledge Base में इस सवाल का सही मेल नहीं मिला। सवाल को दूसरे शब्दों में पूछें या RAVUKSA FINTECH के संबंधित Learning Section को देखें।'
    ),

    record(
      ['good morning', 'सुप्रभात'],
      'Good morning! What would you like to learn about today?',
      'सुप्रभात! आज आप किस विषय के बारे में सीखना चाहेंगे?'
    ),

    record(
      ['good evening', 'शुभ संध्या'],
      'Good evening! Welcome to RAVUKSA FINTECH. How can I help you learn today?',
      'शुभ संध्या! RAVUKSA FINTECH में आपका स्वागत है। आज मैं आपको क्या समझाने में मदद करूँ?'
    ),

    record(
      ['good night', 'शुभ रात्रि'],
      'Good night! Keep learning and stay financially aware.',
      'शुभ रात्रि! सीखते रहिए और वित्तीय रूप से जागरूक रहिए।'
    ),

     
