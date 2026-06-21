import React from 'react';
import { MaterialIcon } from '../MaterialIcon';
import { Cafe, BlogArticle, UserFeedback } from '../../types';

interface AdminDashboardProps {
  cafes: Cafe[];
  blogs: BlogArticle[];
  feedbacks: UserFeedback[];
}

export function AdminDashboard({ cafes, blogs, feedbacks }: AdminDashboardProps) {
  const publishedBlogsCount = blogs.filter(b => b.status === 'published').length;
  const pendingFeedbacksCount = feedbacks.filter(f => f.status === 'pending').length;
  const topCafes = cafes.filter(c => c.isFeaturedBanner || c.isNewLaunch).length;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-1.5 sticky top-0 z-20 bg-[#FAF9F6] pt-10 pb-5 border-b border-stone-200/60 mb-6">
        <h3 className="font-sans text-2xl font-bold text-stone-900 tracking-wide">Command Center</h3>
        <p className="text-stone-500 text-sm font-sans">
          Overview of CafeTags ecosystem. Monitor listings, content, and community interactions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Total Cafes */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm relative overflow-hidden group hover:border-amber-400 transition-all">
          <div className="absolute top-0 right-0 w-40 h-40 bg-amber-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-amber-100 transition-colors" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="w-20 h-20 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center shadow-sm">
                <MaterialIcon name="storefront" className="text-[40px]" />
              </div>
              <span className="text-stone-500 font-mono text-[11px] font-bold uppercase tracking-widest bg-stone-50 px-3 py-1.5 rounded-full border border-stone-200 shadow-sm">Catalog</span>
            </div>
            <h4 className="font-sans text-5xl font-black text-stone-900 mb-2 tracking-tight">{cafes.length}</h4>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Curated Cafes</p>
            <div className="mt-6 pt-5 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-500 font-semibold tracking-wide">
              <MaterialIcon name="star" className="text-amber-500 text-lg" />
              <span>{topCafes} Spotlit listings active</span>
            </div>
          </div>
        </div>

        {/* Journals */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm relative overflow-hidden group hover:border-stone-400 transition-all">
          <div className="absolute top-0 right-0 w-40 h-40 bg-stone-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-stone-100 transition-colors" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="w-20 h-20 bg-stone-100 text-stone-700 rounded-full flex items-center justify-center shadow-sm">
                <MaterialIcon name="newspaper" className="text-[40px]" />
              </div>
              <span className="text-stone-500 font-mono text-[11px] font-bold uppercase tracking-widest bg-stone-50 px-3 py-1.5 rounded-full border border-stone-200 shadow-sm">Editorial</span>
            </div>
            <h4 className="font-sans text-5xl font-black text-stone-900 mb-2 tracking-tight">{blogs.length}</h4>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Journal Columns</p>
            <div className="mt-6 pt-5 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-500 font-semibold tracking-wide">
              <MaterialIcon name="public" className="text-green-600 text-lg" />
              <span>{publishedBlogsCount} Published / {blogs.length - publishedBlogsCount} Drafts</span>
            </div>
          </div>
        </div>

        {/* Feedbacks */}
        <div className={`bg-white border rounded-2xl p-8 shadow-sm relative overflow-hidden group transition-all ${pendingFeedbacksCount > 0 ? 'border-red-200 hover:border-red-400' : 'border-stone-200 hover:border-stone-400'}`}>
          <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none transition-colors ${pendingFeedbacksCount > 0 ? 'bg-red-50 group-hover:bg-red-100' : 'bg-stone-50 group-hover:bg-stone-100'}`} />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-sm ${pendingFeedbacksCount > 0 ? 'bg-red-100 text-red-600' : 'bg-stone-100 text-stone-700'}`}>
                <MaterialIcon name="verified_user" className="text-[40px]" />
              </div>
              <span className="text-stone-500 font-mono text-[11px] font-bold uppercase tracking-widest bg-stone-50 px-3 py-1.5 rounded-full border border-stone-200 shadow-sm">Integrity</span>
            </div>
            <h4 className="font-sans text-5xl font-black text-stone-900 mb-2 tracking-tight">{pendingFeedbacksCount}</h4>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Pending Reviews</p>
            <div className={`mt-6 pt-5 border-t border-stone-100 flex items-center gap-2 text-xs font-semibold tracking-wide ${pendingFeedbacksCount > 0 ? 'text-red-500' : 'text-stone-500'}`}>
              {pendingFeedbacksCount > 0 ? (
                <>
                  <MaterialIcon name="warning" className="text-red-500 text-lg animate-pulse" />
                  <span>Action required on {pendingFeedbacksCount} review{pendingFeedbacksCount > 1 ? 's' : ''}</span>
                </>
              ) : (
                <>
                  <MaterialIcon name="check_circle" className="text-green-600 text-lg" />
                  <span>All community reviews moderated</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
