/**
 * Shift Store - Zustand State Management
 * 
 * Centralized state management for the Shift Booking Application.
 * Manages shifts data, UI state, and async operations.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Shift, ShiftArea, TabType, ShiftLoadingState } from '@/types/shift';
import { shiftApi } from '@/services/api';

// ============================================
// Store Interface
// ============================================

interface ShiftStore {
    // ================== Data ==================
    shifts: Shift[];

    // =============== UI State =================
    activeTab: TabType;
    selectedArea: ShiftArea;

    // ========== Loading & Error States ========
    isLoading: boolean;
    error: string | null;
    shiftLoadingStates: ShiftLoadingState;

    // ================ Actions =================

    // Data fetching
    fetchShifts: (silent?: boolean) => Promise<void>;
    refreshShifts: () => Promise<void>;

    // Shift operations
    bookShift: (shiftId: string) => Promise<boolean>;
    cancelShift: (shiftId: string) => Promise<boolean>;

    // UI actions
    setActiveTab: (tab: TabType) => void;
    setSelectedArea: (area: ShiftArea) => void;

    // Error handling
    clearError: () => void;
    setError: (error: string) => void;
}

// ============================================
// Store Implementation
// ============================================

export const useShiftStore = create<ShiftStore>()(
    devtools(
        (set, get) => ({
            // ================== Initial State ==================
            shifts: [],
            activeTab: 'my-shifts',
            selectedArea: 'Helsinki',
            isLoading: false,
            error: null,
            shiftLoadingStates: {},

            // ================== Actions ==================

            /**
             * Fetch all shifts from API
             */
            fetchShifts: async (silent = false) => {
                if (!silent) set({ isLoading: true, error: null });
                else set({ error: null });

                try {
                    const shifts = await shiftApi.fetchAll();
                    set({ shifts, isLoading: false });
                } catch (error) {
                    const message = error instanceof Error
                        ? error.message
                        : (error as { message?: string })?.message || 'Failed to fetch shifts';
                    set({ error: message, isLoading: false });
                }
            },

            /**
             * Manually refresh shifts
             */
            refreshShifts: async () => {
                const { fetchShifts } = get();
                await fetchShifts(true);
            },

            /**
             * Book a shift by ID
             * Returns true if successful, false otherwise
             */
            bookShift: async (shiftId: string) => {
                // Set loading state for this specific shift
                set((state) => ({
                    shiftLoadingStates: {
                        ...state.shiftLoadingStates,
                        [shiftId]: 'booking',
                    },
                    error: null,
                }));

                try {
                    const updatedShift = await shiftApi.book(shiftId);

                    // Update the shift in the local state
                    set((state) => ({
                        shifts: state.shifts.map((shift) =>
                            shift.id === shiftId ? updatedShift : shift
                        ),
                        shiftLoadingStates: {
                            ...state.shiftLoadingStates,
                            [shiftId]: null,
                        },
                    }));

                    return true;
                } catch (error) {
                    const message = error instanceof Error
                        ? error.message
                        : (error as { message?: string })?.message || 'Failed to book shift';

                    set((state) => ({
                        error: message,
                        shiftLoadingStates: {
                            ...state.shiftLoadingStates,
                            [shiftId]: null,
                        },
                    }));

                    return false;
                }
            },

            /**
             * Cancel a shift by ID
             * Returns true if successful, false otherwise
             */
            cancelShift: async (shiftId: string) => {
                // Set loading state for this specific shift
                set((state) => ({
                    shiftLoadingStates: {
                        ...state.shiftLoadingStates,
                        [shiftId]: 'cancelling',
                    },
                    error: null,
                }));

                try {
                    const updatedShift = await shiftApi.cancel(shiftId);

                    // Update the shift in the local state
                    set((state) => ({
                        shifts: state.shifts.map((shift) =>
                            shift.id === shiftId ? updatedShift : shift
                        ),
                        shiftLoadingStates: {
                            ...state.shiftLoadingStates,
                            [shiftId]: null,
                        },
                    }));

                    return true;
                } catch (error) {
                    const message = error instanceof Error
                        ? error.message
                        : (error as { message?: string })?.message || 'Failed to cancel shift';

                    set((state) => ({
                        error: message,
                        shiftLoadingStates: {
                            ...state.shiftLoadingStates,
                            [shiftId]: null,
                        },
                    }));

                    return false;
                }
            },

            /**
             * Set active tab
             */
            setActiveTab: (tab: TabType) => {
                set({ activeTab: tab, error: null });
            },

            /**
             * Set selected area filter
             */
            setSelectedArea: (area: ShiftArea) => {
                set({ selectedArea: area });
            },

            /**
             * Clear error message
             */
            clearError: () => {
                set({ error: null });
            },

            /**
             * Set error message
             */
            setError: (error: string) => {
                set({ error });
            },
        }),
        {
            name: 'shift-store', // DevTools name
        }
    )
);

// ============================================
// Selector Hooks (for optimized re-renders)
// ============================================

/**
 * Get only booked shifts
 */
export const useBookedShifts = () =>
    useShiftStore((state) => state.shifts.filter((s) => s.booked));

/**
 * Get shifts filtered by selected area
 */
export const useFilteredShifts = () =>
    useShiftStore((state) =>
        state.shifts.filter((s) => s.area === state.selectedArea)
    );

/**
 * Get loading state for a specific shift
 */
export const useShiftLoadingState = (shiftId: string) =>
    useShiftStore((state) => state.shiftLoadingStates[shiftId] || null);

/**
 * Check if any operation is in progress
 */
export const useIsAnyLoading = () =>
    useShiftStore((state) =>
        state.isLoading || Object.values(state.shiftLoadingStates).some(Boolean)
    );

export default useShiftStore;
