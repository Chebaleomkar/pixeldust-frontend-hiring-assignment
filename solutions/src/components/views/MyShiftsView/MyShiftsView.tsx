'use client';

import React, { memo } from 'react';
import { Calendar, Clock, CalendarCheck } from 'lucide-react';
import { Shift, ShiftLoadingState } from '@/types/shift';
import { groupShiftsByDate, getBookedShifts } from '@/utils/dateUtils';
import { ShiftGroup } from '@/components/shifts/ShiftGroup';
import { Skeleton } from '@/components/ui/skeleton';

interface MyShiftsViewProps {
    shifts: Shift[];
    loadingStates: ShiftLoadingState;
    onCancel: (shiftId: string) => void;
    isLoading?: boolean;
}

export const MyShiftsView = memo(function MyShiftsView({
    shifts,
    loadingStates,
    onCancel,
    isLoading = false
}: MyShiftsViewProps) {
    const bookedShifts = getBookedShifts(shifts);
    const groupedShifts = groupShiftsByDate(bookedShifts, shifts);

    if (isLoading) {
        return (
            <div className="p-6 space-y-4" aria-busy="true" aria-label="Loading shifts">
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-16 w-full rounded-xl" />
                <Skeleton className="h-16 w-full rounded-xl" />
            </div>
        );
    }

    if (groupedShifts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center" role="status">
                <div
                    className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4"
                    aria-hidden="true"
                >
                    <CalendarCheck className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    No shifts booked
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                    Head to <span className="font-medium text-emerald-600 dark:text-emerald-400">Available Shifts</span> to book your first shift.
                </p>
            </div>
        );
    }

    const totalShifts = bookedShifts.length;
    const totalHours = groupedShifts.reduce((acc, g) => acc + g.totalHours, 0);

    return (
        <div>
            <div
                className="grid grid-cols-2 gap-4 p-6 border-b border-slate-100 dark:border-slate-800"
                role="region"
                aria-label="Booking summary"
            >
                <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center" aria-hidden="true">
                        <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{totalShifts}</div>
                        <div className="text-sm text-emerald-600 dark:text-emerald-400">Booked Shifts</div>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/30">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center" aria-hidden="true">
                        <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{totalHours}h</div>
                        <div className="text-sm text-indigo-600 dark:text-indigo-400">Total Hours</div>
                    </div>
                </div>
            </div>

            <div role="region" aria-label="Your booked shifts">
                {groupedShifts.map((group) => (
                    <ShiftGroup
                        key={group.dateKey}
                        group={group}
                        loadingStates={loadingStates}
                        onCancel={onCancel}
                        showArea
                    />
                ))}
            </div>
        </div>
    );
});

export default MyShiftsView;
