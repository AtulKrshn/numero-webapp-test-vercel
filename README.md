# Sankhya Vedic Numerology - Web Application

An elegant, modern frontend for the Sankhya Vedic Numerology platform. Built with **React**, **Vite**, and **Tailwind CSS**, this application offers a seamless user experience for purchasing personalized numerology reports.

## ✨ Features

-   **Dynamic User Details Form**:
    -   Collects detailed birth information (Date, Time, Place).
    -   **Partner Compatibility Upsell**: Slide-in form section for partner details when enabled.
    -   **Real-time Validation**: Robust form validation using `react-hook-form`.
    -   **Accessible UI**: Fully ARIA-compliant inputs and error states.

-   **Smart Pricing Engine**:
    -   **Base Report**: ₹51
    -   **Partner Add-on**: +₹50 (Total ₹101)
    -   **Sticky Price Display**: Sidebar summary on Desktop, Fixed bottom bar on Mobile.

-   **Modern Tech Stack**:
    -   **React 18** + **Vite**: Blazing fast development and build.
    -   **Tailwind CSS v4**: Utility-first styling with custom design tokens (`@theme`).
    -   **React Router v6**: Client-side routing with mock payment flow simulation.

## 🛠️ Tech Stack

-   **Frontend Framework**: React 18, Vite
-   **Styling**: Tailwind CSS v4, PostCSS
-   **Form Management**: React Hook Form
-   **Routing**: React Router DOM
-   **HTTP Client**: Axios
-   **Icons**: Heroicons / SVGs

## 🚀 Getting Started

### Prerequisites
-   Node.js (v16+, v18+ recommended)
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-org/sankhya-webapp.git
    cd sankhya-webapp
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Environment Variables:
    Create a `.env.local` file in the root directory:
    ```env
    VITE_API_BASE_URL=http://localhost:8000
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Build & Deployment

To build the application for production:

```bash
npm run build
```

This will compile the app into the `dist/` directory, ready to be hosted on Vercel, Netlify, or AWS S3/CloudFront.

### Preview Production Build
You can test the production build locally:
```bash
npm run preview
```

## 📂 Project Structure

```
src/
├── components/
│   ├── ui/          # Reusable UI atoms (Button, Input, Card, Select)
│   └── form/        # Complex form logic (UserDetailsForm)
├── pages/           # Route components (Home, Success)
├── services/        # API configuration (Axios)
├── context/         # Global state (ToastContext)
└── index.css        # Tailwind @theme and global styles
```

## 🎨 Design System

The app uses a defined color palette and typography system via Tailwind v4's `@theme` directive:

-   **Primary**: `#4B2E83` (Royal Purple)
-   **Secondary**: `#D4A373` (Gold/Sand)
-   **Font Display**: *Playfair Display*
-   **Font Body**: *Inter*

## 🤝 Contributing

1.  Create a feature branch (`git checkout -b feature/amazing-feature`).
2.  Commit your changes (`git commit -m 'Add some amazing feature'`).
3.  Push to the branch (`git push origin feature/amazing-feature`).
4.  Open a Pull Request.

---
Built with ❤️ for Sankhya Vedic Numerology.
