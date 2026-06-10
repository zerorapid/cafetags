import React, { useState } from 'react';
import { Cafe, BlogArticle, UserFeedback, CafeMenuItem, CafeReview, SeoSettings } from '../types';
import { MaterialIcon } from './MaterialIcon';

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
  
  // Listing forms state
  const [editingCafe, setEditingCafe] = useState<Cafe | null>(null);
  const [isAddingCafe, setIsAddingCafe] = useState(false);

  // Blog forms state
  const [editingBlog, setEditingBlog] = useState<BlogArticle | null>(null);
  const [isAddingBlog, setIsAddingBlog] = useState(false);

  // New Listing Template
  const [cafeForm, setCafeForm] = useState<Omit<Cafe, 'id'>>({
    name: '',
    area: '',
    tags: [],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
    vibe: '',
    mapLink: '',
    icon: 'local_cafe',
    signature: '',
    founded: '2026',
    address: 'Hyderabad, Telangana',
    phone: '',
    email: '',
    website: '',
    timings: '8:00 AM - 10:00 PM Everyday',
    aestheticType: '',
    crowd: '',
    discounts: '',
    facilities: ['Wi-Fi', 'Power Outlets'],
    dineIn: true,
    takeaway: true,
    onlineOrder: true,
    selfDelivery: false,
    celebrities: [],
    bookingUrl: 'https://www.swiggy.com/dineout/hyderabad',
    featuredMenu: [
      { name: 'Signature Brew', price: '₹180', category: 'Brews', isSpecial: true }
    ],
    userReviews: [],
    isFeaturedBanner: false,
    bannerCatchyLine: '',
    isNewLaunch: false,
    newLaunchCatchyline: ''
  });

  // Tag Input Helpers
  const [tagInput, setTagInput] = useState('');
  const [facilityInput, setFacilityInput] = useState('');
  const [celebrityInput, setCelebrityInput] = useState('');

  // SEO Setup Form State
  const [seoForm, setSeoForm] = useState<SeoSettings>({
    websiteTitle: seoSettings.websiteTitle,
    websiteDescription: seoSettings.websiteDescription,
    favicon: seoSettings.favicon,
    socialImage: seoSettings.socialImage,
    googleAnalyticsId: seoSettings.googleAnalyticsId,
    googleSearchConsoleToken: seoSettings.googleSearchConsoleToken
  });

  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    setSeoSettings(seoForm);
    alert("🚀 SEO configurations, dynamic meta headers, and site trackers successfully updated!");
  };

  // MenuItem helper
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Brews');
  const [newItemIsSpecial, setNewItemIsSpecial] = useState(false);
  const [newItemImage, setNewItemImage] = useState('');

  // Gallery image helper
  const [newGalleryImage, setNewGalleryImage] = useState('');

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

  // Action: Save Cafe
  const handleSaveCafe = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCafe) {
      setCafes(prev => prev.map(c => c.id === editingCafe.id ? { ...editingCafe } : c));
      setEditingCafe(null);
      alert("Cafe changes successfully synchronized!");
    } else {
      const newCafe: Cafe = {
        ...cafeForm as Cafe,
        id: Date.now()
      };
      setCafes(prev => [newCafe, ...prev]);
      setIsAddingCafe(false);
      // Reset
      setCafeForm({
        name: '',
        area: '',
        tags: [],
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
        vibe: '',
        mapLink: '',
        icon: 'local_cafe',
        signature: '',
        founded: '2026',
        address: 'Hyderabad, Telangana',
        phone: '',
        email: '',
        website: '',
        timings: '8:00 AM - 10:00 PM Everyday',
        aestheticType: '',
        crowd: '',
        discounts: '',
        facilities: ['Wi-Fi', 'Power Outlets'],
        dineIn: true,
        takeaway: true,
        onlineOrder: true,
        selfDelivery: false,
        celebrities: [],
        bookingUrl: 'https://www.swiggy.com/dineout/hyderabad',
        featuredMenu: [
          { name: 'Signature Brew', price: '₹180', category: 'Brews', isSpecial: true }
        ],
        userReviews: [],
        isFeaturedBanner: false,
        bannerCatchyLine: '',
        isNewLaunch: false,
        newLaunchCatchyline: ''
      });
      alert("New Cafe Spot successfully cataloged!");
    }
  };

  // Action: Delete Cafe
  const handleDeleteCafe = (id: number) => {
    if (confirm("Are you sure you would like to permanently purge this cafe listing? Regular users have no access to delete details.")) {
      setCafes(prev => prev.filter(c => c.id !== id));
    }
  };

  // Action: Save Blog
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBlog) {
      setBlogs(prev => prev.map(b => b.id === editingBlog.id ? { ...editingBlog } : b));
      setEditingBlog(null);
      alert("Blog article content successfully updated!");
    } else {
      const newBlog: BlogArticle = {
        ...blogForm,
        id: Date.now()
      };
      setBlogs(prev => [newBlog, ...prev]);
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
  const handleDeleteBlog = (id: number) => {
    if (confirm("Are you sure you want to permanently delete this journal article?")) {
      setBlogs(prev => prev.filter(b => b.id !== id));
    }
  };

  // Action: Approve Public Feedback to Influencer Review
  const handlePromoteFeedback = (f: UserFeedback) => {
    // 1. Mark feedback as approved
    setFeedbacks(prev => prev.map(item => item.id === f.id ? { ...item, status: 'approved' } : item));
    
    // 2. Format a new influencer review
    const influencerRev: CafeReview = {
      author: f.author,
      rating: f.rating,
      text: f.text,
      date: f.date,
      role: f.role || "Verified Cafe Influencer" // Promoted role to prevent spams
    };

    // 3. Append to the targeted Cafe
    setCafes(prev => prev.map(c => {
      if (c.id === f.cafeId) {
        return {
          ...c,
          userReviews: [...(c.userReviews || []), influencerRev]
        };
      }
      return c;
    }));

    alert(`Feedback Promoted! This is now published as a Verified Influencer Review on ${f.cafeName}.`);
  };

  // Action: Spam Flag Feedback
  const handleSpamFlagFeedback = (id: number) => {
    setFeedbacks(prev => prev.map(item => item.id === id ? { ...item, status: 'spam' } : item));
    alert("Feedback flagged as spam / locked out.");
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
            <button
              onClick={() => setIsAddingCafe(true)}
              className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold tracking-wider uppercase px-5 py-3 rounded-md shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <MaterialIcon name="add" className="text-sm" />
              <span>CATALOG NEW CAFE</span>
            </button>
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
      {(isAddingCafe || editingCafe) && (
        <form 
          onSubmit={handleSaveCafe} 
          className="bg-white border border-stone-200 rounded-lg p-6 md:p-8 space-y-8 shadow-sm text-left font-sans text-xs animate-fade-in"
        >
          {/* Header Title Bar */}
          <div className="flex justify-between items-center border-b border-stone-200 pb-4">
            <div className="space-y-1">
              <span className="text-[9px] bg-amber-100 text-amber-900 border border-amber-300 font-extrabold px-2.5 py-0.5 rounded-sm uppercase tracking-widest font-mono">
                {editingCafe ? "MODIFYING EXISTED LOG" : "DRAFTING FRESH CURATION"}
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-950">
                {editingCafe ? `Modify Listing: ${editingCafe.name}` : "Catalog New Fine Coffee Spot"}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => { setIsAddingCafe(false); setEditingCafe(null); }}
              className="text-[#8C8375] hover:text-stone-900 text-xs font-bold bg-[#FAF9F6] border border-stone-250 px-3 py-2 rounded-md hover:bg-stone-50 transition-colors"
            >
              DISCARD CHANGES
            </button>
          </div>

          {/* SECTION 1: REGISTRY & CORE DETAILS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
              <MaterialIcon name="info" className="text-amber-800 text-base" />
              <h4 className="font-serif text-[15px] font-bold text-stone-900">1. Registry Identity & Coordinates</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-[#786F64] font-extrabold mb-1.5 uppercase tracking-wide">CAFE NAME *</label>
                <input
                  type="text"
                  required
                  value={editingCafe ? editingCafe.name : cafeForm.name}
                  onChange={e => editingCafe ? setEditingCafe({ ...editingCafe, name: e.target.value }) : setCafeForm({ ...cafeForm, name: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:border-stone-900 focus:bg-white focus:outline-none font-medium text-[#1C1C1E]"
                  placeholder="e.g. True Black Specialty Coffee"
                />
              </div>

              <div>
                <label className="block text-[#786F64] font-extrabold mb-1.5 uppercase tracking-wide">DISTRICT AREA *</label>
                <select
                  required
                  value={editingCafe ? editingCafe.area : cafeForm.area}
                  onChange={e => editingCafe ? setEditingCafe({ ...editingCafe, area: e.target.value }) : setCafeForm({ ...cafeForm, area: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:border-stone-900 focus:bg-white focus:outline-none font-medium text-[#1C1C1E] cursor-pointer"
                >
                  <option value="">-- SELECT GEOGRAPHY --</option>
                  <option value="Banjara Hills">Banjara Hills</option>
                  <option value="Charminar">Charminar (Old City)</option>
                  <option value="Film Nagar">Film Nagar</option>
                  <option value="Financial District">Financial District</option>
                  <option value="Gachibowli">Gachibowli</option>
                  <option value="Jubilee Hills">Jubilee Hills</option>
                  <option value="Madhapur">Madhapur</option>
                  <option value="Begumpet">Begumpet</option>
                  <option value="Secunderabad">Secunderabad</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#786F64] font-extrabold mb-1.5 uppercase tracking-wide">ESTABLISHED YEAR *</label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={editingCafe ? editingCafe.founded : cafeForm.founded}
                    onChange={e => editingCafe ? setEditingCafe({ ...editingCafe, founded: e.target.value }) : setCafeForm({ ...cafeForm, founded: e.target.value })}
                    className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:border-stone-900 focus:bg-white focus:outline-none font-mono text-[#1C1C1E] text-center"
                    placeholder="e.g. 2026"
                  />
                </div>
                <div>
                  <label className="block text-[#786F64] font-extrabold mb-1.5 uppercase tracking-wide font-sans">PORTAL BRAND ICON *</label>
                  <select
                    required
                    value={editingCafe ? editingCafe.icon : cafeForm.icon}
                    onChange={e => editingCafe ? setEditingCafe({ ...editingCafe, icon: e.target.value }) : setCafeForm({ ...cafeForm, icon: e.target.value })}
                    className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:border-stone-900 focus:bg-white focus:outline-none font-medium text-[#1C1C1E] cursor-pointer"
                  >
                    <option value="local_cafe">Cafe (Mug)</option>
                    <option value="coffee_maker">Brew Siphon</option>
                    <option value="restaurant">Dining Fork/Knife</option>
                    <option value="yard">Yard Garden</option>
                    <option value="storefront">Historic facade</option>
                    <option value="architecture">Modern Pavilion</option>
                    <option value="local_library">Quiet Cozy Book</option>
                    <option value="table_restaurant">Cozy study table</option>
                    <option value="park">Leafy Ivy Tree</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[#786F64] font-extrabold mb-1.5 uppercase tracking-wide">STREET ADDRESS *</label>
                <input
                  type="text"
                  required
                  value={editingCafe ? editingCafe.address : cafeForm.address}
                  onChange={e => editingCafe ? setEditingCafe({ ...editingCafe, address: e.target.value }) : setCafeForm({ ...cafeForm, address: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:border-stone-900 focus:bg-white focus:outline-none font-medium text-[#1C1C1E]"
                  placeholder="Full physical street delivery coordinate details"
                />
              </div>

              <div>
                <label className="block text-[#786F64] font-extrabold mb-1.5 uppercase tracking-wide">MAPS DEEP LINK (app.goo.gl)</label>
                <input
                  type="url"
                  value={editingCafe ? editingCafe.mapLink : cafeForm.mapLink}
                  onChange={e => editingCafe ? setEditingCafe({ ...editingCafe, mapLink: e.target.value }) : setCafeForm({ ...cafeForm, mapLink: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:border-stone-900 focus:bg-white focus:outline-none font-medium text-[#1C1C1E]"
                  placeholder="https://maps.app.goo.gl/..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-[#786F64] font-extrabold mb-1.5 uppercase tracking-wide">PHONE DIRECT LINE</label>
                <input
                  type="text"
                  value={(editingCafe ? editingCafe.phone : cafeForm.phone) || ''}
                  onChange={e => editingCafe ? setEditingCafe({ ...editingCafe, phone: e.target.value }) : setCafeForm({ ...cafeForm, phone: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:border-stone-900 focus:bg-white focus:outline-none font-medium text-[#1C1C1E]"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label className="block text-[#786F64] font-extrabold mb-1.5 uppercase tracking-wide">RESERVATION EMAIL</label>
                <input
                  type="email"
                  value={(editingCafe ? editingCafe.email : cafeForm.email) || ''}
                  onChange={e => editingCafe ? setEditingCafe({ ...editingCafe, email: e.target.value }) : setCafeForm({ ...cafeForm, email: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:border-stone-900 focus:bg-white focus:outline-none font-medium text-[#1C1C1E]"
                  placeholder="desk@cafe.co"
                />
              </div>
              <div>
                <label className="block text-[#786F64] font-extrabold mb-1.5 uppercase tracking-wide">OFFICIAL WEBSITE</label>
                <input
                  type="url"
                  value={(editingCafe ? editingCafe.website : cafeForm.website) || ''}
                  onChange={e => editingCafe ? setEditingCafe({ ...editingCafe, website: e.target.value }) : setCafeForm({ ...cafeForm, website: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:border-stone-900 focus:bg-white focus:outline-none font-medium text-[#1C1C1E]"
                  placeholder="https://cafe.co"
                />
              </div>
              <div>
                <label className="block text-[#786F64] font-extrabold mb-1.5 uppercase tracking-wide">DINE-OUT TIMINGS</label>
                <input
                  type="text"
                  required
                  value={(editingCafe ? editingCafe.timings : cafeForm.timings) || ''}
                  onChange={e => editingCafe ? setEditingCafe({ ...editingCafe, timings: e.target.value }) : setCafeForm({ ...cafeForm, timings: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:border-stone-900 focus:bg-white focus:outline-none font-medium text-[#1C1C1E]"
                  placeholder="10:00 AM - 11:00 PM Everyday"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: BRAND IDENTITY & CORE MEDIA */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
              <MaterialIcon name="palette" className="text-amber-800 text-base" />
              <h4 className="font-serif text-[15px] font-bold text-stone-900">2. Aesthetic Persona, Media & Spotlights</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Vibe and description column */}
              <div className="md:col-span-8 space-y-4">
                <div>
                  <label className="block text-[#786F64] font-extrabold mb-1.5 uppercase tracking-wide">AESTHETIC DESIGNS ARCHETYPE *</label>
                  <input
                    type="text"
                    required
                    value={(editingCafe ? editingCafe.aestheticType : cafeForm.aestheticType) || ''}
                    onChange={e => editingCafe ? setEditingCafe({ ...editingCafe, aestheticType: e.target.value }) : setCafeForm({ ...cafeForm, aestheticType: e.target.value })}
                    className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:border-stone-900 focus:bg-white focus:outline-none font-serif text-[13px] text-[#1C1C1E]"
                    placeholder="e.g. Scandi Wabi-Sabi & Acoustic Cedar Timber, Industrial Glasshouse"
                  />
                </div>

                <div>
                  <label className="block text-[#786F64] font-extrabold mb-1.5 uppercase tracking-wide">AESTHETIC VIBE ANALYSIS (WRITEUP) *</label>
                  <textarea
                    required
                    rows={4}
                    value={editingCafe ? editingCafe.vibe : cafeForm.vibe}
                    onChange={e => editingCafe ? setEditingCafe({ ...editingCafe, vibe: e.target.value }) : setCafeForm({ ...cafeForm, vibe: e.target.value })}
                    className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:border-stone-900 focus:bg-white focus:outline-none font-serif text-[13px] leading-relaxed text-[#1C1C1E]"
                    placeholder="Describe the architectural texture, shadows, study desk comfort, lighting temperature, soundscapes, and work acoustics..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#786F64] font-extrabold mb-1.5 uppercase tracking-wide">TARGET SPOT CROWD / AUDIENCE</label>
                    <input
                      type="text"
                      value={(editingCafe ? editingCafe.crowd : cafeForm.crowd) || ''}
                      onChange={e => editingCafe ? setEditingCafe({ ...editingCafe, crowd: e.target.value }) : setCafeForm({ ...cafeForm, crowd: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:border-stone-900 focus:bg-white focus:outline-none font-medium text-[#1C1C1E]"
                      placeholder="e.g. Writers, researchers, high-performance builders"
                    />
                  </div>
                  <div>
                    <label className="block text-[#786F64] font-extrabold mb-1.5 uppercase tracking-wide">PRIVILEGE OFFERS / CODES</label>
                    <input
                      type="text"
                      value={(editingCafe ? editingCafe.discounts : cafeForm.discounts) || ''}
                      onChange={e => editingCafe ? setEditingCafe({ ...editingCafe, discounts: e.target.value }) : setCafeForm({ ...cafeForm, discounts: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:border-stone-900 focus:bg-white focus:outline-none font-medium text-[#1C1C1E]"
                      placeholder="e.g. Complimentary biscotti with brews, Flat 10% for members"
                    />
                  </div>
                </div>
              </div>

              {/* Cover picture and media preview column */}
              <div className="md:col-span-4 space-y-4">
                <div>
                  <label className="block text-[#786F64] font-extrabold mb-1 uppercase tracking-wide">CARD COVER IMAGE *</label>
                  <p className="text-[10px] text-stone-400 mb-1.5 leading-tight">Attach lookbook main background. Supports physical files or direct remote URLs.</p>
                  
                  {/* File Upload Zone */}
                  <div className="border-2 border-dashed border-stone-250 hover:border-stone-400 rounded-md p-3 text-center bg-[#FAF9F6] transition-colors relative min-h-[90px] flex flex-col justify-center items-center">
                    <MaterialIcon name="upload_file" className="text-xl text-stone-400 mb-1" />
                    <span className="text-[10px] font-bold text-stone-600 block">Drag & drop or Click to Upload</span>
                    <span className="text-[8px] text-stone-400 block mt-0.5">JPEG/PNG converter</span>
                    <input 
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const b64 = reader.result as string;
                            if (editingCafe) {
                              setEditingCafe({ ...editingCafe, image: b64 });
                            } else {
                              setCafeForm({ ...cafeForm, image: b64 });
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>

                  <div className="mt-2 text-stone-gray font-mono text-[10px]">
                    <span className="font-bold text-[#786F64] block mb-1">IMAGE SOURCE LINK ADDRESS:</span>
                    <input
                      type="text"
                      required
                      value={editingCafe ? editingCafe.image : cafeForm.image}
                      onChange={e => editingCafe ? setEditingCafe({ ...editingCafe, image: e.target.value }) : setCafeForm({ ...cafeForm, image: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-stone-200 p-2 rounded-sm focus:border-stone-900 focus:outline-none font-mono text-[9px]"
                    />
                  </div>

                  {/* Immediate micro preview frame */}
                  <div className="w-full aspect-[16/10] bg-stone-100 border border-stone-250 rounded-md overflow-hidden relative mt-2 flex items-center justify-center">
                    {(editingCafe ? editingCafe.image : cafeForm.image) ? (
                      <img 
                        src={editingCafe ? editingCafe.image : cafeForm.image} 
                        alt="Hero preview" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="p-4 text-center text-[10px] text-stone-400">
                        No background attached
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-[#786F64] font-extrabold mb-1.5 uppercase tracking-wide">SIGNATURE MASTER BREW *</label>
                <input
                  type="text"
                  required
                  value={editingCafe ? editingCafe.signature : cafeForm.signature}
                  onChange={e => editingCafe ? setEditingCafe({ ...editingCafe, signature: e.target.value }) : setCafeForm({ ...cafeForm, signature: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:border-stone-900 focus:bg-white focus:outline-none font-medium text-[#1C1C1E]"
                  placeholder="e.g. Kyoto 12-hr Slow Drip Coffee"
                />
              </div>

              <div>
                <label className="block text-[#786F64] font-extrabold mb-1.5 uppercase tracking-wide">YOUTUBE TEASER EMBED URL</label>
                <input
                  type="url"
                  value={(editingCafe ? editingCafe.videoUrl : cafeForm.videoUrl) || ''}
                  onChange={e => editingCafe ? setEditingCafe({ ...editingCafe, videoUrl: e.target.value }) : setCafeForm({ ...cafeForm, videoUrl: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:border-stone-900 focus:bg-white focus:outline-none font-medium text-[#1C1C1E]"
                  placeholder="https://www.youtube.com/embed/..."
                />
              </div>

              <div>
                <label className="block text-[#786F64] font-extrabold mb-1.5 uppercase tracking-wide">SWIGGY/DINEOUT BOOKING LINK</label>
                <input
                  type="url"
                  value={(editingCafe ? editingCafe.bookingUrl : cafeForm.bookingUrl) || ''}
                  onChange={e => editingCafe ? setEditingCafe({ ...editingCafe, bookingUrl: e.target.value }) : setCafeForm({ ...cafeForm, bookingUrl: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:border-stone-900 focus:bg-white focus:outline-none font-medium text-[#1C1C1E]"
                  placeholder="e.g. Swiggy reservations deep link URL"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#786F64] font-extrabold mb-1.5 uppercase tracking-wide">NAVIGATION / DIRECTIONS INSIGHT TIP</label>
              <textarea
                rows={2}
                value={(editingCafe ? editingCafe.directionsTip : cafeForm.directionsTip) || ''}
                onChange={e => editingCafe ? setEditingCafe({ ...editingCafe, directionsTip: e.target.value }) : setCafeForm({ ...cafeForm, directionsTip: e.target.value })}
                className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:border-stone-900 focus:bg-white focus:outline-none font-mono text-[11px]"
                placeholder="Give readers a quick local hint on arrival (e.g. Take the service lane adjacent to the pillar C12, look for the pink wooden gate...)"
              />
            </div>
          </div>

          {/* SECTION 3: OPERATIONS & VERIFIED SPOTLIGHT FEATURES */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
              <MaterialIcon name="storefront" className="text-amber-800 text-base" />
              <h4 className="font-serif text-[15px] font-bold text-stone-900">3. Operational Modalities & Services</h4>
            </div>

            {/* Service delivery toggle tags */}
            <div className="p-4.5 bg-[#FAF9F6]/80 rounded-md border border-stone-200 space-y-3">
              <span className="block text-[#786F64] text-[10px] tracking-wider font-extrabold uppercase">AVAILABLE SERVICES MODALITY</span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-stone-800">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={editingCafe ? !!editingCafe.dineIn : !!cafeForm.dineIn}
                    onChange={e => {
                      const v = e.target.checked;
                      editingCafe ? setEditingCafe({ ...editingCafe, dineIn: v }) : setCafeForm({ ...cafeForm, dineIn: v });
                    }}
                    className="w-4.5 h-4.5 accent-amber-600 rounded-sm cursor-pointer"
                  />
                  <span>Dine-In Space</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={editingCafe ? !!editingCafe.takeaway : !!cafeForm.takeaway}
                    onChange={e => {
                      const v = e.target.checked;
                      editingCafe ? setEditingCafe({ ...editingCafe, takeaway: v }) : setCafeForm({ ...cafeForm, takeaway: v });
                    }}
                    className="w-4.5 h-4.5 accent-amber-600 rounded-sm cursor-pointer"
                  />
                  <span>Takeaway Ready</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={editingCafe ? !!editingCafe.onlineOrder : !!cafeForm.onlineOrder}
                    onChange={e => {
                      const v = e.target.checked;
                      editingCafe ? setEditingCafe({ ...editingCafe, onlineOrder: v }) : setCafeForm({ ...cafeForm, onlineOrder: v });
                    }}
                    className="w-4.5 h-4.5 accent-amber-600 rounded-sm cursor-pointer"
                  />
                  <span>Online/App Ordering</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={editingCafe ? !!editingCafe.selfDelivery : !!cafeForm.selfDelivery}
                    onChange={e => {
                      const v = e.target.checked;
                      editingCafe ? setEditingCafe({ ...editingCafe, selfDelivery: v }) : setCafeForm({ ...cafeForm, selfDelivery: v });
                    }}
                    className="w-4.5 h-4.5 accent-amber-600 rounded-sm cursor-pointer"
                  />
                  <span>Self Home Delivery</span>
                </label>
              </div>
            </div>

            {/* Banner featuring and newly launched toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
              {/* Feature Banner Section */}
              <div className="bg-[#FCFBF7] border border-amber-250 p-4 rounded-md space-y-3 shadow-3xs">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <label className="block text-amber-900 font-extrabold uppercase tracking-wide text-[10px]">HERO SPOTLIGHT BANNER</label>
                    <p className="text-[#8C8375] text-[10px] leading-relaxed">Pin this cafe inside the cinematic home landing carousel hero banner.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={editingCafe ? !!editingCafe.isFeaturedBanner : !!cafeForm.isFeaturedBanner}
                    onChange={e => {
                      const val = e.target.checked;
                      editingCafe ? setEditingCafe({ ...editingCafe, isFeaturedBanner: val }) : setCafeForm({ ...cafeForm, isFeaturedBanner: val });
                    }}
                    className="w-5 h-5 accent-amber-600 rounded-sm cursor-pointer"
                  />
                </div>

                {(editingCafe ? !!editingCafe.isFeaturedBanner : !!cafeForm.isFeaturedBanner) && (
                  <div>
                    <label className="block text-amber-800 font-extrabold mb-1 uppercase tracking-wider text-[9px]">CATCHY BANNER LINE (CINEMATIC INTRO STYLE)</label>
                    <input
                      type="text"
                      maxLength={40}
                      value={editingCafe ? (editingCafe.bannerCatchyLine || '') : (cafeForm.bannerCatchyLine || '')}
                      onChange={e => {
                        const val = e.target.value;
                        editingCafe ? setEditingCafe({ ...editingCafe, bannerCatchyLine: val }) : setCafeForm({ ...cafeForm, bannerCatchyLine: val });
                      }}
                      className="w-full bg-white border border-stone-200 p-2.5 rounded-md focus:border-amber-600 focus:outline-none font-serif text-[13px] text-[#1C1C1E]"
                      placeholder="e.g. A magnificent cube of steel & glass decks"
                    />
                  </div>
                )}
              </div>

              {/* NEWLY LAUNCHED TICKER BAR (SLIDER CORES) */}
              <div className="bg-[#FAF9F5] border border-stone-250 p-4 rounded-md space-y-3 shadow-3xs">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <label className="block text-stone-900 font-extrabold uppercase tracking-wide text-[10px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block animate-ping" />
                      <span>NEWLY LAUNCHED ticker SPOTLIGHT</span>
                    </label>
                    <p className="text-[#8C8375] text-[10px] leading-relaxed">Publish this cafe on the newly launched sliding deck with a targeted tag ribbon.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={editingCafe ? !!editingCafe.isNewLaunch : !!cafeForm.isNewLaunch}
                    onChange={e => {
                      const val = e.target.checked;
                      editingCafe ? setEditingCafe({ ...editingCafe, isNewLaunch: val }) : setCafeForm({ ...cafeForm, isNewLaunch: val });
                    }}
                    className="w-5 h-5 accent-red-600 rounded-sm cursor-pointer"
                  />
                </div>

                {(editingCafe ? !!editingCafe.isNewLaunch : !!cafeForm.isNewLaunch) && (
                  <div>
                    <label className="block text-stone-800 font-extrabold mb-1 uppercase tracking-wide text-[9px]">CATCHY NEW LAUNCH VIBE SLIP</label>
                    <input
                      type="text"
                      maxLength={45}
                      value={editingCafe ? (editingCafe.newLaunchCatchyline || '') : (cafeForm.newLaunchCatchyline || '')}
                      onChange={e => {
                        const val = e.target.value;
                        editingCafe ? setEditingCafe({ ...editingCafe, newLaunchCatchyline: val }) : setCafeForm({ ...cafeForm, newLaunchCatchyline: val });
                      }}
                      className="w-full bg-white border border-stone-200 p-2.5 rounded-md focus:border-stone-900 focus:outline-none font-serif text-[13px] text-[#1C1C1E]"
                      placeholder="e.g. Scandi Silence, Lakeside Teak Decks"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Chip collections (Tags, Celebrities, Facilities combo) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Spot tagging chips */}
              <div>
                <label className="block text-[#786F64] font-extrabold mb-1 uppercase tracking-wide">CAFE CHIP ARCHIVE TAGS</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    className="flex-1 bg-[#FAF9F6] border border-stone-200 p-2.5 rounded-md focus:outline-none focus:border-stone-900 font-medium text-[#1C1C1E]"
                    placeholder="Type then click Add..."
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!tagInput.trim()) return;
                      if (editingCafe) {
                        setEditingCafe({ ...editingCafe, tags: [...editingCafe.tags, tagInput.trim()] });
                      } else {
                        setCafeForm({ ...cafeForm, tags: [...cafeForm.tags, tagInput.trim()] });
                      }
                      setTagInput('');
                    }}
                    className="bg-stone-900 text-white px-3.5 rounded-md font-bold hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    ADD
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {(editingCafe ? editingCafe.tags : cafeForm.tags || []).map((t, idx) => (
                    <span key={idx} className="bg-stone-100 border border-stone-300 text-stone-900 text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm flex items-center gap-1">
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => {
                          if (editingCafe) {
                            setEditingCafe({ ...editingCafe, tags: editingCafe.tags.filter(item => item !== t) });
                          } else {
                            setCafeForm({ ...cafeForm, tags: (cafeForm.tags || []).filter(item => item !== t) });
                          }
                        }}
                        className="text-stone-500 hover:text-red-500 font-extrabold ml-1 font-mono text-[11px]"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* CELEBRITY OBSERVED SPOTLIGHT TAGS */}
              <div>
                <label className="block text-amber-800 font-extrabold mb-1 uppercase tracking-wide">FAMOUS CELEBS OBSERVED</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={celebrityInput}
                    onChange={e => setCelebrityInput(e.target.value)}
                    className="flex-1 bg-[#FAF9F6] border border-stone-200 p-2.5 rounded-md focus:outline-none focus:border-stone-900 font-medium text-[#1C1C1E]"
                    placeholder="Identify visitor e.g. Rana Daggubati"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!celebrityInput.trim()) return;
                      if (editingCafe) {
                        setEditingCafe({ ...editingCafe, celebrities: [...(editingCafe.celebrities || []), celebrityInput.trim()] });
                      } else {
                        setCafeForm({ ...cafeForm, celebrities: [...(cafeForm.celebrities || []), celebrityInput.trim()] });
                      }
                      setCelebrityInput('');
                    }}
                    className="bg-stone-900 text-white px-3.5 rounded-md font-bold hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    ADD
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {(editingCafe ? editingCafe.celebrities : cafeForm.celebrities || []).map((celeb, idx) => (
                    <span key={idx} className="bg-amber-100 border border-amber-300 text-amber-900 text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm flex items-center gap-1">
                      <span>{celeb}</span>
                      <button
                        type="button"
                        onClick={() => {
                          if (editingCafe) {
                            setEditingCafe({ ...editingCafe, celebrities: editingCafe.celebrities.filter(c => c !== celeb) });
                          } else {
                            setCafeForm({ ...cafeForm, celebrities: (cafeForm.celebrities || []).filter(c => c !== celeb) });
                          }
                        }}
                        className="text-amber-700 hover:text-stone-950 font-extrabold ml-1 font-mono text-[11px]"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Facilities tags lists with helper quick select presets */}
              <div>
                <label className="block text-[#786F64] font-extrabold mb-1 uppercase tracking-wide">WORKSTATION FACILITIES</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={facilityInput}
                    onChange={e => setFacilityInput(e.target.value)}
                    className="flex-1 bg-[#FAF9F6] border border-stone-200 p-2.5 rounded-md focus:outline-none focus:border-stone-900 font-medium text-[#1C1C1E]"
                    placeholder="Custom study amenity..."
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!facilityInput.trim()) return;
                      if (editingCafe) {
                        setEditingCafe({ ...editingCafe, facilities: [...(editingCafe.facilities || []), facilityInput.trim()] });
                      } else {
                        setCafeForm({ ...cafeForm, facilities: [...(cafeForm.facilities || []), facilityInput.trim()] });
                      }
                      setFacilityInput('');
                    }}
                    className="bg-stone-900 text-white px-3.5 rounded-md font-bold hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    ADD
                  </button>
                </div>

                {/* Quick select facilities list presets */}
                <div className="flex flex-wrap gap-1 mt-1.5 opacity-80">
                  {["Wi-Fi", "Power Outlets", "Acoustic Walls", "Ergonomic Chairs", "Daylight Windows", "Pet Friendly", "Valet Parking"].map((pred) => {
                    const activeList = editingCafe ? editingCafe.facilities : cafeForm.facilities || [];
                    const exists = activeList.includes(pred);
                    return (
                      <button
                        key={pred}
                        type="button"
                        onClick={() => {
                          if (exists) {
                            const filtered = activeList.filter(f => f !== pred);
                            editingCafe ? setEditingCafe({ ...editingCafe, facilities: filtered }) : setCafeForm({ ...cafeForm, facilities: filtered });
                          } else {
                            const added = [...activeList, pred];
                            editingCafe ? setEditingCafe({ ...editingCafe, facilities: added }) : setCafeForm({ ...cafeForm, facilities: added });
                          }
                        }}
                        className={`text-[8.5px] px-1.5 py-0.5 rounded-sm border transition-colors cursor-pointer ${
                          exists ? "bg-amber-600 text-white border-amber-600 font-bold" : "bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-100"
                        }`}
                      >
                        {exists ? `✓ ${pred}` : `+ ${pred}`}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2.5 border-t border-stone-100 pt-2">
                  {(editingCafe ? editingCafe.facilities : cafeForm.facilities || []).map((fac, idx) => (
                    <span key={idx} className="bg-stone-100 border border-stone-250 text-stone-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm flex items-center gap-1">
                      <span>{fac}</span>
                      <button
                        type="button"
                        onClick={() => {
                          if (editingCafe) {
                            setEditingCafe({ ...editingCafe, facilities: editingCafe.facilities.filter(item => item !== fac) });
                          } else {
                            setCafeForm({ ...cafeForm, facilities: (cafeForm.facilities || []).filter(item => item !== fac) });
                          }
                        }}
                        className="text-stone-400 hover:text-stone-900 font-extrabold ml-1 font-mono text-[11px]"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: CAFE GALLERY LOOKBOOK IMAGES */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
              <MaterialIcon name="collections" className="text-amber-800 text-base" />
              <h4 className="font-serif text-[15px] font-bold text-stone-900">4. Cafe Landscape Gallery Lookbook (Multi Images)</h4>
            </div>

            <p className="text-stone-400 text-[11px] leading-tight font-sans">
              Populate the photo mosaic slider to show customers the interior aesthetics, study chairs, and coffee bar textures. Use file uploads or specify remote picture Web links.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
              {/* Image Input form */}
              <div className="md:col-span-4 bg-[#FAF9F6] p-4 rounded-md border border-stone-200 space-y-3.5">
                <div>
                  <span className="block text-[#786F64] text-[9px] tracking-wider font-extrabold uppercase mb-1">UPLOAD GALLERY IMAGE FILE</span>
                  <div className="border-2 border-dashed border-stone-250 hover:border-stone-400 rounded-md p-3 text-center bg-white transition-colors relative min-h-[85px] flex flex-col justify-center items-center">
                    <MaterialIcon name="add_to_photos" className="text-lg text-amber-700 mb-1" />
                    <span className="text-[10px] font-bold text-stone-600 block">Click to upload photo file</span>
                    <input 
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const b64 = reader.result as string;
                            setNewGalleryImage(b64);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#786F64] text-[9px] tracking-wider font-extrabold uppercase mb-1">OR ENTER GALLERY IMAGE WEBLINK (URL)</label>
                  <input
                    type="url"
                    value={newGalleryImage}
                    onChange={(e) => setNewGalleryImage(e.target.value)}
                    className="w-full bg-white border border-stone-200 p-2.5 rounded-md focus:border-stone-950 focus:outline-none font-mono text-[10px]"
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!newGalleryImage.trim()) {
                      alert("Please specify a valid image link resource or upload a file first!");
                      return;
                    }
                    if (editingCafe) {
                      const currentGallery = editingCafe.moreImages || [];
                      setEditingCafe({ ...editingCafe, moreImages: [...currentGallery, newGalleryImage.trim()] });
                    } else {
                      const currentGallery = cafeForm.moreImages || [];
                      setCafeForm({ ...cafeForm, moreImages: [...currentGallery, newGalleryImage.trim()] });
                    }
                    setNewGalleryImage('');
                  }}
                  className="w-full py-2.5 bg-[#3B2F2F] hover:bg-stone-900 text-white font-serif font-bold text-xs tracking-wider rounded-md smooth-transition cursor-pointer"
                >
                  APPEND TO LOOKBOOK GALLERY
                </button>
              </div>

              {/* Grid view of gallery files */}
              <div className="md:col-span-8">
                <span className="block text-[#786F64] text-[9px] tracking-wider font-extrabold uppercase mb-2">ACTIVE IMAGES IN SLIDESHOW CABINET</span>
                
                {(() => {
                  const gallery = (editingCafe ? editingCafe.moreImages : cafeForm.moreImages) || [];
                  if (gallery.length === 0) {
                    return (
                      <div className="border border-dashed border-stone-200 pb-8 pt-6 rounded-md hover:bg-[#FAF9F6]/20 transition-colors text-center bg-white">
                        <MaterialIcon name="broken_image" className="text-3xl text-stone-200 mb-1 block" />
                        <span className="text-[11px] text-stone-400 italic font-serif">No interior landscape images populated yet</span>
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {gallery.map((imgSrc, idx) => (
                        <div key={idx} className="aspect-[4/3] bg-stone-100 border border-stone-200 rounded-md overflow-hidden relative group shadow-3xs">
                          <img src={imgSrc} alt={`Lookbook ${idx + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                          <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => {
                                const list = gallery.filter((_, i) => i !== idx);
                                editingCafe ? setEditingCafe({ ...editingCafe, moreImages: list }) : setCafeForm({ ...cafeForm, moreImages: list });
                              }}
                              className="bg-red-600 hover:bg-red-700 text-white text-[10px] uppercase font-bold tracking-widest py-1.5 px-3 rounded-sm transition-transform scale-95 group-hover:scale-100 cursor-pointer"
                            >
                              REMOVE
                            </button>
                          </div>
                          <span className="absolute bottom-1 right-1 bg-black/60 text-white font-mono text-[8px] px-1 py-0.5 rounded-xs">
                            #{idx + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* SECTION 5: CURATED GASTRONOMY MENU MAKER */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
              <MaterialIcon name="coffee_maker" className="text-amber-800 text-base" />
              <h4 className="font-serif text-[15px] font-bold text-stone-900">5. Curated Gastronomy Menu Items (Rich Food & Brew list)</h4>
            </div>

            <p className="text-stone-400 text-[11px] leading-tight font-sans">
              Enter specialty food and beverage items below. Customers can inspect pricing, category filters, and product mock pictures directly within the lookbook.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Menu Item Inputs Form */}
              <div className="md:col-span-4 bg-[#FAF9F6] border border-stone-250 p-4.5 rounded-lg space-y-3 shadow-3xs">
                <span className="block text-stone-950 font-serif text-[13px] italic font-bold">Draft Gastronomy Brew Item</span>
                
                <div>
                  <label className="block text-stone-600 text-[9px] font-extrabold uppercase mb-1">Item Title *</label>
                  <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="w-full bg-white border border-stone-200 p-2.5 rounded-md focus:border-stone-950 focus:outline-none font-medium text-xs text-[#1C1C1E]"
                    placeholder="e.g. Cranberry espresso tonic"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-stone-600 text-[9px] font-extrabold uppercase mb-1">Price Indicator *</label>
                    <input
                      type="text"
                      value={newItemPrice}
                      onChange={(e) => setNewItemPrice(e.target.value)}
                      className="w-full bg-white border border-stone-200 p-2.5 rounded-md focus:border-stone-950 focus:outline-none font-mono text-xs text-[#1C1C1E]"
                      placeholder="e.g. ₹280"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 text-[9px] font-extrabold uppercase mb-1">Category Type *</label>
                    <select
                      value={newItemCategory}
                      onChange={(e) => setNewItemCategory(e.target.value)}
                      className="w-full bg-white border border-stone-200 p-2.5 rounded-md focus:border-stone-950 focus:outline-none font-medium text-xs text-[#1C1C1E] cursor-pointer"
                    >
                      <option value="Brews">Brews / Coffees</option>
                      <option value="Patisserie">Patisserie / Bakery</option>
                      <option value="Savory Mains">Savory Mains</option>
                      <option value="Dessert">Gelato / Desserts</option>
                      <option value="Refreshers">Refreshers / Teas</option>
                    </select>
                  </div>
                </div>

                {/* MenuItem image block */}
                <div className="pt-1.5 border-t border-stone-150 space-y-2">
                  <span className="block text-stone-600 text-[9px] font-extrabold uppercase">Menu item photo *</span>
                  
                  {/* Item Image Upload button */}
                  <div className="border border-dashed border-stone-250 hover:border-stone-400 rounded-md p-2 text-center bg-white transition-colors relative min-h-[60px] flex flex-col justify-center items-center">
                    <MaterialIcon name="add_a_photo" className="text-sm text-stone-400 mb-0.5" />
                    <span className="text-[9.5px] font-bold text-stone-500">Pick image file for menu</span>
                    <input 
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setNewItemImage(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>

                  <input
                    type="url"
                    value={newItemImage}
                    onChange={(e) => setNewItemImage(e.target.value)}
                    className="w-full bg-white border border-[#E6DFD3] p-1.5 rounded-sm focus:outline-none font-mono text-[9px]"
                    placeholder="Or enter remote photo URL address"
                  />

                  {newItemImage && (
                    <div className="flex items-center gap-2 border border-stone-100 p-1.5 rounded bg-white">
                      <div className="w-8 h-8 rounded-xs overflow-hidden bg-stone-50 border flex-shrink-0">
                        <img src={newItemImage} className="w-full h-full object-cover" alt="Selected menu file preview" referrerPolicy="no-referrer" />
                      </div>
                      <span className="text-[9px] text-[#A68F74] break-all max-w-[130px] font-mono leading-none">Photo attached ✓</span>
                      <button type="button" onClick={() => setNewItemImage('')} className="text-red-500 font-bold text-[10px] ml-auto">×</button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-stone-100">
                  <input
                    id="checkbox_menu_is_special"
                    type="checkbox"
                    checked={newItemIsSpecial}
                    onChange={(e) => setNewItemIsSpecial(e.target.checked)}
                    className="w-4 h-4 accent-amber-600 rounded-sm cursor-pointer"
                  />
                  <label htmlFor="checkbox_menu_is_special" className="text-stone-700 font-extrabold text-[9.5px] uppercase tracking-wide cursor-pointer select-none">
                    ⭐ MARK AS HERO SIGNATURE BEVERAGE (POPULAR)
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!newItemName.trim() || !newItemPrice.trim()) {
                      alert("Please provide the catalog Title and Pricing for this culinary item!");
                      return;
                    }
                    const compiledItem: CafeMenuItem = {
                      name: newItemName.trim(),
                      price: newItemPrice.trim(),
                      category: newItemCategory,
                      isSpecial: newItemIsSpecial,
                      image: newItemImage.trim() || undefined
                    };

                    if (editingCafe) {
                      const currentMenu = editingCafe.featuredMenu || [];
                      setEditingCafe({ ...editingCafe, featuredMenu: [...currentMenu, compiledItem] });
                    } else {
                      const currentMenu = cafeForm.featuredMenu || [];
                      setCafeForm({ ...cafeForm, featuredMenu: [...currentMenu, compiledItem] });
                    }

                    // Reset sub-state
                    setNewItemName('');
                    setNewItemPrice('');
                    setNewItemCategory('Brews');
                    setNewItemIsSpecial(false);
                    setNewItemImage('');
                  }}
                  className="w-full mt-2 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-serif font-bold text-xs tracking-wider rounded-md smooth-transition cursor-pointer"
                >
                  ADD FRESH ITEM TO CARD MENU
                </button>
              </div>

              {/* Menu items display Cabinet */}
              <div className="md:col-span-8 space-y-2">
                <span className="block text-[#786F64] text-[9px] tracking-wider font-extrabold uppercase mb-1">COMPILED GASTRONOMY CATALOG</span>
                
                {(() => {
                  const menuList = (editingCafe ? editingCafe.featuredMenu : cafeForm.featuredMenu) || [];
                  if (menuList.length === 0) {
                    return (
                      <div className="border border-dashed border-stone-200 py-10 rounded-md text-center bg-white">
                        <MaterialIcon name="menu_book" className="text-3xl text-stone-200 mb-1 block" />
                        <span className="text-[11px] text-stone-400 italic font-serif">Menu cookbook contains no custom listings yet</span>
                      </div>
                    );
                  }

                  return (
                    <div className="max-h-[380px] overflow-y-auto divide-y divide-stone-100 bg-white border border-stone-200 rounded-md p-3 space-y-2 select-none scrollbar-thin">
                      {menuList.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-stone-100 hover:bg-[#FAF9F5]/45 transition-colors px-2 rounded gap-4">
                          <div className="flex items-center gap-3">
                            {/* Photo display */}
                            <div className="w-10 h-10 rounded-xs bg-[#EBE7E0] overflow-hidden border border-stone-200 flex flex-shrink-0 items-center justify-center">
                              {item.image ? (
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              ) : (
                                <MaterialIcon name="restaurant" className="text-stone-400 text-sm" />
                              )}
                            </div>

                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-bold text-stone-900 text-sm">{item.name}</span>
                                {item.isSpecial && (
                                  <span className="bg-amber-50 text-amber-700 text-[8px] font-extrabold uppercase tracking-wide border border-amber-200 px-1 py-0.5 rounded-sm">
                                    Popular Specialty
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-stone-400 font-bold uppercase block tracking-wider mt-0.5">{item.category}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="font-mono text-sm font-bold text-stone-950">{item.price}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const list = menuList.filter((_, i) => i !== index);
                                editingCafe ? setEditingCafe({ ...editingCafe, featuredMenu: list }) : setCafeForm({ ...cafeForm, featuredMenu: list });
                              }}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1.5 rounded-xs transition-colors cursor-pointer flex items-center justify-center"
                              title="Delete food item"
                            >
                              <MaterialIcon name="delete" className="text-[16px]" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Form action row */}
          <div className="pt-6 border-t border-stone-200 flex justify-end gap-3.5">
            <button
              type="button"
              onClick={() => { setIsAddingCafe(false); setEditingCafe(null); }}
              className="px-6 py-2.5 rounded-md border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-bold font-mono tracking-wide cursor-pointer transition-colors"
            >
              DISCARD CHANGES
            </button>
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-2.5 rounded-md text-xs font-bold font-mono tracking-widest uppercase shadow-sm cursor-pointer transition-colors"
            >
              SAVE LOOKBOOK CATALOG LISTING
            </button>
          </div>
        </form>
      )}

      {/* --- TAB 2: BLOG POSTS JOURNAL MANAGER --- */}
      {activeTab === 'blogs' && !editingBlog && !isAddingBlog && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-xl font-bold text-stone-950 italic">Journal Columns Vault ({blogs.length})</h3>
            <button
              onClick={() => setIsAddingBlog(true)}
              className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold tracking-wider uppercase px-5 py-3 rounded-md shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <MaterialIcon name="post_add" className="text-sm" />
              <span>PUBLISH NEW COLUMN</span>
            </button>
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

      {/* Write/Edit Blog Form */}
      {(isAddingBlog || editingBlog) && (
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
        <form onSubmit={handleSaveSeo} className="space-y-8 text-left animate-fade-in">
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
