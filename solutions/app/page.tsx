/**
 * Shift Booking App - Main Page
 * 
 * The main entry point for the shift booking application.
 * Handles tab navigation between My Shifts and Available Shifts.
 */

'use client';

import React, { useEffect, useCallback } from 'react';
import { useShiftStore } from '@/stores/shiftStore';
import { TabType } from '@/types/shift';
import { TAB_LABELS } from '@/utils/constants';
import { Tabs, TabItem } from '@/components/ui/Tabs';
import { MyShiftsView } from '@/components/views/MyShiftsView';
import { AvailableShiftsView } from '@/components/views/AvailableShiftsView';
import styles from './page.module.css';

// Tab configuration
const tabs: TabItem[] = [
  { id: 'my-shifts', label: TAB_LABELS['my-shifts'] },
  { id: 'available-shifts', label: TAB_LABELS['available-shifts'] },
];

export default function HomePage() {
  // Zustand store
  const {
    shifts,
    activeTab,
    selectedArea,
    isLoading,
    error,
    shiftLoadingStates,
    fetchShifts,
    refreshShifts,
    bookShift,
    cancelShift,
    setActiveTab,
    setSelectedArea,
    clearError,
  } = useShiftStore();

  // Fetch shifts on mount
  useEffect(() => {
    fetchShifts();
  }, [fetchShifts]);

  // Handle tab change
  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId as TabType);
  }, [setActiveTab]);

  // Handle book shift
  const handleBook = useCallback(async (shiftId: string) => {
    const success = await bookShift(shiftId);
    if (success) {
      // Optionally show success feedback
    }
  }, [bookShift]);

  // Handle cancel shift
  const handleCancel = useCallback(async (shiftId: string) => {
    const success = await cancelShift(shiftId);
    if (success) {
      // Optionally show success feedback
    }
  }, [cancelShift]);

  // Count booked shifts for tab
  const bookedShiftsCount = shifts.filter(s => s.booked).length;
  const tabsWithCounts: TabItem[] = [
    { id: 'my-shifts', label: TAB_LABELS['my-shifts'], count: bookedShiftsCount },
    { id: 'available-shifts', label: TAB_LABELS['available-shifts'] },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.logo}>
            <span className={styles.logoIcon}>📅</span>
            Shifts
          </h1>
          <button
            className={`${styles.refreshButton} ${isLoading ? styles.spinning : ''}`}
            onClick={() => refreshShifts()}
            disabled={isLoading}
            aria-label="Refresh shifts"
          >
            🔄
          </button>
        </header>

        {/* Error Banner */}
        {error && (
          <div className={styles.errorBanner} role="alert">
            <span className={styles.errorMessage}>{error}</span>
            <button
              className={styles.errorDismiss}
              onClick={clearError}
              aria-label="Dismiss error"
            >
              ✕
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <Tabs
          tabs={tabsWithCounts}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Tab Content */}
        <div className={styles.content}>
          {activeTab === 'my-shifts' && (
            <MyShiftsView
              shifts={shifts}
              loadingStates={shiftLoadingStates}
              onCancel={handleCancel}
              isLoading={isLoading}
            />
          )}

          {activeTab === 'available-shifts' && (
            <AvailableShiftsView
              shifts={shifts}
              selectedCity={selectedArea}
              onCityChange={setSelectedArea}
              loadingStates={shiftLoadingStates}
              onBook={handleBook}
              onCancel={handleCancel}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </main>
  );
}
