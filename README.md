# 🚀 Altissia Booster Advanced

[![Status](https://img.shields.io/badge/status-archived-red)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/mongodb-8.x-green)](https://www.mongodb.com)
[![Version](https://img.shields.io/badge/version-2.0-orange)](https://github.com)

> **⚠️ This project is now archived.** Mission accomplished. Feel free to use it!

The **Advanced Version** of Altissia Booster - A powerful automation tool with granular control over task selection, language switching, and detailed progress tracking for the Altissia learning platform.

---

## 📖 Table of Contents

- [Why Advanced Version?](#-why-advanced-version)
- [What's New](#-whats-new)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Advanced Features](#-advanced-features)
- [API & Socket Events](#-api--socket-events)
- [Architecture](#-architecture)
- [Comparison](#-comparison-basic-vs-advanced)
- [Screenshots](#-screenshots)
- [Troubleshooting](#-troubleshooting)
- [Disclaimer](#%EF%B8%8F-disclaimer)
- [License](#-license)

---

## 🎯 Why Advanced Version?

### The Evolution

After building the [basic version](https://github.com/yourusername/altissiaBooster), I realized I needed more control:

- ❌ **Basic Version**: Completes random tasks automatically
- ✅ **Advanced Version**: Choose exactly which tasks to complete

### The Problem It Solves

**Scenario**: You need specific activities completed, not just any random ones.

**Example**:
- Level: A1
- Activity: "Give Your Personal Information"  
- Module: "Meet Someone New"

The advanced version lets you target **exactly** these tasks, saving time and ensuring you complete the right requirements.

---

## ✨ What's New

### Major Improvements Over Basic Version

| Feature | Basic | Advanced |
|---------|-------|----------|
| **Task Selection** | ❌ Random | ✅ Specific choice |
| **Language Switching** | ❌ Manual | ✅ Automated (FR/EN) |
| **Progress Tracking** | ⚠️ Basic | ✅ Detailed per level |
| **Dashboard** | ⚠️ Simple | ✅ Full-featured |
| **Activity Metadata** | ❌ None | ✅ 700+ activities mapped |
| **Level Control** | ❌ None | ✅ A1- through C1 |
| **Module Selection** | ❌ None | ✅ Choose specific modules |
| **Real-time Updates** | ✅ Yes | ✅ Enhanced |
| **Error Handling** | ⚠️ Basic | ✅ Robust |

---

## 🌟 Features

### Core Features

#### 1. **Specific Task Selection** 🎯
- Choose exact level (A1-, A1, A2, B1, B2, C1)
- Select specific activities
- Pick individual modules
- Target precise exercises

#### 2. **Language Switching** 🌍
- Toggle between French and English courses
- Automated language change
- Maintains progress across languages
- Seamless switching

#### 3. **Advanced Dashboard** 📊
- Visual progress bars for each level
- Activity completion tracking
- Hours accumulation display
- Real-time status updates
- User profile information

#### 4. **Intelligent Automation** 🤖
- Multiple exercise types supported:
  - **Multiple choice** questions
  - **Drag & drop** exercises
  - **Bubble selection** activities
  - **Video** playback
  - **Audio** exercises
- Smart answer detection
- Retry logic for failed attempts
- Automatic progression

#### 5. **Progress Persistence** 💾
- MongoDB storage for user data
- Session management
- Progress tracking per level
- Activity completion history

#### 6. **Enhanced UI/UX** 🎨
- Modern TailwindCSS design
- Flowbite components
- Responsive layout
- Loading animations
- Error notifications
- Ad-blocker detection

---

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web server framework
- **Socket.IO** - Real-time bidirectional communication
- **Puppeteer Extra** - Browser automation with stealth
- **MongoDB** - Database for user data
- **Mongoose** - MongoDB ODM

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **TailwindCSS** - Utility-first CSS
- **Flowbite** - Component library
- **Socket.IO Client** - Real-time client
- **React Router** - Navigation
- **FontAwesome** - Icons

### Automation
- **Puppeteer Stealth Plugin** - Anti-detection
- **Chromium** - Headless browser
- **CSS Selectors** - Element targeting
- **Event Handling** - User interaction simulation

---

## 📁 Project Structure

```
altissiaboosterAdvanced/
├── server/                          # Backend Node.js server
│   ├── index.js                     # Main server (832 lines)
│   ├── models/
│   │   └── User.js                  # User model schema
│   ├── routes/
│   │   └── auth.js                  # Authentication routes
│   ├── package.json                # Server dependencies
│   └── .env                        # Environment variables
│
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── main.jsx               # Entry point (760 lines)
│   │   ├── App.jsx                # Basic automation component
│   │   ├── dashboard.jsx          # Advanced dashboard (280 lines)
│   │   ├── login.jsx              # Login page (110 lines)
│   │   └── index.css              # Global styles
│   ├── public/
│   │   └── icon.png               # App icon
│   ├── package.json               # Client dependencies
│   └── .env                       # Client environment variables
│
├── .gitignore                     # Git ignore rules
├── README.md                      # This file
├── LICENSE                        # MIT License
└── start.sh                       # Startup script
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org))
- **MongoDB** >= 5.0 ([Installation Guide](https://docs.mongodb.com/manual/installation/))
- **Chromium/Chrome** browser installed
- **Git** for cloning

### On Arch Linux (Recommended)

```bash
# Install dependencies
sudo pacman -S nodejs npm chromium

# Install MongoDB from AUR
yay -S mongodb-bin

# Start MongoDB service
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### On Ubuntu/Debian

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Chromium
sudo apt-get install -y chromium-browser

# Install MongoDB
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

### Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/altissiaboosterAdvanced.git
cd altissiaboosterAdvanced

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

---

## ⚙️ Configuration

### 1. Server Configuration

Create `.env` file in `server/` directory:

```env
# Server Configuration
BACKENDHOST=http://localhost:5000
FRONTENDHOST=http://localhost:5173

# MongoDB (optional if using default)
# MONGO_URI=mongodb://localhost:27017/altissiabooster_advanced
```

### 2. Client Configuration

Create `.env` file in `client/` directory:

```env
# Backend API URL
VITE_BACKENDHOST=http://localhost:5000
VITE_FRONTENDHOST=http://localhost:5173
```

### 3. Update Browser Path (if needed)

Edit `server/index.js` line 61 if your Chromium is in a different location:

```javascript
executablePath: '/usr/bin/chromium',  // Update this path
```

Common paths:
- **Arch Linux**: `/usr/bin/chromium`
- **Ubuntu**: `/usr/bin/chromium-browser`
- **macOS**: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
- **Windows**: `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe`

---

## 💻 Usage

### Starting the Application

#### Quick Start (Using script)

```bash
./start.sh
```

#### Manual Start

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```

### Accessing the Application

Once both services are running:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Network Access**: http://YOUR_LOCAL_IP:5173

---

## 🎮 Advanced Features

### 1. Dashboard Overview

The advanced dashboard provides:

```
┌─────────────────────────────────────────────────┐
│  Altissia Booster Advanced                      │
│  User: John Doe                                 │
│  Language: English                              │
├─────────────────────────────────────────────────┤
│  Progress by Level:                             │
│  ┌─────────────────────────────────────┐       │
│  │ A1-  ████████░░░░░░░░░░░░  35%      │       │
│  │ A1   ██████████████░░░░░░  60%      │       │
│  │ A2   ████░░░░░░░░░░░░░░░░  15%      │       │
│  │ B1   ░░░░░░░░░░░░░░░░░░░░   0%      │       │
│  │ B2   ░░░░░░░░░░░░░░░░░░░░   0%      │       │
│  │ C1   ░░░░░░░░░░░░░░░░░░░░   0%      │       │
│  └─────────────────────────────────────┘       │
├─────────────────────────────────────────────────┤
│  [Switch Language]  [Run Activities]            │
│  [Track Hours]      [Stop]                      │
└─────────────────────────────────────────────────┘
```

### 2. Task Selection Workflow

```javascript
// Example: Selecting specific tasks
{
  level: 'A1',
  activity: 'Give Your Personal Information',
  module: 'Meet Someone New',
  language: 'anglais'  // or 'français'
}
```

### 3. Language Switching

```bash
# Switch from French to English
1. Click "Switch Language" button
2. Select target language
3. Automation handles:
   - Language selection
   - Program type update
   - Progress preservation
   - Dashboard refresh
```

### 4. Activity Metadata

The advanced version includes **700+ lines** of activity data:

```javascript
// French activities (frData)
{
  level: 'A1-',
  activity: 'Saluer',
  modules: [
    'Se présenter',
    'Présenter quelqu\'un',
    // ... more modules
  ]
}

// English activities (enData)
{
  level: 'A1',
  activity: 'Give Your Personal Information',
  modules: [
    'Meet Someone New',
    'Introduce Someone',
    // ... more modules
  ]
}
```

### 5. Exercise Type Handling

The automation intelligently handles:

#### Multiple Choice
```javascript
// Detects correct answer
// Clicks appropriate option
// Validates and proceeds
```

#### Drag & Drop
```javascript
// Identifies draggable elements
// Matches with drop zones
// Executes drag operations
```

#### Bubble Selection
```javascript
// Learns correct answers
// Retries with learned data
// Optimizes completion
```

#### Video/Audio
```javascript
// Waits for media completion
// Handles playback controls
// Proceeds after finish
```

---

## 📡 API & Socket Events

### Socket.IO Events

#### Client → Server

| Event | Payload | Description |
|-------|---------|-------------|
| `login` | `{email, password}` | User authentication |
| `runActv` | `{username, email, password, lang, level, actv, msg}` | Start specific activity |
| `runHours` | `{username, email, password}` | Start hours tracking |
| `stopHours` | `{username}` | Stop hours tracking |
| `switchLang` | `{lang, email, password}` | Change language |
| `clearSession` | `{}` | Clear browser session |

#### Server → Client

| Event | Payload | Description |
|-------|---------|-------------|
| `loginStatus` | `{status, end}` | Login progress |
| `loginResponse` | `{success, userData}` | Login result with user data |
| `actvStatus` | `{status}` | Activity progress |
| `hoursStatus` | `{status, hours}` | Hours tracking status |
| `switchStatus` | `{}` | Language switch confirmation |

---

## 🏗 Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │    Login     │  │  Dashboard   │  │  App (Basic) │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘ │
│         │                  │                  │          │
│         └──────────────────┼──────────────────┘          │
│                            │ Socket.IO                   │
└────────────────────────────┼─────────────────────────────┘
                             │
┌────────────────────────────┼─────────────────────────────┐
│                            │                              │
│                   ┌────────▼────────┐                    │
│                   │  Express Server  │                    │
│                   │   + Socket.IO    │                    │
│                   └────────┬────────┘                    │
│                            │                              │
│         ┌──────────────────┼──────────────────┐          │
│         │                  │                  │          │
│    ┌────▼─────┐    ┌──────▼──────┐    ┌─────▼────┐    │
│    │ Puppeteer│    │   MongoDB   │    │  Routes  │    │
│    │  Stealth │    │   Mongoose  │    │   Auth   │    │
│    └──────────┘    └─────────────┘    └──────────┘    │
│                                                          │
│                  Backend (Node.js)                      │
└──────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Input → React Component → Socket.IO Client
    ↓
Socket.IO Server → Puppeteer Launch → Browser Automation
    ↓
Altissia Platform Interaction → Progress Updates
    ↓
MongoDB Storage ← Socket.IO Server → React Dashboard Update
```

---

## 📊 Comparison: Basic vs Advanced

| Feature | Basic Version | Advanced Version |
|---------|---------------|------------------|
| **Task Selection** | Random tasks | Specific task targeting |
| **Language Control** | Manual only | Automated switching |
| **Dashboard** | Simple status | Full progress tracking |
| **Activity Data** | None | 700+ activities mapped |
| **Level Selection** | No control | A1- through C1 |
| **Module Choice** | Random | Specific modules |
| **Progress Tracking** | Basic counter | Detailed per level |
| **UI Components** | Minimal | Flowbite components |
| **Exercise Types** | Limited | Multiple types |
| **Error Handling** | Basic | Robust retry logic |
| **Code Size** | ~1,500 lines | ~2,000+ lines |
| **Complexity** | Simple | Advanced |
| **Use Case** | Quick hours | Specific requirements |
| **Learning Curve** | Easy | Moderate |

### When to Use Which?

**Use Basic Version** if you:
- Just need to accumulate hours quickly
- Don't care which tasks are completed
- Want simple setup and operation
- Need minimal configuration

**Use Advanced Version** if you:
- Need specific activities completed
- Want to switch between languages
- Require detailed progress tracking
- Need granular control over automation
- Want a professional dashboard

---

## 📸 Screenshots

### Login Page
```
┌─────────────────────────────────────┐
│                                     │
│      [Altissia Logo]                │
│                                     │
│      Login to Altissia Booster      │
│      ┌─────────────────────┐       │
│      │ Email Address       │       │
│      └─────────────────────┘       │
│      ┌─────────────────────┐       │
│      │ Password            │       │
│      └─────────────────────┘       │
│      [Login Button]                │
│                                     │
│      Status: Connecting...          │
└─────────────────────────────────────┘
```

### Advanced Dashboard
```
┌──────────────────────────────────────────────┐
│  Altissia Booster Advanced         [Logout]  │
├──────────────────────────────────────────────┤
│  👤 User: john@ofppt-edu.ma                  │
│  🌍 Language: English                        │
│  ⏱️  Hours: 45.5h                            │
├──────────────────────────────────────────────┤
│  📊 Progress by Level:                       │
│                                              │
│  A1-  [████████████░░░░░░░░] 60% (12/20)   │
│  A1   [██████████████████░░] 90% (18/20)   │
│  A2   [████████░░░░░░░░░░░░] 40% (8/20)    │
│  B1   [██░░░░░░░░░░░░░░░░░░] 10% (2/20)    │
│  B2   [░░░░░░░░░░░░░░░░░░░░]  0% (0/20)    │
│  C1   [░░░░░░░░░░░░░░░░░░░░]  0% (0/20)    │
├──────────────────────────────────────────────┤
│  🎯 Select Activity:                         │
│  Level: [A1 ▼]                              │
│  Activity: [Give Personal Info ▼]           │
│  Module: [Meet Someone New ▼]               │
│                                              │
│  [🚀 Start Automation]  [⏸️ Stop]           │
│  [🔄 Switch Language]   [⏱️ Track Hours]    │
├──────────────────────────────────────────────┤
│  📝 Status: Running activity 3/5...          │
│  ⚡ Last Update: 2 seconds ago               │
└──────────────────────────────────────────────┘
```

---

## 🔧 How It Works

### Automation Process

#### 1. Authentication
```
User Credentials → Azure AD Login → MFA Handling
→ Platform Access → Session Established
```

#### 2. Progress Analysis
```
Dashboard Scan → Extract Levels → Parse Activities
→ Calculate Percentages → Store in MongoDB
```

#### 3. Task Execution
```
Select Level → Choose Activity → Pick Module
→ Launch Exercise → Detect Type → Execute Logic
→ Validate Completion → Move to Next
```

#### 4. Exercise Type Detection
```javascript
if (multipleChoice) {
  // Click correct answer
} else if (dragDrop) {
  // Perform drag operations
} else if (bubble) {
  // Learn and retry
} else if (video) {
  // Wait for completion
} else {
  // Generic click-through
}
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Failed
```bash
# Check if MongoDB is running
sudo systemctl status mongodb

# Start MongoDB
sudo systemctl start mongodb

# Verify connection
mongosh
```

#### 2. Browser Path Error
```bash
# Find your browser
which chromium chromium-browser google-chrome

# Update server/index.js line 61
executablePath: '/your/browser/path'
```

#### 3. Port Already in Use
```bash
# Kill process on port 5000
fuser -k 5000/tcp

# Or use different port in .env
PORT=5001
```

#### 4. Activities Not Completing
- Altissia may have updated their UI (CSS selectors changed)
- Run with `headless: false` to see what's happening
- Check browser console for errors
- Verify activity data matches current platform

#### 5. Language Switch Fails
- Ensure you're on the dashboard before switching
- Check if program type is "Programme complet"
- Verify language data in `main.jsx` is current

---

## ⚠️ Disclaimer

### Legal & Ethical Notice

**IMPORTANT: Read Before Using**

1. **Educational Purpose**: This project was created for educational purposes to learn about:
   - Browser automation
   - Full-stack development
   - Real-time communication
   - Complex state management

2. **Terms of Service**: Using automation tools may violate Altissia's Terms of Service. Use at your own risk.

3. **Academic Integrity**: This tool was created out of frustration with arbitrary requirements. Consider whether using it aligns with your institution's policies.

4. **No Warranty**: This software is provided "as is" without warranty. The authors are not responsible for any consequences.

5. **Archived Status**: This project is no longer actively maintained. It may not work with current versions of Altissia.

6. **Detection Risk**: While using stealth plugins, detection is always possible.

### Ethical Use

- ✅ Use for learning automation concepts
- ✅ Fork and modify for educational purposes
- ✅ Study the code and architecture
- ❌ Don't use to completely bypass learning
- ❌ Don't distribute credentials
- ❌ Don't blame me if caught 😅

---

## 📝 Development

### Running in Development Mode

```bash
# Server with auto-reload
cd server
npm run dev  # if nodemon is configured

# Client with hot reload
cd client
npm run dev
```

### Debugging

Set `headless: false` in `server/index.js` to watch automation:

```javascript
socket.browser = await puppeteer.launch({
    headless: false,  // See browser in action
    // ...
});
```

### Code Structure

- **server/index.js**: Main automation logic (832 lines)
- **client/src/dashboard.jsx**: Advanced UI (280 lines)
- **client/src/main.jsx**: Activity data (760 lines)
- **server/models/User.js**: User schema
- **server/routes/auth.js**: Authentication routes

---

## 🤝 Contributing

This project is **archived**, but you're welcome to:

- 🍴 Fork it and make your own version
- 🐛 Report issues (for documentation)
- 💡 Share improvements
- ⭐ Star it if you found it useful

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

**Translation**: Do whatever you want with this code, just don't sue me.

---

## 🙏 Acknowledgments

- **Puppeteer Team** - Amazing automation library
- **Socket.IO** - Real-time magic
- **React Team** - UI framework
- **My College** - For the motivation 😅
- **Coffee** - Essential fuel
- **Everyone who hates arbitrary requirements** - You're not alone

---

## 📞 Contact & Links

- **Author**: Your Name
- **Basic Version**: [altissiaBooster](https://github.com/yourusername/altissiaBooster)
- **Issues**: Open an issue (archived, but documented)
- **Discussions**: Feel free to discuss

---

## 📊 Stats

- **Lines of Code**: ~2,000+
- **Activity Data**: 700+ activities mapped
- **Exercise Types**: 4+ types supported
- **Languages**: French & English
- **Levels**: 6 levels (A1- to C1)
- **Time Saved**: Countless hours
- **French Learned**: Still hate it
- **Satisfaction**: Mission accomplished

---

## 🔄 Version History

- **v2.0.0** (Current) - Advanced version with task selection
- **v1.0.0** - Basic version (see [basic repo](https://github.com/yourusername/altissiaBooster))

---

<div align="center">

**Made with ☕, 😤, and a lot of CSS selectors**

**[⬆ Back to Top](#-altissia-booster-advanced)**

</div>

---

*Remember: Automation is powerful, but real learning is irreplaceable. Use this tool wisely, and maybe learn some French along the way... or not. I didn't.* 🤖

---

**P.S.** If you're from my college reading this... I eventually passed. The automation just helped with the platform requirements. The learning? That was all me. Mostly. Kind of. 😇
