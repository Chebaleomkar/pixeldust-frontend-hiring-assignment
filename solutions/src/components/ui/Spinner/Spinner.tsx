/**
 * Spinner Component
 * 
 * Animated loading spinner using the provided SVG assets.
 * Supports green (booking) and red (cancelling) variants.
 */

import React from 'react';
import styles from './Spinner.module.css';

export type SpinnerVariant = 'green' | 'red';
export type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps {
    /** Color variant - 'green' for booking, 'red' for cancelling */
    variant?: SpinnerVariant;
    /** Size of the spinner */
    size?: SpinnerSize;
    /** Additional CSS class */
    className?: string;
    /** Accessible label for screen readers */
    label?: string;
}

const sizeMap: Record<SpinnerSize, number> = {
    sm: 16,
    md: 24,
    lg: 38,
};

export function Spinner({
    variant = 'green',
    size = 'md',
    className = '',
    label = 'Loading...',
}: SpinnerProps) {
    const dimension = sizeMap[size];
    const strokeColor = variant === 'green' ? '#16A64D' : '#E2006A';

    return (
        <span
            className={`${styles.spinner} ${className}`}
            role="status"
            aria-label={label}
        >
            <svg
                width={dimension}
                height={dimension}
                viewBox="0 0 38 38"
                xmlns="http://www.w3.org/2000/svg"
                stroke={strokeColor}
                className={styles.spinnerSvg}
            >
                <g fill="none" fillRule="evenodd">
                    <g transform="translate(1 1)" strokeWidth="2">
                        <circle strokeOpacity=".3" cx="18" cy="18" r="18" />
                        <path d="M36 18c0-9.94-8.06-18-18-18">
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 18 18"
                                to="360 18 18"
                                dur="0.8s"
                                repeatCount="indefinite"
                            />
                        </path>
                    </g>
                </g>
            </svg>
            <span className="sr-only">{label}</span>
        </span>
    );
}

export default Spinner;
