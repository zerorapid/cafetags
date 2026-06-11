import React, { useState, useRef } from 'react';
import { Cafe, BlogArticle, UserFeedback, CafeMenuItem, CafeReview, SeoSettings } from '../types';
import { MaterialIcon } from './MaterialIcon';
import { db } from '../firebase';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { CafeForm } from './CafeForm';
import Papa from 'papaparse';

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
  const [activeTab, setActiveTab] = useState<'listings' | 'blogs' | 'feedbacks' | 'seo'>('listings');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const blogFileInputRef = useRef<HTMLInputElement>(null);

  // Listing forms state
  const [editingCafe, setEditingCafe] = useState<Cafe | null>(null);
  const [isAddingCafe, setIsAddingCafe] = useState(false);

  // Blog forms state
  const [editingBlog, setEditingBlog] = useState<BlogArticle | null>(null);
  const [isAddingBlog, setIsAddingBlog] = useState(false);

  // New Listing Template state removed (handled by CafeForm)
  // Tag Input Helpers removed (handled by CafeForm)

  // New Blog Template
  const [blogForm, setBlogForm] = useState<Omit<BlogArticle, 'id'>>({
    title: '',
    excerpt: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200&auto=format&fit=crop',
    author: 'Rohan Shastry',
    date: 'June 10, 2026',
    readTime: '5 min read'
  });

  // Action: Save Cafe (Handled by CafeForm now)

  const handleCafeCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const newCafes: Cafe[] = [];
        for (const row of results.data as any[]) {
          const newCafe: Cafe = {
            id: Date.now() + Math.floor(Math.random() * 10000),
            name: row.name || 'Unknown Cafe',
            area: row.area || 'Unknown Area',
            tags: row.tags ? row.tags.split(',').map((t: string) => t.trim()) : [],
            image: row.image || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
            vibe: row.vibe || '',
            mapLink: row.mapLink || '',
            icon: row.icon || 'local_cafe',
            logo: row.logo || '',
            signature: row.signature || '',
            founded: row.founded || '2026',
            address: row.address || '',
            phone: row.phone || '',
            email: row.email || '',
            website: row.website || '',
            timings: row.timings || '8:00 AM - 10:00 PM',
            aestheticType: row.aestheticType || '',
            crowd: row.crowd || '',
            discounts: row.discounts || '',
            facilities: row.facilities ? row.facilities.split(',').map((t: string) => t.trim()) : [],
            dineIn: row.dineIn !== 'FALSE',
            takeaway: row.takeaway !== 'FALSE',
            onlineOrder: row.onlineOrder !== 'FALSE',
            selfDelivery: row.selfDelivery === 'TRUE',
            celebrities: row.celebrities ? row.celebrities.split(',').map((t: string) => t.trim()) : [],
            bookingUrl: row.bookingUrl || '',
            featuredMenu: [],
            userReviews: []
          };
          newCafes.push(newCafe);
          if (import.meta.env.VITE_FIREBASE_API_KEY) {
            await setDoc(doc(db, "cafes", newCafe.id.toString()), newCafe);
          }
        }
        if (!import.meta.env.VITE_FIREBASE_API_KEY) {
          setCafes(prev => [...newCafes, ...prev]);
        }
        alert(`Successfully imported ${newCafes.length} cafes!`);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    });
  };

  const handleBlogCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const newBlogs: BlogArticle[] = [];
        for (const row of results.data as any[]) {
          const newBlog: BlogArticle = {
            id: Date.now() + Math.floor(Math.random() * 10000),
            title: row.title || 'Untitled Blog',
            excerpt: row.excerpt || '',
            content: row.content || '',
            image: row.image || 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&q=80',
            author: row.author || 'Admin',
            date: row.date || new Date().toLocaleDateString(),
            readTime: row.readTime || '5 min read'
          };
          newBlogs.push(newBlog);
          if (import.meta.env.VITE_FIREBASE_API_KEY) {
            await setDoc(doc(db, "blogs", newBlog.id.toString()), newBlog);
          }
        }
        if (!import.meta.env.VITE_FIREBASE_API_KEY) {
          setBlogs(prev => [...newBlogs, ...prev]);
        }
        alert(`Successfully imported ${newBlogs.length} blog columns!`);
        if (blogFileInputRef.current) blogFileInputRef.current.value = '';
      }
    });
  };

  // Action: Delete Cafe
  const handleDeleteCafe = async (id: number) => {
    if (confirm("Are you sure you would like to permanently purge this cafe listing? Regular users have no access to delete details.")) {
      if (import.meta.env.VITE_FIREBASE_API_KEY) {
        await deleteDoc(doc(db, "cafes", id.toString()));
      } else {
        setCafes(prev => prev.filter(c => c.id !== id));
      }
    }
  };

  // Action: Save Blog
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBlog) {
      if (import.meta.env.VITE_FIREBASE_API_KEY) {
        await setDoc(doc(db, "blogs", editingBlog.id.toString()), editingBlog);
      } else {
        setBlogs(prev => prev.map(b => b.id === editingBlog.id ? { ...editingBlog } : b));
      }
      setEditingBlog(null);
      alert("Blog article content successfully updated!");
    } else {
      const newBlog: BlogArticle = {
        ...blogForm,
        id: Date.now()
      };
      if (import.meta.env.VITE_FIREBASE_API_KEY) {
        await setDoc(doc(db, "blogs", newBlog.id.toString()), newBlog);
      } else {
        setBlogs(prev => [newBlog, ...prev]);
      }
      setIsAddingBlog(false);
      setBlogForm({
        title: '',
        excerpt: '',
        content: '',
        image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200&auto=format&fit=crop',
        author: 'Rohan Shastry',
        date: 'June 10, 2026',
        readTime: '5 min read'
      });
      alert("New blog article successfully published on the journal forum!");
    }
  };

  // Action: Delete Blog
  const handleDeleteBlog = async (id: number) => {
    if (confirm("Are you sure you want to permanently delete this journal article?")) {
      if (import.meta.env.VITE_FIREBASE_API_KEY) {
        await deleteDoc(doc(db, "blogs", id.toString()));
      } else {
        setBlogs(prev => prev.filter(b => b.id !== id));
      }
    }
  };

  // Action: Approve Public Feedback to Influencer Review
  const handlePromoteFeedback = async (f: UserFeedback) => {
    const updatedFeedback = { ...f, status: 'approved' };
    
    // 2. Format a new influencer review
    const influencerRev: CafeReview = {
      author: f.author,
      rating: f.rating,
      text: f.text,
      date: f.date,
      role: f.role || "Verified Cafe Influencer" // Promoted role to prevent spams
    };

    const targetCafe = cafes.find(c => c.id === f.cafeId);

    if (import.meta.env.VITE_FIREBASE_API_KEY) {
      await setDoc(doc(db, "feedbacks", f.id.toString()), updatedFeedback);
      if (targetCafe) {
        const updatedCafe = { ...targetCafe, userReviews: [...(targetCafe.userReviews || []), influencerRev] };
        await setDoc(doc(db, "cafes", targetCafe.id.toString()), updatedCafe);
      }
    } else {
      setFeedbacks(prev => prev.map(item => item.id === f.id ? updatedFeedback as UserFeedback : item));
      setCafes(prev => prev.map(c => {
        if (c.id === f.cafeId) {
          return {
            ...c,
            userReviews: [...(c.userReviews || []), influencerRev]
          };
        }
        return c;
      }));
    }

    alert(`Feedback Promoted! This is now published as a Verified Influencer Review on ${f.cafeName}.`);
  };

  // Action: Spam Flag Feedback
  const handleSpamFlagFeedback = async (id: number) => {
    const f = feedbacks.find(x => x.id === id);
    if (!f) return;
    const updated = { ...f, status: 'spam' };

    if (import.meta.env.VITE_FIREBASE_API_KEY) {
      await setDoc(doc(db, "feedbacks", id.toString()), updated);
    } else {
      setFeedbacks(prev => prev.map(item => item.id === id ? updated as UserFeedback : item));
    }
    alert("Feedback flagged as spam / locked out.");
  };

  const handleSaveSeoSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (import.meta.env.VITE_FIREBASE_API_KEY) {
      await setDoc(doc(db, "settings", "seo"), seoForm);
    } else {
      setSeoSettings(seoForm);
    }
    alert("🚀 SEO configurations, dynamic meta headers, and site trackers successfully updated!");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 space-y-8">
      {/* Admin header */}
      <div className="bg-stone-900 text-white rounded-lg p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-extrabold text-[10px] bg-white/10 px-2.5 py-1 rounded-sm tracking-widest uppercase font-mono">
              ★ OWNER PRIVILEGED WORKSPACE
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-stone-100">CafeTags Owner Center</h2>
          <p className="text-stone-400 text-xs font-sans max-w-xl">
            Authorize new cafes, publish editorial research columns, and audit spam logs to maintain structural accuracy.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2 bg-stone-800 p-1.5 rounded-md border border-stone-700 font-sans text-xs font-bold font-mono">
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2 rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'listings' ? 'bg-amber-600 text-white' : 'text-stone-300 hover:text-white'
            }`}
          >
            <MaterialIcon name="storefront" className="text-sm" />
            <span>CAFES</span>
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-4 py-2 rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'blogs' ? 'bg-amber-600 text-white' : 'text-stone-300 hover:text-white'
            }`}
          >
            <MaterialIcon name="newspaper" className="text-sm" />
            <span>BLOG COLUMNS</span>
          </button>
          <button
            onClick={() => setActiveTab('feedbacks')}
            className={`px-4 py-2 rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer relative ${
              activeTab === 'feedbacks' ? 'bg-amber-600 text-white' : 'text-stone-300 hover:text-white'
            }`}
          >
            <MaterialIcon name="verified_user" className="text-sm" />
            <span>VERIFY FEEDBACK</span>
            {feedbacks.filter(fb => fb.status === 'pending').length > 0 && (
              <span className="absolute -top-1.5 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {feedbacks.filter(fb => fb.status === 'pending').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`px-4 py-2 rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'seo' ? 'bg-amber-600 text-white' : 'text-stone-300 hover:text-white'
            }`}
          >
            <MaterialIcon name="search" className="text-sm" />
            <span>SEO SETTINGS</span>
          </button>
        </div>
      </div>

      {/* --- TAB 1: LISTINGS MANAGEMENT --- */}
      {activeTab === 'listings' && !editingCafe && !isAddingCafe && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-xl font-bold text-stone-950 italic">Home Listings Vault ({cafes.length})</h3>
            <div className="flex gap-3">
              <input type="file" accept=".csv" ref={fileInputRef} onChange={handleCafeCsvUpload} className="hidden" />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold tracking-wider uppercase px-4 py-3 rounded-md border border-stone-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <MaterialIcon name="upload_file" className="text-sm" />
                <span>BULK IMPORT CSV</span>
              </button>
              <button
                onClick={() => setIsAddingCafe(true)}
                className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold tracking-wider uppercase px-5 py-3 rounded-md shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <MaterialIcon name="add" className="text-sm" />
                <span>CATALOG NEW CAFE</span>
              </button>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-lg overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#FAF9F6] text-[#786F64] font-bold border-b border-stone-200">
                  <tr>
                    <th className="p-4 pl-6">Cafe Detail</th>
                    <th className="p-4">Geographic Area</th>
                    <th className="p-4">Curator Signature Beverage</th>
                    <th className="p-4">Established State</th>
                    <th className="p-4">Spotlights</th>
                    <th className="p-4 pr-6 text-right">Action Logs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {cafes.map(cafe => (
                    <tr key={cafe.id} className="hover:bg-amber-50/20 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <img src={cafe.image} alt={cafe.name} className="w-10 h-10 rounded-sm object-cover border border-stone-300" referrerPolicy="no-referrer" />
                          <div>
                            <span className="font-bold text-stone-900 block text-sm">{cafe.name}</span>
                            <span className="text-[10px] text-stone-500 block line-clamp-1">{cafe.address}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-stone-700">{cafe.area}</td>
                      <td className="p-4 italic text-stone-600 font-serif font-bold">{cafe.signature}</td>
                      <td className="p-4 font-mono text-stone-500">{cafe.founded} AD</td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-[10px] bg-amber-50 border border-amber-200 text-amber-950 px-2 py-0.5 rounded-sm font-bold max-w-max">
                          <MaterialIcon name="stars" className="text-xs text-amber-600" />
                          <span>{cafe.celebrities ? cafe.celebrities.length : 0} Celebs</span>
                        </div>
                      </td>
                      <td className="p-4 pr-6 text-right space-x-2">
                        <button
                          onClick={() => setEditingCafe(cafe)}
                          className="bg-stone-100 hover:bg-stone-200 text-stone-950 text-[11px] font-bold px-3 py-1.5 rounded-sm transition-colors cursor-pointer"
                        >
                          EDIT
                        </button>
                        <button
                          onClick={() => handleDeleteCafe(cafe.id)}
                          className="bg-red-50 hover:bg-red-100 text-red-700 text-[11px] font-bold px-3 py-1.5 rounded-sm transition-colors cursor-pointer"
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Adding/Editing Cafe Form */}
      {activeTab === 'listings' && (isAddingCafe || editingCafe) && (
        <CafeForm
          editingCafe={editingCafe}
          onSave={async (cafe: any) => {
            if (import.meta.env.VITE_FIREBASE_API_KEY) {
              await setDoc(doc(db, "cafes", cafe.id.toString()), cafe);
            } else {
              if (editingCafe) {
                setCafes(prev => prev.map(c => c.id === cafe.id ? cafe : c));
              } else {
                setCafes(prev => [cafe, ...prev]);
              }
            }
            setIsAddingCafe(false);
            setEditingCafe(null);
            alert("Cafe Spot successfully cataloged!");
          }}
          onCancel={() => { setIsAddingCafe(false); setEditingCafe(null); }}
        />
      )}

      {/* --- TAB 2: BLOG POSTS JOURNAL MANAGER --- */}
      {activeTab === 'blogs' && !editingBlog && !isAddingBlog && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-xl font-bold text-stone-950 italic">Journal Columns Vault ({blogs.length})</h3>
            <div className="flex gap-3">
              <input type="file" accept=".csv" ref={blogFileInputRef} onChange={handleBlogCsvUpload} className="hidden" />
              <button
                onClick={() => blogFileInputRef.current?.click()}
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold tracking-wider uppercase px-4 py-3 rounded-md border border-stone-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <MaterialIcon name="upload_file" className="text-sm" />
                <span>BULK IMPORT CSV</span>
              </button>
              <button
                onClick={() => setIsAddingBlog(true)}
                className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold tracking-wider uppercase px-5 py-3 rounded-md shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <MaterialIcon name="post_add" className="text-sm" />
                <span>PUBLISH NEW COLUMN</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map(blog => (
              <div key={blog.id} className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs flex flex-col justify-between hover:border-stone-400 transition-colors">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={blog.image} alt={blog.title} className="w-12 h-12 rounded-sm object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <span className="text-[10px] text-stone-400 font-extrabold uppercase tracking-widest block font-mono">{blog.date} • {blog.readTime}</span>
                      <h4 className="font-serif text-lg font-bold text-stone-900 leading-tight line-clamp-1">{blog.title}</h4>
                    </div>
                  </div>
                  <p className="text-stone-500 text-xs leading-relaxed line-clamp-2">{blog.excerpt}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-stone-100 flex justify-between items-center text-xs font-bold">
                  <span className="text-stone-500 font-semibold text-[11px]">By {blog.author}</span>
                  <div className="space-x-1.5">
                    <button
                      onClick={() => setEditingBlog(blog)}
                      className="bg-stone-100 hover:bg-stone-200 text-stone-950 text-[11px] px-3 py-1.5 rounded-sm transition-colors cursor-pointer"
                    >
                      EDIT TEXT
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-700 text-[11px] px-3 py-1.5 rounded-sm transition-colors cursor-pointer"
                    >
                      PURGE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Blog Form */}
      {activeTab === 'blogs' && (isAddingBlog || editingBlog) && (
        <form onSubmit={handleSaveBlog} className="bg-white border border-stone-200 rounded-lg p-6 md:p-8 space-y-5 shadow-sm">
          <div className="flex justify-between items-center border-b border-stone-200 pb-4">
            <h3 className="font-serif text-xl font-bold text-stone-950">
              {editingBlog ? `Modify Column: ${editingBlog.title}` : "Compose New Journal Column"}
            </h3>
            <button
              type="button"
              onClick={() => { setIsAddingBlog(false); setEditingBlog(null); }}
              className="text-stone-400 hover:text-stone-900 text-xs font-bold"
            >
              CANCEL
            </button>
          </div>

          <div className="space-y-4 text-xs font-sans">
            <div>
              <label className="block text-[#786F64] font-bold mb-1 uppercase tracking-wider">ARTICLE COLUMN TITLE</label>
              <input
                type="text"
                required
                value={editingBlog ? editingBlog.title : blogForm.title}
                onChange={e => editingBlog ? setEditingBlog({ ...editingBlog, title: e.target.value }) : setBlogForm({ ...blogForm, title: e.target.value })}
                className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:outline-none font-medium text-[#1C1C1E] text-sm"
                placeholder="The golden era of brews..."
              />
            </div>

            <div>
              <label className="block text-[#786F64] font-bold mb-1 uppercase tracking-wider">EXCERPT SNIPPET</label>
              <input
                type="text"
                required
                value={editingBlog ? editingBlog.excerpt : blogForm.excerpt}
                onChange={e => editingBlog ? setEditingBlog({ ...editingBlog, excerpt: e.target.value }) : setBlogForm({ ...blogForm, excerpt: e.target.value })}
                className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:outline-none font-medium text-[#1C1C1E]"
                placeholder="A brief preview shown in feed decks..."
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-[#786F64] font-bold mb-1 uppercase tracking-wider">COLUMN AUTHOR</label>
                <input
                  type="text"
                  required
                  value={editingBlog ? editingBlog.author : blogForm.author}
                  onChange={e => editingBlog ? setEditingBlog({ ...editingBlog, author: e.target.value }) : setBlogForm({ ...blogForm, author: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:outline-none font-medium text-[#1C1C1E]"
                />
              </div>
              <div>
                <label className="block text-[#786F64] font-bold mb-1 uppercase tracking-wider">READ TIME METRIC</label>
                <input
                  type="text"
                  required
                  value={editingBlog ? editingBlog.readTime : blogForm.readTime}
                  onChange={e => editingBlog ? setEditingBlog({ ...editingBlog, readTime: e.target.value }) : setBlogForm({ ...blogForm, readTime: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:outline-none font-medium text-[#1C1C1E]"
                  placeholder="e.g. 5 min read"
                />
              </div>
              <div>
                <label className="block text-[#786F64] font-bold mb-1 uppercase tracking-wider font-mono text-stone-500">COVER IMAGE URL</label>
                <input
                  type="text"
                  required
                  value={editingBlog ? editingBlog.image : blogForm.image}
                  onChange={e => editingBlog ? setEditingBlog({ ...editingBlog, image: e.target.value }) : setBlogForm({ ...blogForm, image: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#786F64] font-bold mb-1 uppercase tracking-wider">LONG ARTICLE CONTENT BODY</label>
              <textarea
                required
                rows={10}
                value={editingBlog ? editingBlog.content : blogForm.content}
                onChange={e => editingBlog ? setEditingBlog({ ...editingBlog, content: e.target.value }) : setBlogForm({ ...blogForm, content: e.target.value })}
                className="w-full bg-[#FAF9F6] border border-stone-200 p-4.5 rounded-lg focus:outline-none font-serif text-sm text-[#1C1C1E]"
                placeholder="Draft article columns utilizing Deccani terminology..."
              />
            </div>
          </div>

          <div className="pt-6 border-t border-stone-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => { setIsAddingBlog(false); setEditingBlog(null); }}
              className="px-6 py-2.5 rounded-md border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-bold font-mono tracking-wide cursor-pointer"
            >
              DISCARD
            </button>
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-2.5 rounded-md text-xs font-bold font-mono tracking-wide shadow-sm cursor-pointer"
            >
              PUBLISH JOURNAL COLUMN
            </button>
          </div>
        </form>
      )}

      {/* --- TAB 3: USER FEEDBACK VERIFICATION WORKFLOW --- */}
      {activeTab === 'feedbacks' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-950 italic">User Feedback Submissions Chamber</h3>
              <p className="text-stone-400 text-xs mt-1">
                To maintain CafeTags pristine quality, general community opinions are held in check here. Owners can promote them to official influencer reviews.
              </p>
            </div>
            <span className="bg-amber-900/15 text-amber-900 border border-amber-950/15 text-[10px] font-bold px-3 py-1 rounded-sm">
              Influencer Gatekeeper Active
            </span>
          </div>

          {feedbacks.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-stone-250 bg-white rounded-lg max-w-xl mx-auto shadow-3xs p-6">
              <MaterialIcon name="verified_user" className="text-5xl text-stone-300 mb-2" />
              <p className="font-serif text-lg text-stone-900 italic">Integrity logs are clean</p>
              <p className="text-stone-400 text-xs mt-1">No user feedback logs reside in the queue currently.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {feedbacks.map(f => (
                <div key={f.id} className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="space-y-3 max-w-2xl text-xs">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-bold text-stone-900 bg-[#FAF9F6] border border-stone-200 px-3 py-1 rounded-sm text-[13px]">{f.author}</span>
                      <span className="text-stone-400 font-semibold">•</span>
                      <span className="text-stone-500 font-bold uppercase tracking-wider font-mono text-[10px]">{f.email}</span>
                      <span className="text-stone-400 font-semibold">•</span>
                      <span className="bg-amber-500/10 text-amber-950 font-bold px-2.5 py-0.5 rounded-sm text-[10px] flex items-center gap-1 border border-amber-500/20">
                        <MaterialIcon name="stars" className="text-xs text-amber-600" />
                        <span>Target: {f.cafeName}</span>
                      </span>
                    </div>

                    <p className="text-stone-600 italic font-sans text-[12px] leading-relaxed">
                      "{f.text}"
                    </p>

                    <div className="flex items-center gap-3.5 text-stone-400 font-semibold text-[10px]">
                      <span className="flex items-center gap-0.5 text-amber-700">
                        Rating: <strong className="font-mono text-amber-900 text-[11px] ml-0.5">{f.rating}.0 / 5.0</strong>
                      </span>
                      <span>•</span>
                      <span>Submitted: {f.date}</span>
                      <span>•</span>
                      <span className="text-stone-500 font-bold flex items-center gap-1 uppercase">
                        State Status: 
                        {f.status === 'pending' && <span className="text-orange-600 font-extrabold bg-orange-50 px-2 py-0.5 rounded-sm border border-orange-200">Pending Review</span>}
                        {f.status === 'approved' && <span className="text-green-600 font-extrabold bg-green-50 px-2 py-0.5 rounded-sm border border-green-200">Promoted</span>}
                        {f.status === 'spam' && <span className="text-stone-600 font-extrabold bg-stone-100 px-2 py-0.5 rounded-sm border border-stone-200">Flagged Spam</span>}
                      </span>
                    </div>
                  </div>

                  {f.status === 'pending' && (
                    <div className="flex gap-2 w-full md:w-auto">
                      <button
                        onClick={() => handlePromoteFeedback(f)}
                        className="flex-1 md:flex-none bg-green-700 hover:bg-green-800 text-white text-[11px] font-bold px-4 py-2.5 rounded-md transition-colors flex items-center justify-center gap-1 cursor-pointer font-mono"
                      >
                        <MaterialIcon name="check" className="text-xs" />
                        <span>APPROVE & ESCALATE</span>
                      </button>
                      <button
                        onClick={() => handleSpamFlagFeedback(f.id)}
                        className="flex-1 md:flex-none bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-bold px-4 py-2.5 rounded-md transition-colors flex items-center justify-center gap-1 cursor-pointer font-mono"
                      >
                        <MaterialIcon name="block" className="text-xs" />
                        <span>SPAM DECLINE</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* --- TAB 4: SEO & INTEGRATION WORKSPACE --- */}
      {activeTab === 'seo' && (
        <form onSubmit={handleSaveSeoSettings} className="space-y-8 text-left animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-stone-200 pb-5">
            <div className="space-y-1">
              <h3 className="font-serif text-3xl font-normal text-stone-900 italic tracking-wide">SEO & Site Integrations</h3>
              <p className="text-stone-550 text-xs font-sans">
                Curate search result rankings, social media graph previews, and configure analytics with search console tags.
              </p>
            </div>
            
            <button
              type="submit"
              className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold tracking-widest uppercase px-6 py-3.5 rounded-md transition-all shadow-xs flex items-center gap-2 cursor-pointer border-none"
            >
              <MaterialIcon name="save" className="text-[16px]" />
              <span>COMMIT SEO CHANGES</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Fields Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Card 1: Core Site Settings */}
              <div className="bg-white border border-stone-200 rounded-lg p-6 md:p-8 space-y-5 shadow-3xs">
                <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
                  <MaterialIcon name="language" className="text-amber-700 text-xl" />
                  <h4 className="font-serif text-lg font-bold text-stone-900">Core Search Metadata</h4>
                </div>

                <div className="space-y-1">
                  <label className="block text-stone-500 font-extrabold text-[10px] tracking-widest uppercase">Website Title Template</label>
                  <p className="text-[#8C8375] text-[10px] leading-relaxed">Recommended 50–60 characters. Appears as the clickable headline in tab titles and search list headings.</p>
                  <input
                    type="text"
                    required
                    value={seoForm.websiteTitle}
                    onChange={e => setSeoForm({ ...seoForm, websiteTitle: e.target.value })}
                    className="w-full bg-[#FCFBF9] border border-stone-200 p-3 rounded-md focus:border-amber-600 focus:outline-none focus:bg-white text-stone-800 font-sans text-sm"
                    placeholder="e.g. My Website Title"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-stone-500 font-extrabold text-[10px] tracking-widest uppercase">Meta Description</label>
                  <p className="text-[#8C8375] text-[10px] leading-relaxed">Recommended 120–160 characters. A concise summary of your webpage content displayed by search engines.</p>
                  <textarea
                    required
                    rows={3}
                    value={seoForm.websiteDescription}
                    onChange={e => setSeoForm({ ...seoForm, websiteDescription: e.target.value })}
                    className="w-full bg-[#FCFBF9] border border-stone-200 p-3 rounded-md focus:border-amber-600 focus:outline-none focus:bg-white text-stone-800 font-sans text-sm leading-relaxed"
                    placeholder="Provide a description of the website content..."
                  />
                  <div className="text-right text-[10px] font-mono text-stone-400">
                    Characters: {seoForm.websiteDescription.length} (target: 120-160)
                  </div>
                </div>
              </div>

              {/* Card 2: Visual Assets Preview */}
              <div className="bg-white border border-stone-200 rounded-lg p-6 md:p-8 space-y-5 shadow-3xs">
                <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
                  <MaterialIcon name="image" className="text-amber-700 text-xl" />
                  <h4 className="font-serif text-lg font-bold text-stone-900">Brand Assets & Previews</h4>
                </div>

                <div className="space-y-1">
                  <label className="block text-stone-500 font-extrabold text-[10px] tracking-widest uppercase">Site Favicon Image Url</label>
                  <p className="text-[#8C8375] text-[10px] leading-relaxed font-sans">The small display icon shown on browser tabs next to your page title. Accepts transparent PNGs or static square images.</p>
                  <div className="flex gap-3">
                    <input
                      type="url"
                      value={seoForm.favicon}
                      onChange={e => setSeoForm({ ...seoForm, favicon: e.target.value })}
                      className="flex-1 bg-[#FCFBF9] border border-stone-200 p-3 rounded-md focus:border-amber-600 focus:outline-none focus:bg-white text-stone-800 font-sans text-sm"
                      placeholder="https://..."
                    />
                    <div className="w-12 h-12 rounded-md bg-stone-150 border border-stone-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {seoForm.favicon ? (
                        <img src={seoForm.favicon} className="w-8 h-8 object-contain" alt="Favicon preview" referrerPolicy="no-referrer" />
                      ) : (
                        <MaterialIcon name="broken_image" className="text-sm text-stone-300" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-stone-500 font-extrabold text-[10px] tracking-widest uppercase">Social Preview (OG / Share Image) Url</label>
                  <p className="text-[#8C8375] text-[10px] leading-relaxed">The high-impact promotional image displayed when your application is shared on messaging platforms, Twitter, or LinkedIn.</p>
                  <input
                    type="url"
                    value={seoForm.socialImage}
                    onChange={e => setSeoForm({ ...seoForm, socialImage: e.target.value })}
                    className="w-full bg-[#FCFBF9] border border-stone-200 p-3 rounded-md focus:border-amber-600 focus:outline-none focus:bg-white text-stone-800 font-sans text-sm"
                    placeholder="https://..."
                  />
                  <div className="grid grid-cols-4 gap-2.5 pt-1.5">
                    {[
                      { label: "Espresso House", url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600&auto=format&fit=crop" },
                      { label: "Pour Over Glass", url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop" },
                      { label: "Cozy Study Desk", url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop" },
                      { label: "Brutalist Workspace", url: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=600&auto=format&fit=crop" }
                    ].map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSeoForm({ ...seoForm, socialImage: preset.url })}
                        className={`text-[9px] font-sans font-extrabold uppercase py-1 px-2 border rounded-sm transition-colors cursor-pointer text-left truncate ${
                          seoForm.socialImage === preset.url
                            ? "bg-amber-600 text-white border-amber-600"
                            : "bg-stone-50 text-stone-550 border-stone-200 hover:bg-stone-100"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 3: Google Site Connections */}
              <div className="bg-white border border-stone-200 rounded-lg p-6 md:p-8 space-y-5 shadow-3xs">
                <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
                  <MaterialIcon name="analytics" className="text-amber-700 text-xl" />
                  <h4 className="font-serif text-lg font-bold text-stone-900">Google Engine Integrations</h4>
                </div>

                <div className="space-y-1">
                  <label className="block text-stone-500 font-extrabold text-[10px] tracking-widest uppercase flex items-center gap-1.5">
                    <span>Google Analytics Measurement ID</span>
                    <strong className="text-[9px] font-mono font-bold bg-[#FAF9F6] border border-stone-200 px-1.5 py-0.5 rounded-sm text-amber-900">G-XXXXXXXXXX</strong>
                  </label>
                  <p className="text-[#8C8375] text-[10px] leading-relaxed">Connect your site to track live traffic telemetry, active user click paths, and session statistics securely.</p>
                  <input
                    type="text"
                    value={seoForm.googleAnalyticsId}
                    onChange={e => setSeoForm({ ...seoForm, googleAnalyticsId: e.target.value })}
                    className="w-full bg-[#FCFBF9] border border-stone-200 p-3 rounded-md focus:border-amber-600 focus:outline-none focus:bg-white text-stone-800 font-sans text-sm focus:border-amber-600"
                    placeholder="e.g. G-B2LKNRE3W7"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-stone-500 font-extrabold text-[10px] tracking-widest uppercase">Google Search Console Verification Token</label>
                  <p className="text-[#8C8375] text-[10px] leading-relaxed">Verify domain ownership of your Lookbook to optimize page rankings, request immediate indexation, and review crawling errors.</p>
                  <input
                    type="text"
                    value={seoForm.googleSearchConsoleToken}
                    onChange={e => setSeoForm({ ...seoForm, googleSearchConsoleToken: e.target.value })}
                    className="w-full bg-[#FCFBF9] border border-stone-200 p-3 rounded-md focus:border-amber-600 focus:outline-none focus:bg-white text-stone-800 font-sans text-sm focus:border-amber-600"
                    placeholder="e.g. google-site-verification-token-string"
                  />
                </div>
              </div>
            </div>

            {/* Simulated Live Previews Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Preview 1: Google SERP Preview Card */}
              <div className="bg-[#FAF9F6] border border-stone-200 rounded-lg p-6 shadow-3xs space-y-4">
                <div className="flex items-center gap-1.5 pb-2 border-b border-stone-200/60 justify-between">
                  <span className="text-[10px] tracking-wider uppercase font-bold text-stone-400 font-sans flex items-center gap-1">
                    <MaterialIcon name="visibility" className="text-xs" />
                    Google Search Listing Preview
                  </span>
                  <span className="text-[9px] font-mono font-bold bg-[#FAF7F2] border border-stone-300 px-2 py-0.5 rounded-sm text-stone-500">
                    Live Simulator
                  </span>
                </div>

                <div className="space-y-1.5 bg-white p-4.5 border border-stone-150 rounded-md max-w-full overflow-hidden">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center">
                      <img 
                        src={seoForm.favicon || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=128&auto=format&fit=crop&q=80"} 
                        className="w-4 h-4 object-contain rounded-sm" 
                        alt="favicon icon"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="text-left font-sans">
                      <p className="text-[11px] text-stone-800 font-semibold leading-none">CafeTags Hyderabad</p>
                      <p className="text-[10px] text-stone-400 leading-none truncate mt-0.5">https://coffeetags.in/hyd</p>
                    </div>
                  </div>
                  
                  <h5 className="text-left text-[#1a0dab] hover:underline font-sans text-lg font-normal cursor-pointer leading-tight line-clamp-1">
                    {seoForm.websiteTitle || "Curated Specialty Coffee Corner Logs"}
                  </h5>

                  <p className="text-left text-[#4d5156] font-sans text-xs leading-relaxed line-clamp-2">
                    {seoForm.websiteDescription || "No website description supplied yet. Provide custom details to represent your lookbook properly in modern crawlers."}
                  </p>
                </div>
              </div>

              {/* Preview 2: Social Card Preview */}
              <div className="bg-[#FAF9F6] border border-stone-200 rounded-lg p-6 shadow-3xs space-y-4">
                <div className="flex items-center gap-1.5 pb-2 border-b border-stone-200/60 justify-between">
                  <span className="text-[10px] tracking-wider uppercase font-bold text-stone-400 font-sans flex items-center gap-1">
                    <MaterialIcon name="share" className="text-xs" />
                    Rich Shared card preview
                  </span>
                  <span className="text-[9px] font-mono font-bold bg-[#FAF7F2] border border-stone-300 px-2 py-0.5 rounded-sm text-stone-500">
                    Facebook/Slack Shared Card
                  </span>
                </div>

                <div className="bg-white border border-[#E1E8ED] rounded-md overflow-hidden text-left max-w-full">
                  <div className="aspect-[1.91/1] w-full bg-stone-100 flex items-center justify-center overflow-hidden border-b border-[#E1E8ED]">
                    {seoForm.socialImage ? (
                      <img src={seoForm.socialImage} className="w-full h-full object-cover" alt="site card visual" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="p-4 text-center text-stone-300 font-serif italic text-xs">
                        Specify a social preview image to promote your curations visually
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-1 font-sans">
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest font-extrabold mt-1">COFFEETAGS.IN</p>
                    <h6 className="text-[14px] font-bold text-stone-900 leading-snug line-clamp-1">{seoForm.websiteTitle}</h6>
                    <p className="text-[12px] text-[#657786] leading-relaxed line-clamp-2">{seoForm.websiteDescription}</p>
                  </div>
                </div>
              </div>

              {/* Connected Insights Analytics Panel */}
              <div className="bg-[#FAF9F6] border border-stone-200 rounded-lg p-6 shadow-3xs space-y-4">
                <div className="flex items-center gap-1.5 pb-2 border-b border-stone-200/60">
                  <MaterialIcon name="show_chart" className="text-amber-700 text-lg" />
                  <span className="text-[10px] tracking-wider uppercase font-bold text-stone-700 font-sans">
                    TELEMETRY & INDEXING METRICS
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="bg-white border border-stone-200 rounded-md p-3 text-left">
                    <span className="text-stone-400 text-[8px] uppercase font-bold tracking-wider">Search Impressions</span>
                    <p className="text-lg font-bold text-stone-900 mt-0.5">24.8K</p>
                    <span className="text-[8px] text-green-600 font-extrabold flex items-center gap-0.5 leading-none mt-1">
                      <MaterialIcon name="arrow_upward" className="text-[9px]" /> +18.2% MoM
                    </span>
                  </div>
                  <div className="bg-white border border-stone-200 rounded-md p-3 text-left">
                    <span className="text-stone-400 text-[8px] uppercase font-bold tracking-wider">Average CTR</span>
                    <p className="text-lg font-bold text-stone-900 mt-0.5">8.4%</p>
                    <span className="text-[8px] text-green-600 font-extrabold flex items-center gap-0.5 leading-none mt-1">
                      <MaterialIcon name="arrow_upward" className="text-[9px]" /> +2.1% MoM
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-stone-200 p-3.5 rounded-md text-left space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-[#8C8375] font-extrabold uppercase">Top Ranking Impressions (Search Console)</span>
                    <span className="font-bold text-stone-400 font-mono">Rank</span>
                  </div>
                  <div className="space-y-1.5 text-[11.5px] font-sans">
                    <div className="flex justify-between border-b border-dashed border-stone-100 pb-1 text-stone-800">
                      <span>1. &quot;best specialty coffee hyd&quot;</span>
                      <strong className="text-amber-800"># 1.2</strong>
                    </div>
                    <div className="flex justify-between border-b border-dashed border-stone-100 pb-1 text-stone-800">
                      <span>2. &quot;quiet study cafes jubilee hills&quot;</span>
                      <strong className="text-amber-800"># 2.8</strong>
                    </div>
                    <div className="flex justify-between pb-1 text-stone-800">
                      <span>3. &quot;true black coffee hyderabad rating&quot;</span>
                      <strong className="text-amber-800"># 1.1</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
