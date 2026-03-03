import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

/**
 * Global Layout Wrapper
 * Ensures the Navigation and Footer persist smoothly across all page transitions.
 * Outlet renders the animated PageTransitions inside it.
 */
export function Layout() {
    return (
        <>
            <Navigation />
            <main className="min-h-screen relative z-10">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
