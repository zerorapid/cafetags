import React, { useState, useEffect } from 'react';
import { Cafe } from '../types';
import './DetailView.css';
import { 
  ArrowLeft, Coffee, Clock, Accessibility, Store, 
  Award, Heart, Camera, PawPrint, BookOpen, UtensilsCrossed,
  Flame, Sparkles, BarChart3, MessageCircleHeart, Star, ThumbsUp,
  MapPin, Phone, Globe, Navigation, Images, CheckCircle2,
  Instagram, Facebook, Twitter, Share2
} from 'lucide-react';

const NucleoIcon = ({ name, disabled }: { name: string, disabled?: boolean }) => {
    const color = disabled ? 'var(--text-muted)' : 'var(--text-primary)';
    const style = { width: 20, height: 20, fill: 'none', stroke: color, strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
    if (name === 'instagram') return (
        <svg viewBox="0 0 24 24" style={style}>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
    );
    if (name === 'facebook') return (
        <svg viewBox="0 0 24 24" style={style}>
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
    );
    if (name === 'twitter') return (
        <svg viewBox="0 0 24 24" style={style}>
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
        </svg>
    );
    return null;
}

interface DetailViewProps {
  cafe: Cafe;
  onBack: () => void;
  onDeleteCafe?: (id: number) => void;
  allCafes?: Cafe[];
  onSelectCafe?: (cafe: Cafe) => void;
  onSubmitFeedback?: (cafeId: number, author: string, rating: number, text: string, email: string) => void;
  isAdmin?: boolean;
}

export function DetailView({ cafe, onBack }: DetailViewProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [cafe]);

  // Fallback images array
  const allImages = [cafe.image, ...(cafe.moreImages || []), ...(cafe.menuImages || [])].filter(Boolean);
  const getImg = (idx: number) => allImages[idx] || cafe.image;
  const isClosed = cafe.status === 'closed' || cafe.status === 'shutdown';

  // Calculate random/mock rating stats if reviews exist, else default
  const reviewCount = cafe.userReviews?.length || 0;
  const avgRating = reviewCount > 0 ? (cafe.userReviews!.reduce((acc, r) => acc + r.rating, 0) / reviewCount).toFixed(1) : '4.8';

  return (
    <div className="lookbook-container">
      <div className="main-container">

        {/* HERO SECTION */}
        <section className="hero-section">
            <div className="hero-bg" style={{ backgroundImage: `url('${cafe.image}')` }}></div>
            <div className="hero-overlay"></div>
            
            <div className="hero-content">
                <h1 className="hero-title">{cafe.name}</h1>
                
                <div className="hero-meta">
                    <div className="hero-rating">
                        <Star size={16} />
                        <span>{avgRating}</span>
                    </div>
                    {reviewCount > 0 && <span className="hero-reviews">{reviewCount} reviews</span>}
                    <span className="hero-location">
                        <MapPin size={18} />
                        {cafe.area}, Hyderabad
                    </span>
                </div>
                
                <p className="hero-description">
                    {cafe.vibe}
                </p>
            </div>
        </section>

        {/* INFO CARDS */}
        <section className="info-cards-section">
            <div className="info-cards-grid">
                <div className="info-card-item grouped-info-card">
                    <div className="info-card-sub-item">
                        <div className="info-card-icon coffee"><Coffee size={22} /></div>
                        <div className="info-card-text">
                            <h3>{cafe.signature || "Specialty Brews"}</h3>
                            <p>Signature Offering</p>
                        </div>
                    </div>
                    <div className="info-card-divider"></div>
                    <div className="info-card-sub-item">
                        <div className="info-card-icon clock"><Clock size={22} /></div>
                        <div className="info-card-text">
                            <h3>{cafe.timings || "Check hours online"}</h3>
                            <p>Opening Hours</p>
                        </div>
                    </div>
                </div>
                
                <div className="info-card-item verdict-card">
                    <div className="verdict-label-small">
                        <Award size={16} />
                        CafeTags Verdict
                    </div>
                    <h3 className="verdict-title-small">{cafe.curatorNote || `A standout destination in ${cafe.area} blending modern design with exceptional hospitality.`}</h3>
                    <p className="verdict-description-small">
                        {cafe.neighbourhoodGuide || "Perfect for remote workers, casual dates, and photography sessions."}
                    </p>
                </div>
            </div>
        </section>

        {/* PHOTO GALLERY - BENTO GRID */}
        {allImages.length > 1 && (
        <section className="gallery-section">
            <div className="section-header">
                <h2 className="section-title">
                    <Images size={28} />
                    Photo Gallery
                </h2>
            </div>
            
            <div className="bento-grid">
                <div className="bento-item area-hero" style={{ backgroundImage: `url('${getImg(0)}')` }}>
                    <span className="bento-label">Ambiance</span>
                </div>
                <div className="bento-item area-tall" style={{ backgroundImage: `url('${getImg(1)}')` }}>
                    <span className="bento-label">Interior</span>
                </div>
                <div className="bento-item area-3" style={{ backgroundImage: `url('${getImg(2)}')` }}>
                    <span className="bento-label">Details</span>
                </div>
                <div className="bento-item area-4" style={{ backgroundImage: `url('${getImg(3)}')` }}>
                    <span className="bento-label">Food & Drinks</span>
                </div>
                <div className="bento-item area-5" style={{ backgroundImage: `url('${getImg(4)}')` }}>
                    <span className="bento-label">More</span>
                </div>
            </div>
        </section>
        )}

        {/* TWO COLUMN LAYOUT */}
        <div className="content-grid">
            
            {/* MAIN CONTENT */}
            <div className="main-content">
                
                {/* ABOUT */}
                <div className="info-card">
                    <h3 className="info-card-title">
                        <BookOpen size={22} />
                        About Cafe
                    </h3>
                    <p className="about-text">
                        {cafe.vibe}
                    </p>
                    
                    <div className="about-highlights">
                        {cafe.facilities?.slice(0, 4).map(facility => (
                        <div key={facility} className="about-highlight">
                            <CheckCircle2 size={18} />
                            <span>{facility}</span>
                        </div>
                        ))}
                    </div>
                </div>

                {/* MENU */}
                {cafe.featuredMenu && cafe.featuredMenu.length > 0 && (
                <div className="info-card">
                    <h3 className="info-card-title">
                        <UtensilsCrossed size={22} />
                        Popular Items
                    </h3>
                    
                    <div className="menu-grid">
                        {cafe.featuredMenu.map((item, idx) => (
                        <div key={idx} className="menu-item">
                            {cafe.menuImages?.[idx] && (
                                <div className="menu-item-img" style={{ backgroundImage: `url('${cafe.menuImages[idx]}')` }}></div>
                            )}
                            <div className="menu-item-content">
                                <div className="menu-item-header">
                                    <h4 className="menu-item-name">{item.name}</h4>
                                    <span className="menu-item-price">{item.price}</span>
                                </div>
                                <p className="menu-item-desc">{item.category}</p>
                                {item.isSpecial && (
                                <span className="menu-item-badge">
                                    <Flame size={14} /> Bestseller
                                </span>
                                )}
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
                )}

                {/* VIBE SCORES */}
                {cafe.vibeScores && cafe.vibeScores.length > 0 && (
                <div className="vibe-section">
                    <div className="vibe-header">
                        <BarChart3 size={22} />
                        Vibe Scores
                    </div>
                    <div className="vibe-grid">
                        {cafe.vibeScores.map((score, idx) => (
                        <div key={idx} className="radial-card">
                            <div className="radial-circle" style={{ '--val': `${score.score * 10}%` } as any}>
                                <div className="radial-value">{score.score}<span>/10</span></div>
                            </div>
                            <div className="radial-label">{score.label}</div>
                        </div>
                        ))}
                    </div>
                </div>
                )}

                {/* CELEBRITY VISITORS */}
                {cafe.celebrities && cafe.celebrities.length > 0 && (
                <div className="info-card">
                    <h3 className="info-card-title">
                        <Sparkles size={22} />
                        Celebrity Visitors
                    </h3>
                    <div className="celebs-grid">
                        {cafe.celebrities.map(celeb => (
                        <div key={celeb} className="celeb-card">
                            <div className="celeb-avatar">{celeb.substring(0, 2).toUpperCase()}</div>
                            <div className="celeb-info">
                                <h4>{celeb}</h4>
                                <p><Award size={14} /> Verified Visitor</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
                )}

                {/* REVIEWS */}
                {cafe.userReviews && cafe.userReviews.length > 0 && (
                <div>
                    <div className="section-header">
                        <h2 className="section-title">
                            <MessageCircleHeart size={28} />
                            {cafe.userReviews.length} Reviews
                        </h2>
                    </div>

                    <div className="reviews-summary">
                        <div className="overall-rating">
                            <div className="overall-score">{avgRating}</div>
                            <div className="overall-stars">
                                <Star /> <Star /> <Star /> <Star /> <Star />
                            </div>
                            <div className="overall-count">{cafe.userReviews.length} reviews</div>
                        </div>
                    </div>

                    <div className="reviews-list">
                        {cafe.userReviews.map((review, idx) => (
                        <div key={idx} className="review-card">
                            <div className="review-header">
                                <div className="reviewer-info">
                                    <div className="reviewer-avatar">{review.author.charAt(0)}</div>
                                    <div className="reviewer-details">
                                        <h4>{review.author}</h4>
                                        <div className="reviewer-meta">{review.role || 'Guest'} · {review.date}</div>
                                    </div>
                                </div>
                                <div className="review-rating"><Star /><span>{review.rating}.0</span></div>
                            </div>
                            <p className="review-text">{review.text}</p>
                            <div className="review-actions">
                                <div className="review-action"><ThumbsUp size={18} /><span>Helpful</span></div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
                )}
            </div>

            {/* SIDEBAR */}
            <div className="sidebar">
                <div className="sidebar-card">
                    <h3 className="sidebar-title">
                        Visit Info
                    </h3>
                    
                    <div className="info-row">
                        <MapPin size={18} />
                        <div className="info-row-content">
                            <strong>Address</strong>
                            {cafe.address || `${cafe.area}, Hyderabad`}
                        </div>
                    </div>
                    
                    {cafe.phone && cafe.phone !== '#ERROR!' && (
                    <div className="info-row">
                        <Phone size={18} />
                        <div className="info-row-content">
                            <strong>Phone</strong>
                            <a href={`tel:${cafe.phone}`}>{cafe.phone}</a>
                        </div>
                    </div>
                    )}
                    
                    {cafe.website && (
                    <div className="info-row">
                        <Globe size={18} />
                        <div className="info-row-content">
                            <strong>Website</strong>
                            <a href={cafe.website} target="_blank" rel="noreferrer">Visit official site</a>
                        </div>
                    </div>
                    )}

                    <div className="info-row">
                        <div className="info-row-content">
                            <strong>Social Links</strong>
                            <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                                {cafe.socialLink ? (
                                    <a href={cafe.socialLink} target="_blank" rel="noreferrer" style={{ transition: 'opacity 0.2s' }}><NucleoIcon name="instagram" /></a>
                                ) : (
                                    <div style={{ opacity: 0.3, cursor: 'not-allowed' }}><NucleoIcon name="instagram" disabled /></div>
                                )}
                                {cafe.facebookUrl ? (
                                    <a href={cafe.facebookUrl} target="_blank" rel="noreferrer" style={{ transition: 'opacity 0.2s' }}><NucleoIcon name="facebook" /></a>
                                ) : (
                                    <div style={{ opacity: 0.3, cursor: 'not-allowed' }}><NucleoIcon name="facebook" disabled /></div>
                                )}
                                {cafe.twitterUrl ? (
                                    <a href={cafe.twitterUrl} target="_blank" rel="noreferrer" style={{ transition: 'opacity 0.2s' }}><NucleoIcon name="twitter" /></a>
                                ) : (
                                    <div style={{ opacity: 0.3, cursor: 'not-allowed' }}><NucleoIcon name="twitter" disabled /></div>
                                )}
                            </div>
                        </div>
                    </div>

                    {cafe.mapLink && (
                    <a href={cafe.mapLink} target="_blank" rel="noreferrer" className="sidebar-btn sidebar-btn-primary">
                        <Navigation size={18} />
                        Get Directions
                    </a>
                    )}
                </div>

                {cafe.facilities && cafe.facilities.length > 0 && (
                <div className="sidebar-card">
                    <h3 className="sidebar-title">Amenities</h3>
                    <div className="amenities-grid">
                        {cafe.facilities.map(fac => (
                        <div key={fac} className="amenity-item">
                            <CheckCircle2 size={18} />
                            {fac}
                        </div>
                        ))}
                    </div>
                </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
