/**
 * AvailableShiftsView Component
 * 
 * Displays all shifts filtered by city, grouped by date.
 * Allows booking and cancelling shifts.
 */

'use client';

import React, { useMemo } from 'react';
import { Shift, ShiftArea, ShiftLoadingState, SHIFT_AREAS } from '@/types/shift';
import { groupShiftsByDate, filterShiftsByArea, countShiftsByArea } from '@/utils/dateUtils';
import { CityFilter } from '@/components/shifts/CityFilter';
import { ShiftGroup } from '@/components/shifts/ShiftGroup';
import { EmptyState } from '@/components/ui/EmptyState';
import styles from './AvailableShiftsView.module.css';

interface AvailableShiftsViewProps {
    /** All shifts from the store */
    shifts: Shift[];
    /** Currently selected city */
    selectedCity: ShiftArea;
    /** Callback when city selection changes */
    onCityChange: (city: ShiftArea) => void;
    /** Loading states for individual shifts */
    loadingStates: ShiftLoadingState;
    /** Callback to book a shift */
    onBook: (shiftId: string) => void;
    /** Callback to cancel a shift */
    onCancel: (shiftId: string) => void;
    /** Whether data is being loaded */
    isLoading?: boolean;
}

export function AvailableShiftsView({
    shifts,
    selectedCity,
    onCityChange,
    loadingStates,
    onBook,
    onCancel,
    isLoading = false,
}: AvailableShiftsViewProps) {
    // Calculate counts per city for the filter
    const cityCounts = useMemo(() => {
        const counts = countShiftsByArea(shifts);
        return SHIFT_AREAS.map(area => ({
            area,
            count: counts[area] || 0,
        }));
    }, [shifts]);

    // Filter shifts by selected city
    const filteredShifts = useMemo(() => {
        return filterShiftsByArea(shifts, selectedCity);
    }, [shifts, selectedCity]);

    // Group filtered shifts by date
    const groupedShifts = useMemo(() => {
        return groupShiftsByDate(filteredShifts, shifts);
    }, [filteredShifts, shifts]);

    // Loading state
    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.filterPlaceholder} />
                <div className={styles.loading}>
                    <div className={styles.skeleton} style={{ height: 60 }} />
                    <div className={styles.skeleton} style={{ height: 80 }} />
                    <div className={styles.skeleton} style={{ height: 80 }} />
                    <div className={styles.skeleton} style={{ height: 80 }} />
                    <div className={styles.skeleton} style={{ height: 60 }} />
                    <div className={styles.skeleton} style={{ height: 80 }} />
                </div>
            </div>
        );
    }

    return (
        <div
            className={styles.container}
            role="tabpanel"
            id="panel-available-shifts"
            aria-labelledby="tab-available-shifts"
        >
            {/* City Filter */}
            <CityFilter
                selectedCity={selectedCity}
                onCityChange={onCityChange}
                cityCounts={cityCounts}
            />

            {/* Empty state for selected city */}
            {groupedShifts.length === 0 ? (
                <EmptyState
                    icon="🏙️"
                    title={`No shifts in ${selectedCity}`}
                    message="There are no available shifts in this area at the moment. Try selecting another city."
                />
            ) : (
                /* Grouped Shifts */
                <div className={styles.groups}>
                    {groupedShifts.map((group) => (
                        <ShiftGroup
                            key={group.dateKey}
                            group={group}
                            loadingStates={loadingStates}
                            onBook={onBook}
                            onCancel={onCancel}
                            showArea={false}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default AvailableShiftsView;
