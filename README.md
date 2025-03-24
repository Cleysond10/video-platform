# VEx - Video Experience Platform

A modern video streaming platform built with Next.js 15, React, and TypeScript. This application allows users to browse, search, and watch videos from YouTube and Vimeo, with features like favorites, autoplay, theme toggle and responsive design.

Access the app website in this link: https://vexplatform.netlify.app/

## 📋 Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Usage Guide](#usage-guide)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Video Integration**: Embed and play videos from YouTube and Vimeo
- **Video Browsing**: Browse through a collection of videos with thumbnail previews
- **Search Functionality**: Search videos by title, description, or channel
- **Favorites System**: Add videos to favorites and access them in a dedicated tab
- **Autoplay**: Automatically play the video when clicked
- **Responsive Design**: Fully responsive UI that works on mobile, tablet, and desktop
- **Interactive UI**: Hover effects, animations, and visual feedback for user interactions
- **Pagination**: Navigate through video listings with a clean pagination interface

## 🛠️ Technologies

### Core Technologies
- **Next.js 15**: React framework with App Router for routing and server components
- **React 18**: UI library for building component-based interfaces
- **TypeScript**: Static type checking for improved developer experience
- **TanStack Query (React Query)**: Data fetching, caching, and state management
- **Vitest and react-testing-library**: Libraries to coverage and secure the project with unit tests

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components built with Radix UI and Tailwind
- **Lucide React**: Beautifully crafted open-source icons

### APIs and Integrations
- **iframe Player**: For embedding and controlling YouTube, Vimeo or other videos.

### State Management
- **React Hooks**: For local component state
- **TanStack Query**: For server state management
- **localStorage**: For persisting user preferences (favorites)

## 📋 Requirements

- Node.js 18.17.0 or later
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/videostream.git
cd videostream
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

## 🏃‍♂️ Running the Project

1. **Development Mode**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🔍 Testing

1. **In Watch Mode**

Run the following command.

```bash
npm run test
# or
yarn test
```
Open your terminal to see your tests status and progress.


## 📖 Usage Guide

### Browsing Videos

- The home page displays a grid of available videos
- Click on any video card to open the video player
- Use the pagination controls at the bottom to navigate through more videos

### Searching Videos

- Use the search bar at the top to find videos by title, description, or channel
- Search works in both the "All Videos" and "Favorites" tabs

### Managing Favorites

- Click the heart icon on any video card to add it to your favorites
- Access your favorite videos by clicking the "Favorites" tab
- Click the heart icon again to remove a video from favorites

### Video AutoPlay

- Videos automatically play when opened

### Responsive Design

- The application works on mobile, tablet, and desktop devices
- The layout adapts to different screen sizes for optimal viewing experience

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
