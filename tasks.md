# TASKS.md — numero-main-webapp New Funnel

> Read this file fully before doing anything.
> Do ONE task at a time. Stop after each task and report what files were changed.
> Do not proceed to the next task until instructed.

---

## New Flow Being Built

Old: / (landing + form) → /checkout → /success
New: / (brand overview) → /reports (catalog) → /reports/numerology (product detail) → /order/numerology (form) → /checkout → /success

Active product: Solo Vedic Numerology Report 2026 — ₹399
Coming soon: Partner Compatibility Report — scaffold for it but do NOT build it yet.

---

## TASK 1 — Routing & Folder Scaffold

Create these empty page files with named exports and a placeholder return:
- src/pages/Reports.jsx
- src/pages/ReportDetail.jsx
- src/pages/OrderForm.jsx

Update src/App.jsx routes:
/ → Home.jsx (keep, redesigned later)
/reports → Reports.jsx
/reports/:slug → ReportDetail.jsx
/order/:slug → OrderForm.jsx
/checkout → Checkout.jsx (untouched)
/success → Success.jsx (untouched)
/payment-failed → PaymentFailed.jsx (untouched)
* → NotFound.jsx

Do NOT touch any existing page logic. Scaffold only.
Stop and report.

---

## TASK 2 — Remove Partner Feature Flag

Open src/components/form/UserDetailsForm.jsx.

Delete:
- const ENABLE_PARTNER_FEATURE = false
- The partner checkbox and all partner fields (name, DOB, time, place)
- Any state or validation rules only used by partner fields
- Any props related to partner that are now unused

Keep everything else exactly as-is. The form must still work for solo user details.
Stop and report exactly what was removed.

---

## TASK 3 — ReportDetail Page

Build src/pages/ReportDetail.jsx — the conviction/product detail page.
Slug: /reports/numerology

Data:
- Fetch products on mount via fetchProducts() from src/services/api.js
- Find solo product: sku.includes('FULL') || sku.includes('SINGLE')
- Show sale_price as current price, mrp as struck-through

Sections to build (in order):

1. HERO
   - Headline (Hinglish): "Aapke 2026 ke numbers — predictions, remedies, aur aapka personal sawaal"
   - Subheadline: "Apni exact birth date se jaaniye — is saal aapka career, relationships, health aur money ka kya kehta hai aapka chart"
   - Price: ₹399 (show mrp struck through)
   - Badge: "5-6 ghante mein aapke inbox mein"
   - CTA: "Apni Report Paaiye" → navigate('/order/numerology')
   - Micro-copy: "10,000+ reports delivered • Secure payment via Razorpay"

2. WHAT'S INSIDE (4 cards with icon, title, 2-line description)
   - 2026 Predictions — "Aapke personal year number ke hisaab se career, money, relationships aur health ka poora breakdown"
   - Planes Analysis — "Aapke chart mein jo planes active hain unka detailed analysis — strengths aur risks dono"
   - Missing Numbers + Remedies — "Jo numbers missing hain unke liye maha-mantra aur semi-precious stone recommendation"
   - Your Personal Question — "Form mein apna ek sawaal poochiye — career, business, relationship — aur report mein uska jawab milega"

3. SAMPLE PREVIEW
   - Heading: "Aisi hogi aapki report"
   - 2 blurred/redacted sample cards styled like actual report sections
   - Below: "Yeh sirf ek jhalak hai — aapki report aapke exact numbers ke hisaab se poori alag hogi"

4. PERSONAL QUESTION CALLOUT
   - Full-width highlighted block
   - "Aap apna sawaal pooch sakte hain"
   - "Report form mein aapko ek personal sawaal likhne ka mauka milega — jo bhi aapke mann mein hai, hum uska jawab report mein dete hain"

5. TESTIMONIALS
   - 3 cards: name, city, 5 stars, 2-line quote
   - Use placeholder content, mark with // TODO: replace with real testimonials

6. PRICE ANCHOR + FINAL CTA
   - "Ek personal numerologist session: ₹2,000–₹5,000"
   - "Aapki poori 2026 report: sirf ₹399"
   - "5-6 ghante mein aapke inbox mein"
   - CTA: "Abhi Apni Report Paaiye — ₹399" → /order/numerology

Meta Pixel:
- Fire ViewContent on mount with useRef dedup guard:
  trackEvent('ViewContent', { content_name: 'Numerology Report 2026', content_ids: [product.sku], value: product.sale_price, currency: 'INR' })

Styling:
- Playfair Display for headings, Inter for body
- Mobile-first, premium and trustworthy feel — not flashy
- Use var(--color-*) tokens from index.css

Stop and report.

---

## TASK 4 — OrderForm Page

Build src/pages/OrderForm.jsx.

- Get slug from useParams()
- Fetch products via fetchProducts()
- Resolve product by slug:
  numerology → sku.includes('FULL') || sku.includes('SINGLE')
  unknown slug → navigate('/reports', { replace: true })
