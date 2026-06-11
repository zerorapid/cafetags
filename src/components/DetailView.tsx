/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cafe } from '../types';
import { MaterialIcon } from './MaterialIcon';
import { getTagIcon } from '../data';

interface DetailViewProps {
  cafe: Cafe;
  onBack: () => void;
  journalLogs: { [id: number]: string };
  onSaveNote: (id: number, text: string) => void;
  onDeleteCafe: (id: number) => void;
  noteSavingState: "idle" | "saved";
  allCafes: Cafe[];
  onSelectCafe: (cafe: Cafe) => void;
  onSubmitFeedback?: (cafeId: number, author: string, rating: number, text: string, email: string) => void;
  isAdmin?: boolean;
}

export function DetailView({
  cafe,
  onBack,
  journalLogs,
  onSaveNote,
  onDeleteCafe,
  noteSavingState,
  allCafes,
  onSelectCafe,
  onSubmitFeedback,
  isAdmin = false
}: DetailViewProps) {
  const [activeImage, setActiveImage] = useState(cafe.image);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeTab, setActiveTab] = useState<'menu' | 'reviews' | 'facilities'>('menu');

  // Community feedback form local states
  const [fbAuthor, setFbAuthor] = useState('');
  const [fbEmail, setFbEmail] = useState('');
  const [fbRating, setFbRating] = useState(5);
  const [fbText, setFbText] = useState('');
  const [fbSuccess, setFbSuccess] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showSuggForm, setShowSuggForm] = useState(false);

  // Sync active image with selected cafe when it changes
  useEffect(() => {
    setActiveImage(cafe.image);
  }, [cafe]);

  const relatedCafes = allCafes.filter(
    c => c.id !== cafe.id && c.tags.some(tag => cafe.tags.includes(tag))
  );

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(cafe.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  // State for date and guests trackers
  const [selectedDate, setSelectedDate] = useState("Today, 11 Jun");
  const [selectedGuests, setSelectedGuests] = useState("2 guests");
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  // Suggestion / Owner Feedback local states
  const [suggText, setSuggText] = useState('');
  const [suggAuthor, setSuggAuthor] = useState('');
  const [suggEmail, setSuggEmail] = useState('');
  const [suggSuccess, setSuggSuccess] = useState(false);

  const handleSuggSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggText.trim()) return;
    if (onSubmitFeedback) {
      onSubmitFeedback(
        cafe.id, 
        suggAuthor.trim() || 'Anonymous Suggester', 
        5, 
        `[Suggestion / Edit Request]: ${suggText.trim()}`, 
        suggEmail.trim() || 'anonymous@cafetags.in'
      );
    }
    setSuggSuccess(true);
    setSuggText('');
    setSuggAuthor('');
    setSuggEmail('');
    setTimeout(() => {
      setSuggSuccess(false);
    }, 5000);
  };

  // Combine images safely
  const additionalPhotos = cafe.moreImages || [];
  const allPhotos = [cafe.image, ...additionalPhotos];

  return (
    <motion.div
      key="individual_study_page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white min-h-screen font-sans w-full pb-24"
    >
      {/* Sub-header Breadcrumbs / Navigation Path */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-6 pb-2">
        <div id="study_breadcrumb" className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-stone-200/60 pb-4">
        <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
          <span className="hover:text-stone-900 cursor-pointer" onClick={onBack}>Hyderabad</span>
          <span>/</span>
          <span className="hover:text-stone-900 cursor-pointer" onClick={onBack}>{cafe.area}</span>
          <span>/</span>
          <span className="text-stone-900 font-semibold">{cafe.name}</span>
        </div>
        
        <button 
          id="btn_back_to_lookbook"
          onClick={() => {
            onBack();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-2 text-xs text-stone-600 hover:text-stone-900 transition-colors font-semibold self-start sm:self-auto"
        >
          <MaterialIcon name="arrow_back" className="text-base group-hover:-translate-x-1 duration-300 transition-transform" />
          <span>Back to lookup</span>
        </button>
      </div>
      </div>

      {/* Cinematic Full Bleed Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="w-full h-[50vh] md:h-[65vh] relative bg-stone-900 group cursor-pointer overflow-hidden"
        onClick={() => setShowAllPhotos(true)}
      >
        <motion.img
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src={activeImage}
          alt={cafe.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover saturate-[0.85] group-hover:saturate-100 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
        
        {/* Floating Tag Type */}
        <div className="absolute top-6 left-6 md:left-12 bg-white/10 backdrop-blur-md text-white text-[11px] font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-white/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{cafe.aestheticType || "Aesthetic Corner"}</span>
        </div>

        {/* Cinematic Title Inside Hero */}
        <div className="absolute bottom-8 left-6 md:left-12 right-6 md:right-12 text-white flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pointer-events-none">
          <div className="space-y-2">
            <p className="text-stone-300 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
              <MaterialIcon name="pin_drop" className="text-base text-emerald-400" />
              {cafe.area}, Hyderabad
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-white leading-tight">
              {cafe.name}
            </h1>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2 pointer-events-auto cursor-pointer hover:bg-white/20 transition-all">
            <MaterialIcon name="collections" className="text-sm" />
            <span className="text-xs font-bold">View Gallery ({allPhotos.length})</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="max-w-7xl mx-auto px-6 md:px-12 py-8"
      >

      {/* Gallery Carousel Thumbnail Strip underneath */}
      {allPhotos.length > 1 && (
        <div className="flex items-center gap-2 mb-8 overflow-x-auto py-1 scrollbar-thin">
          {allPhotos.map((imgUrl, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(imgUrl)}
              className={`flex-shrink-0 w-20 h-14 rounded-sm overflow-hidden border-2 transition-all ${
                activeImage === imgUrl ? "border-stone-900 ring-2 ring-stone-900/10 scale-95" : "border-stone-200 opacity-70 hover:opacity-100"
              }`}
            >
              <img 
                src={imgUrl} 
                alt={`Mini slice ${i+1}`} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
              />
            </button>
          ))}
        </div>
      )}

      {/* 3. At a Glance Strip */}
      <div className="flex flex-col gap-4 pb-6 mb-8 border-b border-stone-100 pt-2">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-800">{cafe.timings || "Open today, 9 AM - 11 PM"}</span>
          </div>
          
          <span className="text-stone-300 hidden sm:block">|</span>

          {/* Area */}
          <div className="flex items-center gap-1.5 text-stone-600">
            <MaterialIcon name="place" className="text-sm" />
            <span className="text-xs font-semibold">{cafe.area}</span>
          </div>

          <span className="text-stone-300 hidden sm:block">|</span>

          {/* Price */}
          <div className="flex items-center gap-1.5 text-stone-600">
            <MaterialIcon name="payments" className="text-sm" />
            <span className="text-xs font-semibold">₹₹ Moderate</span>
          </div>

          <span className="text-stone-300 hidden sm:block">|</span>

          {/* Vibe */}
          <div className="flex items-center gap-1.5 text-stone-600">
            <MaterialIcon name="mood" className="text-sm" />
            <span className="text-xs font-semibold">{cafe.aestheticType || "Curated space"}</span>
          </div>
        </div>
      </div>

      {/* 4. Elegant Bento Grid Framework Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COMPONENT COLUMN (Spans 8 variables on layout) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Highlight feature tiles (Grid of 3 cards side by side) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="bg-stone-50 rounded-lg p-5 space-y-2 select-none hover:bg-stone-100 transition-all duration-300">
              <div className="flex items-center gap-1.5 text-stone-500">
                <MaterialIcon name="spa" className="text-base" />
                <span className="text-[10px] font-bold uppercase tracking-wider">About the place</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-medium line-clamp-3" title={cafe.vibe}>
                {cafe.vibe}
              </p>
            </div>

            <div className="bg-stone-50 rounded-lg p-5 space-y-2 select-none hover:bg-stone-100 transition-all duration-300">
              <div className="flex items-center gap-1.5 text-stone-500">
                <MaterialIcon name="local_cafe" className="text-base" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Must try brew</span>
              </div>
              <p className="text-xs text-stone-900 font-bold leading-relaxed">
                {cafe.signature}
              </p>
              <p className="text-[10px] text-stone-400 font-medium leading-relaxed">
                Independently chosen signature coffee profile recommended by local baristas.
              </p>
            </div>

            <div className="bg-stone-50 rounded-lg p-5 space-y-2 select-none hover:bg-stone-100 transition-all duration-300">
              <div className="flex items-center gap-1.5 text-stone-500">
                <MaterialIcon name="groups" className="text-base" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Crowd culture</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                Particularly loved by <span className="font-bold text-stone-900">{cafe.crowd.toLowerCase()}</span>.
              </p>
              <p className="text-[10px] text-stone-400 font-medium">
                Best during daytime hours for work or casual meetups.
              </p>
            </div>

          </div>

          {/* Special Offers Banner */}
          <div className="bg-[#FAF5ECE0] border border-amber-200 rounded-lg p-4.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-amber-100 flex items-center justify-center text-amber-800 text-lg">
                🎫
              </div>
              <div>
                <span className="block text-[10px] font-bold text-amber-800 uppercase tracking-wider">Active Promo</span>
                <p className="text-xs text-stone-800 font-semibold mt-0.5">
                  {cafe.discounts || "Receive a complimentary pastry with any double-espresso order."}
                </p>
              </div>
            </div>
            <span className="bg-amber-900/10 text-amber-900 text-[10px] font-bold px-2.5 py-1 rounded-sm border border-amber-950/10">
              Valid Today
            </span>
          </div>

          {/* Continuous Scroll Content (Menu, Reviews, Amenities) */}
          <div className="bg-white border border-stone-200/80 rounded-lg p-6 sm:p-8 space-y-12">
            
            {/* Menu Section */}
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-medium text-stone-900 flex items-center gap-2">
                <MaterialIcon name="restaurant_menu" className="text-xl text-stone-400" />
                Curated Menu
              </h3>
                  <div className="flex justify-between items-center bg-[#FAF9F6] p-3.5 px-4.5 rounded-md border border-dashed border-stone-200">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">🌟</span>
                      <div>
                        <span className="block text-[8px] tracking-wider text-stone-400 font-extrabold uppercase">Signature beverage</span>
                        <span className="font-serif text-[14px] italic font-bold text-stone-900">{cafe.signature}</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-stone-900 text-white font-bold px-2.5 py-1 rounded-sm">Creator Select</span>
                  </div>

                  <div className="grid grid-cols-1 gap-y-3 pt-1">
                    {(cafe.featuredMenu || []).map((item) => (
                      <div key={item.name} className="flex items-end justify-between text-xs pb-1 border-b border-dashed border-stone-200">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-stone-900 font-bold">{item.name}</span>
                            {item.isSpecial && (
                              <span className="text-amber-600 text-[9px] font-bold uppercase tracking-wider">★ Popular</span>
                            )}
                          </div>
                          <span className="text-stone-400 text-[10px] mt-0.5 font-medium">{item.category}</span>
                        </div>
                        <span className="text-stone-900 font-bold tracking-tight mb-0.5 pl-4">{item.price}</span>
                      </div>
                    ))}
                  </div>
            </div>

            {/* Reviews Section */}
            <div className="space-y-6 pt-8 border-t border-stone-100">
              <h3 className="font-serif text-2xl font-medium text-stone-900 flex items-center gap-2">
                <MaterialIcon name="chat_bubble_outline" className="text-xl text-stone-400" />
                Guestbook & Reviews ({cafe.userReviews ? cafe.userReviews.length : 0})
              </h3>
              <div className="space-y-6">
                  {/* Gatekeeper Audit Notice */}
                  <div className="bg-[#FAF9F6] border border-dashed border-stone-250 p-4 rounded-md text-center space-y-1">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-amber-700 bg-amber-500/10 px-2.5 py-0.5 rounded-sm uppercase tracking-wider font-mono">
                      <MaterialIcon name="verified_user" className="text-xs" />
                      Influencer Vetted Gatekeeper Active
                    </span>
                    <p className="text-[11px] text-stone-500 font-sans leading-relaxed max-w-xl mx-auto">
                      To prevent robotic fake ratings, listing spam, and artificial boosting, all published reviews are authorized by **vetted Hyderabad cafe influencers**. Public feedback can be submitted below to alert our curators for future upgrades.
                    </p>
                  </div>

                  {/* Vetted Reviews List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(cafe.userReviews || []).map((rev, i) => {
                      const initials = rev.author ? rev.author.substring(0, 2).toUpperCase() : "CS";
                      const bgColors = ["bg-orange-100 text-orange-900", "bg-emerald-100 text-emerald-950", "bg-blue-100 text-blue-950", "bg-violet-100 text-violet-950"];
                      const chosenBg = bgColors[i % bgColors.length];
                      
                      return (
                        <div key={i} className="bg-[#FAF9F6] border border-stone-200/60 p-4.5 rounded-lg flex flex-col justify-between space-y-3.5 hover:bg-white hover:shadow-2xs transition-all">
                          <div className="flex items-start justify-between gap-2.5">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${chosenBg}`}>
                                {initials}
                              </div>
                              <div>
                                <span className="text-stone-900 font-bold text-xs block">{rev.author}</span>
                                <span className="text-[9px] text-[#A855F7] font-bold block uppercase tracking-wider flex items-center gap-0.5 mt-0.5">
                                  <MaterialIcon name="stars" className="text-[9px] text-[#A855F7]" />
                                  {rev.role || "Cafe Influencer"}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-0.5 bg-white border border-stone-200/50 px-1.5 py-0.5 rounded-sm text-amber-800">
                              <span className="text-[10px] font-bold font-mono mr-0.5">{(rev.rating || 5).toFixed(1)}</span>
                              <MaterialIcon name="star" className="text-[11px] text-amber-600" />
                            </div>
                          </div>

                          <p className="text-stone-600 font-sans italic leading-relaxed text-xs">
                            "{rev.text}"
                          </p>

                          <div className="flex justify-between items-center pt-2 border-t border-stone-100/60 text-[9px] text-stone-400 font-semibold select-none">
                            <span className="flex items-center gap-1 text-emerald-600">
                              <MaterialIcon name="verified" className="text-xs" /> Verified visit
                            </span>
                            <span>{rev.date}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Public Recommendation Form (Hidden by default) */}
                  <div className="pt-2">
                    {!showFeedbackForm && !fbSuccess ? (
                      <button 
                        onClick={() => setShowFeedbackForm(true)}
                        className="w-full bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 py-3.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <MaterialIcon name="add_comment" className="text-base text-stone-500" />
                        <span>Share Your Experience</span>
                      </button>
                    ) : (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-white border border-stone-200 p-5 rounded-lg space-y-4 shadow-sm">
                        <div className="flex justify-between items-start border-b border-stone-100 pb-3">
                          <div>
                            <span className="text-[9px] font-extrabold text-[#786F64] uppercase tracking-widest block font-mono">SUBMIT SPOT GUESTBOOK VERIFICATION</span>
                            <h5 className="font-serif text-base font-bold text-stone-950 italic mt-0.5">Submit Community Feedback</h5>
                          </div>
                          <button onClick={() => setShowFeedbackForm(false)} className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer">
                            <MaterialIcon name="close" className="text-lg" />
                          </button>
                        </div>
                      <p className="text-[11px] text-stone-500 mt-0.5 font-sans leading-relaxed">
                        Are we missing key signatures? Have timings changed? Recommend edits or report issues directly to the curator board. Let us know here!
                      </p>

                    {fbSuccess ? (
                      <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center space-y-1.5">
                        <MaterialIcon name="check_circle" className="text-3xl text-green-700" />
                        <h6 className="text-xs font-bold text-green-950">Feedback Successfully Dispatched!</h6>
                        <p className="text-[11px] text-green-850 font-sans max-w-md mx-auto leading-relaxed">
                          Thank you for sharing! Your observations have been logged. Vetted Hyderabad cafe influencers will verify these points on their next incognito inspection before publication.
                        </p>
                        <button
                          type="button"
                          onClick={() => setFbSuccess(false)}
                          className="mt-2 text-stone-500 hover:text-black text-[10px] font-bold underline font-mono cursor-pointer"
                        >
                          SUBMIT ANOTHER SUGGESTION
                        </button>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!fbAuthor || !fbText || !fbEmail) {
                            alert("Please fill in all general guestbook fields.");
                            return;
                          }
                          if (onSubmitFeedback) {
                            onSubmitFeedback(cafe.id, fbAuthor, fbRating, fbText, fbEmail);
                          }
                          setFbSuccess(true);
                          setFbAuthor('');
                          setFbEmail('');
                          setFbText('');
                          setFbRating(5);
                        }}
                        className="space-y-3.5 text-xs font-sans"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div className="space-y-1">
                            <label className="block text-[#786F64] font-bold uppercase tracking-wider text-[9px]">Your Name</label>
                            <input
                              type="text"
                              required
                              value={fbAuthor}
                              onChange={(e) => setFbAuthor(e.target.value)}
                              placeholder="e.g. Rahul Sharma"
                              className="w-full bg-[#FAF9F6] border border-stone-200 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-all p-2.5 rounded-md outline-none font-medium"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[#786F64] font-bold uppercase tracking-wider text-[9px]">Your Email Address</label>
                            <input
                              type="email"
                              required
                              value={fbEmail}
                              onChange={(e) => setFbEmail(e.target.value)}
                              placeholder="rahul@example.com"
                              className="w-full bg-[#FAF9F6] border border-stone-200 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-all p-2.5 rounded-md outline-none font-medium"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[#786F64] font-bold uppercase tracking-wider text-[9px]">Your Rating Recommendation</label>
                          <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setFbRating(star)}
                                className="text-xl cursor-pointer hover:scale-110 duration-150 transition-all focus:outline-none bg-transparent border-0"
                              >
                                <MaterialIcon
                                  name={star <= fbRating ? "star" : "star_outline"}
                                  className={star <= fbRating ? "text-amber-500" : "text-stone-300"}
                                />
                              </button>
                            ))}
                            <span className="text-stone-500 font-bold ml-1 text-[11px] font-mono">{fbRating}.0 / 5.0</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[#786F64] font-bold uppercase tracking-wider text-[9px]">Observations & Feedback Details</label>
                          <textarea
                            required
                            rows={3}
                            value={fbText}
                            onChange={(e) => setFbText(e.target.value)}
                            placeholder="What did you think of the coffee and study setup? Share signature item quality, charging port counts, quiet zones, or other curation edits..."
                            className="w-full bg-[#FAF9F6] border border-stone-200 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-all p-2.5 rounded-md outline-none font-medium text-xs leading-relaxed"
                          />
                        </div>

                        <div className="pt-1 flex justify-end">
                          <button
                            type="submit"
                            className="bg-amber-600 hover:bg-amber-700 text-white font-bold tracking-wider uppercase px-6 py-2.5 rounded-md shadow-xs cursor-pointer text-[10px] flex items-center gap-1 transition-colors min-h-[36px]"
                          >
                            <span className="text-yellow-300">✦</span>
                            <span>DISPATCH FEEDBACK</span>
                          </button>
                        </div>
                      </form>
                    )}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="space-y-6 pt-8 border-t border-stone-100">
              <h3 className="font-serif text-2xl font-medium text-stone-900 flex items-center gap-2">
                <MaterialIcon name="room_service" className="text-xl text-stone-400" />
                Amenities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(cafe.facilities || []).map((fac) => (
                    <div key={fac} className="flex items-center gap-2 bg-[#FAF9F6] border border-stone-200/60 p-3 rounded-md hover:bg-white hover:border-stone-400 transition-all">
                      <span className="text-xs text-stone-400">✦</span>
                      <span className="text-xs font-semibold text-stone-700">{fac}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Interactive Suggestions & Curation Edits Form */}
          <div id="study_reflections_pad">
            {!showSuggForm && !suggSuccess ? (
              <button 
                onClick={() => setShowSuggForm(true)}
                className="w-full bg-[#FAF8F2] hover:bg-[#F3EFE7] border border-[#DECFBE] text-[#5C4D3C] py-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <MaterialIcon name="edit_note" className="text-lg" />
                <span>Suggest an Edit to the Owner</span>
              </button>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#FAF8F2] border border-[#DECFBE] p-6 rounded-lg space-y-4 shadow-sm relative">
                <button onClick={() => setShowSuggForm(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 cursor-pointer">
                  <MaterialIcon name="close" className="text-lg" />
                </button>
                <div className="flex items-center gap-3 border-b border-[#DECFBE]/60 pb-3 pr-8">
                  <h4 className="text-xs text-stone-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <MaterialIcon name="chat_bubble_outline" className="text-lg text-[#5C4D3C]" />
                    <span>Add Your Suggestion/Feedback</span>
                  </h4>
                  <span className="text-[9px] text-[#5C4D3C] font-bold uppercase tracking-widest bg-[#EFE8DD] border border-[#DDD0BF] px-2 py-0.5 rounded-sm font-sans">
                    Connect to Owner
                  </span>
                </div>

            <p className="text-[#7C6C58] text-xs leading-relaxed font-sans mt-0.5">
              Have a menu correction, Wi-Fi speed update, socket count change, or landmark study workspace feedback? Let the curator know directly.
            </p>

            {suggSuccess ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md text-xs font-medium space-y-1 animate-fade-in">
                <p className="font-bold flex items-center gap-1">
                  <MaterialIcon name="check_circle" className="text-sm text-green-600" />
                  Successfully transmitted suggestion to Owner!
                </p>
                <p className="text-green-600 text-[11px] leading-relaxed">
                  Your curated feedback has been successfully appended to the owner's feedback workspace review queue. Thank you for your support!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSuggSubmit} className="space-y-3.5">
                <textarea
                  id="suggestion_area"
                  required
                  value={suggText}
                  onChange={(e) => setSuggText(e.target.value)}
                  placeholder="e.g. They recently upgraded the Wi-Fi speed to 150 Mbps, and added 3 more plug sockets beneath the long communal table on the second floor!"
                  className="w-full bg-white border border-[#DDD0BF] p-3.5 rounded-md text-xs text-stone-900 placeholder-[#B0A79E] focus:outline-none focus:ring-1 focus:ring-[#C3B29D] h-24 leading-relaxed resize-none transition-all"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={suggAuthor}
                    onChange={(e) => setSuggAuthor(e.target.value)}
                    placeholder="Your Name (e.g. Amit)"
                    className="w-full bg-white border border-[#DDD0BF] p-2.5 rounded-md text-xs text-stone-900 focus:outline-[#C3B29D] outline-none font-sans font-medium"
                  />
                  <input
                    type="email"
                    value={suggEmail}
                    onChange={(e) => setSuggEmail(e.target.value)}
                    placeholder="Your Email (e.g. amit@gmail.com)"
                    className="w-full bg-white border border-[#DDD0BF] p-2.5 rounded-md text-xs text-stone-900 focus:outline-[#C3B29D] outline-none font-sans font-medium"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="bg-stone-900 hover:bg-stone-800 text-white font-sans text-[11px] font-bold tracking-wider uppercase px-5 py-2.5 rounded-md shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors border-none"
                  >
                    <MaterialIcon name="send" className="text-xs" />
                    <span>Send to Administration</span>
                  </button>
                </div>
              </form>
            )}
              </motion.div>
            )}
          </div>

          {/* Famous Visitors Spotlight */}
          {cafe.celebrities && cafe.celebrities.length > 0 && (
            <div className="bg-gradient-to-br from-[#FCF8F0] via-white to-[#F9F5EE] border-2 border-amber-300/60 p-6 rounded-lg shadow-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100/30 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-200/40 duration-500 transition-all" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-600 shadow-3xs animate-pulse">
                    <MaterialIcon name="stars" className="text-xl text-amber-500" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-extrabold text-amber-800 uppercase tracking-widest leading-none">EXCLUSIVE SPOTLIGHT</span>
                    <h4 className="text-xs font-bold text-stone-900 tracking-wide mt-1">Celebrity Spotted Wall</h4>
                  </div>
                </div>
                <span className="bg-amber-900 text-[#FFF9E6] text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-widest border border-amber-950/25 shadow-2xs">
                  ★ VIP GUESTS
                </span>
              </div>
              
              <p className="text-stone-500 text-[11px] leading-relaxed mb-4">
                This space is frequently visited by notable public figures, acclaimed artists, and creators:
              </p>

              <div className="grid grid-cols-2 gap-2">
                {cafe.celebrities.map((celeb, idx) => {
                  const initials = celeb.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                  return (
                    <div 
                      key={idx}
                      className="flex items-center gap-2.5 bg-white border border-stone-200/75 hover:border-amber-400 p-2.5 rounded-md transition-all hover:shadow-2xs group/item"
                    >
                      <div className="w-7 h-7 rounded-sm bg-stone-900 text-white font-bold text-[10px] flex items-center justify-center shadow-3xs group-hover/item:bg-amber-900 group-hover/item:scale-105 duration-300 transition-all">
                        {initials}
                      </div>
                      <div className="text-left">
                        <span className="block text-xs font-bold text-stone-900 leading-tight group-hover/item:text-amber-900 transition-colors">{celeb}</span>
                        <span className="block text-[9px] text-amber-600 font-semibold tracking-wide flex items-center gap-0.5 mt-0.5">
                          <span className="text-amber-500">★</span> Star Visitor
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3.5 border-t border-stone-200/50 flex items-center justify-between text-[10px] text-stone-400 font-medium">
                <span className="flex items-center gap-1">
                  <MaterialIcon name="verified_user" className="text-[11px] text-amber-600" /> Verified Spotting
                </span>
                <span>CafeTags Directory</span>
              </div>
            </div>
          )}

        </div>

          {/* RIGHT FLOATING DESIGN COLUMN */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8 self-start">

            {/* Primary Action Button */}
            <a
              href={cafe.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-stone-900 hover:bg-stone-800 text-white py-3.5 rounded-lg text-sm font-bold transition-all shadow-md"
            >
              <MaterialIcon name="directions" className="text-lg" />
              <span>Get Directions</span>
            </a>

            {/* Secondary Action Buttons Group */}
            <div className="grid grid-cols-3 gap-2">
              <a
                href={`tel:${(cafe.phone || "").replace(/\s+/g,'')}`}
                className="flex flex-col items-center justify-center gap-1 bg-stone-50 hover:bg-stone-100 text-stone-700 py-2.5 rounded-lg text-[10px] font-bold transition-all border border-transparent hover:border-stone-200"
              >
                <MaterialIcon name="phone" className="text-base" />
                <span>Call</span>
              </a>

              {cafe.website ? (
                <a
                  href={cafe.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1 bg-stone-50 hover:bg-stone-100 text-stone-700 py-2.5 rounded-lg text-[10px] font-bold transition-all border border-transparent hover:border-stone-200"
                >
                  <MaterialIcon name="language" className="text-base" />
                  <span>Website</span>
                </a>
              ) : (
                <div className="flex flex-col items-center justify-center gap-1 bg-stone-50/50 text-stone-400 py-2.5 rounded-lg text-[10px] font-bold">
                  <MaterialIcon name="language" className="text-base" />
                  <span>Website</span>
                </div>
              )}

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopiedAddress(true);
                  setTimeout(() => setCopiedAddress(false), 2000);
                }}
                className="flex flex-col items-center justify-center gap-1 bg-stone-50 hover:bg-stone-100 text-stone-700 py-2.5 rounded-lg text-[10px] font-bold transition-all border border-transparent hover:border-stone-200 cursor-pointer"
              >
                <MaterialIcon name={copiedAddress ? "check" : "share"} className={`text-base ${copiedAddress ? 'text-emerald-600' : ''}`} />
                <span className={copiedAddress ? 'text-emerald-600' : ''}>{copiedAddress ? "Copied!" : "Share"}</span>
              </button>
            </div>

          {/* Operational Checklist Services */}
          <div className="bg-stone-50 p-5 rounded-lg space-y-4">
            <span className="block text-xs font-bold text-stone-900 flex items-center gap-1.5 pl-0.5">
              <MaterialIcon name="playlist_add_check" className="text-lg text-stone-600" />
              <span>Services provided</span>
            </span>
            
            <div className="grid grid-cols-1 gap-2.5 text-xs">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2.5 font-medium text-stone-700">
                <span className="flex items-center gap-2">
                  <MaterialIcon name={cafe.dineIn ? "check_circle" : "cancel"} className={`text-base ${cafe.dineIn ? "text-emerald-700" : "text-stone-300"}`} />
                  <span>Dine in</span>
                </span>
                <span className="text-[10px] text-stone-400">{cafe.dineIn ? "Available" : "Not offered"}</span>
              </div>

              <div className="flex items-center justify-between border-b border-stone-100 pb-2.5 font-medium text-stone-700">
                <span className="flex items-center gap-2">
                  <MaterialIcon name={cafe.takeaway ? "check_circle" : "cancel"} className={`text-base ${cafe.takeaway ? "text-emerald-700" : "text-stone-300"}`} />
                  <span>Takeaway</span>
                </span>
                <span className="text-[10px] text-stone-400">{cafe.takeaway ? "Available" : "Not offered"}</span>
              </div>

              <div className="flex items-center justify-between border-b border-stone-100 pb-2.5 font-medium text-stone-700">
                <span className="flex items-center gap-2">
                  <MaterialIcon name={cafe.onlineOrder ? "check_circle" : "cancel"} className={`text-base ${cafe.onlineOrder ? "text-emerald-700" : "text-stone-300"}`} />
                  <span>Online courier delivery</span>
                </span>
                <span className="text-[10px] text-stone-400">{cafe.onlineOrder ? "Available" : "Not offered"}</span>
              </div>

              <div className="flex items-center justify-between pb-1 font-medium text-stone-700">
                <span className="flex items-center gap-2">
                  <MaterialIcon name={cafe.selfDelivery ? "check_circle" : "cancel"} className={`text-base ${cafe.selfDelivery ? "text-emerald-700" : "text-stone-300"}`} />
                  <span>Home delivery directly</span>
                </span>
                <span className="text-[10px] text-stone-400">{cafe.selfDelivery ? "Available" : "Not offered"}</span>
              </div>
            </div>
          </div>

          {/* Address with Tip Box */}
          <div className="bg-stone-50 p-5 rounded-lg space-y-3.5">
            <span className="block text-xs font-bold text-stone-900 flex items-center gap-1.5 pl-0.5">
              <MaterialIcon name="place" className="text-lg text-stone-600" />
              <span>Location address</span>
            </span>

            <p className="text-xs text-stone-700 leading-relaxed font-sans bg-[#FAF9F6] p-3 rounded-md border border-stone-200/60 break-words font-medium">
              {cafe.address || "Hyderabad, India"}
            </p>

            {cafe.directionsTip && (
              <p className="text-[11px] text-stone-400 italic leading-relaxed py-0.5 flex items-start gap-1.5 font-medium">
                <MaterialIcon name="info" className="text-xs text-stone-400 flex-shrink-0 mt-0.5" />
                <span>{cafe.directionsTip}</span>
              </p>
            )}
          </div>

          {/* Embedded Video Walkthrough (If available) */}
          {cafe.videoUrl && (
            <div className="bg-stone-50 p-4.5 rounded-lg space-y-3">
              <div className="flex items-center gap-2 font-bold text-xs text-stone-600 pl-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                <span>Video Walk guide</span>
              </div>
              <div className="overflow-hidden rounded-md border border-stone-200 aspect-video w-full bg-stone-100">
                <iframe
                  src={cafe.videoUrl}
                  title={`${cafe.name} tour guide`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0 saturate-[0.85] hover:saturate-100 transition-all duration-300"
                />
              </div>
            </div>
          )}

          {/* Social media connections card */}
          <div className="bg-stone-50 p-5 rounded-lg space-y-4">
            <span className="block text-xs font-bold text-stone-900 flex items-center gap-1.5 pl-0.5">
              <MaterialIcon name="share" className="text-lg text-stone-600" />
              <span>Connect on Social Media</span>
            </span>

            <p className="text-[11px] text-stone-500 leading-relaxed pl-0.5">
              Follow official channels, menu launches, and real-time community updates for {cafe.name}.
            </p>

            <div className="grid grid-cols-5 gap-2.5 pt-1">
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                title={`${cafe.name} on Facebook`}
                className="w-10 h-10 rounded-md bg-[#FAF9F6] border border-stone-200 hover:border-stone-400 hover:bg-stone-50 flex items-center justify-center text-stone-700 hover:text-blue-600 transition-all p-2.5"
              >
                <svg className="w-full h-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                  <path d="M16,2c-7.732,0-14,6.268-14,14,0,6.566,4.52,12.075,10.618,13.588v-9.31h-2.887v-4.278h2.887v-1.843c0-4.765,2.156-6.974,6.835-6.974,.887,0,2.417,.174,3.043,.348v3.878c-.33-.035-.904-.052-1.617-.052-2.296,0-3.183,.87-3.183,3.13v1.513h4.573l-.786,4.278h-3.787v9.619c6.932-.837,12.304-6.74,12.304-13.897,0-7.732-6.268-14-14-14Z"></path>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href={cafe.socialLink || "https://instagram.com"} 
                target="_blank" 
                rel="noopener noreferrer"
                title={`${cafe.name} on Instagram`}
                className="w-10 h-10 rounded-md bg-[#FAF9F6] border border-stone-200 hover:border-stone-400 hover:bg-stone-50 flex items-center justify-center text-stone-700 hover:text-pink-600 transition-all p-2.5"
              >
                <svg className="w-full h-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                  <path d="M10.202,2.098c-1.49,.07-2.507,.308-3.396,.657-.92,.359-1.7,.84-2.477,1.619-.776,.779-1.254,1.56-1.61,2.481-.345,.891-.578,1.909-.644,3.4-.066,1.49-.08,1.97-.073,5.771s.024,4.278,.096,5.772c.071,1.489,.308,2.506,.657,3.396,.359,.92,.84,1.7,1.619,2.477,.779,.776,1.559,1.253,2.483,1.61,.89,.344,1.909,.579,3.399,.644,1.49,.065,1.97,.08,5.771,.073,3.801-.007,4.279-.024,5.773-.095s2.505-.309,3.395-.657c.92-.36,1.701-.84,2.477-1.62s1.254-1.561,1.609-2.483c.345-.89,.579-1.909,.644-3.398,.065-1.494,.081-1.971,.073-5.773s-.024-4.278-.095-5.771-.308-2.507-.657-3.397c-.36-.92-.84-1.7-1.619-2.477s-1.561-1.254-2.483-1.609c-.891-.345-1.909-.58-3.399-.644s-1.97-.081-5.772-.074-4.278,.024-5.771,.096m.164,25.309c-1.365-.059-2.106-.286-2.6-.476-.654-.252-1.12-.557-1.612-1.044s-.795-.955-1.05-1.608c-.192-.494-.423-1.234-.487-2.599-.069-1.475-.084-1.918-.092-5.656s.006-4.18,.071-5.656c.058-1.364,.286-2.106,.476-2.6,.252-.655,.556-1.12,1.044-1.612s.955-.795,1.608-1.05c.493-.193,1.234-.422,2.598-.487,1.476-.07,1.919-.084,5.656-.092,3.737-.008,4.181,.006,5.658,.071,1.364,.059,2.106,.285,2.599,.476,.654,.252,1.12,.555,1.612,1.044s.795,.954,1.051,1.609c.193,.492,.422,1.232,.486,2.597,.07,1.476,.086,1.919,.093,5.656,.007,3.737-.006,4.181-.071,5.656-.06,1.365-.286,2.106-.476,2.601-.252,.654-.556,1.12-1.045,1.612s-.955,.795-1.608,1.05c-.493,.192-1.234,.422-2.597,.487-1.476,.069-1.919,.084-5.657,.092s-4.18-.007-5.656-.071M21.779,8.517c.002,.928,.755,1.679,1.683,1.677s1.679-.755,1.677-1.683c-.002-.928-.755-1.679-1.683-1.677,0,0,0,0,0,0-.928,.002-1.678,.755-1.677,1.683m-12.967,7.496c.008,3.97,3.232,7.182,7.202,7.174s7.183-3.232,7.176-7.202c-.008-3.97-3.233-7.183-7.203-7.175s-7.182,3.233-7.174,7.203m2.522-.005c-.005-2.577,2.08-4.671,4.658-4.676,2.577-.005,4.671,2.08,4.676,4.658,.005,2.577-2.08,4.671-4.658,4.676-2.577,.005-4.671-2.079-4.676-4.656h0"></path>
                </svg>
              </a>

              {/* Twitter X */}
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer"
                title={`${cafe.name} on X (Twitter)`}
                className="w-10 h-10 rounded-md bg-[#FAF9F6] border border-stone-200 hover:border-stone-400 hover:bg-stone-50 flex items-center justify-center text-stone-700 hover:text-stone-900 transition-all p-2.5"
              >
                <svg className="w-full h-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                  <path d="M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z"></path>
                </svg>
              </a>

              {/* YouTube */}
              <a 
                href={cafe.videoUrl || "https://youtube.com"} 
                target="_blank" 
                rel="noopener noreferrer"
                title={`${cafe.name} on YouTube`}
                className="w-10 h-10 rounded-md bg-[#FAF9F6] border border-stone-200 hover:border-stone-400 hover:bg-stone-50 flex items-center justify-center text-stone-700 hover:text-red-600 transition-all p-2.5"
              >
                <svg className="w-full h-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                  <path d="M31.331,8.248c-.368-1.386-1.452-2.477-2.829-2.848-2.496-.673-12.502-.673-12.502-.673,0,0-10.007,0-12.502,.673-1.377,.37-2.461,1.462-2.829,2.848-.669,2.512-.669,7.752-.669,7.752,0,0,0,5.241,.669,7.752,.368,1.386,1.452,2.477,2.829,2.847,2.496,.673,12.502,.673,12.502,.673,0,0,10.007,0,12.502-.673,1.377-.37,2.461-1.462,2.829-2.847,.669-2.512,.669-7.752,.669-7.752,0,0,0-5.24-.669-7.752ZM12.727,20.758V11.242l8.364,4.758-8.364,4.758Z"></path>
                </svg>
              </a>

              {/* WhatsApp */}
              <a 
                href={`https://wa.me/${(cafe.phone || "").replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                title={`Chat with ${cafe.name} on WhatsApp`}
                className="w-10 h-10 rounded-md bg-[#FAF9F6] border border-stone-200 hover:border-stone-400 hover:bg-stone-50 flex items-center justify-center text-stone-700 hover:text-emerald-600 transition-all p-2.5"
              >
                <svg className="w-full h-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                  <path d="M25.873,6.069c-2.619-2.623-6.103-4.067-9.814-4.069C8.411,2,2.186,8.224,2.184,15.874c-.001,2.446,.638,4.833,1.852,6.936l-1.969,7.19,7.355-1.929c2.026,1.106,4.308,1.688,6.63,1.689h.006c7.647,0,13.872-6.224,13.874-13.874,.001-3.708-1.44-7.193-4.06-9.815h0Zm-9.814,21.347h-.005c-2.069,0-4.099-.557-5.87-1.607l-.421-.25-4.365,1.145,1.165-4.256-.274-.436c-1.154-1.836-1.764-3.958-1.763-6.137,.003-6.358,5.176-11.531,11.537-11.531,3.08,.001,5.975,1.202,8.153,3.382,2.177,2.179,3.376,5.077,3.374,8.158-.003,6.359-5.176,11.532-11.532,11.532h0Zm6.325-8.636c-.347-.174-2.051-1.012-2.369-1.128-.318-.116-.549-.174-.78,.174-.231,.347-.895,1.128-1.098,1.359-.202,.232-.405,.26-.751,.086-.347-.174-1.464-.54-2.788-1.72-1.03-.919-1.726-2.054-1.929-2.402-.202-.347-.021-.535,.152-.707,.156-.156,.347-.405,.52-.607,.174-.202,.231-.347,.347-.578,.116-.232,.058-.434-.029-.607-.087-.174-.78-1.88-1.069-2.574-.281-.676-.567-.584-.78-.595-.202-.01-.433-.012-.665-.012s-.607,.086-.925,.434c-.318,.347-1.213,1.186-1.213,2.892s1.242,3.355,1.416,3.587c.174,.232,2.445,3.733,5.922,5.235,.827,.357,1.473,.571,1.977,.73,.83,.264,1.586,.227,2.183,.138,.666-.1,2.051-.839,2.34-1.649,.289-.81,.289-1.504,.202-1.649s-.318-.232-.665-.405h0Z" fillRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Delete Button Corner - Only visible to authenticated curators in Admin Mode */}
          {isAdmin && (
            <div className="pt-2">
              <button 
                onClick={() => onDeleteCafe(cafe.id)}
                className="w-full py-2.5 rounded-md border border-dashed border-red-200 hover:bg-red-50 hover:border-red-400 text-red-700 transition-colors text-[11px] font-bold tracking-wide cursor-pointer flex items-center justify-center gap-1 min-h-[40px]"
              >
                <MaterialIcon name="delete_forever" className="text-base" />
                <span>Delete Spot from Lookup</span>
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Lightbox / Fullscreen Image Gallery Slider Overlay */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-stone-900/98 z-50 flex flex-col justify-between p-6">
          <div className="flex justify-between items-center text-white">
            <span className="text-xs font-semibold text-stone-400">
              Photos of {cafe.name} ({allPhotos.length})
            </span>
            <button 
              onClick={() => setShowAllPhotos(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center text-white cursor-pointer"
            >
              <MaterialIcon name="close" className="text-xl" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center py-4">
            <img 
              src={activeImage} 
              alt={cafe.name} 
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[75vh] object-contain rounded-md shadow-2xl" 
            />
          </div>

          {/* Slider bottom rail picker */}
          <div className="flex items-center justify-center gap-2.5 overflow-x-auto pb-4 max-w-lg mx-auto">
            {allPhotos.map((imgUrl, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(imgUrl)}
                className={`w-16 h-12 rounded-sm overflow-hidden flex-shrink-0 transition-opacity border-2 ${
                  activeImage === imgUrl ? "border-white" : "border-transparent opacity-50 hover:opacity-100"
                }`}
              >
                <img src={imgUrl} alt="Thumbnail Selector" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recommended related cafes section */}
      {relatedCafes.length > 0 && (
        <div id="study_related_spaces" className="pt-12 mt-10 border-t border-stone-200/50 space-y-5 text-left">
          <span className="block text-sm font-bold text-stone-900">
            Similar spots you might like
          </span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedCafes.slice(0, 4).map(rcafe => (
              <div 
                key={rcafe.id}
                onClick={() => {
                  onSelectCafe(rcafe);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-3 bg-white border border-stone-200 hover:border-stone-400 rounded-lg cursor-pointer transition-all group/related text-left"
              >
                <div className="relative aspect-[4/3] overflow-hidden mb-2.5 bg-stone-100 rounded-md">
                  <img 
                    src={rcafe.image} 
                    alt={rcafe.name} 
                    referrerPolicy="no-referrer" 
                    className="w-full h-full object-cover saturate-[0.80] group-hover/related:saturate-100 transition-all duration-300" 
                  />
                </div>
                <h5 className="font-serif text-[13px] text-stone-900 font-semibold group-hover/related:italic leading-tight truncate px-0.5">{rcafe.name}</h5>
                <p className="text-[11px] text-stone-400 mt-0.5 px-0.5 truncate">{rcafe.area}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      </motion.div>
    </motion.div>
  );
}
