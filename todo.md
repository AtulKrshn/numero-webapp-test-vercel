# Numerology SaaS Frontend - Integration & Polish Todo

## 1. Environment & Config
- [x] Create/Update `webapp/.env.local`
- [x] Refactor `api.js` to match Backend Endpoints.

## 2. API Integration
- [x] **Home Page (`Home.jsx`)**:
    - [x] Fetch products using updated `api.js`.
    - [x] Update Product Selection logic.
    - [x] Implement Order Creation.
- [x] **Payment Integration**:
    - [x] Implement Razorpay Flow.
    - [x] Handle Verification.

## 3. Visual Alignment & Polish (Current Focus)
**Goal**: Make Webapp look identical to Landing Page.

- [x] **Global Styles Check**:
    - [x] Verify `index.css` has `playfair/inter` fonts.
    - [x] Verify `index.css` has background gradient.
    - [x] Ensure `tailwind.config.js` (or index.css theme) extends colors.
- [x] **Footer Replication**:
    - [x] Create `src/components/ui/Footer.jsx`.
    - [x] Port HTML structure from `landing page/index.html` (lines 392-422).
    - [x] Port CSS from `styles.css` (lines 533-590) to Tailwind classes.
        -   Background: `#2C1810`
        -   Text: `#E5CCA5`
        -   Headers: `#D4AF37`
- [x] **Header/Hero Alignment**:
    - [x] Ensure `Home.jsx` title matches Landing Page Hero typography.
    - [x] Center alignment consistency.
- [/] **Layout Update**:
    - [x] Update `src/components/ui/Layout.jsx` to include the new `<Footer />`.
    - [x] Ensure passing `children` correctly between Header/Footer.

## 4. Final Verification
- [ ] End-to-End Test (Visual + Functional).
