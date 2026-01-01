# 🗓️ Shift Booking App

A modern, responsive shift booking application built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. This application allows users to view, book, and manage work shifts across different locations.

![Shift Booking App](./public/piexeldust.svg)

## ✨ Features

### Core Functionality
- **📅 View Available Shifts** - Browse shifts organized by date with filtering by location
- **✅ Book Shifts** - One-click booking with real-time status updates
- **❌ Cancel Shifts** - Easy cancellation of booked shifts
- **📊 My Shifts Dashboard** - View all booked shifts with total hours summary
- **🌍 Location Filtering** - Filter shifts by Helsinki, Tampere, or Turku

### UI/UX Features
- **🎨 Modern Design** - Clean, elegant UI with smooth animations
- **🌙 Dark Mode** - Full dark mode support with system preference detection
- **📱 Responsive Layout** - Works on mobile, tablet, and desktop
- **⚡ Real-time Updates** - Instant feedback on booking/cancellation actions
- **🔄 Loading States** - Skeleton loaders and button spinners for better UX
- **⚠️ Error Handling** - User-friendly error messages

### Technical Features
- **🔧 Type Safety** - Full TypeScript implementation
- **🏪 State Management** - Zustand for efficient state management
- **🔌 API Proxy** - Next.js rewrites to handle CORS
- **🎯 SEO Optimized** - Comprehensive meta tags, OpenGraph, and Twitter cards
- **♿ Accessible** - Keyboard navigation and screen reader support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/pixeldust/shift-booking-app.git
cd shift-booking-app
```

2. **Install dependencies for the API server** (from root directory)
```bash
npm install
```

3. **Install dependencies for the frontend** (from solutions directory)
```bash
cd solutions
npm install
```

### Running the Application

You need to run **both** the API server and the Next.js frontend:

**Terminal 1 - Start the API server** (from root directory):
```bash
npm start
```
This starts the mock API at `http://127.0.0.1:8080`

**Terminal 2 - Start the frontend** (from solutions directory):
```bash
cd solutions
npm run dev
```
This starts the Next.js app at `http://localhost:3000`

### Building for Production

```bash
cd solutions
npm run build
npm start
```

## 🏗️ Project Structure

```
solutions/
├── app/                      # Next.js App Router
│   ├── globals.css           # Global styles & Tailwind config
│   ├── layout.tsx            # Root layout with SEO metadata
│   └── page.tsx              # Main application page
├── src/
│   ├── components/
│   │   ├── shifts/           # Shift-related components
│   │   │   ├── CityFilter/   # Location filter pills
│   │   │   ├── ShiftCard/    # Individual shift card
│   │   │   └── ShiftGroup/   # Date-grouped shifts
│   │   ├── views/            # View components
│   │   │   ├── MyShiftsView/       # Booked shifts view
│   │   │   └── AvailableShiftsView/ # Available shifts view
│   │   └── ui/               # Reusable UI components
│   │       ├── button.tsx
│   │       ├── badge.tsx
│   │       ├── card.tsx
│   │       ├── skeleton.tsx
│   │       └── tabs.tsx
│   ├── stores/               # Zustand state management
│   │   └── shiftStore.ts     # Main application store
│   ├── services/             # API service layer
│   │   └── api.ts            # Axios-based API client
│   ├── types/                # TypeScript type definitions
│   │   └── shift.ts          # Shift-related types
│   └── utils/                # Utility functions
│       ├── constants.ts      # App configuration
│       └── dateUtils.ts      # Date formatting utilities
├── public/                   # Static assets
│   └── piexeldust.svg        # App logo
└── next.config.ts            # Next.js configuration with API proxy
```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Zustand** | State management |
| **Axios** | HTTP client |
| **Lucide React** | Icon library |
| **next-themes** | Dark mode support |
| **Radix UI** | Accessible UI primitives |

## 🎨 Design System

### Colors
- **Primary**: Emerald/Teal gradient for actions
- **Secondary**: Indigo for date headers
- **Neutral**: Slate palette for backgrounds and text
- **Accent**: Rose for cancel actions

### Components
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Gradient fills with hover states
- **Badges**: Pill-shaped with semantic colors
- **Tabs**: Pill-style with smooth transitions

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| Mobile | Single column |
| Tablet (md) | 2-column grid |
| Desktop (lg) | 3-column grid |

## 🔌 API Endpoints

The application communicates with a mock API server:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/shifts` | List all shifts |
| GET | `/shifts/:id` | Get shift by ID |
| POST | `/shifts/:id/book` | Book a shift |
| POST | `/shifts/:id/cancel` | Cancel a shift |

## 🧪 Validation Rules

- **Cannot book**: Shifts that have already started
- **Cannot book**: Overlapping shifts
- **Cannot cancel**: Shifts that aren't booked

## 📄 License

This project is part of the Pixeldust Frontend Hiring Assignment.

## 👨‍💻 Author

**Omkar Chebale**

Made with ❤️ for Pixeldust
