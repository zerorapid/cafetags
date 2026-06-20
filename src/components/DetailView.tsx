import React, { useState, useEffect } from 'react';
import { Cafe } from '../types';
import './DetailView.css';
import { 
  ArrowLeft, Coffee, Clock, Accessibility, Store, 
  Award, Heart, Camera, PawPrint, BookOpen, UtensilsCrossed,
  Flame, Sparkles, BarChart3, MessageCircleHeart, Star, ThumbsUp,
  MapPin, Phone, Globe, Navigation, Images, CheckCircle2
} from 'lucide-react';

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
            
            <button className="hero-back-btn" onClick={onBack}>
              <ArrowLeft size={16} />
              Back to Directory
            </button>
            
            <div className="hero-chips">
                <div className={`hero-chip ${isClosed ? 'status-closed' : 'status-open'}`}>
                  {isClosed ? 'Closed' : 'Open Now'}
                </div>
                {cafe.tags?.slice(0, 1).map(t => (
                  <div key={t} className="hero-chip" style={{ background: 'rgba(255,255,255,0.2)' }}>{t}</div>
                ))}
            </div>
            
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
                <div className="info-card-item">
                    <div className="info-card-icon coffee"><Coffee size={22} /></div>
                    <div className="info-card-text">
                        <h3>{cafe.signature || "Specialty Brews"}</h3>
                        <p>Signature Offering</p>
                    </div>
                </div>
                <div className="info-card-item">
                    <div className="info-card-icon clock"><Clock size={22} /></div>
                    <div className="info-card-text">
                        <h3>{cafe.timings || "Check hours online"}</h3>
                        <p>Opening Hours</p>
                    </div>
                </div>
                <div className="info-card-item">
                    <div className="info-card-icon access"><Accessibility size={22} /></div>
                    <div className="info-card-text">
                        <h3>{cafe.aestheticType || "Premium Vibe"}</h3>
                        <p>Aesthetic Style</p>
                    </div>
                </div>
                <div className="info-card-item">
                    <div className="info-card-icon store"><Store size={22} /></div>
                    <div className="info-card-text">
                        <h3>Est. {cafe.founded || "Recently Opened"}</h3>
                        <p>{cafe.crowd || "All are welcome"}</p>
                    </div>
                </div>
            </div>
        </section>

        {/* VERDICT SECTION */}
        <section className="verdict-section">
            <div className="verdict-label">
                <Award size={18} />
                CafeTags Verdict
            </div>
            <h2 className="verdict-title">{cafe.curatorNote || `A standout destination in ${cafe.area} blending modern design with exceptional hospitality.`}</h2>
            <p className="verdict-description">
                {cafe.neighbourhoodGuide || "Perfect for remote workers, casual dates, and photography sessions. The meticulously designed layout creates an unmatched ambiance."}
            </p>
            <div className="verdict-tags">
                <div className="verdict-tag"><Heart size={18} /> Dates</div>
                <div className="verdict-tag"><Camera size={18} /> Photography</div>
                {(cafe.facilities || []).includes('Pet Friendly') && <div className="verdict-tag"><PawPrint size={18} /> Pet Owners</div>}
                <div className="verdict-tag"><Coffee size={18} /> Coffee Lovers</div>
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
                        About the Business
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
                        <MapPin size={22} />
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
