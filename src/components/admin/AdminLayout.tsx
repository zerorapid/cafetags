import React from 'react';
import { MaterialIcon } from '../MaterialIcon';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'listings' | 'blogs' | 'feedbacks' | 'seo';
  setActiveTab: (tab: 'dashboard' | 'listings' | 'blogs' | 'feedbacks' | 'seo') => void;
  onLogout?: () => void;
  pendingFeedbacksCount?: number;
}

export function AdminLayout({ children, activeTab, setActiveTab, onLogout, pendingFeedbacksCount = 0 }: AdminLayoutProps) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#FDFDFB] font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-stone-950 text-stone-300 flex flex-col shadow-xl z-10 shrink-0">
        <div className="p-6 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white shadow-lg">
              <MaterialIcon name="admin_panel_settings" className="text-2xl" />
            </div>
            <div>
              <h2 className="font-sans text-xl text-white font-bold tracking-wide">Owner Center</h2>
              <p className="text-[11px] text-amber-500 font-mono tracking-widest uppercase mt-0.5">Admin Workspace</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <div className="text-[11px] uppercase tracking-widest font-extrabold text-stone-600 mb-4 px-2">Management Modules</div>
          
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all text-base font-semibold cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-amber-600 text-white shadow-md' : 'hover:bg-stone-900 hover:text-white'
            }`}
          >
            <MaterialIcon name="dashboard" className="text-[22px]" />
            Overview Panel
          </button>

          <button
            onClick={() => setActiveTab('listings')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all text-base font-semibold cursor-pointer ${
              activeTab === 'listings' ? 'bg-amber-600 text-white shadow-md' : 'hover:bg-stone-900 hover:text-white'
            }`}
          >
            <MaterialIcon name="storefront" className="text-[22px]" />
            Cafe Spots Vault
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all text-base font-semibold cursor-pointer ${
              activeTab === 'blogs' ? 'bg-amber-600 text-white shadow-md' : 'hover:bg-stone-900 hover:text-white'
            }`}
          >
            <MaterialIcon name="newspaper" className="text-[22px]" />
            Journal Columns
          </button>

          <button
            onClick={() => setActiveTab('feedbacks')}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-lg transition-all text-base font-semibold cursor-pointer ${
              activeTab === 'feedbacks' ? 'bg-amber-600 text-white shadow-md' : 'hover:bg-stone-900 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <MaterialIcon name="verified_user" className="text-[22px]" />
              Integrity Reviews
            </div>
            {pendingFeedbacksCount > 0 && (
              <span className="bg-red-500 text-white text-[11px] px-2.5 py-0.5 rounded-full font-bold shadow-sm">
                {pendingFeedbacksCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all text-base font-semibold cursor-pointer ${
              activeTab === 'seo' ? 'bg-amber-600 text-white shadow-md' : 'hover:bg-stone-900 hover:text-white'
            }`}
          >
            <MaterialIcon name="search" className="text-[22px]" />
            SEO & Connect
          </button>
        </nav>

        {/* Logo and Logout at the bottom */}
        <div className="p-6 border-t border-stone-800 space-y-4">
          <div className="flex items-center gap-2 justify-center opacity-70 mb-2">
            <MaterialIcon name="local_cafe" className="text-amber-500 text-xl" />
            <span className="font-sans font-bold text-white text-lg tracking-wider">CafeTags</span>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition-all text-sm font-bold uppercase tracking-wider cursor-pointer"
            >
              <MaterialIcon name="logout" className="text-[18px]" />
              Secure Logout
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative bg-[#FAF9F6]">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-500/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Dynamic Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pb-10">
          {children}
        </div>
      </main>
    </div>
  );
}
