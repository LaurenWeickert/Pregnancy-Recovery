# Whoop Postpartum Chat

A mobile application designed to help new mothers track and manage their postpartum recovery using Whoop health data and an AI-powered chat assistant.

## Project Overview

This application combines health data visualization with an intelligent chat interface to provide personalized guidance for postpartum recovery. By leveraging Whoop wearable data, the app offers insights into key health metrics and provides contextual recommendations based on the user's recovery progress.

## Features

### AI-Powered Chat Assistant
- Personalized guidance for postpartum recovery
- Contextual responses based on health metrics
- Chat history with previous conversations
- Real-time messaging interface

### Health Insights Dashboard
- Visualization of key health metrics:
  - Heart Rate (current, resting, max)
  - Recovery Score
  - Sleep Quality
  - Hydration Level
  - Daily Strain
- Detailed trend analysis for each metric
- Personalized recommendations based on health data

### User Profile
- User settings and preferences
- Health data overview

## Technical Details

### Tech Stack
- **Framework**: React Native with Expo
- **State Management**: Zustand
- **Local Storage**: AsyncStorage / Expo SecureStore
- **UI Components**: Custom components with Tailwind CSS
- **Routing**: Expo Router
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Build Tools**: Vite, TypeScript, ESLint

### Project Structure
- Modern tab-based navigation
- Clean separation of concerns (components, data, hooks)
- Mock data generation for development and testing
- Responsive design for different device sizes

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI

### Installation
1. Clone the repository
```bash
git clone [repository-url]
cd whoop-postpartum-chat
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

## Development Roadmap

- [ ] Complete integration with Whoop API
- [ ] Enhance AI chat capabilities with more personalized responses
- [ ] Implement local authentication flow
- [ ] Add persistent local storage for chat history and preferences
- [ ] Expand health trend visualizations
- [ ] Add notification system for health insights

## License

[MIT License](LICENSE)

## Acknowledgments

- Whoop for health tracking technology
- Expo for the React Native development framework
