import React, { useState, useRef, useEffect, useCallback } from 'react';

export function DobInput({ value, onChange, onBlur, error, label, required }) {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    // Refs to track latest values (avoids stale closure bugs)
    const dayRef = useRef('');
    const monthRef = useRef('');
    const yearRef = useRef('');

    const dayInputRef = useRef(null);
    const monthInputRef = useRef(null);
    const yearInputRef = useRef(null);
    const containerRef = useRef(null);

    const [isFocused, setIsFocused] = useState(false);

    // Keep refs in sync with state
    useEffect(() => { dayRef.current = day; }, [day]);
    useEffect(() => { monthRef.current = month; }, [month]);
    useEffect(() => { yearRef.current = year; }, [year]);

    // Sync from parent value (e.g. form reset)
    useEffect(() => {
        if (value && typeof value === 'string' && value.includes('-')) {
            const [y, m, d] = value.split('-');
            if (y && m && d) {
                if (d !== day) setDay(d);
                if (m !== month) setMonth(m);
                if (y !== year) setYear(y);
            }
        }
    }, [value]);

    // --- Validation ---
    const getDaysInMonth = (m, y) => {
        const monthNum = parseInt(m, 10);
        const yearNum = parseInt(y, 10);
        if (!monthNum || monthNum < 1 || monthNum > 12) return 31;
        if (!yearNum || yearNum < 1900) return new Date(2000, monthNum, 0).getDate();
        return new Date(yearNum, monthNum, 0).getDate();
    };

    const isValidDate = (d, m, y) => {
        if (!d || !m || !y) return false;
        const dayNum = parseInt(d, 10);
        const monthNum = parseInt(m, 10);
        const yearNum = parseInt(y, 10);
        if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) return false;
        if (monthNum < 1 || monthNum > 12) return false;
        if (yearNum < 1900 || yearNum > new Date().getFullYear()) return false;
        const maxDay = getDaysInMonth(m, y);
        if (dayNum < 1 || dayNum > maxDay) return false;
        const date = new Date(yearNum, monthNum - 1, dayNum);
        if (date > new Date()) return false;
        return true;
    };

    // --- Emit to parent (uses refs for latest values) ---
    const emitValue = useCallback((d, m, y) => {
        if (!d && !m && !y) {
            onChange(undefined);
            return;
        }

        if (d.length >= 1 && m.length >= 1 && y.length === 4) {
            const paddedD = d.padStart(2, '0');
            const paddedM = m.padStart(2, '0');
            if (isValidDate(paddedD, paddedM, y)) {
                onChange(`${y}-${paddedM}-${paddedD}`);
            } else {
                onChange('invalid');
            }
        } else {
            onChange('invalid');
        }
    }, [onChange]);

    // --- Day ---
    const handleDayChange = (e) => {
        let val = e.target.value.replace(/\D/g, '').slice(0, 2);
        const num = parseInt(val, 10);

        if (val.length === 2 && num > 31) val = '31';
        if (val.length === 2 && num === 0) val = '01';

        setDay(val);
        dayRef.current = val;

        // Auto-advance: digits 4-9 can only be single-digit days (04-09)
        if (val.length === 1 && num >= 4) {
            const padded = val.padStart(2, '0');
            setDay(padded);
            dayRef.current = padded;
            monthInputRef.current?.focus();
            emitValue(padded, monthRef.current, yearRef.current);
            return;
        }

        if (val.length === 2) {
            monthInputRef.current?.focus();
        }

        emitValue(val, monthRef.current, yearRef.current);
    };

    // --- Month ---
    const handleMonthChange = (e) => {
        let val = e.target.value.replace(/\D/g, '').slice(0, 2);
        const num = parseInt(val, 10);

        if (val.length === 2 && num > 12) val = '12';
        if (val.length === 2 && num === 0) val = '01';

        setMonth(val);
        monthRef.current = val;

        // Auto-advance: digits 2-9 can only be single-digit months (02-09)
        if (val.length === 1 && num >= 2) {
            const padded = val.padStart(2, '0');
            setMonth(padded);
            monthRef.current = padded;
            yearInputRef.current?.focus();
            emitValue(dayRef.current, padded, yearRef.current);
            return;
        }

        if (val.length === 2) {
            yearInputRef.current?.focus();
        }

        emitValue(dayRef.current, val, yearRef.current);
    };

    // --- Year ---
    const handleYearChange = (e) => {
        let val = e.target.value.replace(/\D/g, '').slice(0, 4);
        setYear(val);
        yearRef.current = val;

        if (val.length === 4) {
            const num = parseInt(val, 10);
            if (num >= 1900) {
                yearInputRef.current?.blur();
            }
        }

        emitValue(dayRef.current, monthRef.current, val);
    };

    // --- Blur: pad single digits and emit final value ---
    const handleBlur = (e) => {
        const nextFocus = e.relatedTarget;
        const isStillInside = containerRef.current?.contains(nextFocus);

        if (!isStillInside) {
            let finalDay = dayRef.current;
            let finalMonth = monthRef.current;

            if (finalDay.length === 1 && parseInt(finalDay, 10) > 0) {
                finalDay = finalDay.padStart(2, '0');
                setDay(finalDay);
                dayRef.current = finalDay;
            }
            if (finalMonth.length === 1 && parseInt(finalMonth, 10) > 0) {
                finalMonth = finalMonth.padStart(2, '0');
                setMonth(finalMonth);
                monthRef.current = finalMonth;
            }

            setIsFocused(false);
            emitValue(finalDay, finalMonth, yearRef.current);
            if (onBlur) onBlur();
        }
    };

    // --- Backspace navigation ---
    const handleKeyDown = (e, type) => {
        if (e.key === 'Backspace') {
            if (type === 'month' && monthRef.current === '') {
                dayInputRef.current?.focus();
            } else if (type === 'year' && yearRef.current === '') {
                monthInputRef.current?.focus();
            }
        }
    };

    const showError = error && !isFocused;

    // --- Inline hint text ---
    const getHintText = () => {
        const dayNum = parseInt(day, 10);
        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);

        if (month && month.length === 2 && monthNum > 12) {
            return 'Month cannot exceed 12';
        }
        if (day && month.length === 2 && day.length >= 1) {
            const maxDay = getDaysInMonth(month, year || '2000');
            if (dayNum > maxDay) return `This month only has ${maxDay} days`;
        }
        if (year && year.length === 4 && yearNum < 1900) {
            return 'Year must be 1900 or later';
        }
        if (year && year.length === 4 && yearNum > new Date().getFullYear()) {
            return 'Year cannot be in the future';
        }
        return null;
    };

    const hint = getHintText();

    return (
        <div className="flex flex-col gap-1.5 w-full" ref={containerRef}>
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div className="flex gap-2 w-full">
                <input
                    ref={dayInputRef}
                    type="tel"
                    inputMode="numeric"
                    placeholder="DD"
                    value={day}
                    onChange={handleDayChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => handleKeyDown(e, 'day')}
                    className={`
                        flex-1 min-w-0 h-10 text-center rounded-md border px-2 py-2 text-sm 
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
                    ref={monthInputRef}
                    type="tel"
                    inputMode="numeric"
                    placeholder="MM"
                    value={month}
                    onChange={handleMonthChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => handleKeyDown(e, 'month')}
                    className={`
                        flex-1 min-w-0 h-10 text-center rounded-md border px-2 py-2 text-sm 
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
                    ref={yearInputRef}
                    type="tel"
                    inputMode="numeric"
                    placeholder="YYYY"
                    value={year}
                    onChange={handleYearChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => handleKeyDown(e, 'year')}
                    className={`
                        flex-[1.5] min-w-0 h-10 text-center rounded-md border px-2 py-2 text-sm 
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

            {hint && isFocused && (
                <span className="text-xs text-amber-600 font-medium">{hint}</span>
            )}

            {showError && (
                <span className="text-sm font-medium text-red-500" role="alert">
                    {error}
                </span>
            )}
        </div>
    );
}
