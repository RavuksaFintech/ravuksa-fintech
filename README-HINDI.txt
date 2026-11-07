RAVUKSA FINTECH — Modular Homepage Starter

इस पैकेज में मौजूदा Homepage को बिना visual redesign किए modular structure में बाँटा गया है। यह पहला सुरक्षित आधार है; अगला चरण mobile menu और homepage layout को redesign करना होगा।

क्या बदला गया:
1. index.html के सबसे ऊपर Jekyll front matter (---) जोड़ा गया है ताकि GitHub Pages के सामान्य branch deployment में _includes process हों।
2. Homepage के sections _includes/homepage/ में अलग HTML files में रखे गए हैं।
3. Head की inline CSS को css/homepage-base.css में ले जाया गया है।
4. Existing top-level inline JavaScript scripts उसी क्रम में रखे गए हैं; nav के भीतर मौजूद scripts header include के साथ हैं।
5. SEO meta, JSON-LD, canonical और stylesheet references index.html में रखे गए हैं।
6. ZIP snapshot के बाद user द्वारा बताए गए SEO/social-preview और favicon commits भी लागू किए गए हैं।

ध्यान दें:
- यह package 7 Nov ZIP snapshot पर आधारित है। इसके बाद Homepage में हुए अन्य बदलाव इसमें स्वतः शामिल नहीं हो सकते।
- इसे main branch पर सीधे replace करने से पहले GitHub Pages Settings > Pages में Source जाँचें। सामान्य branch deployment (Deploy from a branch, main, /(root)) Jekyll includes को process करता है। यदि Source GitHub Actions है, तो पहले build workflow चाहिए।
- पहले test branch/preview में Homepage, mobile menu, Firebase login/profile, learning progress, market dashboard, calculators, PWA install और footer links जाँचें।
- यह local include expansion sanity check पास करता है; इसे live GitHub Pages deployment या device-browser testing न समझें।
