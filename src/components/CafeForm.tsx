import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Cafe, CafeMenuItem } from '../types';
import './CafeForm.css';
import { ImageUploadField } from './ImageUploadField';

const cafeSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  area: z.string().min(2, 'Area is required'),
  founded: z.string().min(4, 'Founded year is required'),
  icon: z.string().min(2, 'Icon is required'),
  logo: z.string().optional(),
  address: z.string().min(5, 'Address is required'),
  mapLink: z.string().optional(),
  directionsTip: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  website: z.string().optional(),
  timings: z.string().optional(),
  socialLink: z.string().optional(),
  facebookUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  aestheticType: z.string().min(2, 'Aesthetic Type is required'),
  vibe: z.string().min(10, 'Vibe analysis is required'),
  curatorNote: z.string().optional(),
  vibeScoresInput: z.string().optional(),
  neighbourhoodGuide: z.string().optional(),
  crowd: z.string().optional(),
  discounts: z.string().optional(),
  signature: z.string().min(2, 'Signature brew is required'),
  bookingUrl: z.string().optional(),
  image: z.string().min(5, 'Main image is required'),
  videoUrl: z.string().optional(),
  status: z.enum(['open', 'closed', 'renovating', 'shutdown']).default('open'),
  dineIn: z.boolean().default(true),
  takeaway: z.boolean().default(true),
  onlineOrder: z.boolean().default(true),
  selfDelivery: z.boolean().default(false),
  isFeaturedBanner: z.boolean().default(false),
  bannerCatchyLine: z.string().optional(),
  isNewLaunch: z.boolean().default(false),
  newLaunchCatchyline: z.string().optional(),
  
  // Arrays managed via local state or custom handlers
  tags: z.array(z.string()).optional(),
  facilities: z.array(z.string()).optional(),
  celebrities: z.array(z.string()).optional(),
  featuredMenu: z.any().optional(),
  menuImages: z.array(z.string()).optional(),
  moreImages: z.array(z.string()).optional(),
  vibeScores: z.any().optional(),
  userReviews: z.any().optional()
});

type CafeFormValues = z.infer<typeof cafeSchema>;

interface CafeFormProps {
  editingCafe: Cafe | null;
  onSave: (cafe: Omit<Cafe, 'id'> | Cafe) => Promise<void> | void;
  onCancel: () => void;
}

