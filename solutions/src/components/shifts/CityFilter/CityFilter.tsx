/**
 * CityFilter Component
 * 
 * Horizontal scrollable filter for selecting cities.
 * Shows shift count for each city.
 */

'use client';

import React from 'react';
import { ShiftArea, SHIFT_AREAS } from '@/types/shift';
import styles from './CityFilter.module.css';

interface CityCount {
    area: ShiftArea;
    count: number;
}

interface CityFilterProps {
    /** Currently selected city */
    selectedCity: ShiftArea;
    /** Callback when city selection changes */
    onCityChange: (city: ShiftArea) => void;
    /** Count of shifts per city */
    cityCounts: CityCount[];
    /** Additional CSS class */
    className?: string;
}

export function CityFilter({
    selectedCity,
    onCityChange,
    cityCounts,
    className = '',
}: CityFilterProps) {
    const getCountForCity = (area: ShiftArea): number => {
        return cityCounts.find(c => c.area === area)?.count ?? 0;
    };

    return (
        <div
            className={`${styles.container} ${className}`}
            role="tablist"
            aria-label="Filter by city"
        >
            <div className={styles.filterList}>
                {SHIFT_AREAS.map((area) => {
                    const count = getCountForCity(area);
                    const isSelected = selectedCity === area;

                    return (
                        <button
                            key={area}
                            role="tab"
                            aria-selected={isSelected}
                            className={`${styles.filterButton} ${isSelected ? styles.active : ''}`}
                            onClick={() => onCityChange(area)}
                        >
                            <span className={styles.cityName}>{area}</span>
                            <span className={styles.count}>({count})</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default CityFilter;
