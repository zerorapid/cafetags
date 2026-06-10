/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { MaterialIcon } from './MaterialIcon';

interface NavbarProps {
  onResetCafeSelection: () => void;
}


export function Navbar({ onResetCafeSelection }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  return (
    <nav id="top_navigation" className="border-b border-tactile-divider py-4 px-4 md:px-12 flex flex-col md:flex-row gap-4 justify-between items-center bg-warm-beige sticky top-0 z-20">
      <div id="nav_brand" className="text-charcoal-ink flex items-center cursor-pointer" onClick={() => { onResetCafeSelection(); navigate('/'); }}>
        <Logo className="h-5 sm:h-6 md:h-7" />
      </div>

      {/* Structured top-level navigation links */}
      <div id="navigation_menu" className="flex items-center gap-2 sm:gap-6 text-[#786F64] font-serif">
        <Link
          id="nav_link_directory"
          to="/"
          onClick={() => { onResetCafeSelection(); }}
          className={`px-4.5 py-2 rounded-md border transition-all flex items-center gap-2.5 cursor-pointer text-[24px] font-normal leading-none ${
            pathname === '/'
              ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
              : 'border-transparent text-[#786F64] hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <MaterialIcon name="home" className="text-[24px]" />
          <span>Home</span>
        </Link>

        <Link
          id="nav_link_blog"
          to="/journal"
          onClick={() => { onResetCafeSelection(); }}
          className={`px-4.5 py-2 rounded-md border transition-all flex items-center gap-2.5 cursor-pointer text-[24px] font-normal leading-none ${
            pathname === '/journal'
              ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
              : 'border-transparent text-[#786F64] hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <MaterialIcon name="menu_book" className="text-[24px]" />
          <span>Journal</span>
        </Link>

        <Link
          id="nav_link_admin"
          to="/admin"
          onClick={() => { onResetCafeSelection(); }}
          className={`px-4.5 py-2 rounded-md border transition-all flex items-center gap-2.5 cursor-pointer text-[24px] font-normal leading-none ${
            pathname === '/admin'
              ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
              : 'border-transparent text-[#786F64] hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <MaterialIcon name="admin_panel_settings" className="text-[24px]" />
          <span>Owner</span>
        </Link>
      </div>
      
      <div id="nav_actions" className="hidden lg:flex items-center gap-4">
        {/* Buy Me a Coffee Button */}
        <a 
          id="btn_buy_coffee" 
          href="https://buymeacoffee.com/aryanculture"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center border-[2px] border-[#3B2F2F] text-[#3B2F2F] bg-transparent hover:bg-[#3B2F2F] hover:text-[#F5F5F0] transition-colors duration-300 font-serif font-normal text-[24px] tracking-[0.5px] px-[24px] py-[10px] rounded-[5.5px] cursor-pointer select-none"
        >
          <MaterialIcon name="coffee" className="mr-[12px] text-[18px]" />
          <span>Buy me a coffee</span>
        </a>
      </div>
    </nav>
  );
}

