'use client';

import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { GroupedShifts, ShiftLoadingState } from '@/types/shift';
import { ShiftCard } from '../ShiftCard';
import { Badge } from '@/components/ui/badge';

interface ShiftGroupProps {
    group: GroupedShifts;
    loadingStates: ShiftLoadingState;
    onBook?: (shiftId: string) => void;
    onCancel?: (shiftId: string) => void;
    showArea?: boolean;
}

export function ShiftGroup({ group, loadingStates, onBook, onCancel, showArea = false }: ShiftGroupProps) {
    return (
        <div className="border-b border-slate-100 dark:border-slate-800 last:border-b-0">
            {/* Date Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50/50 dark:bg-slate-800/30">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">
                        {group.date}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                        {group.totalShifts} shift{group.totalShifts !== 1 ? 's' : ''}
                    </span>
                    <Badge className="bg-emerald-500 text-white text-xs rounded-md px-2 py-0.5">
                        <Clock className="w-3 h-3 mr-1" />
                        {group.totalHours}h
                    </Badge>
                </div>
            </div>

            {/* Shift Cards - Grid on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100 dark:bg-slate-800">
                {group.shifts.map((shift) => (
                    <div key={shift.id} className="bg-white dark:bg-slate-900">
                        <ShiftCard
                            shift={shift}
                            isLoading={!!loadingStates[shift.id]}
                            loadingType={loadingStates[shift.id]}
                            onBook={onBook}
                            onCancel={onCancel}
                            showArea={showArea}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShiftGroup;
