# Numerology SaaS Frontend - Development Todo

This document outlines the step-by-step plan based on `Milestones.md`.

## Milestone 0: Project Bootstrap & Infrastructure
- [x] **Issue 1: Initialize React App**
  - Create React project with Vite.
  - *Test*: Run `npm run dev` -> Open `http://localhost:5173` -> Verify page loads.
- [x] **Issue 2: Configure Tailwind CSS**
  - Install and configure Tailwind.
  - *Test*: Add `bg-red-500` to a div -> Verify background color renders.
- [x] **Issue 3: Establish Strict Directory Structure**
  - Create `src/{components/ui,components/form,components/checkout,pages,services}`.
  - *Test*: Verify directory tree exists via file explorer or command line.
- [x] **Issue 4: Environment Variable Setup**
  - Create `.env.local` with `VITE_API_BASE_URL`.
  - *Test*: Log `import.meta.env.VITE_API_BASE_URL` -> Verify consistency.
- [x] **Issue 5: Global App Layout Shell**
  - Create top-level layout wrapper (max width, padding).
  - *Test*: Resize viewport -> Verify spacing consistency.
- [x] **Issue 6: Global Fonts & Base Styles**
  - Load Playfair Display (headings) & Inter (body).
  - *Test*: Inspect computed styles in devtools.

## Milestone 1: API Layer & Mocking
- [x] **Issue 7: Axios Instance Setup**
  - Create `src/services/api.js` with centralized config.
- [x] **Issue 8: Mock Pricing Config Endpoint**
  - Implement `getPricingConfig()` with fallback `{ base: 51, partner: 50 }`.
  - *Test*: Call function -> Verify returned JSON object.
- [x] **Issue 9: Mock Order Creation Endpoint**
  - Implement `createOrder()` returning mocked `order_id`.
  - *Test*: Call with dummy payload -> Verify success resolution.

## Milestone 2: Design System & Core UI Components
- [x] **Issue 10: Tailwind Design Tokens**
  - Define brand colors/fonts in `tailwind.config.js`.
- [x] **Issue 11: Button Component**
  - Create `Button.jsx` (Primary, Hover, Disabled, Loading).
  - *Test*: Render in story/page -> Verify visual states.
- [x] **Issue 12: Input Component**
  - Create `Input.jsx` (Labels, Error states, Accessibility).
  - *Test*: Pass error prop -> Verify red border/error text.
- [x] **Issue 13: Card / Container Components**
  - Create containers for form and sidebar.
- [x] **Issue 14: Global Error & Toast Component**
  - Standardize error messaging UI.

## Milestone 3: Form Implementation
- [x] **Issue 15: Core Form Fields**
  - Implement Name, Email, Gender, DOB, Time, Place.
  - *Test*: input values -> Submit -> Log output.
- [x] **Issue 16: Partner Compatibility Toggle**
  - Add checkbox for upsell.
- [x] **Issue 17: Conditional Partner Fields + Animation**
  - Slide-down animation for partner details.
  - *Test*: Toggle checkbox -> Verify visibility/animation.
- [x] **Issue 18: Conditional Validation Rules**
  - Require partner fields only when checked.
  - *Test*: Submit empty partner fields (unchecked=valid, checked=invalid).
- [x] **Issue 19: Accessibility Validation Pass**
  - Check tab order, focus states, aria-labels.

## Milestone 4: Pricing Logic & Sticky UI
- [x] **Issue 20: Pricing State Logic**
  - Compute total (51 vs 101).
- [x] **Issue 21: Sticky Price Display Component**
  - Create `PriceDisplay.jsx`.
- [x] **Issue 22: Responsive Behavior Validation**
  - *Test*: Mobile (bottom sticky), Desktop (right sticky).

## Milestone 5: Payment Flow & Routing
- [x] **Issue 23: React Router Setup**
  - Config `/` and `/success`.
- [x] **Issue 24: Mock Payment Flow**
  - Simulate payment delay -> Redirect.
- [x] **Issue 25: Success Page**
  - Static confirmation page.
- [x] **Issue 26: Hard Refresh Routing Test**
  - *Test*: Refresh `/success` -> Verify it doesn't 404.

## Milestone 6: Final Polish & Deployment Readiness
- [x] **Issue 27: Visual Consistency Review**
  - Match Landing Page.
- [x] **Issue 28: Loading & Disabled State Review**
  - Prevent double submissions.
- [x] **Issue 29: Environment Switching Validation**
  - Test missing env vars.
- [x] **Issue 30: Mobile Edge Case Testing**
  - Small screens, keyboard overlap.
- [x] **Issue 31: Documentation & Deployment Guide**
  - Update `README.md` with deploy instructions.
