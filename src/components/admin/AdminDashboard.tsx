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
      <div className="space-y-1 border-b border-stone-200 pb-5">
        <h3 className="font-serif text-3xl font-normal text-stone-900 italic tracking-wide">Command Center</h3>
        <p className="text-stone-550 text-xs font-sans">
          Overview of CafeTags ecosystem. Monitor listings, content, and community interactions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Cafes */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs relative overflow-hidden group hover:border-amber-400 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-amber-100 transition-colors" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center">
                <MaterialIcon name="storefront" className="text-xl" />
              </div>
              <span className="text-stone-400 font-mono text-[10px] font-bold uppercase tracking-widest bg-stone-50 px-2 py-1 rounded-sm border border-stone-100">Catalog</span>
            </div>
            <h4 className="font-serif text-4xl font-bold text-stone-900 mb-1">{cafes.length}</h4>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Curated Cafes</p>
            <div className="mt-4 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-[10px] text-stone-500 font-medium">
              <MaterialIcon name="star" className="text-amber-500 text-[12px]" />
              <span>{topCafes} Spotlit listings active</span>
            </div>
          </div>
        </div>

        {/* Journals */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs relative overflow-hidden group hover:border-stone-400 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-stone-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-stone-100 transition-colors" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-stone-100 text-stone-700 rounded-lg flex items-center justify-center">
                <MaterialIcon name="newspaper" className="text-xl" />
              </div>
              <span className="text-stone-400 font-mono text-[10px] font-bold uppercase tracking-widest bg-stone-50 px-2 py-1 rounded-sm border border-stone-100">Editorial</span>
            </div>
            <h4 className="font-serif text-4xl font-bold text-stone-900 mb-1">{blogs.length}</h4>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Journal Columns</p>
            <div className="mt-4 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-[10px] text-stone-500 font-medium">
              <MaterialIcon name="public" className="text-green-600 text-[12px]" />
              <span>{publishedBlogsCount} Published / {blogs.length - publishedBlogsCount} Drafts</span>
            </div>
          </div>
        </div>

        {/* Feedback Queue */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs relative overflow-hidden group hover:border-red-400 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-red-100 transition-colors" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-red-100 text-red-700 rounded-lg flex items-center justify-center">
                <MaterialIcon name="feedback" className="text-xl" />
              </div>
              <span className="text-stone-400 font-mono text-[10px] font-bold uppercase tracking-widest bg-stone-50 px-2 py-1 rounded-sm border border-stone-100">Community</span>
            </div>
            <h4 className="font-serif text-4xl font-bold text-stone-900 mb-1">{pendingFeedbacksCount}</h4>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Pending Reviews</p>
            <div className="mt-4 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-[10px] text-stone-500 font-medium">
              {pendingFeedbacksCount > 0 ? (
                <>
                  <MaterialIcon name="warning" className="text-red-500 text-[12px]" />
                  <span className="text-red-600 font-bold">Action required in Chamber</span>
                </>
              ) : (
                <>
                  <MaterialIcon name="check_circle" className="text-green-500 text-[12px]" />
                  <span>Queue is fully cleared</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
