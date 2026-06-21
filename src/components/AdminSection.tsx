import React, { useState } from 'react';
import { Cafe, BlogArticle, UserFeedback, SeoSettings } from '../types';
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminCafes } from './admin/AdminCafes';
import { AdminBlogs } from './admin/AdminBlogs';
import { AdminFeedbacks } from './admin/AdminFeedbacks';
import { AdminSeo } from './admin/AdminSeo';

interface AdminSectionProps {
  cafes: Cafe[];
  setCafes: React.Dispatch<React.SetStateAction<Cafe[]>>;
  blogs: BlogArticle[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogArticle[]>>;
  feedbacks: UserFeedback[];
  setFeedbacks: React.Dispatch<React.SetStateAction<UserFeedback[]>>;
  seoSettings: SeoSettings;
  setSeoSettings: React.Dispatch<React.SetStateAction<SeoSettings>>;
}

export function AdminSection({ 
  cafes, 
  setCafes, 
  blogs, 
  setBlogs, 
  feedbacks, 
  setFeedbacks,
  seoSettings,
  setSeoSettings
}: AdminSectionProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'listings' | 'blogs' | 'feedbacks' | 'seo'>('dashboard');
  
  const pendingFeedbacksCount = feedbacks.filter(fb => fb.status === 'pending').length;

  return (
    <AdminLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      pendingFeedbacksCount={pendingFeedbacksCount}
      onLogout={() => { window.location.href = '/'; }}
    >
      {activeTab === 'dashboard' && <AdminDashboard cafes={cafes} blogs={blogs} feedbacks={feedbacks} />}
      {activeTab === 'listings' && <AdminCafes cafes={cafes} setCafes={setCafes} />}
      {activeTab === 'blogs' && <AdminBlogs blogs={blogs} setBlogs={setBlogs} />}
      {activeTab === 'feedbacks' && <AdminFeedbacks feedbacks={feedbacks} setFeedbacks={setFeedbacks} />}
      {activeTab === 'seo' && <AdminSeo seoSettings={seoSettings} setSeoSettings={setSeoSettings} />}
    </AdminLayout>
  );
}
