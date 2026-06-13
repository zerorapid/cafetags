/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Cafe } from '../types';
import './DetailView.css';
import { 
  ArrowLeft, 
  Grid3X3 as GridIcon, 
  ShieldCheck, 
  MapPin, 
  Ticket, 
  CheckCircle, 
  XCircle, 
  Navigation, 
  Phone, 
  Globe, 
  Share2,
  Star,
  Info,
  Coffee,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  X,
  Instagram,
  Facebook,
  Clock,
  Users,
  Map,
  Calendar,
  Twitter,
  AlertCircle
} from 'lucide-react';
import { TagPill } from './TagPill';

interface DetailViewProps {
  cafe: Cafe;
  onBack: () => void;
  onDeleteCafe?: (id: number) => void;
  allCafes?: Cafe[];
  onSelectCafe?: (cafe: Cafe) => void;
  onSubmitFeedback?: (cafeId: number, author: string, rating: number, text: string, email: string) => void;
  isAdmin?: boolean;
}

export function DetailView({
  cafe,
  onBack,
  allCafes = [],
  onSelectCafe,
  onSubmitFeedback,
}: DetailViewProps) {
  
  const [fbAuthor, setFbAuthor] = useState('');
  const [fbText, setFbText] = useState('');
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [cafe]);

  // Safe images array (pad with main image if not enough)
  const allImages = [cafe.image, ...(cafe.moreImages || []), ...(cafe.menuImages || [])].filter(Boolean);
  const heroImages = [
    allImages[0] || cafe.image,
    allImages[1] || allImages[0] || cafe.image,
    allImages[2] || allImages[0] || cafe.image,
    allImages[3] || allImages[0] || cafe.image,
    allImages[4] || allImages[0] || cafe.image,
  ];
  const totalPhotosCount = 1 + (cafe.moreImages?.length || 0);

  return (
    <div className="custom-detail-view pb-24">
      {/* Global Nav is handled by App.tsx, just add padding and Back button */}
      <main>
          {/* Hero Gallery (Airbnb Style) */}
          <section className="hero-gallery">
              <div className="custom-container">
                  <div className="gallery-grid animate-on-scroll">
                      {/* Main Image (First Item in Grid) */}
                      <div className="gallery-item" onClick={() => { setActiveGalleryIndex(0); setShowGalleryModal(true); }} style={{ cursor: 'pointer' }}>
                          <img src={heroImages[0]} alt={`${cafe.name} main`} />
                      </div>
                      
                      {/* Remaining 4 Images */}
                      {heroImages.slice(1, 5).map((img, idx) => (
                          <div key={idx} className="gallery-item hidden-mobile" onClick={() => { setActiveGalleryIndex(idx + 1); setShowGalleryModal(true); }} style={{ cursor: 'pointer' }}>
                              <img src={img} alt={`${cafe.name} - ${idx + 2}`} />
                          </div>
                      ))}
                      
                      <button className="gallery-overlay" aria-label="Show all photos" onClick={() => { setActiveGalleryIndex(0); setShowGalleryModal(true); }}>
                          <GridIcon size={16} />
                          View Gallery ({totalPhotosCount})
                      </button>
                  </div>
              </div>
          </section>

          {/* Main Content Layout */}
          <div className="custom-container">
              <div className="listing-layout">
                  {/* Left Column: Content */}
                  <div className="listing-content">
                      {/* Header */}
                      <header className="listing-header animate-on-scroll">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                              {cafe.logo && (
                                <img src={cafe.logo} alt={`${cafe.name} logo`} style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '50%', border: '1px solid #eaeaea' }} />
                              )}
                              <h1 className="listing-title" style={{ margin: 0 }}>{cafe.name}</h1>
                          </div>
                          <div className="listing-meta" style={{ flexWrap: 'wrap', gap: '8px' }}>
                              <span className="badge badge-dark">
                                  <ShieldCheck size={12} />
                                  Vetted
                              </span>
                              <span className="divider-dot"></span>
                              <span>
                                  <MapPin size={14} />
                                  {cafe.area}, Hyderabad
                              </span>
                              <span className="divider-dot"></span>
                              <span>{cafe.aestheticType || "Modern Heritage Lounge"}</span>
                              {cafe.founded && (
                                <>
                                  <span className="divider-dot"></span>
                                  <span>Est. {cafe.founded}</span>
                                </>
                              )}
                              {(cafe.socialLink || cafe.facebookUrl || cafe.twitterUrl || cafe.website) && (
                                <>
                                  <span className="divider-dot"></span>
                                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginLeft: '4px' }}>
                                      {cafe.socialLink && (
                                        <a href={cafe.socialLink} target="_blank" rel="noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center', transition: 'opacity 0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = '0.7'} onMouseOut={e => e.currentTarget.style.opacity = '1'} aria-label="Instagram">
                                            <Instagram size={18} />
                                        </a>
                                      )}
                                      {cafe.facebookUrl && (
                                        <a href={cafe.facebookUrl} target="_blank" rel="noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center', transition: 'opacity 0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = '0.7'} onMouseOut={e => e.currentTarget.style.opacity = '1'} aria-label="Facebook">
                                            <Facebook size={18} />
                                        </a>
                                      )}
                                      {cafe.twitterUrl && (
                                        <a href={cafe.twitterUrl} target="_blank" rel="noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center', transition: 'opacity 0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = '0.7'} onMouseOut={e => e.currentTarget.style.opacity = '1'} aria-label="Twitter">
                                            <Twitter size={18} />
                                        </a>
                                      )}
                                      {cafe.website && (
                                        <a href={cafe.website} target="_blank" rel="noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center', transition: 'opacity 0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = '0.7'} onMouseOut={e => e.currentTarget.style.opacity = '1'} aria-label="Website">
                                            <Globe size={18} />
                                        </a>
                                      )}
                                  </div>
                                </>
                              )}
                          </div>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {cafe.tags?.map(t => (
                              <TagPill key={t} tag={t} />
                            ))}
                          </div>
                      </header>

                      {/* About & Curator's Take */}
                      <div className="animate-on-scroll delay-2" style={{ marginBottom: 'var(--space-6)' }}>
                          <h3 style={{ fontFamily: '"Instrument Serif", serif', fontWeight: 400, fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <Info size={28} color="var(--color-text-secondary)" /> Curator's Take
                          </h3>
                          <div style={{ padding: '24px', backgroundColor: '#fafafa', borderLeft: '4px solid var(--color-brand)', borderRadius: '0 8px 8px 0', marginBottom: '24px' }}>
                              <p className="text-lead" style={{ margin: 0, fontStyle: 'italic', color: 'var(--color-text-primary)' }}>
                                  "{cafe.curatorNote || cafe.vibe || "Elegant, bustling premium tea lounge experience with legendary baking roots."}"
                              </p>
                          </div>
                      </div>

                      {/* Vibe Scores */}
                      {cafe.vibeScores && cafe.vibeScores.length > 0 && (
                        <div className="animate-on-scroll" style={{ marginBottom: 'var(--space-6)' }}>
                            <h3 style={{ fontFamily: '"Instrument Serif", serif', fontWeight: 400, fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Star size={28} color="var(--color-text-secondary)" /> Vibe Scores
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                                {cafe.vibeScores.map((vs, idx) => (
                                    <div key={idx} style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border-light)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{vs.label}</span>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                            <strong style={{ fontSize: '1.5rem', fontFamily: '"Outfit", sans-serif', color: 'var(--color-text-primary)' }}>{vs.score.toFixed(1)}</strong>
                                            <span style={{ color: 'var(--color-text-tertiary)', fontSize: '0.875rem' }}>/ 10</span>
                                        </div>
                                        <div style={{ width: '100%', height: '4px', backgroundColor: '#f0f0f0', borderRadius: '2px', overflow: 'hidden' }}>
                                            <div style={{ width: `${(vs.score / 10) * 100}%`, height: '100%', backgroundColor: 'var(--color-brand)' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                      )}

                      {/* Neighbourhood Guide */}
                      {cafe.neighbourhoodGuide && (
                        <div className="animate-on-scroll" style={{ marginBottom: 'var(--space-6)' }}>
                            <h3 style={{ fontFamily: '"Instrument Serif", serif', fontWeight: 400, fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Map size={28} color="var(--color-text-secondary)" /> Neighbourhood Guide
                            </h3>
                            <p style={{ lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                                {cafe.neighbourhoodGuide}
                            </p>
                        </div>
                      )}

                      <div style={{ borderTop: '1px solid var(--color-border-light)', margin: 'var(--space-6) 0' }}></div>

                      {/* Active Promo */}
                      {cafe.discounts && (
                      <div className="promo-banner animate-on-scroll" style={{ marginBottom: 'var(--space-6)' }}>
                          <div className="promo-icon">
                              <Ticket size={24} />
                          </div>
                          <div className="promo-content">
                              <h4>Active Promo</h4>
                              <p>{cafe.discounts}</p>
                              <span className="badge badge-dark" style={{ fontSize: '0.625rem' }}>
                                  <CheckCircle size={12} />
                                  Valid Today
                              </span>
                          </div>
                      </div>
                      )}

                      {/* Services */}
                      <div className="animate-on-scroll" style={{ marginBottom: 'var(--space-6)' }}>
                          <h3 style={{ fontFamily: '"Instrument Serif", serif', fontWeight: 400, fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <Coffee size={28} color="var(--color-text-secondary)" /> Services provided
                          </h3>
                          <div className="amenities-grid" style={{ marginTop: 'var(--space-2)' }}>
                              {cafe.dineIn !== false && (
                              <div className="amenity-item">
                                  <CheckCircle size={22} color="var(--color-text-primary)" />
                                  <span>Dine in</span>
                                  <strong style={{ marginLeft: 'auto', fontWeight: 600 }}>Available</strong>
                              </div>
                              )}
                              {cafe.takeaway !== false && (
                              <div className="amenity-item">
                                  <CheckCircle size={22} color="var(--color-text-primary)" />
                                  <span>Takeaway</span>
                                  <strong style={{ marginLeft: 'auto', fontWeight: 600 }}>Available</strong>
                              </div>
                              )}
                              {cafe.onlineOrder !== false && (
                              <div className="amenity-item">
                                  <CheckCircle size={22} color="var(--color-text-primary)" />
                                  <span>Online Delivery</span>
                                  <strong style={{ marginLeft: 'auto', fontWeight: 600 }}>Available</strong>
                              </div>
                              )}
                              {cafe.selfDelivery !== false && (
                              <div className="amenity-item">
                                  <CheckCircle size={22} color="var(--color-text-primary)" />
                                  <span>Direct Home Delivery</span> 
                                  <strong style={{ marginLeft: 'auto', fontWeight: 600 }}>Available</strong>
                              </div>
                              )}
                          </div>
                      </div>

                      {cafe.facilities && cafe.facilities.length > 0 && (
                        <div className="animate-on-scroll" style={{ marginBottom: 'var(--space-6)' }}>
                            <h3 style={{ fontFamily: '"Instrument Serif", serif', fontWeight: 400, fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Sparkles size={28} color="var(--color-text-secondary)" /> Amenities
                            </h3>
                            <div className="amenities-grid" style={{ marginTop: 'var(--space-2)' }}>
                                {cafe.facilities.map((fac, idx) => (
                                  <div key={idx} className="amenity-item">
                                      <Check size={20} color="var(--color-text-primary)" />
                                      <span>{fac}</span>
                                  </div>
                                ))}
                            </div>
                        </div>
                      )}

                      <div style={{ borderTop: '1px solid var(--color-border-light)', margin: 'var(--space-6) 0' }}></div>

                      {/* Celebrity Spotlight */}
                      {cafe.celebrities && cafe.celebrities.length > 0 && (
                      <div className="animate-on-scroll" style={{ 
                        backgroundColor: '#222', borderRadius: '16px', padding: '32px', color: '#fff', 
                        marginBottom: 'var(--space-8)', position: 'relative', overflow: 'hidden' 
                      }}>
                          <div style={{ position: 'absolute', top: '-30px', right: '-20px', opacity: 0.05 }}>
                              <Star size={200} fill="white" />
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', position: 'relative', zIndex: 10 }}>
                              <Star size={28} color="#b45309" fill="#b45309" />
                              <h3 style={{ fontFamily: '"Instrument Serif", serif', fontSize: 'var(--text-3xl)', margin: 0, color: '#fff' }}>VIP Sightings</h3>
                          </div>
                          
                          <p style={{ color: '#a0a0a0', marginBottom: '24px', position: 'relative', zIndex: 10 }}>
                              This heritage location is a verified favorite for local and international public figures.
                          </p>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', position: 'relative', zIndex: 10 }}>
                              {cafe.celebrities.map((celeb, idx) => {
                                const initials = celeb.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
                                return (
                                  <div key={idx} style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '24px', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
                                      <div style={{ width: '64px', height: '64px', backgroundColor: '#fff', color: '#222', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Instrument Serif", serif', fontSize: '1.5rem', fontStyle: 'italic' }}>{initials}</div>
                                      <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: '1.25rem', marginBottom: '4px', color: '#fff' }}>{celeb}</div>
                                      <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#b45309', fontWeight: 700 }}>Spotted Here</div>
                                  </div>
                                )
                              })}
                          </div>
                      </div>
                      )}

                      {/* Menu Highlights */}
                      <div className="animate-on-scroll">
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: '16px' }}>
                              <h2 style={{ margin: 0 }}>Curated Menu</h2>
                              <button 
                                onClick={() => { setActiveMenuIndex(0); setShowMenuModal(true); }}
                                style={{ padding: '10px 20px', backgroundColor: '#222', color: '#fff', borderRadius: '32px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                              >
                                <GridIcon size={16} /> View Full Menu
                              </button>
                          </div>
                          
                          <div className="menu-carousel" style={{ display: 'flex', overflowX: 'auto', gap: '16px', paddingBottom: '16px', scrollSnapType: 'x mandatory', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                              <style dangerouslySetInnerHTML={{__html: `
                                .menu-carousel::-webkit-scrollbar { display: none; }
                                .menu-carousel > article { min-width: 280px; max-width: 320px; flex-shrink: 0; scroll-snap-align: start; }
                              `}} />
                              
                              {/* 1. Signature Beverage */}
                              <article className="menu-card" style={{ cursor: 'pointer' }} onClick={() => { setActiveMenuIndex(0); setShowMenuModal(true); }}>
                                  <div className="menu-card-image">
                                      <span className="badge badge-dark" style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>Signature Beverage</span>
                                      <img src={cafe.menuImages?.[0] || cafe.image} alt={cafe.signature} />
                                  </div>
                                  <div className="menu-card-content">
                                      <div className="menu-card-header">
                                          <h3 style={{ fontFamily: '"Instrument Serif", serif' }}>{cafe.signature}</h3>
                                      </div>
                                      <p>Creator Select. Our signature pairing. Authentic, rich preparation served exactly as intended by the curator.</p>
                                  </div>
                              </article>

                              {/* 2 & 3. Featured Menu Items */}
                              {cafe.featuredMenu?.slice(0, 2).map((item, idx) => (
                              <article key={idx} className="menu-card" style={{ cursor: 'pointer' }} onClick={() => { setActiveMenuIndex(idx + 1); setShowMenuModal(true); }}>
                                  <div className="menu-card-image">
                                      <img src={cafe.moreImages?.[idx] || cafe.image} alt={item.name} />
                                  </div>
                                  <div className="menu-card-content">
                                      <div className="menu-card-header">
                                          <h3 style={{ fontFamily: '"Instrument Serif", serif' }}>{item.name}</h3>
                                      </div>
                                      <p>{item.category}. Highlighted signature recipe crafted from the heritage menu.</p>
                                  </div>
                              </article>
                              ))}
                          </div>
                      </div>

                      <div style={{ borderTop: '1px solid var(--color-border-light)', margin: 'var(--space-8) 0' }}></div>

                      {/* Reviews */}
                      <div className="animate-on-scroll">
                          <h2 style={{ fontFamily: '"Instrument Serif", serif', fontWeight: 400, fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-6)' }}>Guestbook & Reviews ({cafe.userReviews?.length || 3})</h2>

                          {/* Reviews List */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                              {(cafe.userReviews && cafe.userReviews.length > 0 ? cafe.userReviews : [
                                { author: "Rahul M.", role: "Local Guide", text: "Absolutely stunning heritage architecture. The Irani chai is authentic and the Osmania biscuits melt in your mouth. Best spot for evening conversations.", date: "2 weeks ago", rating: 5 },
                                { author: "Sarah K.", role: "Food Blogger", text: "Love the modern aesthetic blended with classic Hyderabadi roots. It gets quite crowded on weekends, but the service remains impeccable.", date: "1 month ago", rating: 4 },
                                { author: "Vijay D.", role: "Regular", text: "The signature blends here are unmatched. Perfect ambiance for a date or just reading a book by the window.", date: "3 months ago", rating: 5 }
                              ]).map((review, idx) => (
                                <div key={idx} style={{ padding: '24px', backgroundColor: '#fcfcfc', border: '1px solid #eaeaea', borderRadius: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '40px', height: '40px', backgroundColor: '#222', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontFamily: '"Instrument Serif", serif', fontSize: '20px' }}>
                                                {review.author[0]}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600, color: '#222' }}>{review.author}</div>
                                                <div style={{ fontSize: '12px', color: '#717171' }}>{review.role}</div>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '2px', color: '#222' }}>
                                                {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#717171', marginTop: '4px' }}>{review.date}</div>
                                        </div>
                                    </div>
                                    <p style={{ margin: 0, color: '#444', lineHeight: 1.6 }}>"{review.text}"</p>
                                </div>
                              ))}
                          </div>

                          <div className="feedback-form">
                              <h3 style={{ fontFamily: '"Instrument Serif", serif', fontWeight: 400, fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>Share Your Experience</h3>
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                if(onSubmitFeedback) {
                                  onSubmitFeedback(cafe.id, fbAuthor, 5, fbText, 'guest@cafetags.in');
                                  setFbText(''); setFbAuthor('');
                                  alert('Feedback submitted to Gatekeeper!');
                                }
                              }}>
                                  <div className="form-group">
                                      <label htmlFor="name" className="form-label">Your Name</label>
                                      <input type="text" id="name" value={fbAuthor} onChange={e => setFbAuthor(e.target.value)} className="form-input" placeholder="Enter your name" required />
                                  </div>
                                  <div className="form-group">
                                      <label htmlFor="feedback" className="form-label">Your Feedback</label>
                                      <textarea id="feedback" value={fbText} onChange={e => setFbText(e.target.value)} className="form-textarea" placeholder="Share your experience to alert our curators..." required></textarea>
                                  </div>
                                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit for Curation</button>
                              </form>
                          </div>
                      </div>

                  </div>

                  {/* Right Column: Sticky Sidebar */}
                  <div className="sticky-sidebar">
                      <div className="sidebar-header">
                          <div className="sidebar-price">
                              Moderate <span>/ person</span>
                          </div>
                          <div className="sidebar-rating">
                              ★ Heritage
                          </div>
                      </div>
                      <div className="sidebar-actions">
                          <a href={cafe.mapLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-pill">
                              <Navigation size={18} /> Get Directions
                          </a>
                          <a href={`tel:${cafe.phone || ""}`} className="btn btn-secondary btn-pill">
                              <Phone size={18} /> Call
                          </a>
                          {cafe.website && (
                          <a href={cafe.website} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-pill">
                              <Globe size={18} /> Website
                          </a>
                          )}
                          <button className="btn btn-secondary btn-pill" onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert("Link Copied!");
                          }}>
                              <Share2 size={18} /> Share
                          </button>
                      </div>
                      <div style={{ textAlign: 'center', margin: '12px 0 24px' }}>
                          <span style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>CafeTags Directory</span>
                      </div>

                      <div className="sidebar-info">
                          {cafe.timings && (
                          <div className="sidebar-info-item">
                              <Clock size={16} />
                              <div>
                                  <strong style={{ display: 'block', color: 'var(--color-text-primary)' }}>Timings</strong>
                                  {cafe.timings}
                              </div>
                          </div>
                          )}
                          <div className="sidebar-info-item">
                              <MapPin size={16} />
                              <div>
                                  <strong style={{ display: 'block', color: 'var(--color-text-primary)' }}>Location</strong>
                                  {cafe.address ? (cafe.address.includes(cafe.area) ? cafe.address : `${cafe.address}, ${cafe.area}`) : `${cafe.area}, Hyderabad`}
                              </div>
                          </div>
                          
                          <div className="sidebar-info-item" style={{ alignItems: 'start' }}>
                              <Share2 size={16} />
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  <strong style={{ display: 'block', color: 'var(--color-text-primary)' }}>Social Media</strong>
                                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                      <a href={cafe.socialLink || "#"} onClick={(e) => { if(!cafe.socialLink) { e.preventDefault(); alert('Instagram link not provided for this cafe'); } }} target="_blank" rel="noreferrer" style={{ color: cafe.socialLink ? 'var(--color-text-primary)' : '#e0e0e0', display: 'flex', transition: 'color 0.2s', cursor: cafe.socialLink ? 'pointer' : 'not-allowed' }} onMouseOver={e => { if(cafe.socialLink) e.currentTarget.style.color = 'var(--color-brand)'}} onMouseOut={e => { if(cafe.socialLink) e.currentTarget.style.color = 'var(--color-text-primary)'}} aria-label="Instagram">
                                          <Instagram size={18} />
                                      </a>
                                      <a href={cafe.facebookUrl || "#"} onClick={(e) => { if(!cafe.facebookUrl) { e.preventDefault(); alert('Facebook link not provided for this cafe'); } }} target="_blank" rel="noreferrer" style={{ color: cafe.facebookUrl ? 'var(--color-text-primary)' : '#e0e0e0', display: 'flex', transition: 'color 0.2s', cursor: cafe.facebookUrl ? 'pointer' : 'not-allowed' }} onMouseOver={e => { if(cafe.facebookUrl) e.currentTarget.style.color = 'var(--color-brand)'}} onMouseOut={e => { if(cafe.facebookUrl) e.currentTarget.style.color = 'var(--color-text-primary)'}} aria-label="Facebook">
                                          <Facebook size={18} />
                                      </a>
                                      <a href={cafe.twitterUrl || "#"} onClick={(e) => { if(!cafe.twitterUrl) { e.preventDefault(); alert('Twitter link not provided for this cafe'); } }} target="_blank" rel="noreferrer" style={{ color: cafe.twitterUrl ? 'var(--color-text-primary)' : '#e0e0e0', display: 'flex', transition: 'color 0.2s', cursor: cafe.twitterUrl ? 'pointer' : 'not-allowed' }} onMouseOver={e => { if(cafe.twitterUrl) e.currentTarget.style.color = 'var(--color-brand)'}} onMouseOut={e => { if(cafe.twitterUrl) e.currentTarget.style.color = 'var(--color-text-primary)'}} aria-label="Twitter">
                                          <Twitter size={18} />
                                      </a>
                                      <a href={cafe.website || "#"} onClick={(e) => { if(!cafe.website) { e.preventDefault(); alert('Website link not provided for this cafe'); } }} target="_blank" rel="noreferrer" style={{ color: cafe.website ? 'var(--color-text-primary)' : '#e0e0e0', display: 'flex', transition: 'color 0.2s', cursor: cafe.website ? 'pointer' : 'not-allowed' }} onMouseOver={e => { if(cafe.website) e.currentTarget.style.color = 'var(--color-brand)'}} onMouseOut={e => { if(cafe.website) e.currentTarget.style.color = 'var(--color-text-primary)'}} aria-label="Website">
                                          <Globe size={18} />
                                      </a>
                                  </div>
                              </div>
                          </div>
                          {cafe.directionsTip && (
                          <div className="sidebar-info-item">
                              <Info size={16} />
                              <div>
                                  <strong style={{ display: 'block', color: 'var(--color-text-primary)' }}>Directions Tip</strong>
                                  {cafe.directionsTip}
                              </div>
                          </div>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      </main>

      {/* Menu Modal Overlay */}
      {showMenuModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={() => setShowMenuModal(false)} style={{ position: 'absolute', top: '24px', right: '24px', color: 'white', background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px' }}>
            <X size={32} />
          </button>
          
          <div style={{ maxWidth: '800px', width: '90%', height: '80vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {cafe.menuImages && cafe.menuImages.length > 1 && (
              <button 
                onClick={() => setActiveMenuIndex(prev => prev === 0 ? cafe.menuImages!.length - 1 : prev - 1)}
                style={{ position: 'absolute', left: '-60px', top: '50%', transform: 'translateY(-50%)', background: 'white', borderRadius: '50%', border: 'none', cursor: 'pointer', padding: '12px', display: 'flex' }}
              >
                <ChevronLeft size={24} color="black" />
              </button>
            )}

            <img 
              src={cafe.menuImages?.[activeMenuIndex] || cafe.moreImages?.[activeMenuIndex] || cafe.image} 
              alt={`Menu page ${activeMenuIndex + 1}`} 
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} 
            />

            {cafe.menuImages && cafe.menuImages.length > 1 && (
              <button 
                onClick={() => setActiveMenuIndex(prev => prev === cafe.menuImages!.length - 1 ? 0 : prev + 1)}
                style={{ position: 'absolute', right: '-60px', top: '50%', transform: 'translateY(-50%)', background: 'white', borderRadius: '50%', border: 'none', cursor: 'pointer', padding: '12px', display: 'flex' }}
              >
                <ChevronRight size={24} color="black" />
              </button>
            )}
          </div>
          
          {cafe.menuImages && cafe.menuImages.length > 1 && (
            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
              {cafe.menuImages.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveMenuIndex(idx)}
                  style={{ 
                    width: '10px', height: '10px', borderRadius: '50%', 
                    backgroundColor: activeMenuIndex === idx ? 'white' : 'rgba(255,255,255,0.3)',
                    border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.2s'
                  }}
                  aria-label={`View menu page ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Gallery Modal */}
      {showGalleryModal && allImages.length > 0 && (
          <div className="menu-modal" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px', alignItems: 'center' }}>
                  <div style={{ color: '#fff', fontFamily: '"Instrument Serif", serif', fontSize: '24px' }}>Gallery {activeGalleryIndex + 1} / {allImages.length}</div>
                  <button onClick={() => setShowGalleryModal(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', cursor: 'pointer', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <X size={24} />
                  </button>
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '24px' }}>
                  {allImages.length > 1 && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveGalleryIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1)); }}
                        style={{ position: 'absolute', left: '24px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', cursor: 'pointer', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
                      >
                          <ChevronLeft size={32} />
                      </button>
                  )}
                  
                  <img 
                    src={allImages[activeGalleryIndex]} 
                    alt={`Gallery Image ${activeGalleryIndex + 1}`} 
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px' }}
                  />

                  {allImages.length > 1 && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveGalleryIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0)); }}
                        style={{ position: 'absolute', right: '24px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', cursor: 'pointer', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
                      >
                          <ChevronRight size={32} />
                      </button>
                  )}
              </div>
              {allImages.length > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '24px' }}>
                    {allImages.map((_, idx) => (
                        <div key={idx} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: idx === activeGalleryIndex ? '#fff' : 'rgba(255,255,255,0.3)', transition: 'background-color 0.3s' }} />
                    ))}
                </div>
              )}
          </div>
      )}
    </div>
  );
}
