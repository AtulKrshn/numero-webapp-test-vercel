import React from 'react';
import { Card, CardContent } from './ui/Card';

export function TrustSection() {
    return (
        <div className="w-full max-w-5xl mx-auto space-y-12 py-12">

            {/* What You Will Receive / Deliverables */}
            <div className="space-y-6">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-display font-bold text-[var(--color-primary)]">
                        What's Inside Your Report
                    </h2>
                    <p className="text-[var(--color-secondary)]">
                        A complete Handcrafted breakdown with the PDF delivered to your mail inbox.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        "Personal Personality Snapshot",
                        "Core Numbers Calculation",
                        "Career & Financial Outlook",
                        "Relationship Compatibility Patterns",
                        "Health & Energy Cycles",
                        "Vedic Coping Remedies",
                        "Yearly Guidance for 2026",
                        "Actionable Implementation Plan"
                    ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
                            <span className="text-xl font-bold text-[var(--color-accent)]">✓</span>
                            <span className="font-medium text-[var(--color-primary)]">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Simple Trust Signals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[var(--color-border)]">
                <div className="text-center space-y-2">
                    <div className="text-3xl">🔒</div>
                    <h3 className="font-semibold text-[var(--color-primary)]">Data Safety</h3>
                    <p className="text-sm text-[var(--color-muted)]">Strict "Calculate & Delete" policy. Your data is wiped after delivery.</p>
                </div>
                <div className="text-center space-y-2">
                    <div className="text-3xl">✅</div>
                    <h3 className="font-semibold text-[var(--color-primary)]">Verified Analysis</h3>
                    <p className="text-sm text-[var(--color-muted)]">Multi-system integration (Vedic + local systems) for accuracy.</p>
                </div>
                <div className="text-center space-y-2">
                    <div className="text-3xl">📜</div>
                    <h3 className="font-semibold text-[var(--color-primary)]">Guaranteed Delivery</h3>
                    <p className="text-sm text-[var(--color-muted)]">Receive your PDF report within 12 hours or get a full refund.</p>
                </div>
            </div>

        </div>
    );
}
