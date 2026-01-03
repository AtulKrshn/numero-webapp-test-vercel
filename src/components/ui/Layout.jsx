import { Footer } from './Footer';

export function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-transparent">
            {/* Main content takes available space */}
            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
}
