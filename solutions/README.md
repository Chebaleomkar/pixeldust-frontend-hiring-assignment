# Shift Booking Application

A production-grade React/Next.js application for managing work shifts. Built as part of the Pixeldust Frontend Hiring Assignment.

## ✨ Features

- **My Shifts View**: View and manage all your booked shifts, grouped by date
- **Available Shifts View**: Browse available shifts by city (Helsinki, Tampere, Turku)
- **Book/Cancel Shifts**: Easy one-click booking and cancellation with loading states
- **Smart Validation**: Prevents booking overlapping shifts or already started shifts
- **Responsive Design**: Mobile-first design that works on all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + CSS Variables
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Linting**: ESLint

## 📁 Project Structure

```
solutions/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles & design tokens
├── src/
│   ├── components/         # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── shifts/         # Shift-specific components
│   │   └── layout/         # Layout components
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API service layer
│   ├── stores/             # Zustand state management
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
└── public/
    └── assets/             # Static assets (spinners)
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

1. **Start the Mock API** (from the root directory):

```bash
cd ..
npm install
npm start
# API runs at http://localhost:8080
```

2. **Start the Frontend** (from the solutions directory):

```bash
npm install
npm run dev
# App runs at http://localhost:3000
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🎨 Design System

The application uses a custom design system with CSS variables:

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#16A64D` | Book buttons, success states |
| `--color-accent` | `#E2006A` | Cancel buttons, danger states |
| `--color-background` | `#F1F4F8` | Page background |
| `--color-surface` | `#FFFFFF` | Cards, surfaces |

### Typography

- System font stack for optimal performance
- Consistent font sizes from 12px to 30px
- Clear hierarchy with meaningful weights

## 📡 API Integration

The app integrates with the Mock API running on `localhost:8080`:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/shifts` | GET | Fetch all shifts |
| `/shifts/{id}/book` | POST | Book a shift |
| `/shifts/{id}/cancel` | POST | Cancel a shift |

## 🧪 State Management

Using Zustand for clean, predictable state management:

- **Shifts data**: All shifts from API
- **UI state**: Active tab, selected city filter
- **Loading states**: Per-shift loading indicators
- **Error handling**: Centralized error state

## 📱 Responsive Design

- Mobile-first approach
- Maximum container width of 480px (phone-optimized)
- Touch-friendly button sizes and spacing

## 👤 Author

Built with ❤️ for Pixeldust

---

## License

This project is part of a hiring assignment and is for evaluation purposes only.
