/**
 * ShiftGroup Component
 * 
 * Groups shifts under a date header.
 * Displays date, shift count, and total hours.
 */

'use client';

import React from 'react';
import { GroupedShifts, ShiftLoadingState } from '@/types/shift';
import { ShiftCard } from '../ShiftCard';
import styles from './ShiftGroup.module.css';

interface ShiftGroupProps {
    /** Grouped shifts data */
    group: GroupedShifts;
    /** Loading states for individual shifts */
    loadingStates: ShiftLoadingState;
    /** Callback when book button is clicked */
    onBook?: (shiftId: string) => void;
    /** Callback when cancel button is clicked */
    onCancel?: (shiftId: string) => void;
    /** Whether to show area labels on shift cards */
    showArea?: boolean;
}

export function ShiftGroup({
    group,
    loadingStates,
    onBook,
    onCancel,
    showArea = false,
}: ShiftGroupProps) {
    return (
        <section className={styles.group}>
            {/* Date Header */}
            <header className={styles.header}>
                <h2 className={styles.date}>{group.date}</h2>
                <div className={styles.meta}>
                    <span className={styles.count}>
                        {group.totalShifts} {group.totalShifts === 1 ? 'shift' : 'shifts'}
                    </span>
                    <span className={styles.separator}>•</span>
                    <span className={styles.hours}>{group.totalHours}h</span>
                </div>
            </header>

            {/* Shift Cards */}
            <div className={styles.shifts}>
                {group.shifts.map((shift, index) => (
                    <div
                        key={shift.id}
                        className={styles.shiftWrapper}
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
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
        </section>
    );
}

export default ShiftGroup;
