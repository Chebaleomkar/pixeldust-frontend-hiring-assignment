/**
 * Application Constants
 * 
 * Centralized configuration and constant values
 * for the Shift Booking Application.
 */

// ============================================
// API Configuration
// ============================================

export const API_BASE_URL = '';

export const API_ENDPOINTS = {
    SHIFTS: '/shifts',
    BOOK_SHIFT: (id: string) => `/shifts/${id}/book`,
    CANCEL_SHIFT: (id: string) => `/shifts/${id}/cancel`,
    GET_SHIFT: (id: string) => `/shifts/${id}`,
} as const;

// ============================================
// UI Constants
// ============================================

export const TAB_LABELS = {
    'my-shifts': 'My shifts',
    'available-shifts': 'Available shifts',
} as const;

export const AREA_LABELS = {
    Helsinki: 'Helsinki',
    Tampere: 'Tampere',
    Turku: 'Turku',
} as const;

// ============================================
// Design Tokens
// ============================================

export const COLORS = {
    // Primary palette
    primary: {
        green: '#16A64D',
        greenLight: '#E8F5EE',
        greenDark: '#128A40',
    },
    // Secondary/Accent
    accent: {
        pink: '#E2006A',
        pinkLight: '#FDE8F0',
        pinkDark: '#C00059',
    },
    // Neutrals
    neutral: {
        white: '#FFFFFF',
        background: '#F1F4F8',
        border: '#E5E7EB',
        textPrimary: '#1C1C1C',
        textSecondary: '#6B7280',
        textMuted: '#9CA3AF',
    },
} as const;

// ============================================
// Animation Durations
// ============================================

export const ANIMATION = {
    fast: 150,
    normal: 300,
    slow: 500,
} as const;

// ============================================
// Date/Time Formatting
// ============================================

export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
};

export const TIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
};
