'use client';

import React, { useMemo, memo } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Shift, ShiftArea, ShiftLoadingState, SHIFT_AREAS } from '@/types/shift';
import { groupShiftsByDate, filterShiftsByArea, countShiftsByArea } from '@/utils/dateUtils';
import { CityFilter } from '@/components/shifts/CityFilter';
import { ShiftGroup } from '@/components/shifts/ShiftGroup';
import { Skeleton } from '@/components/ui/skeleton';

interface AvailableShiftsViewProps {
    shifts: Shift[];
    selectedCity: ShiftArea | 'all';
    onCityChange: (city: ShiftArea | 'all') => void;
    loadingStates: ShiftLoadingState;
    onBook: (shiftId: string) => void;
    onCancel: (shiftId: string) => void;
    isLoading?: boolean;
}

export const AvailableShiftsView = memo(function AvailableShiftsView({
    shifts,
    selectedCity,
    onCityChange,
    loadingStates,
    onBook,
    onCancel,
    isLoading = false
}: AvailableShiftsViewProps) {
    const cityCounts = useMemo(() => {
        const counts = countShiftsByArea(shifts);
        return SHIFT_AREAS.map(area => ({ area, count: counts[area] || 0 }));
    }, [shifts]);

    const filteredShifts = useMemo(() => filterShiftsByArea(shifts, selectedCity), [shifts, selectedCity]);
    const groupedShifts = useMemo(() => groupShiftsByDate(filteredShifts, shifts), [filteredShifts, shifts]);

    if (isLoading) {
        return (
            <div className="p-6 space-y-4" aria-busy="true" aria-label="Loading available shifts">
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-24 rounded-full" />
                    <Skeleton className="h-9 w-24 rounded-full" />
                    <Skeleton className="h-9 w-20 rounded-full" />
                </div>
                <Skeleton className="h-16 w-full rounded-xl" />
                <Skeleton className="h-16 w-full rounded-xl" />
            </div>
        );
    }

    return (
        <div>
            <CityFilter selectedCity={selectedCity} onCityChange={onCityChange} cityCounts={cityCounts} />

            {groupedShifts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center" role="status">
                    <div
                        className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4"
                        aria-hidden="true"
                    >
                        <Search className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                        No shifts in {selectedCity}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-4">
                        Try selecting another location.
                    </p>
                    <div className="flex gap-2" role="group" aria-label="Alternative locations">
                        {SHIFT_AREAS.filter(area => area !== selectedCity).map(area => {
                            const count = cityCounts.find(c => c.area === area)?.count || 0;
                            if (count === 0) return null;
                            return (
                                <button
                                    key={area}
                                    onClick={() => onCityChange(area)}
                                    aria-label={`Switch to ${area} with ${count} shifts`}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <MapPin className="w-3 h-3" aria-hidden="true" />
                                    {area} ({count})
                                </button>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div role="region" aria-label={`Available shifts in ${selectedCity}`}>
                    {groupedShifts.map((group) => (
                        <ShiftGroup
                            key={group.dateKey}
                            group={group}
                            loadingStates={loadingStates}
                            onBook={onBook}
                            onCancel={onCancel}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

export default AvailableShiftsView;
