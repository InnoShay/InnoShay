import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';

/**
 * Global Layout Wrapper
 * Navigation is now rendered in App.tsx OUTSIDE the filtered motion.div
 * to fix position:fixed being broken by CSS filter on ancestors.
 * Outlet renders the animated PageTransitions inside it.
 */
export function Layout() {
    return (
        <>
            <main className="min-h-screen relative z-10">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
