import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Shift, ShiftArea, TabType, ShiftLoadingState } from '@/types/shift';
import { shiftApi } from '@/services/api';

interface ShiftStore {
    shifts: Shift[];
    activeTab: TabType;
    selectedArea: ShiftArea | 'all';
    isLoading: boolean;
    error: string | null;
    shiftLoadingStates: ShiftLoadingState;
    fetchShifts: (silent?: boolean) => Promise<void>;
    refreshShifts: () => Promise<void>;
    bookShift: (shiftId: string) => Promise<boolean>;
    cancelShift: (shiftId: string) => Promise<boolean>;
    setActiveTab: (tab: TabType) => void;
    setSelectedArea: (area: ShiftArea | 'all') => void;
    clearError: () => void;
    setError: (error: string) => void;
}

export const useShiftStore = create<ShiftStore>()(
    devtools(
        (set, get) => ({
            shifts: [],
            activeTab: 'available-shifts',
            selectedArea: 'Helsinki',
            isLoading: false,
            error: null,
            shiftLoadingStates: {},

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

            refreshShifts: async () => {
                const { fetchShifts } = get();
                await fetchShifts(true);
            },

            bookShift: async (shiftId: string) => {
                set((state) => ({
                    shiftLoadingStates: { ...state.shiftLoadingStates, [shiftId]: 'booking' },
                    error: null,
                }));

                try {
                    const updatedShift = await shiftApi.book(shiftId);
                    set((state) => ({
                        shifts: state.shifts.map((shift) =>
                            shift.id === shiftId ? updatedShift : shift
                        ),
                        shiftLoadingStates: { ...state.shiftLoadingStates, [shiftId]: null },
                    }));
                    return true;
                } catch (error) {
                    const message = error instanceof Error
                        ? error.message
                        : (error as { message?: string })?.message || 'Failed to book shift';
                    set((state) => ({
                        error: message,
                        shiftLoadingStates: { ...state.shiftLoadingStates, [shiftId]: null },
                    }));
                    return false;
                }
            },

            cancelShift: async (shiftId: string) => {
                set((state) => ({
                    shiftLoadingStates: { ...state.shiftLoadingStates, [shiftId]: 'cancelling' },
                    error: null,
                }));

                try {
                    const updatedShift = await shiftApi.cancel(shiftId);
                    set((state) => ({
                        shifts: state.shifts.map((shift) =>
                            shift.id === shiftId ? updatedShift : shift
                        ),
                        shiftLoadingStates: { ...state.shiftLoadingStates, [shiftId]: null },
                    }));
                    return true;
                } catch (error) {
                    const message = error instanceof Error
                        ? error.message
                        : (error as { message?: string })?.message || 'Failed to cancel shift';
                    set((state) => ({
                        error: message,
                        shiftLoadingStates: { ...state.shiftLoadingStates, [shiftId]: null },
                    }));
                    return false;
                }
            },

            setActiveTab: (tab: TabType) => set({ activeTab: tab, error: null }),
            setSelectedArea: (area: ShiftArea | 'all') => set({ selectedArea: area }),
            clearError: () => set({ error: null }),
            setError: (error: string) => set({ error }),
        }),
        { name: 'shift-store' }
    )
);

export const useBookedShifts = () =>
    useShiftStore((state) => state.shifts.filter((s) => s.booked));

export const useFilteredShifts = () =>
    useShiftStore((state) => state.shifts.filter((s) => s.area === state.selectedArea));

export const useShiftLoadingState = (shiftId: string) =>
    useShiftStore((state) => state.shiftLoadingStates[shiftId] || null);

export const useIsAnyLoading = () =>
    useShiftStore((state) => state.isLoading || Object.values(state.shiftLoadingStates).some(Boolean));

export default useShiftStore;
