'use client';

import React from 'react';
import { Clock, Check, MapPin, Timer } from 'lucide-react';
import { ShiftWithMeta } from '@/types/shift';
import { formatTimeRange, formatDuration } from '@/utils/dateUtils';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ShiftCardProps {
    shift: ShiftWithMeta;
    isLoading?: boolean;
    loadingType?: 'booking' | 'cancelling' | null;
    onBook?: (shiftId: string) => void;
    onCancel?: (shiftId: string) => void;
    showArea?: boolean;
}

export function ShiftCard({
    shift,
    isLoading = false,
    loadingType = null,
    onBook,
    onCancel,
    showArea = false,
}: ShiftCardProps) {
    const timeRange = formatTimeRange(shift.startTime, shift.endTime);
    const duration = formatDuration(shift.startTime, shift.endTime);
    const isCurrentlyLoading = isLoading && loadingType !== null;

    const getButtonProps = () => {
        if (shift.booked) {
            return { variant: 'cancel' as const, text: 'Cancel', onClick: () => onCancel?.(shift.id) };
        }
        if (shift.isStarted) {
            return { variant: 'disabled' as const, text: 'Started', onClick: undefined };
        }
        if (shift.isOverlapping) {
            return { variant: 'disabled' as const, text: 'Overlap', onClick: undefined };
        }
        return { variant: 'book' as const, text: 'Book', onClick: () => onBook?.(shift.id) };
    };

    const btn = getButtonProps();

    return (
        <div className={cn(
            "flex items-center gap-4 p-4 transition-colors",
            "hover:bg-slate-50 dark:hover:bg-slate-800/50",
            shift.booked && "bg-emerald-50/50 dark:bg-emerald-950/20"
        )}>
            {/* Icon */}
            <div className={cn(
                "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
                shift.booked
                    ? "bg-emerald-100 dark:bg-emerald-900/50"
                    : "bg-slate-100 dark:bg-slate-800"
            )}>
                {shift.booked ? (
                    <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                    <Clock className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className={cn(
                    "font-semibold",
                    shift.booked
                        ? "text-emerald-700 dark:text-emerald-300"
                        : "text-slate-800 dark:text-slate-100"
                )}>
                    {timeRange}
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                    <Timer className="w-3.5 h-3.5" />
                    <span>{duration}</span>
                    {showArea && (
                        <>
                            <span className="text-slate-300 dark:text-slate-600">•</span>
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{shift.area}</span>
                        </>
                    )}
                </div>
            </div>

            {/* Button */}
            <Button
                variant={btn.variant}
                size="sm"
                onClick={btn.onClick}
                disabled={btn.variant === 'disabled'}
                isLoading={isCurrentlyLoading}
                className="min-w-[72px]"
            >
                {btn.text}
            </Button>
        </div>
    );
}

export default ShiftCard;
