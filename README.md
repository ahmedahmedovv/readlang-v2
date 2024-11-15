# Readlang Text-to-Speech Extension

A Chrome extension that automatically reads Readlang flashcards using OpenAI's Text-to-Speech API. This extension enhances your language learning experience by providing audio pronunciation for your flashcards.

## Features

- 🎯 Automatically detects flashcard content changes
- 🔊 Reads flashcard text using OpenAI's TTS API
- 🚫 Skips cards with loading states or no context
- 🔄 Prevents duplicate readings
- ⚡ Low latency with 100ms delay for stability

## Prerequisites

- Google Chrome browser
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
- Active Readlang account

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/readlang-tts-extension.git
   cd readlang-tts-extension
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   ```
   Open `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

3. **Install in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" button
   - Select the extension directory

## Usage

1. Go to [Readlang Flashcards](https://readlang.com/flashcards)
2. The extension will automatically:
   - Monitor flashcard content changes
   - Read new flashcard text using OpenAI's TTS
   - Skip invalid or loading content

## Configuration

The extension includes several configurable parameters in `content.js`:
- Speech delay: 100ms (adjustable)
- Content check interval: 1000ms
- Maximum retry attempts: 10

## Troubleshooting

Common issues and solutions:

1. **No Speech Output**
   - Check if your API key is correctly set in `.env`
   - Ensure you have sufficient OpenAI API credits
   - Check console for error messages

2. **Duplicate Speech**
   - The extension has built-in duplicate prevention
   - If persists, try reloading the page

3. **Extension Not Working**
   - Verify you're on the correct Readlang URL
   - Check if extension is enabled in Chrome
   - Reload the extension in Chrome extensions page

## Security Notes

- Never commit your `.env` file
- Keep your API key private
- Use environment variables for sensitive data
- Regularly rotate your API keys

## Contributing

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- [OpenAI API](https://platform.openai.com/) for Text-to-Speech
- [Readlang](https://readlang.com/) for the flashcard platform

## Support

For support, please open an issue in the repository or contact [your-email@example.com] 