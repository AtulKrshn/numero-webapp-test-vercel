Milestone 0 — Project Bootstrap & Infrastructure

Goal: App runs locally with correct tooling, structure, and environment handling.

Issue #1 — Initialize React App with Vite

Type: Task
Priority: High

Description:
Create a new React project using Vite. Ensure development server starts without errors.

Acceptance Criteria:

npm run dev starts successfully

App renders in browser

Test:

Open http://localhost:5173

Confirm page loads

Issue #2 — Configure Tailwind CSS

Type: Task
Priority: High

Description:
Install and configure Tailwind CSS according to official Vite setup.

Acceptance Criteria:

Tailwind styles apply correctly

No build warnings

Test:

Add bg-red-500 to a test div

Confirm background color renders

Issue #3 — Establish Strict Directory Structure

Type: Task
Priority: Medium

Description:
Create the required folder structure:

src/
  components/ui
  components/form
  components/checkout
  pages
  services


Acceptance Criteria:

Directory tree exists exactly as defined

Test:

Verify structure in file explorer

Issue #4 — Environment Variable Setup

Type: Task
Priority: High

Description:
Create .env.local with placeholder variables.

Acceptance Criteria:

VITE_API_BASE_URL available via import.meta.env

Test:

Log value in console and verify output

Issue #5 — Global App Layout Shell

Type: Task
Priority: High

Description:
Create a top-level layout wrapper responsible for:

Max width

Global padding

Mobile vs desktop spacing

Acceptance Criteria:

Layout consistency across pages

Test:

Resize viewport → spacing remains correct

Issue #6 — Global Fonts & Base Styles

Type: Task
Priority: Medium

Description:
Load Playfair Display and Inter via Google Fonts and apply globally.

Acceptance Criteria:

Headings use Playfair

Body, inputs, buttons use Inter

Test:

Inspect computed styles in browser devtools

🧭 Milestone 1 — API Layer & Mocking

Goal: Frontend can operate independently of backend.

Issue #7 — Axios Instance Setup

Type: Task
Priority: High

Description:
Create Axios instance in src/services/api.js with base URL and defaults.

Acceptance Criteria:

Centralized Axios config exists

Issue #8 — Mock Pricing Config Endpoint

Type: Task
Priority: High

Description:
Implement getPricingConfig() with fallback data.

Acceptance Criteria:

Returns { base: 51, partner: 50 } on failure

Test:

Call function and log result

Issue #9 — Mock Order Creation Endpoint

Type: Task
Priority: High

Description:
Implement createOrder() returning a mocked order_id.

Acceptance Criteria:

Function resolves successfully with fake ID

Test:

Call with dummy payload

🧭 Milestone 2 — Design System & Core UI Components

Goal: Establish reusable, brand-consistent UI primitives.

Issue #10 — Tailwind Design Tokens

Type: Task
Priority: High

Description:
Define brand colors and fonts in Tailwind config to match landing page.

Acceptance Criteria:

Tokens usable via Tailwind classes

Issue #11 — Button Component

Type: Task
Priority: High

Description:
Create reusable Button component with:

Primary styles

Hover & disabled states

Loading support

Test:

Render button in multiple states

Issue #12 — Input Component with Error Handling

Type: Task
Priority: High

Description:
Create Input component supporting:

Labels

Validation errors

Accessibility attributes

Test:

Pass error prop → visual feedback visible

Issue #13 — Card / Container Components

Type: Task
Priority: Medium

Description:
Create layout containers for form and pricing sidebar.

Issue #14 — Global Error & Toast Component

Type: Task
Priority: Medium

Description:
Standardize error messaging for API and validation failures.

🧭 Milestone 3 — Form Implementation (React Hook Form)

Goal: Fully functional, validated checkout form.

Issue #15 — Core Form Fields

Type: Task
Priority: High

Description:
Implement Name, Email, Gender, DOB, Time, Place inputs.

Test:

Submit → values logged correctly

Issue #16 — Partner Compatibility Toggle

Type: Task
Priority: High

Description:
Add upsell checkbox controlling partner fields visibility.

Issue #17 — Conditional Partner Fields + Animation

Type: Task
Priority: High

Description:
Reveal partner fields with slide-down animation.

Issue #18 — Conditional Validation Rules

Type: Task
Priority: High

Description:
Apply required rules only when partner option is enabled.

Issue #19 — Accessibility Validation Pass

Type: Task
Priority: Medium

Description:
Ensure:

Keyboard navigation

Label-input association

Focus states

🧭 Milestone 4 — Pricing Logic & Sticky UI

Goal: Real-time pricing clarity across devices.

Issue #20 — Pricing State Logic

Type: Task
Priority: High

Description:
Compute final price dynamically (₹51 vs ₹101).

Issue #21 — Sticky Price Display Component

Type: Task
Priority: High

Description:
Create responsive PriceDisplay component.

Issue #22 — Responsive Behavior Validation

Type: Task
Priority: Medium

Description:
Verify:

Mobile → bottom sticky bar

Desktop → right sidebar

🧭 Milestone 5 — Payment Flow & Routing

Goal: Complete checkout flow with mocked payment.

Issue #23 — React Router Setup

Type: Task
Priority: High

Description:
Configure routes:

/

/success

Issue #24 — Mock Payment Flow

Type: Task
Priority: High

Description:
Simulate payment success and redirect.

Issue #25 — Success Page

Type: Task
Priority: Medium

Description:
Create confirmation page with next-step messaging.

Issue #26 — Hard Refresh Routing Test

Type: Task
Priority: High

Description:
Ensure /success works on browser refresh (Vercel rewrite).

🧭 Milestone 6 — Final Polish & Deployment Readiness

Goal: Production-safe frontend ready for team testing.

Issue #27 — Visual Consistency Review

Type: Task
Priority: Medium

Description:
Compare UI against landing page design system.

Issue #28 — Loading & Disabled State Review

Type: Task
Priority: Medium

Description:
Ensure no double submissions or UI race conditions.

Issue #29 — Environment Switching Validation

Type: Task
Priority: High

Description:
Test missing / incorrect env vars handling.

Issue #30 — Mobile Edge Case Testing

Type: Task
Priority: Medium

Description:
Test smallest screens and on-screen keyboard overlap.

Issue #31 — Documentation & Deployment Guide

Type: Task
Priority: High

Description:
Update README.md with:

Local dev steps

Vercel deployment

Environment variable setup