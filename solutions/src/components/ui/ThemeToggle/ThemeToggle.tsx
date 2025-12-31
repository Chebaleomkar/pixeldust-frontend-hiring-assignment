/**
 * ThemeToggle Component
 * 
 * Allows users to switch between Light, Dark, and System themes.
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className={styles.placeholder} />;
    }

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button
            className={styles.toggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme === 'dark' ? (
                <span className={styles.icon}>☀️</span>
            ) : (
                <span className={styles.icon}>🌙</span>
            )}
        </button>
    );
}

export default ThemeToggle;
