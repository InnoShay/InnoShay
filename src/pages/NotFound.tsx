import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function NotFound() {
    return (
        <PageTransition>
            <div className="bg-[#050505] min-h-screen text-white relative flex flex-col items-center justify-center p-6 text-center">

                {/* Subtle Error Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[600px] h-[60vw] max-h-[600px] bg-red-500/10 blur-[100px] rounded-full pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 flex flex-col items-center gap-8 max-w-2xl"
                >
                    {/* Abstract Error Node */}
                    <div className="w-24 h-24 rounded-2xl bg-white/5 border border-red-500/20 flex relative items-center justify-center mb-4">
                        <div className="absolute inset-0 border border-red-500/50 rounded-2xl animate-pulse" />
                        <span className="font-mono text-xl text-red-500 tracking-widest">404</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-medium tracking-tight">System Not Found.</h1>
                    <p className="text-xl text-gray-400 font-light">The page you're looking for doesn't exist in this architecture.</p>

                    <Link to="/" className="mt-8 inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-medium rounded-full transition-all duration-300">
                        <ArrowLeft className="w-4 h-4" />
                        Return to Root Directory
                    </Link>

                </motion.div>

            </div>
        </PageTransition>
    );
}
