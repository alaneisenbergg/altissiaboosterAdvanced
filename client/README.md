# Altissia Booster Advanced - Client

Frontend React application for the Altissia Booster Advanced automation tool.

## Features

- **Advanced Dashboard** - Full progress tracking with visual indicators
- **Task Selection** - Choose specific levels, activities, and modules
- **Language Switching** - Toggle between French and English
- **Real-time Updates** - Socket.IO for live progress
- **Activity Metadata** - 700+ activities mapped

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **Flowbite** - UI components
- **Socket.IO Client** - Real-time communication
- **React Router** - Navigation
- **FontAwesome** - Icons

## Running

```bash
npm install
npm run dev
```

## Configuration

Create a `.env` file:

```env
VITE_BACKENDHOST=http://localhost:5000
VITE_FRONTENDHOST=http://localhost:5173
```

## Components

- **`main.jsx`** - Entry point with activity data (760 lines)
- **`dashboard.jsx`** - Advanced dashboard with progress tracking
- **`login.jsx`** - Login page with status updates
- **`App.jsx`** - Basic automation component

For more information, see the [main README](../README.md).