- Render UserDetailsForm with resolved product and products array as props
- On form submit: fire Lead pixel event, call initAdvancedMatching(), navigate to /checkout with location.state — same shape as currently done in Home.jsx
- No location.state guard needed (this is an entry point)

Layout:
- Desktop: form on left, sticky order summary card on right
- Order summary shows: product name, price, 3 bullet points of what's included, delivery time badge
- Mobile: order summary collapsed at top, form below

Stop and report.

---

## TASK 5 — Reports Catalog Page

Build src/pages/Reports.jsx.

- Fetch products on mount
- Two cards side by side (desktop) / stacked (mobile):

Card 1 — Active:
- Title: "Vedic Numerology Report 2026"
- Description: "Aapke personal year, core numbers aur planes ka poora analysis — predictions, remedies aur aapka personal sawaal"
- Price: ₹399
- Badge: "10,000+ delivered"
- CTA: "Dekhiye Report" → /reports/numerology

Card 2 — Coming Soon:
- Title: "Partner Compatibility Report"
- Description: "Aap aur aapke partner ke numbers kitne compatible hain — relationship strengths, challenges aur guidance"
- Badge: "Coming Soon"
- CTA button: disabled, text "Jaldi Aata Hai"
- Muted/greyed visual treatment

No pixel events on this page.
Stop and report.

---

## TASK 6 — Home Page Redesign

Redesign src/pages/Home.jsx as brand overview. Remove the form entirely.
IMPORTANT: Complete Task 4 before this task.

Sections:

1. HERO
   - Headline: "Aapka 2026 — numbers ne pehle se likh diya hai"
   - Subheadline: "Vedic Numerology se jaaniye aapka saal kaisa rahega — aur use apne favour mein kaise use karein"
   - CTA: "Apni Report Dekhiye" → /reports

2. WHAT IS VEDIC NUMEROLOGY (3 columns)
   - "Aapke numbers kya kehte hain" — brief on Mulank, Bhagyank, Naamank
   - "Active Planes" — every chart is unique
   - "Remedies" — maha-mantra, stones, practical guidance

3. REPORT TEASERS
   - Two cards linking to /reports (same as Reports page cards, simplified)

4. TRUST SECTION
   - Render existing <TrustSection /> component as-is

5. CTA BANNER
   - "Taiyaar hain apna 2026 jaanne ke liye?"
   - Button → /reports

REMOVE from Home.jsx:
- fetchProducts() call and products state
- UserDetailsForm import and render
- handleFormSubmit function
- All pixel Lead/ViewContent events
- Coupon-related state

KEEP: TrustSection, Layout, basic structure
Stop and report exactly what was removed.

---

## TASK 7 — Pixel Event Audit

Verify the correct pixel event fires on the correct page:

PageView → PixelRouteTracker (every route, no change needed)
ViewContent → ReportDetail.jsx on mount (useRef guard)
Lead → OrderForm.jsx on form submit
InitiateCheckout → Checkout.jsx on mount (no change needed)
AddPaymentInfo → Checkout.jsx before rzp.open() (no change needed)
Purchase → Success.jsx on mount (no change needed)

Remove any duplicate ViewContent or Lead events still in Home.jsx.
Verify initAdvancedMatching() is called in OrderForm.jsx on submit.
Report the full verified event map with file locations.

---

## TASK 8 — Navigation & Internal Links

Update:
- Header.jsx: logo → /, add nav link "Reports" → /reports
- Footer.jsx: add links to /reports and /reports/numerology
- NotFound.jsx: CTA → /
- PaymentFailed.jsx: retry CTA → /order/numerology
- Verify no page still points to the old / form flow

Stop and report all links updated.

---

## TASK 9 — Final Smoke Test

Test the full flow:
1. / loads, no form, CTA → /reports ✓
2. /reports loads both cards, active CTA → /reports/numerology ✓
3. /reports/numerology loads product, price shows, CTA → /order/numerology ✓
4. /order/numerology loads form, submits, navigates to /checkout with correct state ✓
5. /checkout loads, coupon works, Razorpay opens ✓
6. /success and /payment-failed load without errors ✓
7. Direct /checkout without state → redirects to / ✓
8. Direct /order/unknownslug → redirects to /reports ✓

Console: no React key warnings, no useEffect dependency warnings, no fbq errors.
Report any issues found and fix them.

---

## Task Order Summary

Task 1 — Routing scaffold (App.jsx + 3 new files)
Task 2 — Remove partner flag (UserDetailsForm.jsx only)
Task 3 — ReportDetail page
Task 4 — OrderForm page
Task 5 — Reports catalog page
Task 6 — Home redesign (only after Task 4 is done)
Task 7 — Pixel audit
Task 8 — Nav and links
Task 9 — Final smoke test

One task at a time. Stop and report after each.