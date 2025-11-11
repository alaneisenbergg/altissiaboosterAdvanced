# ⚡ Quick Start Guide - Advanced Version

Get Altissia Booster Advanced running in under 5 minutes!

## 🚀 Prerequisites

You need:
- **Node.js** (v18+)
- **MongoDB** (running locally)
- **Chromium/Chrome** browser

## 📦 Installation (3 commands)

```bash
# 1. Clone and navigate
git clone https://github.com/yourusername/altissiaboosterAdvanced.git
cd altissiaboosterAdvanced

# 2. Install dependencies (both server & client)
cd server && npm install && cd ../client && npm install && cd ..

# 3. Start everything
./start.sh
```

That's it! Open http://localhost:5173 in your browser.

## 🔧 Manual Setup (if script doesn't work)

### Terminal 1 - Start MongoDB
```bash
sudo systemctl start mongodb
```

### Terminal 2 - Start Server
```bash
cd server
npm start
```

### Terminal 3 - Start Client
```bash
cd client
npm run dev
```

## ⚙️ Configuration (Optional)

Only needed if you want custom ports:

### Server `.env`
```bash
cd server
cat > .env << EOF
BACKENDHOST=http://localhost:5000
FRONTENDHOST=http://localhost:5173
EOF
```

### Client `.env`
```bash
cd client
cat > .env << EOF
VITE_BACKENDHOST=http://localhost:5000
VITE_FRONTENDHOST=http://localhost:5173
EOF
```

## 🎮 Usage

### Basic Usage
1. **Open browser** → http://localhost:5173
2. **Login** with your Altissia credentials
3. **Navigate to Dashboard**
4. **Select options**:
   - Level (A1-, A1, A2, B1, B2, C1)
   - Activity
   - Module
5. **Click "Start Automation"**
6. **Watch it work!** ✨

### Advanced Features

#### Language Switching
```
1. Go to Dashboard
2. Click "Switch Language"
3. Select French or English
4. Wait for automation to complete
5. Dashboard updates with new language
```

#### Specific Task Selection
```
1. Choose Level: A1
2. Choose Activity: "Give Your Personal Information"
3. Choose Module: "Meet Someone New"
4. Click "Run Activities"
5. Automation targets exactly this task
```

#### Hours Tracking
```
1. Click "Track Hours"
2. Automation keeps platform active
3. Hours accumulate automatically
4. Click "Stop" when done
```

## 🆘 Troubleshooting

### Port 5000 already in use?
```bash
# Kill existing process
fuser -k 5000/tcp

# Or change port in server/.env
echo "PORT=5001" >> server/.env
```

### MongoDB not running?
```bash
# Start MongoDB
sudo systemctl start mongodb

# Enable on boot
sudo systemctl enable mongodb

# Verify it's running
mongosh
```

### Chromium not found?
Update `server/index.js` line 61 with your browser path:
```javascript
executablePath: '/usr/bin/chromium',  // or your path
```

Find it with:
```bash
which chromium chromium-browser google-chrome
```

### Activities not completing?
- Run with `headless: false` to see what's happening
- Check if Altissia updated their UI
- Verify activity data matches current platform

### Language switch fails?
- Ensure you're on dashboard before switching
- Check program type is "Programme complet"
- Verify language data in `client/src/main.jsx`

## 💡 Tips

- Set `headless: false` in `server/index.js` to watch automation
- Check `http://localhost:5000` to verify server is running
- Use `pm2` for production deployments
- Check MongoDB with: `mongosh`
- View logs in terminal for debugging

## 🎯 Advanced vs Basic

**Use Advanced Version** if you:
- ✅ Need specific activities completed
- ✅ Want to switch between languages
- ✅ Require detailed progress tracking
- ✅ Need granular control

**Use Basic Version** if you:
- ✅ Just need hours quickly
- ✅ Don't care which tasks
- ✅ Want simple setup

## 📚 More Info

- **Full Documentation**: [README.md](README.md)
- **Contributing**: [CONTRIBUTING.md](CONTRIBUTING.md)
- **Basic Version**: [altissiaBooster](https://github.com/yourusername/altissiaBooster)

## 🌟 Key Features

- 🎯 **Specific Task Selection** - Choose exact activities
- 🌍 **Language Switching** - French ↔ English
- 📊 **Progress Tracking** - Detailed per level
- 🎨 **Enhanced Dashboard** - Visual indicators
- 🤖 **Smart Automation** - Multiple exercise types

---

**Need help?** Check the [full README](README.md) or open an issue!

**Ready to automate?** Let's go! 🚀
