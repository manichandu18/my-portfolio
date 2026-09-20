'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ToastState {
  show: boolean;
  message: string;
}

export default function ResumePage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'fullstack' | 'frontend'>('all');
  const [toast, setToast] = useState<ToastState>({ show: false, message: '' });
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'skills' | 'education'>('overview');

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2800);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`);
  };

  const handlePrint = () => {
    window.print();
  };

  const projects = [
    {
      id: 'grocery',
      title: 'Online Grocery Shopping Website',
      role: 'Full-Stack Web Application',
      period: '2026 - PRESENT',
      category: 'fullstack',
      liveUrl: 'https://my-store-m-django.onrender.com/',
      tech: ['Python', 'Django', 'HTML5', 'CSS3', 'JavaScript', 'SQLite'],
      highlights: [
        'Architected an end-to-end online grocery store enabling smooth catalog browsing, real-time product discovery, and shopping cart persistence.',
        'Engineered full backend logic and models utilizing Django and SQLite, ensuring structured inventory and product category management.',
        'Built modern responsive user interfaces with modular HTML5, CSS3, and interactive vanilla JavaScript.',
        'Leveraged AI-assisted engineering workflows (ChatGPT, DeepSeek) for accelerated debugging, logic structuring, and unit testing.',
        'Successfully deployed and configured the live application with production web server settings (Live: https://my-store-m-django.onrender.com/).'
      ],
      badgeColor: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
      icon: (
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      id: 'portfolio',
      title: 'Personal Portfolio Website',
      role: 'Frontend Web Application',
      period: '2026 - PRESENT',
      category: 'frontend',
      liveUrl: '/',
      tech: ['React.js', 'Next.js', 'Tailwind CSS', 'JavaScript', 'GSAP Motion'],
      highlights: [
        'Designed and developed a personal portfolio showcasing digital craftsmanship, software skills, and engineering projects.',
        'Engineered an interactive, dynamic interface built using React.js component architecture and modern Tailwind CSS.',
        'Crafted smooth micro-interactions, responsive navigation drawers, and modern glassmorphic visual aesthetics.',
        'Integrated AI-driven developer workflows to optimize code quality, maintainability, and clean architecture.',
        'Deployed to edge networks with zero-downtime automated deployment pipelines.'
      ],
      badgeColor: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30',
      icon: (
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'weather',
      title: 'Weather Forecast Website',
      role: 'Real-Time Weather Web Application',
      period: '2026 - PRESENT',
      category: 'frontend',
      liveUrl: 'https://frabjous-trifle-462a62.netlify.app/',
      tech: ['React.js', 'REST Weather API', 'JavaScript', 'HTML5', 'CSS3'],
      highlights: [
        'Built a real-time meteorological web app fetching and rendering live weather metrics from external REST APIs.',
        'Implemented dynamic search, city-based queries, temperature units conversion, and contextual weather status icons.',
        'Structured modular React component hierarchies with asynchronous state handling and graceful error fallbacks.',
        'Utilized AI programming agents for rapid API integration diagnostics and error-boundary management.',
        'Deployed online with high performance and mobile-friendly responsive layout (Live: https://frabjous-trifle-462a62.netlify.app/).'
      ],
      badgeColor: 'from-cyan-500/20 to-sky-500/20 text-cyan-400 border-cyan-500/30',
      icon: (
        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      )
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Background Ambient Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden print:hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] animate-pulse duration-1000" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-10 left-10 w-[550px] h-[550px] bg-cyan-600/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      {/* Floating Action Header (Navigation + Download/Print) */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#07090e]/80 border-b border-white/10 px-4 sm:px-8 py-3.5 transition-all print:hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 text-xs sm:text-sm font-mono text-zinc-400 hover:text-white transition-colors py-1.5 px-3 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Download Original PDF Button */}
            <a
              href="/mani-resume.pdf"
              download="Mani_Chandra_Babu_Resume.pdf"
              className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download PDF</span>
            </a>

            {/* Print / Save PDF Button */}
            <button
              onClick={handlePrint}
              aria-label="Print or Save Resume"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-2 rounded-full border border-white/10 hover:border-white/20 transition-all duration-200"
              title="Print or Save via Browser"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span className="hidden md:inline">Print / Save</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Resume Container */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* HERO / PROFILE HEADER CARD */}
        <section className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden mb-10 group">
          {/* Subtle decorative banner gradient */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-blue-500/20 to-indigo-500/0 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Avatar & Status */}
            <div className="lg:col-span-4 flex flex-col items-center text-center sm:flex-row sm:text-left lg:flex-col lg:text-center gap-6">
              <div className="relative group/avatar">
                {/* Glowing border ring */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 rounded-full blur-md opacity-75 group-hover/avatar:opacity-100 transition duration-500 animate-pulse" />
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-white/20 bg-zinc-900 shadow-2xl">
                  <img
                    src="/images/mani-photo.jpg"
                    alt="M. Manichandra Babu"
                    className="w-full h-full object-cover object-center group-hover/avatar:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Active status pip */}
                <div className="absolute bottom-1 right-2 bg-emerald-500 border-2 border-[#07090e] w-5 h-5 rounded-full shadow-lg" title="Available for opportunities" />
              </div>

              <div className="flex flex-col items-center sm:items-start lg:items-center gap-1.5">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Available for Hire
                </span>
                <span className="text-zinc-400 text-xs font-mono">Rayachoti, Andhra Pradesh, India</span>
              </div>
            </div>

            {/* Right: Identity, Role, Summary & Quick Contacts */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              <div>
                <span className="font-mono text-xs font-semibold text-blue-400 uppercase tracking-[0.25em]">Curriculum Vitae</span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-1">
                  M. MANICHANDRA BABU
                </h1>
                <p className="text-lg sm:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 mt-1">
                  FULL-STACK WEB DEVELOPER
                </p>
              </div>

              {/* Profile Objective Statement */}
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light bg-black/30 p-4 sm:p-5 rounded-2xl border border-white/5">
                Motivated <strong className="text-white font-medium">B.Tech (ECE)</strong> student with hands-on experience in full-stack web development and responsive website design. Skilled in <strong className="text-blue-300 font-medium">HTML, CSS, JavaScript, React.js, Python, and Django</strong>, with experience building real-time web applications and developing user-friendly interfaces. Familiar with utilizing AI tools to improve development, debugging, and project productivity. A quick learner with strong problem-solving abilities, adaptability, and a passion for crafting practical software solutions.
              </p>

              {/* Quick Contact Interactive Action Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {/* Phone */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/40 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] font-mono text-zinc-400 uppercase">Phone / Mobile</div>
                      <a href="tel:+916300190776" className="text-sm font-semibold text-white hover:text-blue-400 transition-colors">
                        +91 6300190776
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard('6300190776', 'Phone number')}
                    className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/10 transition-colors"
                    title="Copy Phone"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/40 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] font-mono text-zinc-400 uppercase">Email Address</div>
                      <a href="mailto:maddelamanichandu@gmail.com" className="text-sm font-semibold text-white hover:text-indigo-400 transition-colors truncate block">
                        maddelamanichandu@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard('maddelamanichandu@gmail.com', 'Email')}
                    className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/10 transition-colors"
                    title="Copy Email"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 2-COLUMN MAIN CONTENT (LEFT: SIDEBAR SKILLS & EDUCATION / RIGHT: PROJECTS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR: Skills, Education, Languages */}
          <aside className="lg:col-span-4 flex flex-col gap-8">
            
            {/* TECHNICAL SKILLS CARD */}
            <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-white/10">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight">TECHNICAL SKILLS</h2>
              </div>

              <div className="space-y-5">
                {/* Frontend */}
                <div>
                  <span className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider block mb-2">
                    Frontend Engineering
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Tailwind CSS'].map(skill => (
                      <span
                        key={skill}
                        className="text-xs font-mono px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-200 border border-blue-500/20 hover:border-blue-400 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Backend */}
                <div>
                  <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider block mb-2">
                    Backend Development
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Python', 'Django Framework', 'RESTful APIs'].map(skill => (
                      <span
                        key={skill}
                        className="text-xs font-mono px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-200 border border-indigo-500/20 hover:border-indigo-400 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Database */}
                <div>
                  <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider block mb-2">
                    Database &amp; Storage
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['SQL', 'SQLite', 'Database Modeling'].map(skill => (
                      <span
                        key={skill}
                        className="text-xs font-mono px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-200 border border-cyan-500/20 hover:border-cyan-400 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Developer Tools */}
                <div>
                  <span className="text-xs font-mono font-semibold text-purple-400 uppercase tracking-wider block mb-2">
                    Version Control &amp; Tools
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Git', 'GitHub', 'VS Code', 'Chrome DevTools'].map(skill => (
                      <span
                        key={skill}
                        className="text-xs font-mono px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-200 border border-purple-500/20 hover:border-purple-400 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Tools */}
                <div>
                  <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    AI-Assisted Workflow
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['ChatGPT', 'DeepSeek', 'Prompt Engineering', 'AI Debugging'].map(skill => (
                      <span
                        key={skill}
                        className="text-xs font-mono px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-200 border border-emerald-500/20 hover:border-emerald-400 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* EDUCATION CARD */}
            <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-white/10">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight">EDUCATION</h2>
              </div>

              <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10 pl-7">
                {/* Degree 1 */}
                <div className="relative">
                  <div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-[#07090e] shadow" />
                  <span className="font-mono text-xs font-semibold text-blue-400">2023 - 2027</span>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                    SRI SAI INSTITUTE OF TECHNOLOGY AND SCIENCE
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 font-light mt-1">
                    B.Tech in Electronics and Communication Engineering (ECE)
                  </p>
                </div>

                {/* Degree 2 */}
                <div className="relative">
                  <div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-indigo-500 border-2 border-[#07090e] shadow" />
                  <span className="font-mono text-xs font-semibold text-indigo-400">2021 - 2023</span>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                    GOVT. JUNIOR COLLEGE, PALAMANER
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 font-light mt-1">
                    Intermediate Education (MPC - Mathematics, Physics, Chemistry)
                  </p>
                </div>
              </div>
            </div>

            {/* LANGUAGES CARD */}
            <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-white/10">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight">LANGUAGES</h2>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Telugu', level: 'Fluent / Native', pct: 100, color: 'bg-emerald-500' },
                  { name: 'Hindi', level: 'Intermediate Working Proficiency', pct: 75, color: 'bg-indigo-500' },
                  { name: 'English', level: 'Basic Professional', pct: 60, color: 'bg-blue-500' },
                ].map(lang => (
                  <div key={lang.name} className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-white font-semibold">{lang.name}</span>
                      <span className="text-zinc-400">{lang.level}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className={`h-full ${lang.color} rounded-full transition-all duration-1000`} style={{ width: `${lang.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>

          {/* RIGHT COLUMN: Interactive Projects & Detailed Experience */}
          <section className="lg:col-span-8 flex flex-col gap-8">
            
            {/* PROJECTS SECTION HEADER & FILTER TABS */}
            <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">FEATURED PROJECTS</h2>
                    <p className="text-xs text-zinc-400 font-mono">Real-world applications built, tested, and shipped</p>
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-full border border-white/10 self-start sm:self-auto print:hidden">
                  {[
                    { key: 'all', label: 'All Projects' },
                    { key: 'fullstack', label: 'Full-Stack' },
                    { key: 'frontend', label: 'Frontend' },
                  ].map(f => (
                    <button
                      key={f.key}
                      onClick={() => setActiveFilter(f.key as any)}
                      className={`text-xs font-mono px-3 py-1.5 rounded-full transition-all duration-200 ${
                        activeFilter === f.key
                          ? 'bg-blue-600 text-white font-semibold shadow-md'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* PROJECT CARDS LIST */}
              <div className="mt-6 flex flex-col gap-6">
                {filteredProjects.map((project, idx) => (
                  <article
                    key={project.id}
                    className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-blue-500/40 transition-all duration-300 shadow-md group relative overflow-hidden"
                  >
                    {/* Top row: Title, role, date */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-mono text-xs font-bold text-zinc-500 group-hover:text-blue-400 transition-colors">
                            0{idx + 1}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                            {project.liveUrl && project.liveUrl !== '/' ? (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline hover:text-blue-300 transition-colors inline-flex items-center gap-1.5"
                              >
                                <span>{project.title}</span>
                                <span className="text-blue-400 text-sm">↗</span>
                              </a>
                            ) : (
                              project.title
                            )}
                          </h3>
                          {project.liveUrl && project.liveUrl !== '/' && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 transition-all duration-200 shadow-sm print:hidden"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span>Live Demo</span>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-mono font-medium text-zinc-400">
                            {project.role}
                          </span>
                        </div>
                      </div>

                      <span className="font-mono text-xs text-blue-400/90 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20 shrink-0 self-start sm:self-auto">
                        {project.period}
                      </span>
                    </div>

                    {/* Bullet Highlights */}
                    <ul className="space-y-2 mt-4 text-xs sm:text-sm text-zinc-300 font-light">
                      {project.highlights.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Badges & Action Link */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 mt-4 border-t border-white/5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-mono text-zinc-500 mr-1">Technologies:</span>
                        {project.tech.map(t => (
                          <span
                            key={t}
                            className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/5 text-zinc-300 border border-white/10"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {project.liveUrl && project.liveUrl !== '/' && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white border border-blue-400/40 shadow-sm transition-all duration-200 group/link shrink-0 self-start sm:self-auto print:hidden"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Visit Live Demo</span>
                          <svg className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* PROFESSIONAL STRENGTHS & HIGHLIGHTS BANNER */}
            <div className="bg-gradient-to-r from-blue-900/20 via-indigo-900/20 to-purple-900/20 border border-blue-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Core Competencies &amp; Engineering Values
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <h4 className="font-bold text-blue-300 font-mono uppercase text-xs mb-1">Modern UI/UX</h4>
                  <p className="text-zinc-400 font-light">Crafting mobile-first, highly responsive, and user-centric web applications.</p>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <h4 className="font-bold text-indigo-300 font-mono uppercase text-xs mb-1">Full-Stack Logic</h4>
                  <p className="text-zinc-400 font-light">Connecting intuitive frontend layouts to scalable Python &amp; Django database layers.</p>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <h4 className="font-bold text-cyan-300 font-mono uppercase text-xs mb-1">AI-Accelerated Speed</h4>
                  <p className="text-zinc-400 font-light">Leveraging ChatGPT &amp; DeepSeek for swift unit testing, debugging, and iteration.</p>
                </div>
              </div>
            </div>

            {/* CALL TO ACTION CARD */}
            <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 print:hidden">
              <div>
                <h3 className="text-xl font-bold text-white">Interested in working together?</h3>
                <p className="text-zinc-400 text-xs sm:text-sm font-light mt-1">
                  I&apos;m open for entry-level roles, internships, and collaborative software projects.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href="mailto:maddelamanichandu@gmail.com"
                  className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm shadow-lg hover:bg-zinc-200 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Get In Touch &rarr;
                </a>
                <a
                  href="/mani-resume.pdf"
                  download="Mani_Chandra_Babu_Resume.pdf"
                  className="px-5 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 font-semibold text-xs sm:text-sm border border-white/10 transition-colors"
                >
                  Download CV
                </a>
              </div>
            </div>

          </section>

        </div>

      </main>

      {/* Floating Toast Notification */}
      <div
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-zinc-900/95 text-white border border-blue-500/40 shadow-2xl backdrop-blur-md transition-all duration-300 ${
          toast.show ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-6 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-xs sm:text-sm font-medium">{toast.message}</span>
      </div>

      {/* Print Stylesheet Overrides */}
      <style jsx global>{`
        @media print {
          body {
            background-color: #ffffff !important;
            color: #111827 !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          main {
            padding: 0 !important;
            max-width: 100% !important;
          }
          section, aside, article, div {
            box-shadow: none !important;
            backdrop-filter: none !important;
            border-color: #e5e7eb !important;
          }
          h1, h2, h3, h4, strong {
            color: #111827 !important;
          }
          p, span, li {
            color: #374151 !important;
          }
          a {
            text-decoration: none !important;
            color: #1d4ed8 !important;
          }
        }
      `}</style>
    </div>
  );
}
