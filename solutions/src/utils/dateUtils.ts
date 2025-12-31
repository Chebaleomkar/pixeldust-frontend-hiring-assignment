/**
 * Date Utility Functions
 * 
 * Helper functions for date formatting, grouping,
 * and time calculations used throughout the application.
 */

import { Shift, GroupedShifts, ShiftWithMeta } from '@/types/shift';

// ============================================
// Date Formatting
// ============================================

/**
 * Format a timestamp to a readable date string
 * Returns "Today", "Tomorrow", or formatted date
 */
export function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Reset time parts for comparison
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());

    if (dateOnly.getTime() === todayOnly.getTime()) {
        return 'Today';
    }

    if (dateOnly.getTime() === tomorrowOnly.getTime()) {
        return 'Tomorrow';
    }

    // Format as "Month Day" (e.g., "January 5")
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Get ISO date string for grouping/sorting (YYYY-MM-DD)
 */
export function getDateKey(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
}

/**
 * Format time from timestamp (HH:MM format)
 */
export function formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
}

/**
 * Format shift time range (e.g., "09:00 - 17:00")
 */
export function formatTimeRange(startTime: number, endTime: number): string {
    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
}

// ============================================
// Duration Calculations
// ============================================

/**
 * Calculate duration in minutes
 */
export function getDurationMinutes(startTime: number, endTime: number): number {
    return Math.round((endTime - startTime) / (1000 * 60));
}

/**
 * Calculate duration in hours (rounded to 1 decimal)
 */
export function getDurationHours(startTime: number, endTime: number): number {
    return Math.round((endTime - startTime) / (1000 * 60 * 60) * 10) / 10;
}

/**
 * Format duration for display (e.g., "8h", "2h 30min")
 */
export function formatDuration(startTime: number, endTime: number): string {
    const minutes = getDurationMinutes(startTime, endTime);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) {
        return `${hours}h`;
    }

    return `${hours}h ${remainingMinutes}min`;
}

// ============================================
// Shift Status Checks
// ============================================

/**
 * Check if a shift has already started
 */
export function isShiftStarted(startTime: number): boolean {
    return Date.now() > startTime;
}

/**
 * Check if two shifts overlap in time
 */
export function doShiftsOverlap(shift1: Shift, shift2: Shift): boolean {
    // Shifts overlap if one starts before the other ends
    return shift1.startTime < shift2.endTime && shift2.startTime < shift1.endTime;
}

/**
 * Check if a shift overlaps with any booked shifts
 */
export function hasOverlappingBookedShift(shift: Shift, allShifts: Shift[]): boolean {
    const bookedShifts = allShifts.filter(s => s.booked && s.id !== shift.id);
    return bookedShifts.some(bookedShift => doShiftsOverlap(shift, bookedShift));
}

// ============================================
// Shift Enhancement
// ============================================

/**
 * Add computed metadata to a shift
 */
export function enhanceShift(shift: Shift, allShifts: Shift[]): ShiftWithMeta {
    return {
        ...shift,
        isStarted: isShiftStarted(shift.startTime),
        isOverlapping: hasOverlappingBookedShift(shift, allShifts),
        duration: getDurationMinutes(shift.startTime, shift.endTime),
    };
}

// ============================================
// Grouping Functions
// ============================================

/**
 * Group shifts by date
 */
export function groupShiftsByDate(shifts: Shift[], allShifts: Shift[]): GroupedShifts[] {
    const groups = new Map<string, Shift[]>();

    // Sort shifts by start time first
    const sortedShifts = [...shifts].sort((a, b) => a.startTime - b.startTime);

    // Group by date
    sortedShifts.forEach(shift => {
        const dateKey = getDateKey(shift.startTime);
        if (!groups.has(dateKey)) {
            groups.set(dateKey, []);
        }
        groups.get(dateKey)!.push(shift);
    });

    // Convert to array of GroupedShifts
    const result: GroupedShifts[] = [];

    groups.forEach((shiftsInGroup, dateKey) => {
        const enhancedShifts = shiftsInGroup.map(s => enhanceShift(s, allShifts));
        const firstShiftTime = shiftsInGroup[0].startTime;

        // Calculate total hours for the group
        const totalHours = shiftsInGroup.reduce((acc, shift) => {
            return acc + getDurationHours(shift.startTime, shift.endTime);
        }, 0);

        result.push({
            date: formatDate(firstShiftTime),
            dateKey,
            shifts: enhancedShifts,
            totalShifts: shiftsInGroup.length,
            totalHours: Math.round(totalHours * 10) / 10,
        });
    });

    // Sort by date
    result.sort((a, b) => a.dateKey.localeCompare(b.dateKey));

    return result;
}

/**
 * Filter shifts by area
 */
export function filterShiftsByArea(shifts: Shift[], area: string): Shift[] {
    if (area === 'all') {
        return shifts;
    }
    return shifts.filter(shift => shift.area === area);
}

/**
 * Get only booked shifts
 */
export function getBookedShifts(shifts: Shift[]): Shift[] {
    return shifts.filter(shift => shift.booked);
}

/**
 * Count shifts per area
 */
export function countShiftsByArea(shifts: Shift[]): Record<string, number> {
    return shifts.reduce((acc, shift) => {
        acc[shift.area] = (acc[shift.area] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
}
