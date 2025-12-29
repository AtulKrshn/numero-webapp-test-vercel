Role & Objective

You are a Senior Frontend Architect building the product checkout flow for a Numerology SaaS.

The backend (FastAPI) is owned by another team.
Your responsibility ends at frontend correctness and API integration readiness.

Core Stack (MANDATORY)

React (Vite)

Tailwind CSS

Axios

React Hook Form

❌ No Redux

❌ No Zustand

❌ No Context API (unless explicitly justified)

Visual Consistency (MANDATORY)

The Web App must visually match the Landing Page:

Same colors

Same fonts

Same button styles

Same spacing philosophy

No visual drift is acceptable.

Routing (Minimal)

Routes:

/ → Checkout form

/success → Order confirmation

No other routes.

Core User Flow

User arrives from Landing Page

User fills birth details

Optional upsell: Partner Compatibility

Price updates dynamically

User clicks Pay

(Mocked) payment success

Redirect to /success

Dynamic Form Requirements
Default Fields (Required unless noted)

Name

Email

Gender

Date of Birth

Time of Birth (Optional)

Place of Birth (Optional)

Partner Compatibility Upsell

Checkbox label:

Add Partner Compatibility Report (+₹50)

When checked:

Smooth slide-down animation

Show:

Partner Name (Required)

Partner Gender (Required)

Partner DOB (Required)

Validation:

Partner fields required only if checkbox is checked

Pricing Logic (Frontend)

Base price: ₹51

Partner add-on: +₹50

Final price:

₹51 or ₹101

UI Presentation

Show strikethrough:

~~₹251~~ ₹51

Strikethrough is cosmetic only

Final payable amount must be derived programmatically

Sticky Price Display

Mobile:

Sticky bottom bar

Desktop:

Right sidebar

Must update instantly when checkbox toggles

API Layer (/services/api.js)

Use Axios with clean abstraction.

Prepare (do NOT hard-fail if unavailable):

GET /config/pricing

Fallback to hardcoded prices if API fails

POST /orders/create

Returns mocked order_id

Backend is assumed NOT ready yet.

Razorpay Integration (Mocked for Now)

Do NOT load Razorpay SDK yet

Simulate payment success on button click

After “success”:

Redirect to /success

Design code so Razorpay can be plugged in later with minimal changes.

File Structure (Strict)
/src
  /components
    /ui
    /form
      NumerologyForm.jsx
    /checkout
      PriceDisplay.jsx
  /pages
    Home.jsx
    Success.jsx
  /services
    api.js

Output Expectations

Provide copy-paste runnable code

Assume Tailwind is already configured

No unnecessary abstractions

Clear comments where backend will integrate

Non-Goals (STRICT)

No authentication

No user accounts

No dashboards

No history pages

No PDF rendering


Environment Awareness

Assume:

.env.local

.env.staging

.env.production

Keys:

API base URL

Razorpay key (future)

Local Testing Instructions (Mandatory)

Explain:

How to run locally

How to test form validation

How to simulate payment success

Vercel Deployment Notes (Mandatory)

Explain:

How to deploy React app on Vercel

Where to set environment variables

How /success routing works on refresh