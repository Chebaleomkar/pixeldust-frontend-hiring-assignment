/**
 * ShiftCard Component
 * 
 * Displays a single shift with time, duration, and action button.
 * Handles book/cancel actions with loading states.
 */

'use client';

import React from 'react';
import { ShiftWithMeta } from '@/types/shift';
import { formatTimeRange, formatDuration } from '@/utils/dateUtils';
import { Button } from '@/components/ui/Button';
import styles from './ShiftCard.module.css';

interface ShiftCardProps {
    /** Shift data with computed metadata */
    shift: ShiftWithMeta;
    /** Whether the shift is currently being booked/cancelled */
    isLoading?: boolean;
    /** Type of loading operation */
    loadingType?: 'booking' | 'cancelling' | null;
    /** Callback when book button is clicked */
    onBook?: (shiftId: string) => void;
    /** Callback when cancel button is clicked */
    onCancel?: (shiftId: string) => void;
    /** Whether to show the area/city label */
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

    // Determine button state and text
    const getButtonConfig = () => {
        if (shift.booked) {
            return {
                variant: 'secondary' as const,
                text: 'Cancel',
                onClick: () => onCancel?.(shift.id),
                disabled: isLoading,
                loadingText: 'Cancelling...',
            };
        }

        // Check if shift can be booked
        if (shift.isStarted) {
            return {
                variant: 'outline' as const,
                text: 'Started',
                onClick: undefined,
                disabled: true,
                loadingText: '',
            };
        }

        if (shift.isOverlapping) {
            return {
                variant: 'outline' as const,
                text: 'Overlapping',
                onClick: undefined,
                disabled: true,
                loadingText: '',
            };
        }

        return {
            variant: 'primary' as const,
            text: 'Book',
            onClick: () => onBook?.(shift.id),
            disabled: isLoading,
            loadingText: 'Booking...',
        };
    };

    const buttonConfig = getButtonConfig();
    const isCurrentlyLoading = isLoading && loadingType !== null;

    return (
        <article className={styles.card}>
            <div className={styles.content}>
                {/* Time and Duration */}
                <div className={styles.timeInfo}>
                    <span className={styles.timeRange}>{timeRange}</span>
                    <span className={styles.duration}>{duration}</span>
                </div>

                {/* Area Label (optional) */}
                {showArea && (
                    <div className={styles.areaLabel}>
                        <span className={styles.areaBadge}>{shift.area}</span>
                    </div>
                )}
            </div>

            {/* Action Button */}
            <div className={styles.action}>
                <Button
                    variant={buttonConfig.variant}
                    size="sm"
                    onClick={buttonConfig.onClick}
                    disabled={buttonConfig.disabled}
                    isLoading={isCurrentlyLoading}
                    loadingText={buttonConfig.loadingText}
                    aria-label={`${buttonConfig.text} shift from ${timeRange}`}
                >
                    {buttonConfig.text}
                </Button>
            </div>
        </article>
    );
}

export default ShiftCard;
