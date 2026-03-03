import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { CheckCircle2, Loader2, ArrowRight, ChevronDown } from 'lucide-react';

type FormStatus = 'idle' | 'submitting' | 'success';

interface FormData {
    name: string;
    email: string;
    company: string;
    projectType: string;
    budget: string;
    timeline: string;
    message: string;
}

export function Contact() {
    const [status, setStatus] = useState<FormStatus>('idle');
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        company: '',
        projectType: 'ai-systems',
        budget: '',
        timeline: '',
        message: ''
    });
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleBlur = (field: keyof FormData) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        validateField(field, formData[field]);
    };

    const validateField = (field: keyof FormData, value: string) => {
        let error = '';
        if (field === 'name' && !value.trim()) error = 'Name is required';
        if (field === 'email') {
            if (!value.trim()) error = 'Email is required';
            else if (!validateEmail(value)) error = 'Invalid work email';
        }
        if (field === 'company' && !value.trim()) error = 'Company is required';
        if (field === 'message' && !value.trim()) error = 'Project description is required';

        setErrors(prev => ({ ...prev, [field]: error }));
        return !error;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (touched[name as keyof FormData]) {
            validateField(name as keyof FormData, value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all
        const isNameValid = validateField('name', formData.name);
        const isEmailValid = validateField('email', formData.email);
        const isCompanyValid = validateField('company', formData.company);
        const isMessageValid = validateField('message', formData.message);

        // Set all touched
        setTouched({
            name: true, email: true, company: true, message: true
        });

        if (isNameValid && isEmailValid && isCompanyValid && isMessageValid) {
            setStatus('submitting');
            setTimeout(() => {
                setStatus('success');
            }, 2000);
        }
    };

    return (
        <PageTransition>
            <div className="bg-[#050505] min-h-screen text-white relative pt-32 pb-24 overflow-hidden">

                {/* Subtle animated grid background (very faint) */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]">
                    <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                </div>

                {/* Ambient Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[50vh] bg-gradient-to-b from-[#2F7EEA]/5 to-transparent blur-3xl pointer-events-none z-0" />

                <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">

                    {/* 1. HERO SECTION */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center mb-16 w-full"
                    >
                        <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 leading-tight">Start the Right Conversation.</h1>
                        <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">We partner with teams building intelligent systems designed for scale.</p>
                    </motion.div>

                    {/* 2. CONTACT FORM */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-3xl relative rounded-3xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] z-20 mb-20"
                    >
                        {/* Very faint top border highlight */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                        <div className="p-8 md:p-12 min-h-[500px] flex flex-col justify-center relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex flex-col items-center justify-center text-center gap-6 py-12"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white relative">
                                            <div className="absolute inset-0 rounded-full border border-[#00f0ff]/30 animate-ping opacity-20" />
                                            <CheckCircle2 className="w-8 h-8 text-[#00f0ff]" />
                                        </div>
                                        <div className="flex flex-col gap-3 max-w-sm">
                                            <h2 className="text-2xl font-medium text-white tracking-tight">Transmission Secured</h2>
                                            <p className="text-gray-400 leading-relaxed font-light">Message received. Our team will review your system requirements and respond shortly.</p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="flex flex-col gap-8 w-full"
                                        noValidate
                                    >
                                        {/* General Inquiry Fields */}
                                        <div className="flex flex-col gap-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Name */}
                                                <div className="flex flex-col gap-2">
                                                    <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                                                    <input
                                                        type="text"
                                                        id="name" name="name"
                                                        value={formData.name} onChange={handleChange} onBlur={() => handleBlur('name')}
                                                        className={`w-full bg-[#050505] border ${errors.name && touched.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#2F7EEA]/50'} rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:bg-[#0a0a0a] transition-all duration-300`}
                                                        placeholder="John Doe"
                                                    />
                                                    <AnimatePresence>
                                                        {errors.name && touched.name && (
                                                            <motion.span initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-xs ml-1 inline-block overflow-hidden">{errors.name}</motion.span>
                                                        )}
                                                    </AnimatePresence>
                                                </div>

                                                {/* Email */}
                                                <div className="flex flex-col gap-2">
                                                    <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Work Email</label>
                                                    <input
                                                        type="email"
                                                        id="email" name="email"
                                                        value={formData.email} onChange={handleChange} onBlur={() => handleBlur('email')}
                                                        className={`w-full bg-[#050505] border ${errors.email && touched.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#2F7EEA]/50'} rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:bg-[#0a0a0a] transition-all duration-300`}
                                                        placeholder="j.doe@company.com"
                                                    />
                                                    <AnimatePresence>
                                                        {errors.email && touched.email && (
                                                            <motion.span initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-xs ml-1 inline-block overflow-hidden">{errors.email}</motion.span>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>

                                            {/* Company */}
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="company" className="text-sm font-medium text-gray-300 ml-1">Company / Organization</label>
                                                <input
                                                    type="text"
                                                    id="company" name="company"
                                                    value={formData.company} onChange={handleChange} onBlur={() => handleBlur('company')}
                                                    className={`w-full bg-[#050505] border ${errors.company && touched.company ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#2F7EEA]/50'} rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:bg-[#0a0a0a] transition-all duration-300`}
                                                    placeholder="Acme Corp"
                                                />
                                                <AnimatePresence>
                                                    {errors.company && touched.company && (
                                                        <motion.span initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-xs ml-1 inline-block overflow-hidden">{errors.company}</motion.span>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>

                                        <div className="w-full h-[1px] bg-white/5 my-2" />

                                        {/* Project Specifics */}
                                        <div className="flex flex-col gap-6">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                {/* Project Type */}
                                                <div className="flex flex-col gap-2 md:col-span-1">
                                                    <label htmlFor="projectType" className="text-sm font-medium text-gray-300 ml-1">Project Type</label>
                                                    <div className="relative">
                                                        <select
                                                            id="projectType" name="projectType"
                                                            value={formData.projectType} onChange={handleChange}
                                                            className="w-full bg-[#050505] border border-white/10 rounded-xl pl-4 pr-10 py-3.5 text-white focus:outline-none focus:border-[#2F7EEA]/50 focus:bg-[#0a0a0a] transition-all duration-300 appearance-none"
                                                        >
                                                            <option value="ai-systems">AI Systems</option>
                                                            <option value="data-intelligence">Data Intelligence</option>
                                                            <option value="saas-platform">SaaS Platform</option>
                                                            <option value="ui-interaction">UI / Interaction Systems</option>
                                                            <option value="other">Other</option>
                                                        </select>
                                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                                    </div>
                                                </div>

                                                {/* Budget */}
                                                <div className="flex flex-col gap-2 md:col-span-1">
                                                    <label htmlFor="budget" className="text-sm font-medium text-gray-300 ml-1">Budget Range <span className="text-gray-600 font-normal">(Opt)</span></label>
                                                    <div className="relative">
                                                        <select
                                                            id="budget" name="budget"
                                                            value={formData.budget} onChange={handleChange}
                                                            className="w-full bg-[#050505] border border-white/10 rounded-xl pl-4 pr-10 py-3.5 text-white focus:outline-none focus:border-[#2F7EEA]/50 focus:bg-[#0a0a0a] transition-all duration-300 appearance-none text-gray-300"
                                                        >
                                                            <option value="" disabled>Select range...</option>
                                                            <option value="50k-100k">$50k - $100k</option>
                                                            <option value="100k-250k">$100k - $250k</option>
                                                            <option value="250k-500k">$250k - $500k</option>
                                                            <option value="500k+">$500k+</option>
                                                        </select>
                                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                                    </div>
                                                </div>

                                                {/* Timeline */}
                                                <div className="flex flex-col gap-2 md:col-span-1">
                                                    <label htmlFor="timeline" className="text-sm font-medium text-gray-300 ml-1">Timeline <span className="text-gray-600 font-normal">(Opt)</span></label>
                                                    <div className="relative">
                                                        <select
                                                            id="timeline" name="timeline"
                                                            value={formData.timeline} onChange={handleChange}
                                                            className="w-full bg-[#050505] border border-white/10 rounded-xl pl-4 pr-10 py-3.5 text-white focus:outline-none focus:border-[#2F7EEA]/50 focus:bg-[#0a0a0a] transition-all duration-300 appearance-none text-gray-300"
                                                        >
                                                            <option value="" disabled>Select timeline...</option>
                                                            <option value="immediately">Immediately</option>
                                                            <option value="1-3-months">1-3 Months</option>
                                                            <option value="3-6-months">3-6 Months</option>
                                                            <option value="planning">Just Planning</option>
                                                        </select>
                                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Message */}
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1">Project Description</label>
                                                <textarea
                                                    id="message" name="message"
                                                    value={formData.message} onChange={handleChange} onBlur={() => handleBlur('message')}
                                                    rows={4}
                                                    className={`w-full bg-[#050505] border ${errors.message && touched.message ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#2F7EEA]/50'} rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:bg-[#0a0a0a] transition-all duration-300 resize-none`}
                                                    placeholder="Describe your system requirements, goals, and any current constraints..."
                                                />
                                                <AnimatePresence>
                                                    {errors.message && touched.message && (
                                                        <motion.span initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-xs ml-1 inline-block overflow-hidden">{errors.message}</motion.span>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>

                                        <div className="flex justify-end mt-4">
                                            <button
                                                type="submit"
                                                disabled={status === 'submitting'}
                                                className="px-8 py-4 bg-white text-black font-medium rounded-xl hover:bg-gray-200 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:pointer-events-none min-w-[200px]"
                                            >
                                                {status === 'submitting' ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin text-black" />
                                                        <span className="opacity-80 text-black">Processing...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        Submit Request
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* 3. ALTERNATIVE CONTACT INFO & 4. TRUST SIGNALS */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 text-gray-400 font-light mb-24"
                    >
                        {/* Alt Contact */}
                        <div className="flex flex-col gap-6 border-t border-white/10 pt-8">
                            <h3 className="text-white font-medium text-lg tracking-tight">Direct Contact</h3>
                            <ul className="flex flex-col gap-3">
                                <li className="flex items-center gap-4 border-b border-white/5 pb-3">
                                    <span className="text-xs font-mono uppercase tracking-widest text-gray-500 w-24">Email</span>
                                    <a href="mailto:hello@innoshay.com" className="text-white hover:text-[#00f0ff] transition-colors">hello@innoshay.com</a>
                                </li>
                                <li className="flex items-center gap-4 border-b border-white/5 pb-3">
                                    <span className="text-xs font-mono uppercase tracking-widest text-gray-500 w-24">Location</span>
                                    <span className="text-gray-300">Remote-first</span>
                                </li>
                                <li className="flex items-center gap-4 pb-3">
                                    <span className="text-xs font-mono uppercase tracking-widest text-gray-500 w-24">Availability</span>
                                    <span className="text-gray-300">Global</span>
                                </li>
                            </ul>
                        </div>

                        {/* Trust Signals */}
                        <div className="flex flex-col gap-6 border-t border-white/10 pt-8">
                            <h3 className="text-white font-medium text-lg tracking-tight">How We Work</h3>
                            <ul className="flex flex-col gap-3">
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#8a2be2]" />
                                    <span>Structured discovery</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#8a2be2]" />
                                    <span>Architecture-first planning</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F7EEA]" />
                                    <span>Clear milestones</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
                                    <span>Long-term partnership</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* 5. FINAL CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="w-full max-w-3xl flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl"
                    >
                        <span className="text-lg text-gray-300">Looking for something specific?</span>
                        <button className="px-6 py-3 bg-[#050505] border border-white/10 rounded-full text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2">
                            Schedule a Discussion
                        </button>
                    </motion.div>

                </div>
            </div>
        </PageTransition>
    );
}
