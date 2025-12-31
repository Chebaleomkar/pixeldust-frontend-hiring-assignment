/**
 * Tabs Component
 * 
 * Tab navigation component for switching between views.
 * Used for "My Shifts" and "Available Shifts" navigation.
 */

'use client';

import React from 'react';
import styles from './Tabs.module.css';

export interface TabItem {
    id: string;
    label: string;
    count?: number;
}

interface TabsProps {
    /** Array of tab items */
    tabs: TabItem[];
    /** Currently active tab ID */
    activeTab: string;
    /** Callback when tab changes */
    onTabChange: (tabId: string) => void;
    /** Additional CSS class */
    className?: string;
}

export function Tabs({
    tabs,
    activeTab,
    onTabChange,
    className = '',
}: TabsProps) {
    return (
        <nav
            className={`${styles.tabs} ${className}`}
            role="tablist"
            aria-label="Main navigation"
        >
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls={`panel-${tab.id}`}
                    id={`tab-${tab.id}`}
                    className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
                    onClick={() => onTabChange(tab.id)}
                >
                    <span className={styles.tabLabel}>{tab.label}</span>
                    {tab.count !== undefined && (
                        <span className={styles.tabCount}>({tab.count})</span>
                    )}
                </button>
            ))}
            {/* Active indicator */}
            <div
                className={styles.indicator}
                style={{
                    width: `${100 / tabs.length}%`,
                    transform: `translateX(${tabs.findIndex(t => t.id === activeTab) * 100}%)`,
                }}
            />
        </nav>
    );
}

export default Tabs;
