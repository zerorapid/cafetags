import React, { useState, useEffect } from 'react';
import { Cafe } from '../types';
import './DetailView.css';
import { OptimizedImage } from './OptimizedImage';
import { ImageLightbox } from './ImageLightbox';
import { 
  ArrowLeft, Coffee, Clock, Accessibility, Store, 
  Award, Heart, Camera, PawPrint, BookOpen, UtensilsCrossed,
  Flame, Sparkles, BarChart3, MessageCircleHeart, Star, ThumbsUp,
  MapPin, Phone, Globe, Navigation, Images, CheckCircle2,
  Instagram, Facebook, Twitter, Share2, MessageSquare
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
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
    );
    return null;
}

const DraggableCarousel = ({ children }: { children: React.ReactNode }) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const onMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
        setScrollLeft(scrollRef.current?.scrollLeft || 0);
    };

    const onMouseLeave = () => setIsDragging(false);
    const onMouseUp = () => setIsDragging(false);

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
        const walk = (x - startX) * 2;
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    return (
        <div 
            className={`carousel-container ${isDragging ? 'dragging' : ''}`}
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
        >
            <div className="carousel-track">
                {children}
            </div>
        </div>
    );
};

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
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [cafe]);

  // Fallback images array
  const allImages = [cafe.image, ...(cafe.moreImages || []), ...(cafe.menuImages || [])].filter(Boolean);
  const getImg = (idx: number) => allImages[idx] || cafe.image;
  const isClosed = cafe.status === 'closed' || cafe.status === 'shutdown';

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeTab, setActiveTab] = useState(allImages.length > 1 ? 'gallery' : 'about');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showSection = (tabId: string) => !isMobile || activeTab === tabId;

  // Calculate random/mock rating stats if reviews exist, else default
  const reviewCount = cafe.userReviews?.length || 0;
  const avgRating = reviewCount > 0 ? (cafe.userReviews!.reduce((acc, r) => acc + r.rating, 0) / reviewCount).toFixed(1) : '4.8';

  return (
    <div className="lookbook-container">
      <div className="main-container">

        {/* HERO SECTION */}
        <section className="hero-section">
            <div className="hero-bg overflow-hidden">
                <OptimizedImage src={cafe.image} alt={cafe.name} className="absolute inset-0 w-full h-full z-0" imageClassName="w-full h-full object-cover" />
            </div>
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
                
                <div className="verdict-card-container">
                    <div className="verdict-card-content">
                        <div className="verdict-label-premium">
                            ☕ CafeTags Verdict
                        </div>
                        <h3 className="verdict-headline">{cafe.curatorNote || `A standout destination in ${cafe.area} blending modern design with exceptional hospitality.`}</h3>
                        <p className="verdict-desc-premium">
                            {cafe.neighbourhoodGuide || "Perfect for remote workers, casual dates, and photography sessions."}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* MOBILE TABS */}
        {isMobile && (
          <div className="mobile-tabs-container">
            <div className="mobile-tabs">
              {allImages.length > 1 && <button onClick={() => setActiveTab('gallery')} className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}>Photo Gallery</button>}
              <button onClick={() => setActiveTab('about')} className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}>About Cafe</button>
              <button onClick={() => setActiveTab('visit')} className={`tab-btn ${activeTab === 'visit' ? 'active' : ''}`}>Visit Info</button>
              {cafe.featuredMenu && cafe.featuredMenu.length > 0 && <button onClick={() => setActiveTab('menu')} className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`}>Menu Card</button>}
              {cafe.vibeScores && cafe.vibeScores.length > 0 && <button onClick={() => setActiveTab('vibes')} className={`tab-btn ${activeTab === 'vibes' ? 'active' : ''}`}>Vibe Scores</button>}
              {cafe.userReviews && cafe.userReviews.length > 0 && <button onClick={() => setActiveTab('reviews')} className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}>Reviews</button>}
            </div>
          </div>
        )}

        {/* PHOTO GALLERY - BENTO GRID */}
        {showSection('gallery') && allImages.length > 1 && (
        <section className="gallery-section">
            <div className="section-header">
                <h2 className="section-title">
                    <Images size={28} />
                    Photo Gallery
                </h2>
            </div>
            
            <div className="bento-grid">
                <div className="bento-item area-hero relative cursor-pointer" onClick={() => setLightboxImage(getImg(0))}>
                    <OptimizedImage src={getImg(0)} alt="Ambiance" className="absolute inset-0 w-full h-full z-0" imageClassName="w-full h-full object-cover" />
                    <span className="bento-label">Ambiance</span>
                </div>
                <div className="bento-item area-tall relative cursor-pointer" onClick={() => setLightboxImage(getImg(1))}>
                    <OptimizedImage src={getImg(1)} alt="Interior" className="absolute inset-0 w-full h-full z-0" imageClassName="w-full h-full object-cover" />
                    <span className="bento-label">Interior</span>
                </div>
                <div className="bento-item area-3 relative cursor-pointer" onClick={() => setLightboxImage(getImg(2))}>
                    <OptimizedImage src={getImg(2)} alt="Details" className="absolute inset-0 w-full h-full z-0" imageClassName="w-full h-full object-cover" />
                    <span className="bento-label">Details</span>
                </div>
                <div className="bento-item area-4 relative cursor-pointer" onClick={() => setLightboxImage(getImg(3))}>
                    <OptimizedImage src={getImg(3)} alt="Food & Drinks" className="absolute inset-0 w-full h-full z-0" imageClassName="w-full h-full object-cover" />
                    <span className="bento-label">Food & Drinks</span>
                </div>
                <div className="bento-item area-5 relative cursor-pointer" onClick={() => setLightboxImage(getImg(4))}>
                    <OptimizedImage src={getImg(4)} alt="More" className="absolute inset-0 w-full h-full z-0" imageClassName="w-full h-full object-cover" />
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
                {showSection('about') && (
                <div className="info-card">
                    <h3 className="info-card-title">
                        <BookOpen size={24} color="var(--accent)" />
                        About Cafe
                    </h3>
                    <p className="about-text">
                        {cafe.vibe}
                    </p>
                    
                    <div className="about-highlights">
                        {cafe.facilities?.map(facility => (
                        <div key={facility} className="about-highlight">
                            <CheckCircle2 size={18} />
                            <span>{facility}</span>
                        </div>
                        ))}
                    </div>
                </div>
                )}

                {/* MENU CARD */}
                {showSection('menu') && cafe.featuredMenu && cafe.featuredMenu.length > 0 && (
                <div className="menu-card-container">
                    <h3 className="info-card-title">
                        <Coffee size={24} color="var(--accent)" />
                        Menu Card
                    </h3>

                    {cafe.featuredMenu.length > 0 && (
                    <>
                        <h3 className="menu-section-title">
                            Signature Dishes
                        </h3>

                        <div className="signature-row">
                            {cafe.featuredMenu.slice(0, 3).map((item, idx) => (
                            <div key={`sig-${idx}`} className="sig-card">
                                <div className="sig-card-img cursor-pointer" onClick={() => cafe.menuImages?.[idx] && setLightboxImage(cafe.menuImages[idx])}>
                                    {cafe.menuImages?.[idx] ? (
                                        <img src={cafe.menuImages[idx]} alt={item.name} loading="lazy" />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', background: 'var(--bg-light-gray)' }}></div>
                                    )}
                                </div>
                                <div className="sig-details">
                                    <span className="sig-name">Menu {String(idx + 1).padStart(2, '0')}</span>
                                    <span className="price-tag">{item.price}</span>
                                </div>
                            </div>
                            ))}
                        </div>
                    </>
                    )}

                    {cafe.featuredMenu.length > 0 && (
                    <>
                        <h3 className="menu-section-title">
                            Browse Menu
                        </h3>

                        <div className="carousel-wrapper">
                            <DraggableCarousel>
                                {cafe.featuredMenu.map((item, idx) => (
                                <div key={`browse-${idx}`} className="menu-carousel-item">
                                    <div className="menu-img cursor-pointer" onClick={() => cafe.menuImages?.[idx] && setLightboxImage(cafe.menuImages[idx])}>
                                        {cafe.menuImages?.[idx] ? (
                                            <img src={cafe.menuImages[idx]} alt={item.name} draggable="false" />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', background: 'var(--bg-light-gray)' }}></div>
                                        )}
                                    </div>
                                    <div className="menu-label">Menu {String(idx + 1).padStart(2, '0')}</div>
                                </div>
                                ))}
                            </DraggableCarousel>
                        </div>
                    </>
                    )}
                </div>
                )}

                {/* VIBE SCORES */}
                {showSection('vibes') && cafe.vibeScores && cafe.vibeScores.length > 0 && (
                <div className="vibe-scores-container">
                    <div className="vibe-header">
                        <div className="vibe-icon-wrapper">
                            <Coffee size={24} color="var(--accent)" />
                        </div>
                        <h2>Vibe Scores</h2>
                    </div>

                    <div className="vibe-grid">
                        {cafe.vibeScores.map((score, idx) => {
                            const labelLower = score.label.toLowerCase();
                            let IconComponent = Star;
                            if (labelLower.includes('taste') || labelLower.includes('coffee') || labelLower.includes('food')) IconComponent = Coffee;
                            else if (labelLower.includes('ambiance') || labelLower.includes('vibe')) IconComponent = Sparkles;
                            else if (labelLower.includes('heritage') || labelLower.includes('history')) IconComponent = BookOpen;
                            else if (labelLower.includes('value') || labelLower.includes('price')) IconComponent = Award;
                            else if (labelLower.includes('work') || labelLower.includes('wifi')) IconComponent = Store;
                            
                            return (
                                <div key={idx} className="vibe-card">
                                    <div className="vibe-card-icon">
                                        {score.icon ? (
                                            <img src={score.icon} alt={score.label} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                                        ) : (
                                            <IconComponent size={24} />
                                        )}
                                    </div>
                                    <div className="vibe-card-value">{score.score}</div>
                                    <div className="vibe-card-label">{score.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                )}

                {/* CELEBRITY VISITORS */}
                {showSection('about') && cafe.celebrities && cafe.celebrities.length > 0 && (
                <div className="info-card">
                    <h3 className="info-card-title">
                        <Sparkles size={24} color="var(--accent)" />
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
                {showSection('reviews') && cafe.userReviews && cafe.userReviews.length > 0 && (
                <div className="reviews-container">
                    <div className="reviews-header">
                        <MessageSquare size={24} color="var(--accent)" />
                        <h2>Reviews</h2>
                    </div>

                    <div className="rating-summary">
                        <div className="rating-number">{avgRating}</div>
                        <div>
                            <div className="stars">
                                <Star fill="#f59e0b" stroke="none" size={16} />
                                <Star fill="#f59e0b" stroke="none" size={16} />
                                <Star fill="#f59e0b" stroke="none" size={16} />
                                <Star fill="#f59e0b" stroke="none" size={16} />
                                <Star fill="#f59e0b" stroke="none" size={16} />
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{cafe.userReviews.length} reviews</div>
                        </div>
                    </div>

                    {cafe.userReviews.map((review, idx) => (
                    <div key={idx} className="review-card">
                        <div className="user-info">
                            <div className="user-profile">
                                <div className="avatar" style={{ background: idx % 2 === 0 ? '#0f172a' : '#64748b' }}>{review.author.charAt(0)}</div>
                                <div className="user-details">
                                    <h4>{review.author}</h4>
                                    <p>{review.role || 'Guest'} • {review.date}</p>
                                </div>
                            </div>
                            <div className="badge"><Star size={12} fill="currentColor" stroke="none" /> {review.rating % 1 === 0 ? review.rating + ".0" : review.rating}</div>
                        </div>
                        <p className="review-text">{review.text}</p>
                        <div className="helpful"><ThumbsUp size={16} /> Helpful</div>
                    </div>
                    ))}
                </div>
                )}
            </div>

            {/* SIDEBAR */}
            {showSection('visit') && (
            <div className="sidebar">
                <div className="sidebar-card visit-card">
                    <h3 className="sidebar-title">
                        <Navigation size={24} color="var(--accent)" />
                        Visit Info
                    </h3>
                    
                    <div className="info-group">
                        <div className="icon-box"><MapPin size={20} /></div>
                        <div className="info-content">
                            <h4>Address</h4>
                            <p>{cafe.address ? cafe.address : (cafe.area ? `${cafe.area}, Hyderabad` : '123 Lorem Ipsum Street, Cafe District, Hyderabad')}</p>
                        </div>
                    </div>
                    
                    <div className="info-group">
                        <div className="icon-box"><Phone size={20} /></div>
                        <div className="info-content">
                            <h4>Phone</h4>
                            <p className="highlight-text">
                                <a href={`tel:${(cafe.phone && cafe.phone !== '#ERROR!') ? cafe.phone : '+919876543210'}`}>
                                    {(cafe.phone && cafe.phone !== '#ERROR!') ? cafe.phone : '+91 98765 43210'}
                                </a>
                            </p>
                        </div>
                    </div>
                    
                    <div className="info-group">
                        <div className="icon-box"><Globe size={20} /></div>
                        <div className="info-content">
                            <h4>Website</h4>
                            <a href={cafe.website || '#'} target="_blank" rel="noreferrer" className="highlight-text">Visit official site</a>
                        </div>
                    </div>

                    <div className="social-section">
                        <div className="social-title">Social Links</div>
                        <div className="social-icons">
                            <a href={cafe.socialLink || '#'} target="_blank" rel="noreferrer" style={!cafe.socialLink ? { opacity: 0.3, pointerEvents: 'none' } : {}}>
                                <NucleoIcon name="instagram" />
                            </a>
                            <a href={cafe.facebookUrl || '#'} target="_blank" rel="noreferrer" style={!cafe.facebookUrl ? { opacity: 0.3, pointerEvents: 'none' } : {}}>
                                <NucleoIcon name="facebook" />
                            </a>
                            <a href={cafe.twitterUrl || '#'} target="_blank" rel="noreferrer" style={!cafe.twitterUrl ? { opacity: 0.3, pointerEvents: 'none' } : {}}>
                                <NucleoIcon name="twitter" />
                            </a>
                        </div>
                    </div>

                    <a href={cafe.mapLink || '#'} target="_blank" rel="noreferrer" className="btn-directions">
                        <Navigation size={18} /> Get Directions
                    </a>
                </div>
            </div>
            )}
        </div>
        </div>

        <ImageLightbox src={lightboxImage} onClose={() => setLightboxImage(null)} />
    </div>
  );
}