export function CafeForm({ editingCafe, onSave, onCancel }: CafeFormProps) {
  const [activeSection, setActiveSection] = useState('section-1');

  // Timings helper state
  const [openTime, setOpenTime] = useState('08:00');
  const [closeTime, setCloseTime] = useState('22:00');
  const [timingDays, setTimingDays] = useState('Everyday');

  // Tags, Facilities, Celebs
  const [tagInput, setTagInput] = useState('');
  const [facilityInput, setFacilityInput] = useState('');
  const [celebInput, setCelebInput] = useState('');

  // Menu helper state
  const [menuTitle, setMenuTitle] = useState('');
  const [menuPrice, setMenuPrice] = useState('');
  const [menuCategory, setMenuCategory] = useState('Brews');
  const [menuSpecial, setMenuSpecial] = useState(false);
  const [menuItemImage, setMenuItemImage] = useState('');

  // Media arrays
  const [gallery1, setGallery1] = useState('');
  const [gallery2, setGallery2] = useState('');
  const [gallery3, setGallery3] = useState('');
  const [gallery4, setGallery4] = useState('');
  const [gallery5, setGallery5] = useState('');

  const [menu1, setMenu1] = useState('');
  const [menu2, setMenu2] = useState('');
  const [menu3, setMenu3] = useState('');
  const [menu4, setMenu4] = useState('');
  const [menu5, setMenu5] = useState('');

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<any>({
    resolver: zodResolver(cafeSchema) as any,
    defaultValues: editingCafe ? {
      ...editingCafe,
      vibeScoresInput: Array.isArray(editingCafe.vibeScores) ? editingCafe.vibeScores.map(v => `${v.label}:${v.score}`).join(', ') : '',
    } : {
      founded: '2026',
      icon: 'local_cafe',
      status: 'open',
      dineIn: true,
      takeaway: true,
      onlineOrder: true,
      selfDelivery: false,
      isFeaturedBanner: false,
      isNewLaunch: false,
      timings: '8:00 AM - 10:00 PM Everyday',
      tags: [],
      facilities: ['Wi-Fi', 'Power Outlets'],
      celebrities: [],
      featuredMenu: []
    }
  });

  const watchDineIn = watch('dineIn');
  const watchTakeaway = watch('takeaway');
  const watchOnlineOrder = watch('onlineOrder');
  const watchSelfDelivery = watch('selfDelivery');
  const watchIsFeaturedBanner = watch('isFeaturedBanner');
  const watchIsNewLaunch = watch('isNewLaunch');
  const watchTags = watch('tags') || [];
  const watchFacilities = watch('facilities') || [];
  const watchCelebrities = watch('celebrities') || [];
  const watchFeaturedMenu = watch('featuredMenu') || [];
  const watchImage = watch('image');

  useEffect(() => {
    if (editingCafe) {
      if (Array.isArray(editingCafe.moreImages)) {
        setGallery1(editingCafe.moreImages[0] || '');
        setGallery2(editingCafe.moreImages[1] || '');
        setGallery3(editingCafe.moreImages[2] || '');
        setGallery4(editingCafe.moreImages[3] || '');
        setGallery5(editingCafe.moreImages[4] || '');
      }
      if (Array.isArray(editingCafe.menuImages)) {
        setMenu1(editingCafe.menuImages[0] || '');
        setMenu2(editingCafe.menuImages[1] || '');
        setMenu3(editingCafe.menuImages[2] || '');
        setMenu4(editingCafe.menuImages[3] || '');
        setMenu5(editingCafe.menuImages[4] || '');
      }
    }
  }, [editingCafe]);

  const handleTimeChange = (type: 'open' | 'close' | 'days', val: string) => {
    let newOpen = openTime;
    let newClose = closeTime;
    let newDays = timingDays;

    if (type === 'open') { newOpen = val; setOpenTime(val); }
    if (type === 'close') { newClose = val; setCloseTime(val); }
    if (type === 'days') { newDays = val; setTimingDays(val); }

    const formatTime = (time: string) => {
      if (!time) return '';
      const [h, m] = time.split(':');
      let hour = parseInt(h, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12 || 12;
      return `${hour}:${m} ${ampm}`;
    };

    setValue('timings', `${formatTime(newOpen)} - ${formatTime(newClose)} ${newDays}`);
  };

  const handleAddTag = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (tagInput && !watchTags.includes(tagInput)) {
      setValue('tags', [...watchTags, tagInput]);
      setTagInput('');
    }
  };

  const handleAddFacility = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (facilityInput && !watchFacilities.includes(facilityInput)) {
      setValue('facilities', [...watchFacilities, facilityInput]);
      setFacilityInput('');
    }
  };

  const handleAddCeleb = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (celebInput && !watchCelebrities.includes(celebInput)) {
      setValue('celebrities', [...watchCelebrities, celebInput]);
      setCelebInput('');
    }
  };

  const handleAddMenuItem = (e: React.MouseEvent) => {
    e.preventDefault();
    if (menuTitle && menuPrice) {
      setValue('featuredMenu', [...watchFeaturedMenu, { name: menuTitle, price: menuPrice, category: menuCategory, isSpecial: menuSpecial, image: menuItemImage }]);
      setMenuTitle('');
      setMenuPrice('');
      setMenuSpecial(false);
      setMenuItemImage('');
    }
  };

  const onSubmit = async (data: CafeFormValues) => {
    const moreImages = [gallery1, gallery2, gallery3, gallery4, gallery5].map(s => s.trim()).filter(Boolean);
    const menuImages = [menu1, menu2, menu3, menu4, menu5].map(s => s.trim()).filter(Boolean);

    let parsedVibeScores: {label: string, score: number}[] = [];
    if (data.vibeScoresInput) {
      parsedVibeScores = data.vibeScoresInput.split(',')
        .map(s => s.trim())
        .filter(Boolean)
        .map(s => {
          const parts = s.split(':');
          return { label: parts[0]?.trim() || '', score: parseFloat(parts[1]) || 0 };
        });
    }

    const cafeData: any = {
      ...data,
      menuImages,
      moreImages,
      vibeScores: parsedVibeScores,
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
      {/* ══════════ MAIN CONTENT ═══════════ */}
      <main className="main">
        <div className="page-header">
          <h1>Catalog New Fine Coffee Spot</h1>
          <p>Fill in the details below to list your cafe on the lookbook platform.</p>
        </div>

        <form id="cafe_catalog_form" onSubmit={handleSubmit(onSubmit)}>
          
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
                <input type="text" placeholder="e.g. True Black Specialty Coffee" {...register('name')} />
                {errors.name && <span className="text-red-500 text-[10px] mt-1">{errors.name.message}</span>}
              </div>
              <div className="field">
                <label>District Area <span className="req">*</span></label>
                <input type="text" placeholder="e.g. Jubilee Hills" {...register('area')} />
                {errors.area && <span className="text-red-500 text-[10px] mt-1">{errors.area.message}</span>}
              </div>
              <div className="field">
                <label>Established Date <span className="req">*</span></label>
                <input type="date" {...register('founded')} />
                {errors.founded && <span className="text-red-500 text-[10px] mt-1">{errors.founded.message}</span>}
              </div>
              <div className="field">
                <label>Brand Icon <span className="req">*</span></label>
                <input type="text" placeholder="e.g. local_cafe" {...register('icon')} />
                {errors.icon && <span className="text-red-500 text-[10px] mt-1">{errors.icon.message}</span>}
              </div>
            </div>

            <div style={{ height: '20px' }}></div>

            <div className="form-grid">
              <div className="field">
                <label>Brand Logo URL</label>
                <Controller
                  name="logo"
                  control={control}
                  render={({ field }) => <ImageUploadField placeholder="https://..." value={field.value || ''} onChange={field.onChange} />}
                />
              </div>
            </div>

            <div style={{ height: '20px' }}></div>

            <div className="form-grid">
              <div className="field">
                <label>Street Address <span className="req">*</span></label>
                <input type="text" placeholder="Full Address" {...register('address')} />
                {errors.address && <span className="text-red-500 text-[10px] mt-1">{errors.address.message}</span>}
              </div>
              <div className="field">
                <label>Maps Deep Link</label>
                <input type="text" placeholder="https://maps.app.goo.gl/..." {...register('mapLink')} />
              </div>
              <div className="field" style={{ gridColumn: 'span 2' }}>
                <label>Directions Tip</label>
                <input type="text" placeholder="e.g. Park near the old oak tree" {...register('directionsTip')} />
              </div>
            </div>

            <div style={{ height: '20px' }}></div>

            <div className="form-grid-4">
              <div className="field">
                <label>Phone Direct Line</label>
                <input type="text" placeholder="+91 XXXXX XXXXX" {...register('phone')} />
              </div>
              <div className="field">
                <label>Reservation Email</label>
                <input type="text" placeholder="desk@cafe.co" {...register('email')} />
              </div>
              <div className="field">
                <label>Official Website</label>
                <input type="text" placeholder="https://cafe.co" {...register('website')} />
              </div>
              <div className="field">
                <label>Dine-Out Timings</label>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <input type="time" value={openTime} onChange={e => handleTimeChange('open', e.target.value)} style={{ padding: '6px' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>to</span>
                  <input type="time" value={closeTime} onChange={e => handleTimeChange('close', e.target.value)} style={{ padding: '6px' }} />
                </div>
                <div style={{ marginTop: '8px' }}>
                  <select value={timingDays} onChange={e => handleTimeChange('days', e.target.value)} style={{ padding: '8px' }}>
                    <option>Everyday</option>
                    <option>Weekdays (Mon-Fri)</option>
                    <option>Weekends (Sat-Sun)</option>
                    <option>Closed Mondays</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ height: '20px' }}></div>

            <div className="form-grid-3">
              <div className="field">
                <label>Instagram / Primary Social</label>
                <input type="text" placeholder="https://instagram.com/..." {...register('socialLink')} />
              </div>
              <div className="field">
                <label>Facebook URL</label>
                <input type="text" placeholder="https://facebook.com/..." {...register('facebookUrl')} />
              </div>
              <div className="field">
                <label>Twitter / X URL</label>
                <input type="text" placeholder="https://twitter.com/..." {...register('twitterUrl')} />
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
                  <input type="text" placeholder="e.g. Scandi Wabi-Sabi & Acoustic Cedar Timber" {...register('aestheticType')} />
                  {errors.aestheticType && <span className="text-red-500 text-[10px] mt-1">{errors.aestheticType.message}</span>}
                </div>

                <div className="field">
                  <label>Aesthetic Vibe Analysis (Curator's Take) <span className="req">*</span></label>
                  <textarea placeholder="Describe the architectural texture, shadows, study desk comfort, lighting temperature..." {...register('vibe')}></textarea>
                  {errors.vibe && <span className="text-red-500 text-[10px] mt-1">{errors.vibe.message}</span>}
                </div>
                
                <div className="field">
                  <label>Curator's Exact Quote (Optional)</label>
                  <textarea placeholder="Specific note or quote from the curator..." {...register('curatorNote')}></textarea>
                </div>

                <div className="field">
                  <label>Vibe Scores</label>
                  <input type="text" placeholder="e.g. Workspace:9.0, Heritage:8.5" {...register('vibeScoresInput')} />
                </div>

                <div className="field">
                  <label>Neighbourhood Walking Guide</label>
                  <textarea placeholder="e.g. Best visited before 7 AM to avoid the dense traffic..." {...register('neighbourhoodGuide')}></textarea>
                </div>

                <div className="form-grid">
                  <div className="field">
                    <label>Target Crowd / Audience</label>
                    <input type="text" placeholder="e.g. Writers, researchers, builders" {...register('crowd')} />
                  </div>
                  <div className="field">
                    <label>Privilege Offers / Codes</label>
                    <input type="text" placeholder="e.g. Flat 10% for members" {...register('discounts')} />
                  </div>
                </div>

                <div className="form-grid-3">
                  <div className="field" style={{ gridColumn: 'span 2' }}>
                    <label>Signature Master Brew <span className="req">*</span></label>
                    <input type="text" placeholder="e.g. Kyoto 12-hr Slow Drip" {...register('signature')} />
                    {errors.signature && <span className="text-red-500 text-[10px] mt-1">{errors.signature.message}</span>}
                  </div>
                  <div className="field">
                    <label>Swiggy / Dineout Link</label>
                    <input type="text" placeholder="https://swiggy.com/dineout/hyd" {...register('bookingUrl')} />
                  </div>
                </div>
              </div>

              <div className="split-preview">
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Thumbnail / Main Image <span className="req">*</span></label>
                  <div className="field" style={{ marginBottom: '16px' }}>
                    <Controller
                      name="image"
                      control={control}
                      render={({ field }) => <ImageUploadField placeholder="https://..." value={field.value || ''} onChange={field.onChange} />}
                    />
                    {errors.image && <span className="text-red-500 text-[10px] mt-1 block">{errors.image.message}</span>}
                  </div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Video URL (Optional)</label>
                  <div className="field" style={{ marginBottom: '16px' }}>
                    <input type="text" placeholder="https://youtube.com/..." {...register('videoUrl')} />
                  </div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Gallery Images (Min 4 required) <span className="req">*</span></label>
                  <div className="field" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <ImageUploadField placeholder="Image 1 URL (e.g. Pinterest Image Address)" value={gallery1} onChange={setGallery1} />
                    <ImageUploadField placeholder="Image 2 URL" value={gallery2} onChange={setGallery2} />
                    <ImageUploadField placeholder="Image 3 URL" value={gallery3} onChange={setGallery3} />
                    <ImageUploadField placeholder="Image 4 URL" value={gallery4} onChange={setGallery4} />
                    <ImageUploadField placeholder="Image 5 URL (Optional)" value={gallery5} onChange={setGallery5} />
                  </div>
                </div>

                {watchImage && (
                  <div className="preview-card">
                    <img src={watchImage} alt="Cafe Preview" />
                    <div className="preview-info">
                      <div className="preview-label">Image Source</div>
                      <div className="preview-url">{watchImage.substring(0, 40)}...</div>
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

            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '12px' }}>Operational Status</label>
            <div className="field" style={{ marginBottom: '24px' }}>
              <select {...register('status')}>
                <option value="open">Open (Operating Normally)</option>
                <option value="closed">Closed (Temporarily)</option>
                <option value="renovating">Renovating (Closed for upgrades)</option>
                <option value="shutdown">Shutdown (Permanently Closed)</option>
              </select>
            </div>

            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '12px' }}>Available Services</label>
            <div className="services-grid">
              <label className={`service-chip ${watchDineIn ? 'checked' : ''}`} onClick={() => setValue('dineIn', !watchDineIn)}>
                <span className="check-box">✓</span>
                <span className="service-label">Dine-In Space</span>
              </label>
              <label className={`service-chip ${watchTakeaway ? 'checked' : ''}`} onClick={() => setValue('takeaway', !watchTakeaway)}>
                <span className="check-box">✓</span>
                <span className="service-label">Takeaway Ready</span>
              </label>
              <label className={`service-chip ${watchOnlineOrder ? 'checked' : ''}`} onClick={() => setValue('onlineOrder', !watchOnlineOrder)}>
                <span className="check-box">✓</span>
                <span className="service-label">Online / App Ordering</span>
              </label>
              <label className={`service-chip ${watchSelfDelivery ? 'checked' : ''}`} onClick={() => setValue('selfDelivery', !watchSelfDelivery)}>
                <span className="check-box">✓</span>
                <span className="service-label">Self Home Delivery</span>
              </label>
            </div>

            <div style={{ height: '24px' }}></div>

            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '12px' }}>Spotlight Toggles</label>
            <div className="toggle-grid">
              <div>
                <div className="toggle-card" onClick={() => setValue('isFeaturedBanner', !watchIsFeaturedBanner)}>
                  <div className="toggle-text">
                    <h5>Hero Spotlight Banner</h5>
                    <p>Pin inside the cinematic home landing carousel.</p>
                  </div>
                  <div className={`toggle-switch ${watchIsFeaturedBanner ? 'on' : ''}`}></div>
                </div>
                {watchIsFeaturedBanner && (
                  <div className="field" style={{ marginTop: '12px' }}>
                    <input type="text" placeholder="Catchy headline for banner..." {...register('bannerCatchyLine')} />
                  </div>
                )}
              </div>
              <div>
                <div className="toggle-card" onClick={() => setValue('isNewLaunch', !watchIsNewLaunch)}>
                  <div className="toggle-text">
                    <h5>Newly Launched Ticker</h5>
                    <p>Feature on the newly launched sliding deck.</p>
                  </div>
                  <div className={`toggle-switch ${watchIsNewLaunch ? 'on' : ''}`}></div>
                </div>
                {watchIsNewLaunch && (
                  <div className="field" style={{ marginTop: '12px' }}>
                    <input type="text" placeholder="Catchy line for new launch..." {...register('newLaunchCatchyline')} />
                  </div>
                )}
              </div>
            </div>

            <div style={{ height: '24px' }}></div>

            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '16px' }}>Tags &amp; Facilities</label>
            <div className="tag-section">
              <div className="tag-block">
                <label>Cafe Chip Archive Tags</label>
                <div className="tag-input-row">
                  <input type="text" placeholder="Type then add..." value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if(e.key==='Enter') handleAddTag(e) }} />
                  <button type="button" className="btn-add-tag" onClick={handleAddTag}>Add</button>
                </div>
                <div className="tag-chips">
                  {watchTags.map((t, i) => (
                    <span key={i} className="chip active">
                      {t} <span className="chip-remove" onClick={() => setValue('tags', watchTags.filter((_, idx) => idx !== i))}>×</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="tag-block">
                <label>Famous Celebs Observed</label>
                <div className="tag-input-row">
                  <input type="text" placeholder="e.g. Rana Daggubati" value={celebInput} onChange={e => setCelebInput(e.target.value)} onKeyDown={e => { if(e.key==='Enter') handleAddCeleb(e) }} />
                  <button type="button" className="btn-add-tag" onClick={handleAddCeleb}>Add</button>
                </div>
                <div className="tag-chips">
                  {watchCelebrities.map((c, i) => (
                    <span key={i} className="chip active">
                      {c} <span className="chip-remove" onClick={() => setValue('celebrities', watchCelebrities.filter((_, idx) => idx !== i))}>×</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="tag-block">
                <label>Workstation Facilities</label>
                <div className="tag-input-row">
                  <input type="text" placeholder="Custom amenity..." value={facilityInput} onChange={e => setFacilityInput(e.target.value)} onKeyDown={e => { if(e.key==='Enter') handleAddFacility(e) }} />
                  <button type="button" className="btn-add-tag" onClick={handleAddFacility}>Add</button>
                </div>
                <div className="tag-chips">
                  {watchFacilities.map((f, i) => (
                    <span key={i} className="chip active">
                      ✓ {f} <span className="chip-remove" onClick={() => setValue('facilities', watchFacilities.filter((_, idx) => idx !== i))}>×</span>
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
                  <label>Menu Image URLs</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <ImageUploadField placeholder="Menu Page 1 URL" value={menu1} onChange={setMenu1} />
                    <ImageUploadField placeholder="Menu Page 2 URL" value={menu2} onChange={setMenu2} />
                    <ImageUploadField placeholder="Menu Page 3 URL" value={menu3} onChange={setMenu3} />
                    <ImageUploadField placeholder="Menu Page 4 URL" value={menu4} onChange={setMenu4} />
                    <ImageUploadField placeholder="Menu Page 5 URL" value={menu5} onChange={setMenu5} />
                  </div>
                </div>
                <div style={{ height: '24px' }}></div>
                
                <h4>Draft Gastronomy Brew Item</h4>

                <div className="field">
                  <label>Item Title</label>
                  <input type="text" placeholder="e.g. Cranberry espresso tonic" value={menuTitle} onChange={e => setMenuTitle(e.target.value)} />
                </div>
                
                <div className="field" style={{ marginTop: '14px' }}>
                  <label>Item Image URL (Optional)</label>
                  <ImageUploadField placeholder="https://img.jpg" value={menuItemImage} onChange={setMenuItemImage} />
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

                {watchFeaturedMenu.map((item: any, idx: number) => (
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
                    <button type="button" className="catalog-delete" onClick={() => setValue('featuredMenu', watchFeaturedMenu.filter((_: any, i: number) => i !== idx))}>🗑</button>
                  </div>
                ))}
                
                {watchFeaturedMenu.length === 0 && <p className="text-sm text-gray-400 italic">No menu items added yet.</p>}
              </div>
            </div>
          </section>

        </form>
        {/* ═══════════ ACTION BAR ═══════════ */}
        <div className="action-bar">
          <button type="submit" form="cafe_catalog_form" disabled={isSubmitting} className={`btn-action primary ${isSubmitting ? 'opacity-50' : ''}`}>
            {isSubmitting ? "Saving..." : (editingCafe ? "Update Lookbook Listing" : "Save Lookbook Catalog Listing")}
          </button>
          <button type="button" onClick={onCancel} className="btn-action secondary" style={{ marginLeft: '12px' }}>Discard Changes</button>
        </div>
      </main>
    </div>
  );
}
