import React, { useState, useEffect } from 'react';
import { Cafe, CafeMenuItem } from '../types';
import './CafeForm.css';

interface CafeFormProps {
  editingCafe: Cafe | null;
  onSave: (cafe: Omit<Cafe, 'id'> | Cafe) => Promise<void> | void;
  onCancel: () => void;
}

export function CafeForm({ editingCafe, onSave, onCancel }: CafeFormProps) {
  const [activeSection, setActiveSection] = useState('section-1');

  // Basic Details
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [founded, setFounded] = useState('2026');
  const [icon, setIcon] = useState('local_cafe');
  const [logo, setLogo] = useState('');
  const [address, setAddress] = useState('');
  const [mapLink, setMapLink] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [timings, setTimings] = useState('8:00 AM - 10:00 PM Everyday');

  // Aesthetic
  const [aestheticType, setAestheticType] = useState('');
  const [vibe, setVibe] = useState('');
  const [crowd, setCrowd] = useState('');
  const [discounts, setDiscounts] = useState('');
  const [signature, setSignature] = useState('');
  const [bookingUrl, setBookingUrl] = useState('');
  const [image, setImage] = useState('');

  // Services
  const [dineIn, setDineIn] = useState(true);
  const [takeaway, setTakeaway] = useState(true);
  const [onlineOrder, setOnlineOrder] = useState(true);
  const [selfDelivery, setSelfDelivery] = useState(false);

  // Spotlights
  const [isFeaturedBanner, setIsFeaturedBanner] = useState(false);
  const [isNewLaunch, setIsNewLaunch] = useState(false);

  // Tags
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const [facilities, setFacilities] = useState<string[]>(['Wi-Fi', 'Power Outlets']);
  const [facilityInput, setFacilityInput] = useState('');

  const [celebrities, setCelebrities] = useState<string[]>([]);
  const [celebInput, setCelebInput] = useState('');

  // Menu
  const [menuItems, setMenuItems] = useState<CafeMenuItem[]>([]);
  const [menuTitle, setMenuTitle] = useState('');
  const [menuPrice, setMenuPrice] = useState('');
  const [menuCategory, setMenuCategory] = useState('Brews');
  const [menuSpecial, setMenuSpecial] = useState(false);
  const [menuImagesInput, setMenuImagesInput] = useState('');

  useEffect(() => {
    if (editingCafe) {
      setName(editingCafe.name || '');
      setArea(editingCafe.area || '');
      setFounded(editingCafe.founded || '2026');
      setIcon(editingCafe.icon || 'local_cafe');
      setLogo(editingCafe.logo || '');
      setAddress(editingCafe.address || '');
      setMapLink(editingCafe.mapLink || '');
      setPhone(editingCafe.phone || '');
      setEmail(editingCafe.email || '');
      setWebsite(editingCafe.website || '');
      setTimings(editingCafe.timings || '');
      
      setAestheticType(editingCafe.aestheticType || '');
      setVibe(editingCafe.vibe || '');
      setCrowd(editingCafe.crowd || '');
      setDiscounts(editingCafe.discounts || '');
      setSignature(editingCafe.signature || '');
      setBookingUrl(editingCafe.bookingUrl || '');
      setImage(editingCafe.image || '');

      setDineIn(editingCafe.dineIn ?? true);
      setTakeaway(editingCafe.takeaway ?? true);
      setOnlineOrder(editingCafe.onlineOrder ?? true);
      setSelfDelivery(editingCafe.selfDelivery ?? false);

      setIsFeaturedBanner(editingCafe.isFeaturedBanner ?? false);
      setIsNewLaunch(editingCafe.isNewLaunch ?? false);

      setTags(editingCafe.tags || []);
      setFacilities(editingCafe.facilities || []);
      setCelebrities(editingCafe.celebrities || []);
      setMenuItems(editingCafe.featuredMenu || []);
      setMenuImagesInput(editingCafe.menuImages ? editingCafe.menuImages.join(', ') : '');
    }
  }, [editingCafe]);

  const handleAddTag = (e: React.MouseEvent) => {
    e.preventDefault();
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleAddFacility = (e: React.MouseEvent) => {
    e.preventDefault();
    if (facilityInput && !facilities.includes(facilityInput)) {
      setFacilities([...facilities, facilityInput]);
      setFacilityInput('');
    }
  };

  const handleAddCeleb = (e: React.MouseEvent) => {
    e.preventDefault();
    if (celebInput && !celebrities.includes(celebInput)) {
      setCelebrities([...celebrities, celebInput]);
      setCelebInput('');
    }
  };

  const handleAddMenuItem = (e: React.MouseEvent) => {
    e.preventDefault();
    if (menuTitle && menuPrice) {
      setMenuItems([...menuItems, { name: menuTitle, price: menuPrice, category: menuCategory, isSpecial: menuSpecial }]);
      setMenuTitle('');
      setMenuPrice('');
      setMenuSpecial(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cafeData: any = {
      name, area, founded, icon, logo, address, mapLink, phone, email, website, timings,
      aestheticType, vibe, crowd, discounts, signature, bookingUrl, image,
      dineIn, takeaway, onlineOrder, selfDelivery,
      isFeaturedBanner, isNewLaunch,
      tags, facilities, celebrities, featuredMenu: menuItems,
      menuImages: menuImagesInput.split(',').map(s => s.trim()).filter(Boolean),
      userReviews: editingCafe ? editingCafe.userReviews : []
    };

    if (editingCafe) {
      cafeData.id = editingCafe.id;
    } else {
      cafeData.id = Date.now();
    }

    await onSave(cafeData);
  };

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="cafe-form-container">
      {/* ═══════════ SIDEBAR ══════════ */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="badge">Drafting Fresh Curation</span>
          <h2>Catalog New Fine Coffee Spot</h2>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-label">Form Sections</div>

          <button type="button" onClick={() => scrollTo('section-1')} className={`nav-item ${activeSection === 'section-1' ? 'active' : ''}`}>
            <span className="nav-icon">1</span>
            <span>Identity & Coordinates</span>
            <span className="nav-status"></span>
          </button>

          <button type="button" onClick={() => scrollTo('section-2')} className={`nav-item ${activeSection === 'section-2' ? 'active' : ''}`}>
            <span className="nav-icon">2</span>
            <span>Aesthetic & Media</span>
            <span className="nav-status"></span>
          </button>

          <button type="button" onClick={() => scrollTo('section-3')} className={`nav-item ${activeSection === 'section-3' ? 'active' : ''}`}>
            <span className="nav-icon">3</span>
            <span>Services & Operations</span>
            <span className="nav-status"></span>
          </button>

          <button type="button" onClick={() => scrollTo('section-5')} className={`nav-item ${activeSection === 'section-5' ? 'active' : ''}`}>
            <span className="nav-icon">4</span>
            <span>Menu Items</span>
            <span className="nav-status"></span>
          </button>
        </nav>

      </aside>

      {/* ══════════ MAIN CONTENT ═══════════ */}
      <main className="main">
        <div className="page-header">
          <h1>Catalog New Fine Coffee Spot</h1>
          <p>Fill in the details below to list your cafe on the lookbook platform.</p>
        </div>

        <form id="cafe_catalog_form" onSubmit={handleSubmit}>
          
          {/* ─── Section 1: Identity ─── */}
          <section className="section-card" id="section-1">
            <div className="section-header">
              <div className="section-number">1</div>
              <div className="section-header-text">
                <h3>Registry Identity &amp; Coordinates</h3>
                <p>Basic information to identify and locate your cafe.</p>
              </div>
            </div>

            <div className="form-grid-4">
              <div className="field">
                <label>Cafe Name <span className="req">*</span></label>
                <input type="text" placeholder="e.g. True Black Specialty Coffee" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="field">
                <label>District Area <span className="req">*</span></label>
                <input type="text" placeholder="e.g. Jubilee Hills" value={area} onChange={e => setArea(e.target.value)} required />
              </div>
              <div className="field">
                <label>Established Year <span className="req">*</span></label>
                <input type="text" value={founded} onChange={e => setFounded(e.target.value)} required />
              </div>
              <div className="field">
                <label>Brand Icon <span className="req">*</span></label>
                <input type="text" placeholder="e.g. local_cafe" value={icon} onChange={e => setIcon(e.target.value)} required />
              </div>
            </div>

            <div style={{ height: '20px' }}></div>

            <div className="form-grid">
              <div className="field">
                <label>Brand Logo URL</label>
                <input type="text" placeholder="https://..." value={logo} onChange={e => setLogo(e.target.value)} />
              </div>
            </div>

            <div style={{ height: '20px' }}></div>

            <div className="form-grid">
              <div className="field">
                <label>Street Address <span className="req">*</span></label>
                <input type="text" placeholder="Full Address" value={address} onChange={e => setAddress(e.target.value)} required />
              </div>
              <div className="field">
                <label>Maps Deep Link</label>
                <input type="text" placeholder="https://maps.app.goo.gl/..." value={mapLink} onChange={e => setMapLink(e.target.value)} />
              </div>
            </div>

            <div style={{ height: '20px' }}></div>

            <div className="form-grid-4">
              <div className="field">
                <label>Phone Direct Line</label>
                <input type="text" placeholder="+91 XXXXX XXXXX" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div className="field">
                <label>Reservation Email</label>
                <input type="text" placeholder="desk@cafe.co" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="field">
                <label>Official Website</label>
                <input type="text" placeholder="https://cafe.co" value={website} onChange={e => setWebsite(e.target.value)} />
              </div>
              <div className="field">
                <label>Dine-Out Timings</label>
                <input type="text" placeholder="8:00 AM – 10:00 PM Everyday" value={timings} onChange={e => setTimings(e.target.value)} />
              </div>
            </div>
          </section>

          {/* ─── Section 2: Aesthetic & Media ─── */}
          <section className="section-card" id="section-2">
            <div className="section-header">
              <div className="section-number">2</div>
              <div className="section-header-text">
                <h3>Aesthetic Persona, Media &amp; Spotlights</h3>
                <p>Define the vibe, upload visuals, and set spotlight preferences.</p>
              </div>
            </div>

            <div className="split-layout">
              <div className="split-form">
                <div className="field">
                  <label>Aesthetic Designs Archetype <span className="req">*</span></label>
                  <input type="text" placeholder="e.g. Scandi Wabi-Sabi & Acoustic Cedar Timber" value={aestheticType} onChange={e => setAestheticType(e.target.value)} required />
                </div>

                <div className="field">
                  <label>Aesthetic Vibe Analysis <span className="req">*</span></label>
                  <textarea placeholder="Describe the architectural texture, shadows, study desk comfort, lighting temperature..." value={vibe} onChange={e => setVibe(e.target.value)} required></textarea>
                </div>

                <div className="form-grid">
                  <div className="field">
                    <label>Target Crowd / Audience</label>
                    <input type="text" placeholder="e.g. Writers, researchers, builders" value={crowd} onChange={e => setCrowd(e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Privilege Offers / Codes</label>
                    <input type="text" placeholder="e.g. Flat 10% for members" value={discounts} onChange={e => setDiscounts(e.target.value)} />
                  </div>
                </div>

                <div className="form-grid-3">
                  <div className="field">
                    <label>Signature Master Brew <span className="req">*</span></label>
                    <input type="text" placeholder="e.g. Kyoto 12-hr Slow Drip" value={signature} onChange={e => setSignature(e.target.value)} required />
                  </div>
                  <div className="field" style={{ gridColumn: 'span 2' }}>
                    <label>Swiggy / Dineout Link</label>
                    <input type="text" placeholder="https://swiggy.com/dineout/hyd" value={bookingUrl} onChange={e => setBookingUrl(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="split-preview">
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Card Cover Image <span className="req">*</span></label>
                  <div className="field">
                    <input type="text" placeholder="https://images.unsplash.com/..." value={image} onChange={e => setImage(e.target.value)} required />
                  </div>
                </div>

                {image && (
                  <div className="preview-card">
                    <img src={image} alt="Cafe Preview" />
                    <div className="preview-info">
                      <div className="preview-label">Image Source</div>
                      <div className="preview-url">{image.substring(0, 40)}...</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ─── Section 3: Services ─── */}
          <section className="section-card" id="section-3">
            <div className="section-header">
              <div className="section-number">3</div>
              <div className="section-header-text">
                <h3>Operational Modalities &amp; Services</h3>
                <p>Configure available services, spotlights, and facility tags.</p>
              </div>
            </div>

            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '12px' }}>Available Services</label>
            <div className="services-grid">
              <label className={`service-chip ${dineIn ? 'checked' : ''}`} onClick={() => setDineIn(!dineIn)}>
                <span className="check-box">✓</span>
                <span className="service-label">Dine-In Space</span>
              </label>
              <label className={`service-chip ${takeaway ? 'checked' : ''}`} onClick={() => setTakeaway(!takeaway)}>
                <span className="check-box">✓</span>
                <span className="service-label">Takeaway Ready</span>
              </label>
              <label className={`service-chip ${onlineOrder ? 'checked' : ''}`} onClick={() => setOnlineOrder(!onlineOrder)}>
                <span className="check-box">✓</span>
                <span className="service-label">Online / App Ordering</span>
              </label>
              <label className={`service-chip ${selfDelivery ? 'checked' : ''}`} onClick={() => setSelfDelivery(!selfDelivery)}>
                <span className="check-box">✓</span>
                <span className="service-label">Self Home Delivery</span>
              </label>
            </div>

            <div style={{ height: '24px' }}></div>

            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '12px' }}>Spotlight Toggles</label>
            <div className="toggle-grid">
              <div className="toggle-card" onClick={() => setIsFeaturedBanner(!isFeaturedBanner)}>
                <div className="toggle-text">
                  <h5>Hero Spotlight Banner</h5>
                  <p>Pin inside the cinematic home landing carousel.</p>
                </div>
                <div className={`toggle-switch ${isFeaturedBanner ? 'on' : ''}`}></div>
              </div>
              <div className="toggle-card" onClick={() => setIsNewLaunch(!isNewLaunch)}>
                <div className="toggle-text">
                  <h5>Newly Launched Ticker</h5>
                  <p>Feature on the newly launched sliding deck.</p>
                </div>
                <div className={`toggle-switch ${isNewLaunch ? 'on' : ''}`}></div>
              </div>
            </div>

            <div style={{ height: '24px' }}></div>

            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '16px' }}>Tags &amp; Facilities</label>
            <div className="tag-section">
              <div className="tag-block">
                <label>Cafe Chip Archive Tags</label>
                <div className="tag-input-row">
                  <input type="text" placeholder="Type then add..." value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if(e.key==='Enter') handleAddTag(e as any) }} />
                  <button type="button" className="btn-add-tag" onClick={handleAddTag}>Add</button>
                </div>
                <div className="tag-chips">
                  {tags.map((t, i) => (
                    <span key={i} className="chip active">
                      {t} <span className="chip-remove" onClick={() => setTags(tags.filter((_, idx) => idx !== i))}>×</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="tag-block">
                <label>Famous Celebs Observed</label>
                <div className="tag-input-row">
                  <input type="text" placeholder="e.g. Rana Daggubati" value={celebInput} onChange={e => setCelebInput(e.target.value)} onKeyDown={e => { if(e.key==='Enter') handleAddCeleb(e as any) }} />
                  <button type="button" className="btn-add-tag" onClick={handleAddCeleb}>Add</button>
                </div>
                <div className="tag-chips">
                  {celebrities.map((c, i) => (
                    <span key={i} className="chip active">
                      {c} <span className="chip-remove" onClick={() => setCelebrities(celebrities.filter((_, idx) => idx !== i))}>×</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="tag-block">
                <label>Workstation Facilities</label>
                <div className="tag-input-row">
                  <input type="text" placeholder="Custom amenity..." value={facilityInput} onChange={e => setFacilityInput(e.target.value)} onKeyDown={e => { if(e.key==='Enter') handleAddFacility(e as any) }} />
                  <button type="button" className="btn-add-tag" onClick={handleAddFacility}>Add</button>
                </div>
                <div className="tag-chips">
                  {facilities.map((f, i) => (
                    <span key={i} className="chip active">
                      ✓ {f} <span className="chip-remove" onClick={() => setFacilities(facilities.filter((_, idx) => idx !== i))}>×</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ─── Section 5: Menu ─── */}
          <section className="section-card" id="section-5">
            <div className="section-header">
              <div className="section-number">4</div>
              <div className="section-header-text">
                <h3>Curated Gastronomy Menu Items</h3>
                <p>Enter specialty food and beverage items with pricing.</p>
              </div>
            </div>

            <div className="menu-grid">
              <div className="menu-form-panel">
                <h4>Original Menu Cards (Images)</h4>
                <div className="field">
                  <label>Menu Image URLs (comma separated)</label>
                  <input type="text" placeholder="https://img1.jpg, https://img2.jpg" value={menuImagesInput} onChange={e => setMenuImagesInput(e.target.value)} />
                </div>
                <div style={{ height: '24px' }}></div>
                
                <h4>Draft Gastronomy Brew Item</h4>

                <div className="field">
                  <label>Item Title</label>
                  <input type="text" placeholder="e.g. Cranberry espresso tonic" value={menuTitle} onChange={e => setMenuTitle(e.target.value)} />
                </div>

                <div className="form-grid" style={{ gap: '14px', marginTop: '14px' }}>
                  <div className="field">
                    <label>Price Indicator</label>
                    <input type="text" placeholder="e.g. ₹280" value={menuPrice} onChange={e => setMenuPrice(e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Category Type</label>
                    <select value={menuCategory} onChange={e => setMenuCategory(e.target.value)}>
                      <option>Brews</option>
                      <option>Patisserie</option>
                      <option>Mains</option>
                      <option>Desserts</option>
                    </select>
                  </div>
                </div>

                <label className="popular-check" onClick={() => setMenuSpecial(!menuSpecial)} style={{ marginTop: '14px' }}>
                  <input type="checkbox" checked={menuSpecial} onChange={() => {}} />
                  <span>⭐ Mark as Hero Signature Beverage (Popular)</span>
                </label>

                <button type="button" className="btn-add-menu-item" onClick={handleAddMenuItem}>Add Fresh Item to Card Menu</button>
              </div>

              <div className="catalog-panel">
                <h4>Compiled Gastronomy Catalog</h4>

                {menuItems.map((item, idx) => (
                  <div key={idx} className="catalog-item">
                    <div className="catalog-thumb">🍴</div>
                    <div className="catalog-details">
                      <div className="item-name">
                        {item.name}
                        {item.isSpecial && <span className="pop-tag">Popular</span>}
                      </div>
                      <div className="item-cat">{item.category}</div>
                    </div>
                    <div className="catalog-price">{item.price}</div>
                    <button type="button" className="catalog-delete" onClick={() => setMenuItems(menuItems.filter((_, i) => i !== idx))}>🗑</button>
                  </div>
                ))}
                
                {menuItems.length === 0 && <p className="text-sm text-gray-400 italic">No menu items added yet.</p>}
              </div>
            </div>
          </section>

        </form>
        {/* ═══════════ FLOATING ACTION BAR ═══════════ */}
        <div className="action-bar">
          <button type="submit" form="cafe_catalog_form" className="btn-action primary">
            {editingCafe ? "Update Lookbook Listing" : "Save Lookbook Catalog Listing"}
          </button>
          <button type="button" onClick={onCancel} className="btn-action secondary" style={{ marginLeft: '12px' }}>Discard Changes</button>
        </div>
      </main>
    </div>
  );
}
