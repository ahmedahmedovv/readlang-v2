// First, load the API key
let OPENAI_API_KEY = '';

fetch(chrome.runtime.getURL('.env'))
  .then(response => response.text())
  .then(text => {
    OPENAI_API_KEY = text.split('=')[1].trim();
  });

// Log initial URL and check it
console.log("Current URL:", window.location.href);
handleUrlChange();

// Listen for URL changes
let lastUrl = location.href; 
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    console.log("URL changed to:", url);
    handleUrlChange();
  }
}).observe(document, {subtree: true, childList: true}); 

function handleUrlChange() {
    if (window.location.href === "https://readlang.com/flashcards") {
        let attempts = 0;
        const maxAttempts = 10;
        let lastContent = '';
        let isSpeaking = false;
        let lastSpokenText = '';
        let speakTimeout = null;  // Add timeout tracker
        
        const speakWithOpenAI = async (text) => {
            // Clear any pending speech timeout
            if (speakTimeout) {
                clearTimeout(speakTimeout);
                speakTimeout = null;
            }
            
            // Don't speak if same text or already speaking
            if (text === lastSpokenText || isSpeaking) {
                return;
            }
            
            if (!OPENAI_API_KEY) {
                console.error('OpenAI API key not loaded');
                return;
            }
            
            // Add delay before speaking
            await new Promise(resolve => setTimeout(resolve, 100));
            
            try {
                isSpeaking = true;
                lastSpokenText = text;
                
                const response = await fetch('https://api.openai.com/v1/audio/speech', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${OPENAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: 'tts-1',
                        input: text,
                        voice: 'alloy'
                    })
                });

                if (!response.ok) throw new Error('Speech generation failed');

                const audioBlob = await response.blob();
                const audio = new Audio(URL.createObjectURL(audioBlob));
                
                audio.onended = () => {
                    isSpeaking = false;
                    // Wait a bit before allowing the same text again
                    speakTimeout = setTimeout(() => {
                        lastSpokenText = '';
                    }, 2000);
                };
                
                audio.play();
            } catch (error) {
                console.error('OpenAI TTS Error:', error);
                isSpeaking = false;
                lastSpokenText = '';
            }
        };
        
        const checkContent = () => {
            const xpath = "/html/body/div[1]/div[3]/div/div/div[2]/div[1]";
            
            const element = document.evaluate(
                xpath, 
                document, 
                null, 
                XPathResult.FIRST_ORDERED_NODE_TYPE, 
                null
            ).singleNodeValue;
            
            if (element) {
                const text = element.textContent.trim();
                
                if (text !== lastContent) {
                    if (!text.includes('Loading context...') && 
                        !text.includes('No context') && 
                        !text.includes('_')) {
                        console.log("Element content:", text);
                        speakWithOpenAI(text);
                    }
                    lastContent = text;
                }
                setTimeout(checkContent, 1000);  // Increased interval to 1 second
            } else if (attempts < maxAttempts) {
                attempts++;
                setTimeout(checkContent, 1000);
            }
        };
        
        // Clear any existing timeout when starting
        if (speakTimeout) {
            clearTimeout(speakTimeout);
            speakTimeout = null;
        }
        
        checkContent();
    }
} 