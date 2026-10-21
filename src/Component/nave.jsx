// src/Component/nave.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import logoImg from '../assets/logo.png'; 

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // প্রোডাক্টস লিংকে ক্লিক করলে সব পেজ থেকে যেন সঠিকভাবে স্ক্রোল হয় তার লজিক
  const handleProductsScroll = (e) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (location.pathname !== '/') {
      // যদি ইউজার অন্য কোনো পেজে (যেমন /privacy) থাকে, তবে আগে হোমে যাবে তারপর স্ক্রোল করবে
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('products');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // হোম পেজে থাকলে সরাসরি স্ক্রোল করবে
      const element = document.getElementById('products');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // FAQ লিংকে ক্লিক করলে স্ক্রোল করার লজিক
  const handleFaqScroll = (e) => {
    e.preventDefault();
    setIsOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('faq');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('faq');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav aria-label="Main Navigation" className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl flex items-center justify-between">
        
        {/* লোগো সেকশন */}
        <Link to="/" aria-label="DevAssets Homepage" className="flex items-center gap-2 group">
          <span className="w-10 h-10 block overflow-hidden rounded-xl bg-slate-800">
            <img
              className="w-full h-full object-cover"
              src={logoImg}
              alt="DevAssets Logo"
              width="40"
              height="40"
              loading="eager"
            />
          </span>
          <span className="text-xl font-black tracking-tight text-slate-50">
            Dev<span className="text-indigo-400">Assets</span>
          </span>
        </Link>

        {/* ডেক্সটপ মেনু লিংকসমূহ */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-400">
          <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
          <a href="#products" onClick={handleProductsScroll} className="hover:text-indigo-400 transition-colors">Products</a>
          <a href="#faq" onClick={handleFaqScroll} className="hover:text-indigo-400 transition-colors">FAQ</a>
          <Link to="/about" className="hover:text-indigo-400 transition-colors">About Us</Link>
        </div>

        {/* ডেক্সটপ বাটন */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#products"
            onClick={handleProductsScroll}
            aria-label="Explore our premium digital products"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-indigo-600/20"
          >
            Explore Products
          </a>
        </div>

        {/* মোবাইল মেনু বাটন */}
        <button 
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="flex md:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors focus:outline-none"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* মোবাইল ড্রপডাউন মেনু */}
      {isOpen && (
        <div className="md:hidden mt-4 rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-3 animate-in fade-in slide-in-from-top-5 duration-200">
          <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-slate-300 rounded-xl hover:bg-slate-800">
            Home
          </Link>
          <a href="#products" onClick={handleProductsScroll} className="block px-4 py-2.5 text-sm font-medium text-slate-300 rounded-xl hover:bg-slate-800">
            Products
          </a>
          <a href="#faq" onClick={handleFaqScroll} className="block px-4 py-2.5 text-sm font-medium text-slate-300 rounded-xl hover:bg-slate-800">
            FAQ
          </a>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-slate-300 rounded-xl hover:bg-slate-800">
            About Us
          </Link>

          <div className="pt-2 border-t border-slate-800">
            <a
              href="#products"
              onClick={handleProductsScroll}
              className="block w-full text-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-indigo-600/20"
            >
              Explore Products
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
