/**
 * EmptyState Component
 * 
 * Displays a friendly message when there's no data to show.
 */

import React from 'react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
    /** Icon to display (emoji or component) */
    icon?: React.ReactNode;
    /** Main title */
    title: string;
    /** Descriptive message */
    message?: string;
    /** Optional action button */
    action?: React.ReactNode;
    /** Additional CSS class */
    className?: string;
}

export function EmptyState({
    icon = '📋',
    title,
    message,
    action,
    className = '',
}: EmptyStateProps) {
    return (
        <div className={`${styles.container} ${className}`}>
            <div className={styles.icon}>{icon}</div>
            <h3 className={styles.title}>{title}</h3>
            {message && <p className={styles.message}>{message}</p>}
            {action && <div className={styles.action}>{action}</div>}
        </div>
    );
}

export default EmptyState;
