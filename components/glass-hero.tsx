'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { CursorFollower } from '@/components/ui/cursor-follower';


const ENTRANCE_STYLES = `
@keyframes heroFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes heroScaleIn {
  from { transform: scale(1.035); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
@keyframes slideUp {
  from { transform: translateY(60px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes fadeDown {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(2deg); }
}

.animate-hero-base {
  animation: heroScaleIn 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.animate-nav-down {
  animation: fadeDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.animate-line-up {
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.animate-fade-up {
  animation: heroFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@media (prefers-reduced-motion: reduce) {
  .animate-hero-base, .animate-nav-down, .animate-line-up, .animate-fade-up {
    animation-duration: 0.01s !important;
    animation-delay: 0s !important;
    transition-duration: 0.01s !important;
    transform: none !important;
  }
}
`;

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DESKTOP_RADIUS = 235;
const MOBILE_RADIUS = 150;
const REVEAL_DESKTOP_RADIUS = DESKTOP_RADIUS;
const REVEAL_MOBILE_RADIUS = MOBILE_RADIUS;


const CATEGORIES = ['All', 'Web Apps', 'AI', 'Websites', 'Branding', 'Automation'];

const PROJECTS_DATA = [
  {
    id: '01',
    title: 'NoMoreDMS',
    desc: 'AI-powered job application & creator platform to eliminate unnecessary DMs and connect opportunities in one smart hub.',
    tags: ['Product Design', 'AI', 'Full Stack'],
    category: 'AI',
    url: 'https://nomoredms.vercel.app/',
    thumb: '/images/projects/nomoredms.png',
    featured: true
  },
  {
    id: '02',
    title: 'EduCalc',
    desc: 'Smart educational platform that makes math, logic & calculations easier for students and professionals.',
    tags: ['Product Design', 'Automation', 'Math Engine'],
    category: 'Automation',
    url: 'https://educalc-expert0509.vercel.app/',
    thumb: '/images/projects/educalc.png',
    featured: false
  },
  {
    id: '03',
    title: 'Personal Portfolio',
    desc: 'A personal portfolio that blends clean design, motion and interaction to create a unique digital presence.',
    tags: ['UX / UI Design', 'Development', 'Motion'],
    category: 'Websites',
    url: 'https://devendhargopagoni.netlify.app/',
    thumb: '/images/projects/personalportfolio.jpg',
    featured: false
  },
  {
    id: '04',
    title: 'PostLearn',
    desc: 'Modern learning platform delivering educational content intuitively.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Supabase'],
    category: 'Web Apps',
    url: 'https://postlearn-lake.vercel.app/',
    thumb: '/images/projects/postlearn.png',
    featured: false
  },
  {
    id: '05',
    title: 'Cozy Cafe',
    desc: 'Bespoke cafe website featuring online menus and reservation flows.',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    category: 'Websites',
    url: 'https://cozy-cafa1.netlify.app/',
    thumb: '/images/projects/cozy-cafe.png',
    featured: false
  },
  {
    id: '06',
    title: 'Akshith Portfolio',
    desc: 'Personal portfolio built for a client to establish digital presence.',
    tags: ['React', 'GSAP', 'Tailwind CSS'],
    category: 'Branding',
    url: 'https://maatoori-akshith.netlify.app/',
    thumb: '/images/projects/maatoori-akshith.jpg',
    featured: false
  }
];

