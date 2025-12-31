/**
 * Shift Booking Application - Type Definitions
 * 
 * This file contains all TypeScript interfaces and types
 * used throughout the application for type safety.
 */

// ============================================
// Core Domain Types
// ============================================

/**
 * Available city areas for shifts
 */
export type ShiftArea = 'Helsinki' | 'Tampere' | 'Turku';

/**
 * All available areas as an array (useful for filtering)
 */
export const SHIFT_AREAS: ShiftArea[] = ['Helsinki', 'Tampere', 'Turku'];

/**
 * Core Shift entity from the API
 */
export interface Shift {
    id: string;
    area: ShiftArea;
    booked: boolean;
    startTime: number; // Unix epoch timestamp in milliseconds
    endTime: number;   // Unix epoch timestamp in milliseconds
}

/**
 * Shift with additional computed properties for UI
 */
export interface ShiftWithMeta extends Shift {
    isStarted: boolean;
    isOverlapping: boolean;
    duration: number; // in minutes
}

// ============================================
// Grouped Data Types
// ============================================

/**
 * Shifts grouped by date for display
 */
export interface GroupedShifts {
    date: string;           // Formatted date string (e.g., "Today", "Tomorrow", "January 5")
    dateKey: string;        // ISO date string for sorting (e.g., "2024-01-05")
    shifts: ShiftWithMeta[];
    totalShifts: number;
    totalHours: number;
}

/**
 * Shifts grouped by area/city
 */
export interface ShiftsByArea {
    area: ShiftArea;
    shifts: Shift[];
    count: number;
}

// ============================================
// API Response Types
// ============================================

/**
 * Standard API error response
 */
export interface ApiError {
    message: string;
    code?: string;
    statusCode?: number;
}

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
    data: T | null;
    error: ApiError | null;
    isLoading: boolean;
}

// ============================================
// UI State Types
// ============================================

/**
 * Tab navigation options
 */
export type TabType = 'my-shifts' | 'available-shifts';

/**
 * Loading states for individual shift operations
 */
export interface ShiftLoadingState {
    [shiftId: string]: 'booking' | 'cancelling' | null;
}

/**
 * Filter state for available shifts
 */
export interface ShiftFilters {
    selectedArea: ShiftArea | 'all';
}

// ============================================
// Store Types
// ============================================

/**
 * Main application state shape
 */
export interface ShiftState {
    // Data
    shifts: Shift[];

    // UI State
    activeTab: TabType;
    selectedArea: ShiftArea;

    // Loading & Error States
    isLoading: boolean;
    error: string | null;
    shiftLoadingStates: ShiftLoadingState;

    // Actions
    fetchShifts: () => Promise<void>;
    bookShift: (shiftId: string) => Promise<boolean>;
    cancelShift: (shiftId: string) => Promise<boolean>;
    setActiveTab: (tab: TabType) => void;
    setSelectedArea: (area: ShiftArea) => void;
    clearError: () => void;
}
