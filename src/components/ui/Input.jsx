import React from 'react';

export function Input({
    label,
    error,
    id,
    className = '',
    ...props
}) {
    const inputId = id || props.name || Math.random().toString(36).substr(2, 9);
    const errorId = `${inputId}-error`;

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}

            <input
                id={inputId}
                aria-invalid={!!error}
                aria-describedby={error ? errorId : undefined}
                className={`
          flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm 
          placeholder:text-muted/50 
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary 
          disabled:cursor-not-allowed disabled:opacity-50
          transition-colors
          ${error
                        ? 'border-[var(--color-error)] text-[var(--color-error)] focus-visible:ring-[var(--color-error)]'
                        : 'border-[var(--color-border)] text-gray-900 focus-visible:ring-primary'
                    }
          ${className}
        `}
                {...props}
            />

            {error && (
                <span id={errorId} className="text-sm font-medium text-[var(--color-error)]" role="alert">
                    {error}
                </span>
            )}
        </div>
    );
}
