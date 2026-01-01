import { Shift, GroupedShifts, ShiftWithMeta } from '@/types/shift';

export function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());

    if (dateOnly.getTime() === todayOnly.getTime()) return 'Today';
    if (dateOnly.getTime() === tomorrowOnly.getTime()) return 'Tomorrow';

    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}

export function getDateKey(timestamp: number): string {
    return new Date(timestamp).toISOString().split('T')[0];
}

export function formatTime(timestamp: number): string {
    return new Date(timestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
}

export function formatTimeRange(startTime: number, endTime: number): string {
    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
}

export function getDurationMinutes(startTime: number, endTime: number): number {
    return Math.round((endTime - startTime) / (1000 * 60));
}

export function getDurationHours(startTime: number, endTime: number): number {
    return Math.round((endTime - startTime) / (1000 * 60 * 60) * 10) / 10;
}

export function formatDuration(startTime: number, endTime: number): string {
    const minutes = getDurationMinutes(startTime, endTime);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) return `${hours}h`;
    return `${hours}h ${remainingMinutes}min`;
}

export function isShiftStarted(startTime: number): boolean {
    return Date.now() > startTime;
}

export function doShiftsOverlap(shift1: Shift, shift2: Shift): boolean {
    return shift1.startTime < shift2.endTime && shift2.startTime < shift1.endTime;
}

export function hasOverlappingBookedShift(shift: Shift, allShifts: Shift[]): boolean {
    const bookedShifts = allShifts.filter(s => s.booked && s.id !== shift.id);
    return bookedShifts.some(bookedShift => doShiftsOverlap(shift, bookedShift));
}

export function enhanceShift(shift: Shift, allShifts: Shift[]): ShiftWithMeta {
    return {
        ...shift,
        isStarted: isShiftStarted(shift.startTime),
        isOverlapping: hasOverlappingBookedShift(shift, allShifts),
        duration: getDurationMinutes(shift.startTime, shift.endTime),
    };
}

export function groupShiftsByDate(shifts: Shift[], allShifts: Shift[]): GroupedShifts[] {
    const groups = new Map<string, Shift[]>();
    const sortedShifts = [...shifts].sort((a, b) => a.startTime - b.startTime);

    sortedShifts.forEach(shift => {
        const dateKey = getDateKey(shift.startTime);
        if (!groups.has(dateKey)) groups.set(dateKey, []);
        groups.get(dateKey)!.push(shift);
    });

    const result: GroupedShifts[] = [];

    groups.forEach((shiftsInGroup, dateKey) => {
        const enhancedShifts = shiftsInGroup.map(s => enhanceShift(s, allShifts));
        const firstShiftTime = shiftsInGroup[0].startTime;
        const totalHours = shiftsInGroup.reduce((acc, shift) =>
            acc + getDurationHours(shift.startTime, shift.endTime), 0);

        result.push({
            date: formatDate(firstShiftTime),
            dateKey,
            shifts: enhancedShifts,
            totalShifts: shiftsInGroup.length,
            totalHours: Math.round(totalHours * 10) / 10,
        });
    });

    result.sort((a, b) => a.dateKey.localeCompare(b.dateKey));
    return result;
}

export function filterShiftsByArea(shifts: Shift[], area: string): Shift[] {
    if (area === 'all') return shifts;
    return shifts.filter(shift => shift.area === area);
}

export function getBookedShifts(shifts: Shift[]): Shift[] {
    return shifts.filter(shift => shift.booked);
}

export function countShiftsByArea(shifts: Shift[]): Record<string, number> {
    return shifts.reduce((acc, shift) => {
        acc[shift.area] = (acc[shift.area] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
}
