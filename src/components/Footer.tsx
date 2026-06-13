/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export function Footer() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 mt-12">
      <footer className="w-full bg-[#2C1A10] text-white antialiased p-8 md:p-12 rounded-[2rem] border border-[#3D2B1F] shadow-xl">
        
        {/* Top Section: Main Brand & Link Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Brand/Hero Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Logo with Accent */}
              <div className="flex items-center space-x-2 text-xl font-semibold tracking-tight">
                <span className="h-6 w-6 bg-[#e4a853] rounded-full flex items-center justify-center text-[#2C1A10] text-xs font-bold shadow-xs">☕</span>
                <span className="text-white" style={{ fontFamily: 'var(--f-display)' }}>Cafe<span className="text-[#e4a853]">Tags.</span></span>
              </div>
              <p className="text-xl font-light leading-relaxed text-[#dae2ed] max-w-sm">
                Discovering beautiful, curated coffee houses and heritage spaces across Hyderabad.
              </p>
            </div>
            
            {/* Status / Open Indicator */}
            <div className="inline-flex items-center space-x-2 bg-[#3D2B1F] px-3 py-1.5 rounded-full w-fit text-xs font-medium text-[#C4B8AE]">
              <span className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span>Constantly discovering new spaces</span>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#e4a853]">Explore</h4>
              <ul className="space-y-2.5 text-sm font-medium text-[#C4B8AE]">
                <li><a href="#" className="hover:text-white transition-colors duration-200">All Cafes</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Journal</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Our Story</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#e4a853]">Partner</h4>
              <ul className="space-y-2.5 text-sm font-medium text-[#C4B8AE]">
                <li><a href="#" className="hover:text-white transition-colors duration-200">List Your Space</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Submit Feedback</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Advertise</a></li>
              </ul>
            </div>

            {/* Column 3: Locations */}
            <div className="col-span-2 sm:col-span-1 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#e4a853]">Locations</h4>
              <ul className="grid grid-cols-2 gap-2.5 text-sm font-medium text-[#C4B8AE]">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Jubilee Hills</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Banjara Hills</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Gachibowli</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Madhapur</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Film Nagar</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Old City</a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Section: Legal & Language */}
        <div className="pt-6 border-t border-[#3D2B1F] flex flex-col-reverse sm:flex-row justify-between items-center gap-4 text-xs font-medium text-[#C4B8AE]">
          {/* Legal Links */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© 2026 CafeTags. All rights reserved.</span>
            <span className="hidden sm:inline text-[#3D2B1F]">·</span>
            <a href="#" className="hover:underline hover:text-white">Privacy Policy</a>
            <span className="hidden sm:inline text-[#3D2B1F]">·</span>
            <a href="#" className="hover:underline hover:text-white">Terms of Service</a>
          </div>
          
          {/* Socials & Utilities */}
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-pointer border-none bg-transparent text-[#C4B8AE]">
              <i className="ti ti-world"></i> <span>English (IN)</span>
            </button>
            <div className="flex items-center space-x-4 text-[16px]">
              <a href="#" className="hover:text-[#e4a853] transition-colors"><i className="ti ti-brand-x"></i></a>
              <a href="#" className="hover:text-[#e4a853] transition-colors"><i className="ti ti-brand-instagram"></i></a>
              <a href="#" className="hover:text-[#e4a853] transition-colors"><i className="ti ti-brand-facebook"></i></a>
            </div>
          </div>
        </div>

      </footer>
    </div>
  );
}
