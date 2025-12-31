/**
 * Button Component
 * 
 * Reusable button with multiple variants, sizes, and loading states.
 * Designed for Book/Cancel actions with appropriate visual feedback.
 */

'use client';

import React from 'react';
import { Spinner } from '../Spinner';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual variant of the button */
    variant?: ButtonVariant;
    /** Size of the button */
    size?: ButtonSize;
    /** Whether the button is in a loading state */
    isLoading?: boolean;
    /** Loading text to display (for screen readers) */
    loadingText?: string;
    /** Whether the button should take full width */
    fullWidth?: boolean;
    /** Icon to display before the text */
    leftIcon?: React.ReactNode;
    /** Icon to display after the text */
    rightIcon?: React.ReactNode;
    /** Button contents */
    children: React.ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    loadingText = 'Loading...',
    fullWidth = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    className = '',
    ...props
}: ButtonProps) {
    const isDisabled = disabled || isLoading;

    // Determine spinner variant based on button variant
    const spinnerVariant = variant === 'danger' || variant === 'secondary' ? 'red' : 'green';

    const buttonClasses = [
        styles.button,
        styles[`variant-${variant}`],
        styles[`size-${size}`],
        fullWidth ? styles.fullWidth : '',
        isLoading ? styles.loading : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <button
            className={buttonClasses}
            disabled={isDisabled}
            aria-busy={isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <Spinner
                        variant={spinnerVariant}
                        size="sm"
                        label={loadingText}
                    />
                    <span className="sr-only">{loadingText}</span>
                </>
            ) : (
                <>
                    {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
                    <span className={styles.label}>{children}</span>
                    {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
                </>
            )}
        </button>
    );
}

export default Button;
