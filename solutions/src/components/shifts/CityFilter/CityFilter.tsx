'use client';

import React, { memo } from 'react';
import { MapPin } from 'lucide-react';
import { ShiftArea, SHIFT_AREAS } from '@/types/shift';
import { cn } from '@/lib/utils';

interface CityFilterProps {
    selectedCity: ShiftArea | 'all';
    onCityChange: (city: ShiftArea | 'all') => void;
    cityCounts: { area: ShiftArea; count: number }[];
}

export const CityFilter = memo(function CityFilter({
    selectedCity,
    onCityChange,
    cityCounts
}: CityFilterProps) {
    const getCount = (area: ShiftArea) => cityCounts.find(c => c.area === area)?.count ?? 0;

    return (
        <nav
            className="px-6 py-4 border-b border-slate-100 dark:border-slate-800"
            aria-label="Filter by location"
        >
            <div className="flex items-center gap-4 flex-wrap">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400" id="location-filter-label">
                    Location:
                </span>
                <div className="flex gap-2" role="radiogroup" aria-labelledby="location-filter-label">
                    {SHIFT_AREAS.map((area) => {
                        const isSelected = selectedCity === area;
                        const count = getCount(area);

                        return (
                            <button
                                key={area}
                                type='button'
                                onClick={() => onCityChange(area)}
                                role="radio"
                                aria-checked={isSelected}
                                aria-label={`${area}, ${count} shifts available`}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                                    "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
                                    isSelected
                                        ? "bg-emerald-500 text-white"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                )}
                            >
                                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                                {area}
                                <span
                                    className={cn(
                                        "min-w-[20px] px-1.5 rounded-full text-xs font-bold",
                                        isSelected ? "bg-white/20" : "bg-white dark:bg-slate-700"
                                    )}
                                    aria-hidden="true"
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
});

export default CityFilter;
