# Altissia Booster Advanced - Server

Backend Node.js server with advanced Puppeteer automation for the Altissia platform.

## Features

- **Specific Task Targeting** - Select exact activities and modules
- **Language Switching** - Automated French/English toggle
- **Progress Analysis** - Detailed tracking per level
- **Multiple Exercise Types** - Handles various activity formats
- **Intelligent Automation** - Smart answer detection and retry logic
- **Real-time Communication** - Socket.IO for live updates

## Tech Stack

- **Node.js** - Runtime
- **Express.js** - Web framework
- **Socket.IO** - Real-time communication
- **Puppeteer Extra** - Browser automation with stealth
- **MongoDB** - Database (via Mongoose)

## Running

```bash
# Install dependencies
npm install

# Start server
npm start

# Development mode (with auto-reload)
npm run dev
```

## Configuration

Create a `.env` file:

```env
BACKENDHOST=http://localhost:5000
FRONTENDHOST=http://localhost:5173
```

## MongoDB

The server connects to MongoDB at `mongodb://localhost:27017/altissiabooster_advanced`

Make sure MongoDB is running:
```bash
sudo systemctl start mongodb
```

## Browser Configuration

The server uses Chromium for automation. Update the path in `index.js` if needed:

```javascript
executablePath: '/usr/bin/chromium',  // Line 61
```

## Socket.IO Events

### Client → Server
- `login` - User authentication with progress updates
- `runActv` - Start specific activity automation
  - Parameters: `{username, email, password, lang, level, actv, msg}`
- `runHours` - Start hours accumulation
- `stopHours` - Stop hours accumulation
- `switchLang` - Change language (French/English)
- `clearSession` - Clear browser session

### Server → Client
- `loginStatus` - Login progress updates
- `loginResponse` - Login result with user data and progress
- `actvStatus` - Activity progress and completion
- `hoursStatus` - Hours tracking status
- `switchStatus` - Language switch confirmation

## Code Structure

- **`index.js`** - Main server file (832 lines)
  - `connecting()` - Handles Azure AD authentication
  - `entering()` - Analyzes progress and extracts data
  - Socket event handlers for automation
  - Exercise type detection and handling
- **`models/User.js`** - User schema with progress tracking
- **`routes/auth.js`** - Authentication routes

## Exercise Types Supported

1. **Multiple Choice** - Detects and clicks correct answers
2. **Drag & Drop** - Performs drag operations
3. **Bubble Selection** - Learns correct answers and retries
4. **Video/Audio** - Waits for media completion
5. **Generic** - Click-through for simple exercises

## Automation Logic

The server intelligently handles different exercise types:

```javascript
if (multipleChoice) {
  // Detect correct answer
  // Click appropriate option
  // Validate and proceed
} else if (dragDrop) {
  // Identify draggable elements
  // Match with drop zones
  // Execute drag operations
} else if (bubble) {
  // Learn correct answers on first attempt
  // Retry with learned data
  // Optimize completion
}
```

## Progress Tracking

The server extracts and stores:
- Current language
- Progress per level (A1- through C1)
- Completed activities per level
- Total hours accumulated

For more information, see the [main README](../README.md).
