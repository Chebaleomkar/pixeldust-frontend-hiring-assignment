/**
 * MyShiftsView Component
 * 
 * Displays all booked shifts grouped by date.
 * Allows cancelling booked shifts.
 */

'use client';

import React from 'react';
import { Shift, ShiftLoadingState } from '@/types/shift';
import { groupShiftsByDate, getBookedShifts } from '@/utils/dateUtils';
import { ShiftGroup } from '@/components/shifts/ShiftGroup';
import { EmptyState } from '@/components/ui/EmptyState';
import styles from './MyShiftsView.module.css';

interface MyShiftsViewProps {
    /** All shifts from the store */
    shifts: Shift[];
    /** Loading states for individual shifts */
    loadingStates: ShiftLoadingState;
    /** Callback to cancel a shift */
    onCancel: (shiftId: string) => void;
    /** Whether data is being loaded */
    isLoading?: boolean;
}

export function MyShiftsView({
    shifts,
    loadingStates,
    onCancel,
    isLoading = false,
}: MyShiftsViewProps) {
    // Filter to only booked shifts
    const bookedShifts = getBookedShifts(shifts);

    // Group by date
    const groupedShifts = groupShiftsByDate(bookedShifts, shifts);

    // Loading state
    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>
                    <div className={styles.skeleton} style={{ height: 60 }} />
                    <div className={styles.skeleton} style={{ height: 80 }} />
                    <div className={styles.skeleton} style={{ height: 80 }} />
                    <div className={styles.skeleton} style={{ height: 60 }} />
                    <div className={styles.skeleton} style={{ height: 80 }} />
                </div>
            </div>
        );
    }

    // Empty state
    if (groupedShifts.length === 0) {
        return (
            <div className={styles.container}>
                <EmptyState
                    icon="📅"
                    title="No shifts booked"
                    message="You haven't booked any shifts yet. Go to Available Shifts to book your first shift."
                />
            </div>
        );
    }

    // Calculate totals
    const totalShifts = bookedShifts.length;
    const totalHours = groupedShifts.reduce((acc, g) => acc + g.totalHours, 0);

    return (
        <div
            className={styles.container}
            role="tabpanel"
            id="panel-my-shifts"
            aria-labelledby="tab-my-shifts"
        >
            {/* Summary Header */}
            <header className={styles.summary}>
                <div className={styles.summaryItem}>
                    <span className={styles.summaryValue}>{totalShifts}</span>
                    <span className={styles.summaryLabel}>
                        {totalShifts === 1 ? 'Shift' : 'Shifts'}
                    </span>
                </div>
                <div className={styles.summaryDivider} />
                <div className={styles.summaryItem}>
                    <span className={styles.summaryValue}>{Math.round(totalHours * 10) / 10}h</span>
                    <span className={styles.summaryLabel}>Total</span>
                </div>
            </header>

            {/* Grouped Shifts */}
            <div className={styles.groups}>
                {groupedShifts.map((group) => (
                    <ShiftGroup
                        key={group.dateKey}
                        group={group}
                        loadingStates={loadingStates}
                        onCancel={onCancel}
                        showArea={true}
                    />
                ))}
            </div>
        </div>
    );
}

export default MyShiftsView;