export default function GlassHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // References for liquid reveal pointer tracking
  const rawX = useRef<number>(-999);
  const rawY = useRef<number>(-999);
  const smoothX = useRef<number>(-999);
  const smoothY = useRef<number>(-999);
  const currentRadius = useRef<number>(0);
  const targetRadius = useRef<number>(0);
  const isTouchActive = useRef<boolean>(false);

  // References for premium interactive physics (Hero, Section 2, Section 3 Orb & Section 4 Device Mockups)
  const portraitMouseX = useRef<number>(0);
  const portraitMouseY = useRef<number>(0);
  const portraitSmoothX = useRef<number>(0);
  const portraitSmoothY = useRef<number>(0);

  const idPortraitMouseX = useRef<number>(0);
  const idPortraitMouseY = useRef<number>(0);
  const idPortraitSmoothX = useRef<number>(0);
  const idPortraitSmoothY = useRef<number>(0);

  const orbMouseX = useRef<number>(0);
  const orbMouseY = useRef<number>(0);
  const orbSmoothX = useRef<number>(0);
  const orbSmoothY = useRef<number>(0);

  // Animated numbers refs for stats card count-up triggers
  const statVal1 = useRef<number>(0);
  const statVal2 = useRef<number>(0);
  const [stat1, setStat1] = useState(0);
  const [stat2, setStat2] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProjectImage, setHoveredProjectImage] = useState<string | null>(null);

  // Animation frame loop reference
  const animationFrameId = useRef<number | null>(null);











  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP with Lenis Scroll
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 2. High-performance Animation Loop
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderLoop = () => {
      // Interpolation factors
      const posFactor = prefersReducedMotion ? 1 : 0.14;
      const radFactor = prefersReducedMotion ? 1 : 0.12;
      const followFactor = prefersReducedMotion ? 1 : 0.08;

      // A. Liquid Reveal Mask position
      if (rawX.current === -999 && rawY.current === -999) {
        smoothX.current = -999;
        smoothY.current = -999;
      } else {
        if (smoothX.current === -999 && smoothY.current === -999) {
          smoothX.current = rawX.current;
          smoothY.current = rawY.current;
        } else {
          smoothX.current += (rawX.current - smoothX.current) * posFactor;
          smoothY.current += (rawY.current - smoothY.current) * posFactor;
        }
      }
      currentRadius.current += (targetRadius.current - currentRadius.current) * radFactor;

      container.style.setProperty('--reveal-x', `${smoothX.current}px`);
      container.style.setProperty('--reveal-y', `${smoothY.current}px`);
      container.style.setProperty('--reveal-radius', `${currentRadius.current}px`);

      // B. Hero Portrait cursor follow
      portraitSmoothX.current += (portraitMouseX.current - portraitSmoothX.current) * followFactor;
      portraitSmoothY.current += (portraitMouseY.current - portraitSmoothY.current) * followFactor;
      const pX = (portraitSmoothX.current / (window.innerWidth / 2)) * 12;
      const pY = (portraitSmoothY.current / (window.innerHeight / 2)) * 10;
      const portraitElement = document.querySelector('#hero-portrait-wrapper') as HTMLElement;
      if (portraitElement) {
        portraitElement.style.transform = `translate3d(${pX}px, ${pY}px, 0)`;
      }

      // C. Section 2 Portrait cursor follow
      idPortraitSmoothX.current += (idPortraitMouseX.current - idPortraitSmoothX.current) * followFactor;
      idPortraitSmoothY.current += (idPortraitMouseY.current - idPortraitSmoothY.current) * followFactor;
      const idPX = (idPortraitSmoothX.current / (window.innerWidth / 2)) * 8;
      const idPY = (idPortraitSmoothY.current / (window.innerHeight / 2)) * 6;
      const idPortraitElement = document.querySelector('#identity-portrait') as HTMLElement;
      const idGlowElement = document.querySelector('#identity-glow') as HTMLElement;
      if (idPortraitElement) {
        idPortraitElement.style.transform = `translate3d(${idPX}px, ${idPY}px, 0)`;
      }
      if (idGlowElement) {
        idGlowElement.style.transform = `translate3d(${idPX * 0.5}px, ${idPY * 0.5}px, 0)`;
      }

      // D. Section 3 Interactive Glass Orb cursor follow
      orbSmoothX.current += (orbMouseX.current - orbSmoothX.current) * followFactor;
      orbSmoothY.current += (orbMouseY.current - orbSmoothY.current) * followFactor;
      const oX = (orbSmoothX.current / (window.innerWidth / 2)) * 15;
      const oY = (orbSmoothY.current / (window.innerHeight / 2)) * 15;
      const orbElement = document.querySelector('#interactive-orb-element') as HTMLElement;
      if (orbElement) {
        orbElement.style.transform = `translate3d(${oX}px, ${oY}px, 0)`;
      }



      animationFrameId.current = requestAnimationFrame(renderLoop);
    };

    animationFrameId.current = requestAnimationFrame(renderLoop);

    // 3. GSAP Parallax and Pinning Scroll Choreography
    const ctx = gsap.context(() => {
      
      // HERO PINNING & DEEP CHARCOAL TRANSITION
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#sec-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      heroTimeline.to(container, { backgroundColor: '#0B0B0D', ease: 'none' }, 0);
      heroTimeline.to('#hero-grid', { y: 150 * 0.2, opacity: 0, ease: 'none' }, 0);
      heroTimeline.to('#hero-circle', { y: 150 * 0.4, ease: 'none' }, 0);
      heroTimeline.to('#hero-text-col', { y: -150 * 0.1, opacity: 0, ease: 'none' }, 0);
      heroTimeline.to('#hero-cta-btn', { scale: 0.85, opacity: 0, ease: 'none' }, 0);

      // Hero Portrait
      const portraitTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#sec-hero',
          start: 'top top',
          end: '+=600',
          scrub: true,
        }
      });
      portraitTimeline.to('#hero-base-portrait', { scale: 1.08, x: -120, filter: 'grayscale(100%)', ease: 'power3.out' }, 0);
      portraitTimeline.to('#hero-reveal-portrait', { scale: 1.08, x: -120, filter: 'grayscale(100%)', ease: 'power3.out' }, 0);

      ScrollTrigger.create({
        trigger: '#sec-hero',
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
      });

      // SECTION 2: IDENTITY REVEAL PINNING
      const sec2Timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#sec-identity',
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: true,
        }
      });
      sec2Timeline.from('#identity-word-span span', { opacity: 0, y: 40, stagger: 0.18, duration: 0.9, ease: 'power2.out' }, 0.1);
      sec2Timeline.to('#experiences-underline path', { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, '+=0.1');
      sec2Timeline.from('#identity-paragraph', { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out' }, '+=0.2');
      sec2Timeline.from('.stat-card-el', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        onStart: () => {
          gsap.to(statVal1, { current: 25, duration: 1.2, ease: 'none', onUpdate: () => setStat1(Math.floor(statVal1.current)) });
          gsap.to(statVal2, { current: 1, duration: 1.2, ease: 'none', onUpdate: () => setStat2(statVal2.current > 0.5 ? 'AI' : '') });
        }
      }, '+=0.1');

      sec2Timeline.to('#identity-heading-block', { opacity: 0, y: -60, duration: 0.6 }, '+=0.4');
      sec2Timeline.to('#identity-portrait', { scale: 1.15, filter: 'grayscale(100%) blur(6px)', duration: 0.6 }, '+=0.4');
      sec2Timeline.to('#identity-glow', { opacity: 0, duration: 0.6 }, '+=0.4');

      // SECTION 3: DESIGN PHILOSOPHY PINNING & ORB ZOOM
      const philosophyTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#sec-philosophy',
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: true,
        }
      });
      philosophyTimeline.to(container, { backgroundColor: '#09090B', ease: 'none' }, 0);
      philosophyTimeline.from('#phi-line-1', { opacity: 0, y: 40, duration: 1, ease: 'power2.out' }, 0.1);
      philosophyTimeline.from('#phi-line-2', { opacity: 0, y: 40, duration: 1, ease: 'power2.out' }, 0.5);
      philosophyTimeline.from('#phi-line-3', { opacity: 0, y: 40, duration: 1, ease: 'power2.out' }, 0.9);
      philosophyTimeline.from('#phi-line-4', { opacity: 0, y: 40, duration: 1, ease: 'power2.out' }, 1.3);
      philosophyTimeline.from('.phi-para-sent', { opacity: 0, y: 15, stagger: 0.15, duration: 0.8, ease: 'power2.out' }, 1.6);
      philosophyTimeline.to('.phi-glow-word', { filter: 'brightness(1.5)', color: '#60a5fa', textShadow: '0 0 20px rgba(96,165,250,0.5)', duration: 0.4 }, 1.0);
      philosophyTimeline.to('.phi-glow-word', { filter: 'brightness(1.0)', color: '#93c5fd', textShadow: 'none', duration: 0.4 }, 1.4);
      philosophyTimeline.to('#interactive-orb-container', { scale: 2.4, filter: 'blur(8px)', duration: 1.2, ease: 'power2.inOut' }, 2.0);
      // SECTION 5: PROJECTS (individual reveals for mobile reliability)
      if (window.innerWidth >= 768) {
        gsap.utils.toArray<HTMLElement>('.project-card-item').forEach((card) => {
          gsap.fromTo(card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      }


      // SECTION 8 (Word Manifesto)
      const wordsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#sec-manifesto',
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      });
      wordsTimeline.from('.man-word', { opacity: 0.12, y: 25, stagger: 0.1, ease: 'power1.out' });
    }, container);

    return () => {
      lenis.destroy();
      ctx.revert();
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);





  
  // Event handlers for Hero Mask Pointer
  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      rawX.current = x;
      rawY.current = y;
      
      if (smoothX.current === -999 || smoothY.current === -999) {
        smoothX.current = x;
        smoothY.current = y;
      }
      targetRadius.current = REVEAL_DESKTOP_RADIUS;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (e.pointerType === 'mouse') {
      rawX.current = x;
      rawY.current = y;
      targetRadius.current = REVEAL_DESKTOP_RADIUS;

      portraitMouseX.current = e.clientX - window.innerWidth / 2;
      portraitMouseY.current = e.clientY - window.innerHeight / 2;
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') {
      targetRadius.current = 0;
      portraitMouseX.current = 0;
      portraitMouseY.current = 0;
    }
  };

  // Section 2 interactive pointer handlers
  const handleSec2MouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    idPortraitMouseX.current = e.clientX - window.innerWidth / 2;
    idPortraitMouseY.current = e.clientY - window.innerHeight / 2;
  };

  const handleSec2MouseLeave = () => {
    idPortraitMouseX.current = 0;
    idPortraitMouseY.current = 0;
  };





  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isTouchActive.current = true;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    rawX.current = x;
    rawY.current = y;
    
    if (smoothX.current === -999 || smoothY.current === -999) {
      smoothX.current = x;
      smoothY.current = y;
    }
    targetRadius.current = REVEAL_MOBILE_RADIUS;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isTouchActive.current) {
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      rawX.current = x;
      rawY.current = y;
    }
  };

  const handleTouchEnd = () => {
    isTouchActive.current = false;
    targetRadius.current = 0;
  };

  return (
    <div ref={containerRef} className="noise-bg select-none w-full bg-white overflow-x-hidden transition-colors duration-500">
      <style dangerouslySetInnerHTML={{ __html: ENTRANCE_STYLES }} />
      
      {/* 5. Navigation Overlay & Mobile Drawer */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-[max(1.5rem,safe-area-top)_max(4vw,1.5rem)_0] pointer-events-none animate-nav-down">
        <div className="flex items-center gap-3 select-none pointer-events-auto">
          <a href="#sec-hero" className="flex items-center gap-2.5 group">
            <svg className="w-7 h-7 text-[#0c111d] dark:text-white transition-transform group-hover:rotate-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M75 25H35L25 35L55 45L25 55L35 75H75L85 65H45L65 55L35 45L65 35L75 25Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" />
            </svg>
            <span className="text-[1.25rem] font-semibold tracking-tight text-[#0c111d] dark:text-white transition-colors">Mani Chandra Babu</span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 pointer-events-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-6 py-2 rounded-full border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          {[
            { label: 'About', href: '#sec-identity' },
            { label: 'Resume', href: '/resume' },
            { label: 'Tech Stack', href: '#sec-skills' },
            { label: 'Projects', href: '#sec-projects' },
          ].map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className="relative text-[#0c111d]/75 dark:text-white/80 hover:text-[#0055ff] dark:hover:text-blue-400 font-medium text-xs tracking-wide uppercase transition-colors rounded py-1 px-1 group flex items-center font-mono"
            >
              {item.label}
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#0055ff] transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <a 
            href="mailto:maddelamanichandu@gmail.com" 
            className="hidden sm:flex items-center justify-center bg-[#0c111d] dark:bg-white text-white dark:text-[#0c111d] font-semibold text-xs px-5 py-2.5 rounded-full hover:bg-black dark:hover:bg-white/90 shadow-sm hover:shadow transition-all duration-300 min-h-[40px] focus:outline-none"
          >
            Get in touch &rarr;
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white shadow-sm focus:outline-none"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Slide-Out Navigation Drawer Overlay (Always mounted for DOM stability) */}
      <div 
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-lg md:hidden flex flex-col justify-between p-8 pt-28 transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'
        }`}
      >
        <div className="flex flex-col gap-6">
          <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">NAVIGATION</span>
          <div className="flex flex-col gap-5">
            {[
              { label: 'About Me', href: '#sec-identity' },
              { label: 'Resume', href: '/resume' },
              { label: 'Tech Stack & Skills', href: '#sec-skills' },
              { label: 'Featured Projects', href: '#sec-projects' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-light text-white hover:text-blue-400 transition-colors flex items-center justify-between border-b border-white/10 pb-3"
              >
                <span>{item.label}</span>
                <span className="text-sm font-mono text-white/40">&rarr;</span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
          <a
            href="mailto:maddelamanichandu@gmail.com"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3.5 rounded-full bg-white text-black font-semibold text-center text-sm shadow-md hover:bg-zinc-200 transition-colors"
          >
            Get In Touch &rarr;
          </a>
          <div className="flex flex-col gap-1 text-xs font-mono text-white/60 pt-2">
            <span className="text-white/40 uppercase text-[10px]">Contact Directly</span>
            <a href="mailto:maddelamanichandu@gmail.com" className="hover:text-blue-400">maddelamanichandu@gmail.com</a>
            <a href="tel:+916300190776" className="hover:text-blue-400">+91 6300190776</a>
            <span className="text-white/40">Rayachoti, Andhra Pradesh</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: HERO */}
      <section 
        id="sec-hero" 
        className="relative w-full h-screen overflow-hidden bg-white flex items-center"
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {/* Layer 1: Base portrait */}
        <div
          id="hero-base-portrait"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover pointer-events-none animate-hero-base"
          style={{ backgroundImage: 'url("/images/Base_image_desktop.jpeg")' }}
        />

        {/* Layer 2: Reveal portrait */}
        <div
          id="hero-reveal-portrait"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover pointer-events-none"
          style={{
            backgroundImage: 'url("/images/Reveal_image_desktop.jpeg")',
            WebkitMaskImage: 'radial-gradient(circle var(--reveal-radius) at var(--reveal-x) var(--reveal-y), black 100%, transparent 100%)',
            maskImage: 'radial-gradient(circle var(--reveal-radius) at var(--reveal-x) var(--reveal-y), black 100%, transparent 100%)',
          }}
        />

        {/* Layer 3: Technical grid and large circle */}
        <div 
          id="hero-grid" 
          aria-hidden="true" 
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
        >
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.06] border-t border-b border-[#0c111d]/20 bg-[linear-gradient(to_right,#0c111d_1px,transparent_1px),linear-gradient(to_bottom,#0c111d_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          
          {/* Construction circle */}
          <div className="absolute w-[80vh] aspect-square rounded-full border border-[#0c111d]/5" />
        </div>

        {/* Layer 4: Headline and copy */}
        <div className="absolute inset-0 flex flex-col justify-between p-[max(2.5rem,safe-area-top)_max(5.6vw,2rem)_8vh] pointer-events-none">
          
          {/* Heading */}
          <div className="flex flex-col items-start mt-[26vh] sm:mt-[30vh] md:mt-[34vh] px-[max(4vw,1rem)] sm:px-[max(5.6vw,2rem)]">
            <h1 
              className="text-[#0c111d] font-light tracking-[-0.085em] select-none text-[clamp(2.8rem,10vw,6.8rem)] md:text-[clamp(5.4rem,6.2vw,6.8rem)]"
              style={{ lineHeight: 0.95 }}
            >
              <span className="block opacity-0 animate-line-up [animation-delay:300ms]">Building</span>
              <span className="block opacity-0 animate-line-up [animation-delay:450ms]">Beyond</span>
              <span className="block opacity-0 animate-line-up [animation-delay:600ms]">Possible.</span>
            </h1>
          </div>

          {/* Bottom layout row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 w-full mt-auto px-[max(4vw,1rem)] sm:px-[max(5.6vw,2rem)] pb-4 sm:pb-8">
            {/* Bottom left copy & explore button */}
            <div className="flex flex-col items-start gap-5 sm:gap-6 max-w-[480px] animate-fade-up opacity-0 [animation-delay:750ms]">
              <p className="text-gray-600 text-sm sm:text-[1.05rem] leading-relaxed font-light select-none">
                Hi, I&apos;m M. Manichandra Babu. I specialize in full-stack web development and responsive website design, building real-time applications with Python, Django, React.js, and modern AI tools.
              </p>
              <a 
                href="/resume" 
                className="pointer-events-auto flex items-center justify-center bg-[#0c111d] hover:bg-black text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none min-h-[40px] sm:min-h-[44px] group"
              >
                <span>View Full Resume</span>
                <span className="ml-1.5 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </a>
            </div>

            {/* Right side Fragment Mono manifesto */}
            <div className="font-mono text-xs tracking-[0.25em] text-gray-400 text-left md:text-right select-none animate-fade-up opacity-0 [animation-delay:750ms]">
              <span className="block">BUILDING THE</span>
              <span className="block">NEXT VERSION</span>
              <span className="block">IN PUBLIC</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: IDENTITY REVEAL */}
      <section 
        id="sec-identity" 
        className="story-sec bg-[#0B0B0D] text-white px-[max(5.6vw,2rem)] flex items-center z-10"
        onMouseMove={handleSec2MouseMove}
        onMouseLeave={handleSec2MouseLeave}
      >
        <div className="w-full max-w-[90vw] mx-auto grid grid-cols-1 lg:grid-cols-[40%_60%] items-center gap-16">
          <div className="relative w-full flex items-center justify-center">
            <div 
              id="identity-glow"
              className="absolute w-[90%] aspect-square rounded-full bg-[#0055ff] blur-[100px] pointer-events-none z-0"
              style={{
                animation: 'idGlowCycle 8s ease-in-out infinite',
              }}
            />

            <div className="absolute w-[80%] aspect-square rounded-full border border-white/5 z-0" />

            <div 
              id="identity-portrait" 
              className="relative w-[85%] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-cover bg-center bg-no-repeat z-10 transition-transform duration-100 ease-out"
              style={{
                backgroundImage: 'url("/images/about-portrait.jpeg")',
                animation: 'idFloatBreathing 10s ease-in-out infinite',
              }}
            />
          </div>

          <div id="identity-heading-block" className="flex flex-col items-start gap-8">
            <span className="font-mono tracking-[0.35em] text-blue-400 text-xs uppercase block">Profile &amp; About Me</span>

            <h2 className="text-white font-light leading-[0.90] tracking-tighter text-[clamp(2.5rem,5.2vw,5.5rem)] flex flex-col">
              <span className="block overflow-hidden pb-1">M. Manichandra Babu</span>
              <span className="relative inline-block font-medium group cursor-pointer overflow-hidden pb-3">
                Full-Stack{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-[#0055ff] to-cyan-300 group-hover:from-blue-300 group-hover:via-blue-500 group-hover:to-cyan-200 transition-all duration-300">
                  Web Developer.
                </span>
                
                <svg id="experiences-underline" className="absolute bottom-0 left-0 w-full h-3 pointer-events-none" viewBox="0 0 350 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 7C55 5.5 180 3 345 5.5" stroke="#0055ff" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="400" strokeDashoffset="400" />
                </svg>
              </span>
            </h2>

            <div id="identity-paragraph" className="max-w-[580px] text-white/80 text-[1.02rem] leading-relaxed font-light flex flex-col gap-4">
              <p className="text-white font-normal text-lg">
                Motivated <span className="text-blue-400 font-semibold">B.Tech (ECE)</span> student with hands-on experience in full-stack web development and responsive website design.
              </p>
              <p className="text-zinc-300">
                Skilled in <span className="text-white font-medium">HTML, CSS, JavaScript, React.js, Python, and Django</span>, with experience building real-time web projects and developing user-friendly interfaces.
              </p>
              <p className="text-zinc-300">
                Familiar with using AI tools (<span className="text-blue-300 font-medium">ChatGPT, DeepSeek</span>) to improve development, debugging, and project productivity. A quick learner with strong problem-solving abilities, adaptability, and a passion for building practical software solutions.
              </p>

              {/* Education & Location Info Badges */}
              <div className="flex flex-col gap-2 pt-3 border-t border-white/10 text-xs font-mono text-zinc-400">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    B.Tech ECE (2023 - 2027) &bull; Sri Sai Institute of Technology and Science
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/10">
                    Intermediate MPC (2021 - 2023) &bull; Govt. Junior College, Palamaner
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-1 text-zinc-400">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    Rayachoti, Andhra Pradesh (516269)
                  </span>
                  <a href="tel:+916300190776" className="flex items-center gap-1.5 text-zinc-300 hover:text-blue-400 transition-colors">
                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    +91 6300190776
                  </a>
                  <a href="mailto:maddelamanichandu@gmail.com" className="flex items-center gap-1.5 text-zinc-300 hover:text-blue-400 transition-colors">
                    <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    maddelamanichandu@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full mt-6">
              <div className="stat-card-el group flex flex-col items-start gap-2 p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all hover:scale-[1.03]">
                <span className="text-3xl font-normal text-white">3+</span>
                <span className="text-[0.75rem] font-mono text-white/50 uppercase tracking-widest">Web Applications</span>
                <div className="w-full h-[1px] bg-[#0055ff]/20 mt-2 group-hover:bg-[#0055ff]/60 transition-colors" />
              </div>

              <div className="stat-card-el group flex flex-col items-start gap-2 p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all hover:scale-[1.03]">
                <span className="text-3xl font-normal text-white">AI</span>
                <span className="text-[0.75rem] font-mono text-white/50 uppercase tracking-widest">ChatGPT &amp; DeepSeek</span>
                <div className="w-full h-[1px] bg-[#0055ff]/20 mt-2 group-hover:bg-[#0055ff]/60 transition-colors" />
              </div>

              <div className="stat-card-el group flex flex-col items-start gap-2 p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all hover:scale-[1.03]">
                <span className="text-2xl font-normal text-white flex items-center gap-1">Python <span className="text-[10px] text-white/30">&times;</span> Django</span>
                <span className="text-[0.75rem] font-mono text-white/50 uppercase tracking-widest">Full-Stack Core</span>
                <div className="w-full h-[1px] bg-[#0055ff]/20 mt-2 group-hover:bg-[#0055ff]/60 transition-colors" />
              </div>

              <div className="stat-card-el group flex flex-col items-start gap-2 p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all hover:scale-[1.03]">
                <span className="text-3xl font-normal text-white">2027</span>
                <span className="text-[0.75rem] font-mono text-white/50 uppercase tracking-widest">B.Tech (ECE)</span>
                <div className="w-full h-[1px] bg-[#0055ff]/20 mt-2 group-hover:bg-[#0055ff]/60 transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 01 / THE APPROACH */}
      <section id="sec-approach" className="story-sec bg-[#f8f9fa] text-zinc-900 py-32 px-[max(5.6vw,2rem)] relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 pb-6 gap-4">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.2em] text-zinc-900 uppercase bg-zinc-200/90 px-3.5 py-1.5 rounded-full border border-zinc-300/80 shadow-2xs">01 / THE APPROACH</span>
            <span className="font-mono text-xs font-semibold text-zinc-700">Engineering Philosophy</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <h2 className="lg:col-span-8 text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.15] text-zinc-900">
              I don&apos;t just design interfaces. <br className="hidden md:inline" />
              I design how ideas become products.
            </h2>
            <div className="lg:col-span-4 flex flex-col gap-6 pt-2">
              <p className="text-zinc-600 text-sm md:text-base font-light leading-relaxed">
                From the first sketch to the final interaction, I work across product thinking, interface design, prototyping and development — using technology as a creative material.
              </p>
              <a href="#sec-identity" className="inline-flex items-center gap-2 font-mono text-xs text-zinc-900 font-medium tracking-wider hover:translate-x-1 transition-transform">
                <span>More about me</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 03 / TECH STACK & ECOSYSTEM — EXACT REFERENCE MATCH LAYOUT */}
      <section id="sec-skills" className="story-sec bg-[#f8f9fa] text-zinc-900 py-16 sm:py-24 px-[max(4vw,1.25rem)] sm:px-[max(5.6vw,2rem)] relative z-20 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-16">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-6">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.2em] text-zinc-900 uppercase bg-zinc-200/90 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-zinc-300/80 shadow-2xs">03 / TECH STACK & ECOSYSTEM</span>
            <span className="font-mono text-[11px] sm:text-xs font-semibold text-zinc-700">Core Technologies</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Floating Tech Icons & Interactive Illustration Box */}
            <div className="lg:col-span-6 relative min-h-[380px] sm:min-h-[480px] flex items-center justify-center p-4 sm:p-8 bg-white border border-zinc-200/80 rounded-3xl shadow-sm overflow-hidden">
              {/* Grid Background Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

              {/* Floating Python Icon */}
              <div className="absolute top-4 sm:top-6 left-3 sm:left-6 animate-[float_6s_ease-in-out_infinite] z-10 flex items-center gap-2 sm:gap-2.5 bg-white/95 backdrop-blur border border-zinc-200/90 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-md hover:scale-105 transition-transform scale-90 sm:scale-100">
                <img src="https://api.iconify.design/logos:python.svg" alt="Python" className="w-5 h-5 sm:w-7 sm:h-7" />
                <span className="font-mono text-[10px] sm:text-xs font-semibold text-zinc-800">Python</span>
              </div>

              {/* Floating Django Icon */}
              <div className="absolute top-12 sm:top-16 right-3 sm:right-6 animate-[float_7s_ease-in-out_infinite_1s] z-10 flex items-center gap-2 bg-white/95 backdrop-blur border border-zinc-200/90 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-md hover:scale-105 transition-transform scale-90 sm:scale-100">
                <img src="https://api.iconify.design/logos:django-icon.svg" alt="Django" className="w-5 h-5 sm:w-7 sm:h-7" />
                <span className="font-mono text-[10px] sm:text-xs font-semibold text-zinc-800">Django</span>
              </div>

              {/* Floating React Icon */}
              <div className="absolute top-4 sm:top-8 left-1/3 animate-[float_5s_ease-in-out_infinite_0.5s] z-10 flex items-center gap-2 bg-white/95 backdrop-blur border border-zinc-200/90 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-md hover:scale-105 transition-transform scale-90 sm:scale-100">
                <img src="https://api.iconify.design/logos:react.svg" alt="React.js" className="w-5 h-5 sm:w-7 sm:h-7" />
                <span className="font-mono text-[10px] sm:text-xs font-semibold text-zinc-800">React.js</span>
              </div>

              {/* Floating HTML5 / CSS3 Icon */}
              <div className="absolute bottom-16 sm:bottom-20 right-3 sm:right-8 animate-[float_6s_ease-in-out_infinite_1.5s] z-10 flex items-center gap-2 bg-white/95 backdrop-blur border border-zinc-200/90 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-md hover:scale-105 transition-transform scale-90 sm:scale-100">
                <img src="https://api.iconify.design/logos:html-5.svg" alt="HTML5" className="w-5 h-5 sm:w-7 sm:h-7" />
                <span className="font-mono text-[10px] sm:text-xs font-semibold text-zinc-800">HTML5 / CSS3</span>
              </div>

              {/* Floating JavaScript Icon */}
              <div className="absolute bottom-24 sm:bottom-32 left-3 sm:left-6 animate-[float_8s_ease-in-out_infinite_0.8s] z-10 flex items-center gap-2 bg-white/95 backdrop-blur border border-zinc-200/90 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-md hover:scale-105 transition-transform scale-90 sm:scale-100">
                <img src="https://api.iconify.design/logos:javascript.svg" alt="JavaScript" className="w-5 h-5 sm:w-7 sm:h-7" />
                <span className="font-mono text-[10px] sm:text-xs font-semibold text-zinc-800">JavaScript</span>
              </div>

              {/* Floating Tailwind CSS Icon */}
              <div className="absolute top-36 sm:top-44 right-2 sm:right-4 animate-[float_6.5s_ease-in-out_infinite_0.3s] z-10 flex items-center gap-2 bg-white/95 backdrop-blur border border-zinc-200/90 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-md hover:scale-105 transition-transform scale-90 sm:scale-100">
                <img src="https://api.iconify.design/logos:tailwindcss-icon.svg" alt="Tailwind CSS" className="w-5 h-5 sm:w-7 sm:h-7" />
                <span className="font-mono text-[10px] sm:text-xs font-semibold text-zinc-800">Tailwind CSS</span>
              </div>

              {/* Center Transparent Developer Illustration */}
              <div className="relative z-0 flex flex-col items-center justify-center pt-8 pb-4">
                <div className="w-48 sm:w-64 md:w-72 max-h-[280px] sm:max-h-[340px] flex items-center justify-center relative">
                  <img
                    src="/images/tech-developer-illustration-transparent.png"
                    alt="M. Manichandra Babu - Full-Stack Developer Illustration"
                    className="w-full h-full object-contain filter drop-shadow-sm"
                  />
                </div>
                <div className="mt-4 flex flex-col items-center text-center">
                  <span className="font-mono text-xs sm:text-sm font-semibold text-zinc-900">M. Manichandra Babu</span>
                  <span className="text-zinc-500 font-sans text-[11px] sm:text-xs font-light">Full-Stack Web Developer &amp; ECE</span>
                </div>
              </div>
            </div>

            {/* Right Column: Categorized Tech Checklist with Official Tech Badges */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {[
                {
                  title: 'Frontend Engineering',
                  skills: [
                    { name: 'HTML5', icon: 'https://api.iconify.design/logos:html-5.svg' },
                    { name: 'CSS3', icon: 'https://api.iconify.design/logos:css-3.svg' },
                    { name: 'JavaScript (ES6+)', icon: 'https://api.iconify.design/logos:javascript.svg' },
                    { name: 'React.js', icon: 'https://api.iconify.design/logos:react.svg' },
                    { name: 'Tailwind CSS', icon: 'https://api.iconify.design/logos:tailwindcss-icon.svg' },
                  ]
                },
                {
                  title: 'Backend & Database',
                  skills: [
                    { name: 'Python', icon: 'https://api.iconify.design/logos:python.svg' },
                    { name: 'Django', icon: 'https://api.iconify.design/logos:django-icon.svg' },
                    { name: 'REST APIs', icon: 'https://api.iconify.design/logos:postman-icon.svg' },
                    { name: 'SQL', icon: 'https://api.iconify.design/logos:mysql-icon.svg' },
                    { name: 'SQLite', icon: 'https://api.iconify.design/logos:sqlite.svg' },
                  ]
                },
                {
                  title: 'Developer Tools & Version Control',
                  skills: [
                    { name: 'Git', icon: 'https://api.iconify.design/logos:git-icon.svg' },
                    { name: 'GitHub', icon: 'https://api.iconify.design/logos:github-icon.svg' },
                    { name: 'VS Code', icon: 'https://api.iconify.design/logos:visual-studio-code.svg' },
                  ]
                },
                {
                  title: 'AI Tools & Productivity',
                  skills: [
                    { name: 'ChatGPT', icon: 'https://api.iconify.design/logos:openai-icon.svg' },
                    { name: 'DeepSeek', icon: 'https://api.iconify.design/logos:google-gemini.svg' },
                    { name: 'AI-Assisted Debugging', icon: 'https://api.iconify.design/logos:claude-icon.svg' },
                    { name: 'Rapid Prototyping', icon: 'https://api.iconify.design/logos:figma.svg' },
                  ]
                },
                {
                  title: 'Core Development Capabilities',
                  skills: [
                    { name: 'Full-Stack Web Apps', icon: 'https://api.iconify.design/logos:django-icon.svg' },
                    { name: 'Responsive UI Design', icon: 'https://api.iconify.design/logos:tailwindcss-icon.svg' },
                    { name: 'Real-Time Weather APIs', icon: 'https://api.iconify.design/logos:postman-icon.svg' },
                    { name: 'E-Commerce Shopping Cart', icon: 'https://api.iconify.design/logos:react.svg' },
                    { name: 'Web Deployment', icon: 'https://api.iconify.design/logos:netlify-icon.svg' },
                  ]
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 hover:bg-white border border-zinc-200/60 hover:border-zinc-300 shadow-2xs hover:shadow-md transition-all duration-300 group cursor-pointer">
                  {/* Blue Checkmark Circle Badge */}
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-lg font-semibold text-zinc-900 tracking-tight group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((s, sIdx) => (
                        <div key={sIdx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100/90 border border-zinc-200/80 text-zinc-700 text-xs font-medium hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all">
                          <img src={s.icon} alt={s.name} className="w-3.5 h-3.5 object-contain" />
                          <span>{s.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* 04 / FEATURED PROJECTS */}
      <section id="sec-projects" className="story-sec bg-[#f8f9fa] text-zinc-900 py-28 px-[max(5.6vw,2rem)] relative z-20 border-t border-zinc-200">
        {/* Anchor alias for backward compatibility */}
        <div id="sec-services" className="absolute -top-24 pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-6">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.2em] text-zinc-900 uppercase bg-zinc-200/90 px-3.5 py-1.5 rounded-full border border-zinc-300/80 shadow-2xs">04 / PROJECTS</span>
            <span className="font-mono text-xs font-semibold text-zinc-700">Featured Real-World Work</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-zinc-900 max-w-2xl leading-[1.15]">
                Projects built with full-stack logic &amp; modern UI.
              </h2>
              <p className="text-zinc-500 text-xs md:text-sm font-light leading-relaxed mt-3 max-w-xl">
                Real-world web applications engineered from database design to responsive frontend deployment, reflecting practical problem-solving and AI-accelerated workflows.
              </p>
            </div>
            <Link 
              href="/resume" 
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50/90 hover:bg-blue-100/90 border border-blue-200 px-4 py-2.5 rounded-full shadow-2xs self-start md:self-auto"
            >
              <span>View full resume &amp; highlights</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                num: '01',
                title: 'Online Grocery Shopping Website',
                role: 'Full-Stack Web Application',
                period: '2026 - PRESENT',
                category: 'Full-Stack',
                categoryColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                dotColor: 'bg-emerald-500',
                desc: 'An end-to-end online grocery platform enabling users to browse categories, discover items, and manage real-time shopping carts with structured Django models and SQLite backend.',
                liveUrl: 'https://my-store-m-django.onrender.com/',
                deliverables: [
                  'Built online grocery website for users to browse & add items to cart',
                  'Engineered full-stack architecture using HTML, CSS, JavaScript, Python & Django',
                  'Implemented dynamic product categories and shopping cart functionality',
                  'Leveraged AI tools for accelerated coding, debugging & productivity',
                  'Deployed the project online with clean responsive interface'
                ],
                tech: ['Python', 'Django', 'SQLite', 'JavaScript', 'HTML5', 'CSS3'],
                icon: (
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                )
              },
              {
                num: '02',
                title: 'Personal Portfolio Website',
                role: 'Frontend Web Application',
                period: '2026 - PRESENT',
                category: 'Frontend',
                categoryColor: 'bg-blue-50 text-blue-700 border-blue-200',
                dotColor: 'bg-blue-500',
                desc: 'A high-performance, responsive personal developer portfolio engineered to showcase digital craftsmanship, software skills, and engineering projects with fluid micro-interactions.',
                liveUrl: '#',
                deliverables: [
                  'Built responsive personal portfolio website to showcase skills & experience',
                  'Developed modular frontend using React.js, Next.js, HTML, CSS & JavaScript',
                  'Designed a clean, accessible, and user-friendly interface with Tailwind CSS',
                  'Used AI tools for coding, responsive optimization & debugging',
                  'Deployed the project online with edge performance & high reliability'
                ],
                tech: ['React.js', 'Next.js', 'Tailwind CSS', 'JavaScript', 'GSAP'],
                icon: (
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                num: '03',
                title: 'Weather Forecast Website',
                role: 'Real-Time Weather Web Application',
                period: '2026 - PRESENT',
                category: 'Real-Time API',
                categoryColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
                dotColor: 'bg-cyan-500',
                desc: 'A real-time meteorological web application communicating with external REST APIs to deliver live atmospheric weather data, forecasts, and instant city search queries.',
                liveUrl: 'https://frabjous-trifle-462a62.netlify.app/',
                deliverables: [
                  'Built weather website to display real-time weather data using Weather API',
                  'Developed responsive interface using HTML, CSS, JavaScript, and React.js',
                  'Integrated Weather API to fetch and display current meteorological conditions',
                  'Used AI tools for coding, API integration & debugging',
                  'Deployed the project online with mobile-first responsive layout'
                ],
                tech: ['React.js', 'Weather API', 'JavaScript (ES6+)', 'HTML5', 'CSS3'],
                icon: (
                  <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                )
              }
            ].map((prj) => (
              <div
                key={prj.num}
                className="project-card-item group bg-white border border-zinc-200/80 hover:border-zinc-300 rounded-3xl p-7 md:p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-xl hover:-translate-y-[6px] transition-all duration-500 will-change-transform relative overflow-hidden"
              >
                {/* Sheen sweep overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-10" />

                <div className="flex flex-col gap-5 relative z-20">
                  {/* Top card header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-zinc-500 font-bold px-3 py-1 bg-zinc-100 rounded-full border border-zinc-200">{prj.num}</span>
                      <span className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border font-semibold ${prj.categoryColor}`}>
                        {prj.category}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-zinc-400 font-medium">{prj.period}</span>
                  </div>

                  {/* Title & Icon */}
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl md:text-2xl font-semibold text-zinc-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300 flex items-center gap-1.5">
                        {prj.liveUrl && prj.liveUrl !== '#' ? (
                          <a
                            href={prj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline flex items-center gap-1.5"
                          >
                            <span>{prj.title}</span>
                            <span className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-600 text-xl">&rarr;</span>
                          </a>
                        ) : (
                          <>
                            <span>{prj.title}</span>
                            <span className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-600 text-xl">&rarr;</span>
                          </>
                        )}
                      </h3>
                      <div className="p-2 rounded-xl bg-zinc-50 border border-zinc-200/60 shrink-0 group-hover:scale-110 transition-transform">
                        {prj.icon}
                      </div>
                    </div>
                    <span className="inline-block text-xs font-mono text-blue-600 font-medium mt-1">
                      {prj.role}
                    </span>
                    <p className="text-zinc-500 text-xs md:text-sm font-light leading-relaxed mt-2.5">
                      {prj.desc}
                    </p>
                  </div>

                  {/* Key Highlights checklist */}
                  <div className="flex flex-col gap-2 pt-3 border-t border-zinc-100">
                    <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">Key Highlights</span>
                    <div className="flex flex-col gap-2 mt-1">
                      {prj.deliverables.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs font-light text-zinc-700 group-hover:translate-x-0.5 transition-transform duration-300" style={{ transitionDelay: `${i * 40}ms` }}>
                          <span className={`w-1.5 h-1.5 rounded-full ${prj.dotColor} mt-1.5 shrink-0`} />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tech stack badges & action button */}
                <div className="flex flex-col gap-3.5 relative z-20 pt-4 border-t border-zinc-100">
                  <div className="flex flex-wrap gap-1.5">
                    {prj.tech.map((t, i) => (
                      <span key={i} className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200/80 hover:bg-zinc-200/80 hover:border-zinc-300 transition-all duration-200 cursor-default">
                        {t}
                      </span>
                    ))}
                  </div>

                  {prj.liveUrl && prj.liveUrl !== '#' && (
                    <div className="text-[11px] font-mono text-zinc-500 truncate">
                      <a
                        href={prj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors hover:underline inline-flex items-center gap-1.5"
                      >
                        <span className="text-blue-500 text-xs">🔗</span>
                        <span className="truncate text-blue-600 font-medium">{prj.liveUrl}</span>
                      </a>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 gap-2 flex-wrap">
                    {prj.liveUrl && prj.liveUrl !== '#' ? (
                      <a
                        href={prj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xs hover:shadow transition-all duration-200 group/demo"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live Demo</span>
                        <svg className="w-3.5 h-3.5 transition-transform group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Current Site
                      </span>
                    )}

                    <MagneticButton className="w-fit">
                      <Link href="/resume" className="group/btn inline-flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-900 hover:text-blue-600 transition-colors">
                        <span>View in Resume</span>
                        <span className="group-hover/btn:translate-x-[4px] transition-transform duration-300 ease-out">&rarr;</span>
                      </Link>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CINEMATIC CLOSING CTA & FOOTER */}
      <section id="sec-cta-footer" className="story-sec bg-[#050507] text-white pt-24 md:pt-32 pb-16 px-[max(4vw,1.5rem)] relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between border-b border-white/10 pb-16 md:pb-20">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">GET IN TOUCH</span>
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-extralight tracking-tight leading-tight md:leading-none text-white">
                Have an idea? <br />
                <span className="text-white/50">Let&apos;s turn it into something real.</span>
              </h2>
            </div>

            {/* Social Logos & Email Action Buttons */}
            <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-5">
              <a
                href="mailto:maddelamanichandu@gmail.com"
                className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all hover:scale-105 flex items-center gap-3 shadow-lg w-full sm:w-auto justify-center group text-sm"
              >
                <svg className="w-5 h-5 text-black group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Get In Touch</span>
                <span>&rarr;</span>
              </a>

              {/* Direct Contact Action Badges */}
              <div className="flex flex-wrap gap-3 items-center">
                <a
                  href="tel:+916300190776"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-emerald-600/30 border border-white/10 hover:border-emerald-400 text-white text-xs font-mono transition-all hover:scale-105"
                >
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 6300190776</span>
                </a>

                <a
                  href="mailto:maddelamanichandu@gmail.com"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-blue-600/30 border border-white/10 hover:border-blue-400 text-white text-xs font-mono transition-all hover:scale-105"
                >
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>maddelamanichandu@gmail.com</span>
                </a>

                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-mono">
                  Rayachoti, AP (516269)
                </span>
              </div>
            </div>
          </div>

          {/* Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xs font-mono text-white/60">
            <div className="flex flex-col gap-2">
              <span className="text-white font-semibold text-base font-sans">M. Manichandra Babu</span>
              <span>Full-Stack Web Developer &amp; B.Tech (ECE)</span>
              <span className="text-white/40 text-[11px] mt-1">Building practical web applications and responsive user interfaces with Python, Django, React.js, and modern AI tools.</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white/40 uppercase">Navigation</span>
              <a href="#sec-identity" className="hover:text-white transition-colors">About Me</a>
              <a href="/resume" className="hover:text-white transition-colors">Resume</a>
              <a href="#sec-skills" className="hover:text-white transition-colors">Tech Stack</a>
              <a href="#sec-projects" className="hover:text-white transition-colors">Projects</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white/40 uppercase">Education</span>
              <span className="text-white/80">Sri Sai Institute of Tech &amp; Science</span>
              <span className="text-white/40 text-[11px]">B.Tech - ECE (2023 - 2027)</span>
              <span className="text-white/80 mt-1">Govt. Junior College, Palamaner</span>
              <span className="text-white/40 text-[11px]">Intermediate MPC (2021 - 2023)</span>
            </div>
            <div className="flex flex-col gap-2 md:items-end">
              <span>Direct Contact</span>
              <a href="mailto:maddelamanichandu@gmail.com" className="text-white hover:underline">maddelamanichandu@gmail.com</a>
              <a href="tel:+916300190776" className="text-white/70 hover:underline">+91 6300190776</a>
              <span className="text-white/40">Rayachoti, Andhra Pradesh, 516269</span>
              <span className="text-white/30 mt-3">&copy; 2026 M. Manichandra Babu. All rights reserved.</span>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
