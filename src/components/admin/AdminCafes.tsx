import React, { useRef, useState } from 'react';
import Papa from 'papaparse';
import { supabase } from '../../lib/supabase';
import { generateSlug } from '../../utils';
import { Cafe } from '../../types';
import { MaterialIcon } from '../MaterialIcon';
import { CafeForm } from '../CafeForm';
import { useToast } from '../ui/ToastContext';
import { ConfirmModal } from '../ui/ConfirmModal';

interface AdminCafesProps {
  cafes: Cafe[];
  setCafes: React.Dispatch<React.SetStateAction<Cafe[]>>;
}

export function AdminCafes({ cafes, setCafes }: AdminCafesProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isAddingCafe, setIsAddingCafe] = useState(false);
  const [editingCafe, setEditingCafe] = useState<Cafe | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  const handleCafeCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const newCafes: Partial<Cafe>[] = [];
        for (const row of results.data as any[]) {
          const newCafe: any = {
            id: Date.now() + Math.floor(Math.random() * 10000),
            name: row.name || 'Unknown Cafe',
            area: row.area || 'Unknown Area',
            image: row.image || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
            vibe: row.vibe || 'A quiet space for work.',
            mapLink: row.mapLink || '#',
            icon: row.icon || 'local_cafe',
            signature: row.signature || 'Classic Espresso',
            founded: row.founded || '2026',
            address: row.address || '123 Coffee Lane',
            phone: row.phone || '',
            email: row.email || '',
            website: row.website || '',
            timings: row.timings || '8am - 10pm',
            aestheticType: row.aestheticType || 'Modern',
            crowd: row.crowd || 'Everyone',
            discounts: row.discounts || 'None',
            dineIn: row.dineIn !== 'FALSE',
            takeaway: row.takeaway !== 'FALSE',
            onlineOrder: row.onlineOrder === 'TRUE',
            selfDelivery: row.selfDelivery === 'TRUE',
            tags: row.tags ? row.tags.split(',').map((t: string) => t.trim()) : [],
            facilities: row.facilities ? row.facilities.split(',').map((t: string) => t.trim()) : [],
            celebrities: row.celebrities ? row.celebrities.split(',').map((t: string) => t.trim()) : [],
            bookingUrl: row.bookingUrl || '#',
            status: 'open',
            featuredMenu: [],
            userReviews: []
          };
          newCafes.push(newCafe);
        }
        if (import.meta.env.VITE_SUPABASE_URL) {
          for (const c of newCafes) {
            const { id, userReviews, featuredMenu, vibeScores, moreImages, menuImages, ...rest } = c as any;
            await supabase.from('cafes').upsert({
              id: c.id,
              slug: generateSlug(c.name),
              name: rest.name,
              area: rest.area,
              image: rest.image,
              icon: rest.icon,
              logo: rest.logo,
              video_url: rest.videoUrl,
              vibe: rest.vibe,
              signature: rest.signature,
              aesthetic_type: rest.aestheticType,
              crowd: rest.crowd,
              curator_note: rest.curatorNote,
              directions_tip: rest.directionsTip,
              neighbourhood_guide: rest.neighbourhoodGuide,
              address: rest.address,
              phone: rest.phone,
              email: rest.email,
              website: rest.website,
              social_link: rest.socialLink,
              facebook_url: rest.facebookUrl,
              twitter_url: rest.twitterUrl,
              map_link: rest.mapLink,
              booking_url: rest.bookingUrl,
              founded: rest.founded,
              timings: rest.timings,
              discounts: rest.discounts,
              dine_in: rest.dineIn,
              takeaway: rest.takeaway,
              online_order: rest.onlineOrder,
              self_delivery: rest.selfDelivery,
              status: rest.status,
              tags: rest.tags,
              facilities: rest.facilities,
              celebrities: rest.celebrities,
              more_images: moreImages || [],
              menu_images: menuImages || [],
              vibe_scores: vibeScores || [],
              featured_menu: featuredMenu || [],
              is_featured_banner: rest.isFeaturedBanner || false,
              banner_catchy_line: rest.bannerCatchyLine || null,
              is_new_launch: rest.isNewLaunch || false,
              new_launch_catchyline: rest.newLaunchCatchyline || null,
            });
          }
          setCafes(prev => [...(newCafes as Cafe[]), ...prev]);
        } else {
          setCafes(prev => [...(newCafes as Cafe[]), ...prev]);
        }
        toast(`Successfully imported ${newCafes.length} cafes!`);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    });
  };

  const handleDeleteCafe = async (id: number) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Cafe Spot",
      message: "Are you sure you would like to permanently purge this cafe listing? Regular users have no access to delete details.",
      onConfirm: async () => {
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
        setDeletingId(id);
        if (import.meta.env.VITE_SUPABASE_URL) {
          const { error } = await supabase.from('cafes').delete().eq('id', id);
          if (error) console.error("Error deleting cafe:", error);
        }
        setCafes(prev => prev.filter(c => c.id !== id));
        setDeletingId(null);
      }
    });
  };

  return (
    <>
      {!editingCafe && !isAddingCafe ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center sticky top-0 z-20 bg-[#FAF9F6] pt-10 pb-5 border-b border-stone-200/60 mb-6">
            <h3 className="font-sans text-2xl font-bold text-stone-950">Home Listings Vault ({cafes.length})</h3>
            <div className="flex gap-4">
              <input type="file" accept=".csv" ref={fileInputRef} onChange={handleCafeCsvUpload} className="hidden" />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold tracking-wider uppercase px-5 py-3.5 rounded-md border border-stone-200 shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <MaterialIcon name="upload_file" className="text-[18px]" />
                <span>BULK IMPORT CSV</span>
              </button>
              <button
                onClick={() => setIsAddingCafe(true)}
                className="bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold tracking-wider uppercase px-6 py-3.5 rounded-md shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <MaterialIcon name="add" className="text-[18px]" />
                <span>CATALOG NEW CAFE</span>
              </button>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-lg overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#FAF9F6] text-[#786F64] font-bold border-b border-stone-200">
                  <tr>
                    <th className="p-4 pl-6 w-[28%]">Cafe Detail</th>
                    <th className="p-4 w-[15%] whitespace-nowrap">Geographic Area</th>
                    <th className="p-4 w-[25%]">Curator Signature Beverage</th>
                    <th className="p-4 w-[12%] whitespace-nowrap">Established State</th>
                    <th className="p-4 w-[10%]">Spotlights</th>
                    <th className="p-4 pr-6 w-[10%] text-right whitespace-nowrap">Action Logs</th>
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
                      <td className="p-4 italic text-stone-600 font-sans font-bold">{cafe.signature}</td>
                      <td className="p-4 font-mono text-stone-500">
                        {cafe.founded} AD
                        <div className="mt-1">
                          {cafe.status === 'renovating' && <span className="text-[9px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-sm uppercase font-bold tracking-wider">Renovating</span>}
                          {cafe.status === 'closed' && <span className="text-[9px] bg-stone-200 text-stone-600 px-1.5 py-0.5 rounded-sm uppercase font-bold tracking-wider">Closed</span>}
                          {cafe.status === 'shutdown' && <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-sm uppercase font-bold tracking-wider">Shutdown</span>}
                          {(!cafe.status || cafe.status === 'open') && <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-sm uppercase font-bold tracking-wider">Open</span>}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-[10px] bg-amber-50 border border-amber-200 text-amber-950 px-2 py-0.5 rounded-sm font-bold max-w-max">
                          <MaterialIcon name="stars" className="text-xs text-amber-600" />
                          <span>{cafe.celebrities ? cafe.celebrities.length : 0} Celebs</span>
                        </div>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingCafe(cafe)}
                            disabled={deletingId !== null}
                            className="bg-stone-100 hover:bg-stone-200 text-stone-950 text-[10px] font-bold px-2.5 py-1.5 rounded-sm transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
                          >
                            EDIT
                          </button>
                          <button
                            onClick={() => handleDeleteCafe(cafe.id)}
                            disabled={deletingId !== null}
                            className="bg-red-50 hover:bg-red-100 text-red-700 text-[10px] font-bold px-2.5 py-1.5 rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-1 disabled:opacity-50 whitespace-nowrap"
                          >
                            {deletingId === cafe.id ? <MaterialIcon name="refresh" className="animate-spin text-[12px]" /> : "DELETE"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <CafeForm
          editingCafe={editingCafe}
          onSave={async (cafe: any) => {
            if (import.meta.env.VITE_SUPABASE_URL) {
              const { inverseTransformCafe } = await import('../../lib/transforms');
              const dbRow = inverseTransformCafe(cafe);
              if (!editingCafe) {
                delete dbRow.id;
              }
              await supabase.from('cafes').upsert(dbRow);
            }
            if (editingCafe) {
              setCafes(prev => prev.map(c => c.id === cafe.id ? cafe : c));
            } else {
              setCafes(prev => [cafe, ...prev]);
            }
            setIsAddingCafe(false);
            setEditingCafe(null);
            toast("Cafe Spot successfully cataloged!");
          }}
          onCancel={() => { setIsAddingCafe(false); setEditingCafe(null); }}
        />
      )}

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
      />
    </>
  );
}
