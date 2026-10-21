// src/Component/footter.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer aria-label="Site Footer" className="bg-slate-950 border-t border-slate-900 px-6 py-12 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl space-y-8">
        
        {/* উপরের অংশ: কোম্পানির পরিচিতি এবং কন্টাক্ট ইনফো (FastSpring Approval এর জন্য আবশ্যক) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-900 text-sm">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-bold text-slate-300 text-base">DevAssets Inc.</h4>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Premium digital assets, masterclasses, and software blueprints for global developers and creators. Registered Business Operator.
            </p>
          </div>
          <div className="space-y-2 text-center md:text-right text-xs text-slate-400">
            <p>📧 Support Email: <a href="mailto:support@devassets.online" className="text-indigo-400 hover:underline">support@devassets.online</a></p>
            {/* Social Link - Facebook Group */}
            <div className="gap-2">
              <a
                href="https://www.facebook.com/groups/1110390561349873"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DevAssets Help Zone Facebook Group"
                className="inline-flex items-center gap-2 text-indigo-400 hover:underline transition-colors duration-200 text-sm"
              >
                {/* Facebook Icon (SVG) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4 text-white"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>DevAssets Help Zone</span>
              </a>
            </div>
            <p>📍 Location: Satkhira-9450, Khulna, Bangladesh</p>
            <p>⏱️ Support Hours: Mon - Fri, 9:00 AM - 5:00 PM UTC+6</p>
          </div>
        </div>

        {/* নিচের অংশ: কপিরাইট এবং লিগ্যাল লিংকসমূহ */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 text-center md:text-left">
            &copy; {currentYear} <span className="font-semibold text-slate-400">DevAssets</span>. All rights reserved.
          </div>

          <nav aria-label="Legal & Information Links" className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-slate-500">
            <a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a>
            <Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link>
            <Link to="/refund" className="hover:text-indigo-400 transition-colors">Refund Policy</Link>
            <Link to="/about" className="hover:text-indigo-400 transition-colors">About Us</Link>
          </nav>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
