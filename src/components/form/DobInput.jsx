import React, { useState, useRef, useEffect } from 'react';

export function DobInput({ value, onChange, onBlur, error, label, required }) {
    // Internal state to manage individual fields
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const dayRef = useRef(null);
    const monthRef = useRef(null);
    const yearRef = useRef(null);
    const containerRef = useRef(null);

    // Track focus to hide error while typing
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    // Initialize from external value if present (and not matching internal state)
    useEffect(() => {
        if (value) {
            const [y, m, d] = value.split('-');
            if (y && m && d) {
                // Only update if different to avoid cursor jumping loops, 
                // though with split inputs it's less an issue than single input.
                if (d !== day) setDay(d);
                if (m !== month) setMonth(m);
                if (y !== year) setYear(y);
            }
        } else if (value === undefined) {
            // Keep internal state if just incomplete, don't wipe it unless explicit reset needed?
            // Actually RHF sending undefined means "invalid/incomplete". 
            // We shouldn't wipe user's typing.
        }
    }, [value]);

    // Validation Helper
    const isValidDate = (d, m, y) => {
        if (!d || !m || !y) return false;

        const dayNum = parseInt(d, 10);
        const monthNum = parseInt(m, 10);
        const yearNum = parseInt(y, 10);

        if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) return false;

        // Basic Ranges
        if (monthNum < 1 || monthNum > 12) return false;
        if (dayNum < 1 || dayNum > 31) return false;

        // Year Ranges
        const currentYear = new Date().getFullYear();
        if (yearNum < 1900 || yearNum > currentYear) return false;

        // Strict Calendar Check (e.g. Feb 30)
        const date = new Date(yearNum, monthNum - 1, dayNum);
        if (
            date.getFullYear() !== yearNum ||
            date.getMonth() !== monthNum - 1 ||
            date.getDate() !== dayNum
        ) {
            return false;
        }

        // Future Date Check (redundant with year check but stricter)
        if (date > new Date()) return false;

        return true;
    };

    const emitChange = (d, m, y) => {
        if (!d && !m && !y) {
            // Signal empty state to parent (triggers 'required')
            onChange(undefined);
            return;
        }

        if (isValidDate(d, m, y)) {
            onChange(`${y}-${m}-${d}`);
        } else {
            // Signal invalid state to parent (distinct from empty)
            onChange('invalid');
        }
    };

    const handleDayChange = (e) => {
        let val = e.target.value.replace(/\D/g, ''); // Numeric only

        if (val.length > 2) val = val.slice(0, 2);

        // Strict Day Check
        if (parseInt(val, 10) > 31) return; // Ignore impossible input
        if (val === '00') return; // Ignore 00

        setDay(val);

        // Focus Management
        if (val.length === 2) {
            monthRef.current?.focus();
        }

        emitChange(val, month, year);
    };

    const handleMonthChange = (e) => {
        let val = e.target.value.replace(/\D/g, '');

        if (val.length > 2) val = val.slice(0, 2);

        // Strict Month Check
        if (parseInt(val, 10) > 12) return;
        if (val === '00') return;

        setMonth(val);

        if (val.length === 2) {
            yearRef.current?.focus();
        }

        emitChange(day, val, year);
    };

    const handleYearChange = (e) => {
        let val = e.target.value.replace(/\D/g, '');

        if (val.length > 4) val = val.slice(0, 4);

        setYear(val);

        if (val.length === 4) {
            // Optional: blur or stay? User requirement: "auto-blur year field"
            if (isValidDate(day, month, val)) {
                yearRef.current?.blur();
            }
        }

        emitChange(day, month, val);
    };

    const handlePadBlur = (e, type) => {
        let newVal;

        // Check if focus is moving within the component
        const nextFocus = e.relatedTarget;
        const isStillInside = containerRef.current && containerRef.current.contains(nextFocus);

        if (type === 'day') {
            newVal = day;
            if (newVal.length === 1 && parseInt(newVal) > 0) {
                newVal = `0${newVal}`;
                setDay(newVal);
            }
            emitChange(newVal, month, year);
        } else if (type === 'month') {
            newVal = month;
            if (newVal.length === 1 && parseInt(newVal) > 0) {
                newVal = `0${newVal}`;
                setMonth(newVal);
            }
            emitChange(day, newVal, year);
        } else if (type === 'year') {
            // No padding for year, but still need to emit change and handle parent onBlur
            emitChange(day, month, year);
        }

        // Only trigger validation if focus leaves the entire group
        if (!isStillInside) {
            setIsFocused(false);
            if (onBlur) onBlur();
        }
    };

    const handleKeyDown = (e, type) => {
        if (e.key === 'Backspace') {
            if (type === 'month' && month === '') {
                dayRef.current?.focus();
            } else if (type === 'year' && year === '') {
                monthRef.current?.focus();
            }
        }
    };

    const showError = error && !isFocused;

    return (
        <div className="flex flex-col gap-1.5 w-full" ref={containerRef}>
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div className="flex gap-2">
                <input
                    ref={dayRef}
                    type="tel"
                    inputMode="numeric"
                    placeholder="DD"
                    value={day}
                    onChange={handleDayChange}
                    onFocus={handleFocus}
                    onBlur={(e) => handlePadBlur(e, 'day')}
                    onKeyDown={(e) => handleKeyDown(e, 'day')}
                    className={`
                        flex h-10 w-16 text-center rounded-md border px-3 py-2 text-sm 
                        placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 
                        transition-colors
                        ${showError
                            ? 'border-red-500 text-red-900 focus-visible:ring-red-500 bg-red-50'
                            : 'border-gray-300 text-gray-900 focus-visible:ring-[var(--color-primary)]'
                        }
                    `}
                    maxLength={2}
                    aria-label="Day"
                />

                <span className="self-center text-gray-400">/</span>

                <input
                    ref={monthRef}
                    type="tel"
                    inputMode="numeric"
                    placeholder="MM"
                    value={month}
                    onChange={handleMonthChange}
                    onFocus={handleFocus}
                    onBlur={(e) => handlePadBlur(e, 'month')}
                    onKeyDown={(e) => handleKeyDown(e, 'month')}
                    className={`
                        flex h-10 w-16 text-center rounded-md border px-3 py-2 text-sm 
                        placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 
                        transition-colors
                        ${showError
                            ? 'border-red-500 text-red-900 focus-visible:ring-red-500 bg-red-50'
                            : 'border-gray-300 text-gray-900 focus-visible:ring-[var(--color-primary)]'
                        }
                    `}
                    maxLength={2}
                    aria-label="Month"
                />

                <span className="self-center text-gray-400">/</span>

                <input
                    ref={yearRef}
                    type="tel"
                    inputMode="numeric"
                    placeholder="YYYY"
                    value={year}
                    onChange={handleYearChange}
                    onFocus={handleFocus}
                    onBlur={(e) => handlePadBlur(e, 'year')}
                    onKeyDown={(e) => handleKeyDown(e, 'year')}
                    className={`
                        flex h-10 w-24 text-center rounded-md border px-3 py-2 text-sm 
                        placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 
                        transition-colors
                        ${showError
                            ? 'border-red-500 text-red-900 focus-visible:ring-red-500 bg-red-50'
                            : 'border-gray-300 text-gray-900 focus-visible:ring-[var(--color-primary)]'
                        }
                    `}
                    maxLength={4}
                    aria-label="Year"
                />
            </div>

            {showError && (
                <span className="text-sm font-medium text-red-500" role="alert">
                    {error}
                </span>
            )}
        </div>
    );
}
