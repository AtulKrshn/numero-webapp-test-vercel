# Numero WebApp - Codebase Flow & Architecture

## 1. System Overview
The **Numero Main Webapp** is a React-based Single Page Application (SPA) built with Vite and Tailwind CSS (v4). It serves as the frontend for the Vedic Numerology Report platform, handling user data collection, product selection, and payment processing via Razorpay.

## 2. Directory Structure (`src/`)

- **`components/`**: Reusable UI components.
  - **`form/`**: Complex form logic (e.g., `UserDetailsForm.jsx`).
  - **`ui/`**: Atomic UI elements.
    - `Button.jsx`: Supports `isLoading` state and variants.
    - `Toast.jsx` & `ToastContext.jsx`: Global notification system.
    - `PriceDisplay.jsx`: "Sticky" sidebar component handling dynamic price calculation.
- **`pages/`**: Route-level components.
  - `Home.jsx`: Landing, Product fetching, User Form.
  - `Checkout.jsx`: Order summary, Coupon logic, Payment initiation.
  - `Success.jsx` / `PaymentFailed.jsx`: Post-payment states.
- **`services/`**: API integration layer (`api.js`).
- **`context/`**: Global state.
  - `ToastContext.jsx`: Provides `useToast()` hook.

## 3. Core User Journey & Code Flow

### Phase 1: Landing & Product Loading
**File:** `src/pages/Home.jsx`
1.  **Mount**: `useEffect` calls `fetchProducts()` from `api.js` (GET `/products`).
2.  **Display**: Renders `UserDetailsForm`.
3.  **Interaction**: User fills Name, DOB, Time.
    *   **Partner Option**: Toggling "Include Partner" updates local state (`hasPartner`).
    *   **Dynamic Pricing**: `PriceDisplay` component calculates total based on `products` data.
    *   **Deep Linking**: Checks `location.hash` (`#numerology-form`) to auto-scroll and focus inputs.

### Phase 2: Submission & Product Selection
**File:** `src/pages/Home.jsx` -> `handleFormSubmit`
1.  **Product Matching**: Logic selects the correct SKU based on form data:
    *   **Single**: `NUM-FULL-2026` (or similar SKU with 'FULL'/'SINGLE')
    *   **Partner**: `NUM-REL-2026` (or similar SKU with 'REL'/'PARTNER')
2.  **Navigation**: Redirects to `/checkout` using `navigate()` with **state**:
    *   `formData`: (Name, DOB, etc.)
    *   `selectedProduct`: (Full product object)
    *   `totalPrice`: (Calculated amount)

### Phase 3: Checkout & Order Creation
**File:** `src/pages/Checkout.jsx`
1.  **Mount**: Checks `location.state`. Redirects to Home if missing.
2.  **Coupon**: `handleApplyCoupon` calls `checkCoupon` (POST `/orders/check-coupon`).
    *   *Micro-detail*: Converts input to Uppercase automatically.
3.  **Payment Action** (`handlePayment`):
    *   **Construct Payload**: Maps form data to Backend `OrderCreate` schema.
    *   **Create Order**: Calls `createOrder` (POST `/orders/create-order`).
        *   *Response*: `gateway_order_id`, `amount`, `key_id`.
    *   **Free Order Check**: If `amount === 0`, skips Razorpay and jumps to Success.
    *   **Razorpay**: Initializes `window.Razorpay` with order details.

### Phase 4: Payment Verification
**File:** `src/pages/Checkout.jsx` (inside Razorpay `handler`)
1.  **User Pays**: Razorpay modal success.
2.  **Verify**: Calls `verifyPayment` (POST `/payments/verify`) with:
    *   `razorpay_payment_id`
    *   `razorpay_order_id`
    *   `razorpay_signature`
3.  **Success Navigation**: Redirects to `/success` with order data.
    *   *Endpoint Failure Handling*: If verification fails (network), still navigates to Success with `status: 'pending_sync'` (optimistic UI), unless it's a critical auth error (400/401).

## 4. Backend Integration (`src/services/api.js`)
The app communicates with the FastAPI backend via Axios.

| Function | Endpoint | Purpose |
| :--- | :--- | :--- |
| `fetchProducts` | `GET /api/v1/products` | Loads catalog & pricing. |
| `checkCoupon` | `POST /api/v1/orders/check-coupon` | Validates discount codes. |
| `createOrder` | `POST /api/v1/orders/create-order` | Creates DB entry & Razorpay Order. |
| `verifyPayment` | `POST /api/v1/payments/verify` | Validates payment signature. |

*   **Interceptors**: Setup in `api.js` but primarily log errors currently.

## 5. Micro-Architecture & Design Tokens

### Styling System (Tailwind v4)
**File:** `src/index.css` uses `@theme` block:
*   **Colors**: Semantic naming (`--color-primary`, `--color-accent`) mapping to specific hex values.
*   **Fonts**: `--font-display` (Playfair Display) for headers, `--font-body` (Inter) for text.
*   **Gradients**: Background is a linear gradient defined in `@layer base`.

### Global State (ToastContext)
*   **Provider**: `ToastProvider` wraps the app in `App.jsx`.
*   **Usage**: `const { addToast } = useToast()`.
*   **Behavior**:
    *   Toasts auto-dismiss after 3000ms (default).
    *   Rendered in a fixed portal at `bottom-4 right-4`.
    *   `pointer-events-none` on container allows clicking through to elements behind it.

### UI Component Details
*   **`PriceDisplay.jsx`**:
    *   Has two render modes: **Sticky Sidebar** (Desktop) and **Fixed Bottom Bar** (Mobile).
    *   Handles "Strikethrough" logic for MRP vs Sale Price.
*   **`UserDetailsForm.jsx`**:
    *   Uses `react-hook-form` in `onBlur` mode for validation.
    *   **Feature Flag**: `ENABLE_PARTNER_FEATURE` controls visibility of partner inputs.
