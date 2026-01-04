export type ShiftArea = 'Helsinki' | 'Tampere' | 'Turku';

export const SHIFT_AREAS: ShiftArea[] = ['Helsinki', 'Tampere', 'Turku'];

export interface Shift {
    id: string;
    area: ShiftArea;
    booked: boolean;
    startTime: number;
    endTime: number;
}

export interface ShiftWithMeta extends Shift {
    isStarted: boolean;
    isOverlapping: boolean;
    duration: number;
}

export interface GroupedShifts {
    date: string;
    dateKey: string;
    shifts: ShiftWithMeta[];
    totalShifts: number;
    totalHours: number;
}

export interface ShiftsByArea {
    area: ShiftArea;
    shifts: Shift[];
    count: number;
}

export interface ApiError {
    message: string;
    code?: string;
    statusCode?: number;
}

export interface ApiResponse<T> {
    data: T | null;
    error: ApiError | null;
    isLoading: boolean;
}

export type TabType = 'my-shifts' | 'available-shifts';

export interface ShiftLoadingState {
    [shiftId: string]: 'booking' | 'cancelling' | null;
}

export interface ShiftFilters {
    selectedArea: ShiftArea | 'all';
}

export interface ShiftState {
    shifts: Shift[];
    activeTab: TabType;
    selectedArea: ShiftArea | 'all';
    isLoading: boolean;
    error: string | null;
    shiftLoadingStates: ShiftLoadingState;
    fetchShifts: () => Promise<void>;
    bookShift: (shiftId: string) => Promise<boolean>;
    cancelShift: (shiftId: string) => Promise<boolean>;
    setActiveTab: (tab: TabType) => void;
    setSelectedArea: (area: ShiftArea | 'all') => void;
    clearError: () => void;
}
