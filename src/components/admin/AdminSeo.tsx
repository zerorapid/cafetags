import React from 'react';
import { useForm } from 'react-hook-form';
import { SeoSettings } from '../../types';
import { MaterialIcon } from '../MaterialIcon';
import { useToast } from '../ui/ToastContext';

interface AdminSeoProps {
  seoSettings: SeoSettings;
  setSeoSettings: React.Dispatch<React.SetStateAction<SeoSettings>>;
}

export function AdminSeo({ seoSettings, setSeoSettings }: AdminSeoProps) {
  const { toast } = useToast();

  const { register, handleSubmit, watch, setValue, formState: { isSubmitting } } = useForm<SeoSettings>({
    defaultValues: seoSettings
  });

  const watchFavicon = watch('favicon');
  const watchSocialImage = watch('socialImage');
  const watchWebsiteTitle = watch('websiteTitle');
  const watchWebsiteDescription = watch('websiteDescription');

  const onSubmit = async (data: SeoSettings) => {
    // simulate a small network delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));
    setSeoSettings(data);
    toast("🚀 SEO configurations, dynamic meta headers, and site trackers successfully updated!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-left animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sticky top-0 z-20 bg-[#FAF9F6] pt-10 pb-5 border-b border-stone-200/60 -mt-10 mb-6">
        <div className="space-y-1.5 max-w-2xl">
          <h3 className="font-sans text-2xl font-bold text-stone-900 tracking-wide">SEO & Site Integrations</h3>
          <p className="text-stone-500 text-sm font-sans">
            Curate search result rankings, social media graph previews, and configure analytics with search console tags.
          </p>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold tracking-widest uppercase px-6 py-3.5 rounded-md transition-all shadow-xs flex items-center gap-2 border-none ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {isSubmitting ? (
            <MaterialIcon name="refresh" className="text-[16px] animate-spin" />
          ) : (
            <MaterialIcon name="save" className="text-[16px]" />
          )}
          <span>{isSubmitting ? "COMMITTING..." : "COMMIT SEO CHANGES"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Fields Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Core Site Settings */}
          <div className="bg-white border border-stone-200 rounded-lg p-6 md:p-8 space-y-5 shadow-3xs">
            <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
              <MaterialIcon name="language" className="text-amber-700 text-xl" />
              <h4 className="font-sans text-lg font-bold text-stone-900">Core Search Metadata</h4>
            </div>

            <div className="space-y-1">
              <label className="block text-stone-500 font-extrabold text-[10px] tracking-widest uppercase">Website Title Template</label>
              <p className="text-[#8C8375] text-[10px] leading-relaxed">Recommended 50–60 characters. Appears as the clickable headline in tab titles and search list headings.</p>
              <input
                type="text"
                {...register('websiteTitle', { required: true })}
                className="w-full bg-[#FCFBF9] border border-stone-200 p-3 rounded-md focus:border-amber-600 focus:outline-none focus:bg-white text-stone-800 font-sans text-sm"
                placeholder="e.g. My Website Title"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-stone-500 font-extrabold text-[10px] tracking-widest uppercase">Meta Description</label>
              <p className="text-[#8C8375] text-[10px] leading-relaxed">Recommended 120–160 characters. A concise summary of your webpage content displayed by search engines.</p>
              <textarea
                rows={3}
                {...register('websiteDescription', { required: true })}
                className="w-full bg-[#FCFBF9] border border-stone-200 p-3 rounded-md focus:border-amber-600 focus:outline-none focus:bg-white text-stone-800 font-sans text-sm leading-relaxed"
                placeholder="Provide a description of the website content..."
              />
              <div className="text-right text-[10px] font-mono text-stone-400">
                Characters: {(watchWebsiteDescription || '').length} (target: 120-160)
              </div>
            </div>
          </div>

          {/* Card 2: Visual Assets Preview */}
          <div className="bg-white border border-stone-200 rounded-lg p-6 md:p-8 space-y-5 shadow-3xs">
            <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
              <MaterialIcon name="image" className="text-amber-700 text-xl" />
              <h4 className="font-sans text-lg font-bold text-stone-900">Brand Assets & Previews</h4>
            </div>

            <div className="space-y-1">
              <label className="block text-stone-500 font-extrabold text-[10px] tracking-widest uppercase">Site Favicon Image Url</label>
              <p className="text-[#8C8375] text-[10px] leading-relaxed font-sans">The small display icon shown on browser tabs next to your page title. Accepts transparent PNGs or static square images.</p>
              <div className="flex gap-3">
                <input
                  type="url"
                  {...register('favicon')}
                  className="flex-1 bg-[#FCFBF9] border border-stone-200 p-3 rounded-md focus:border-amber-600 focus:outline-none focus:bg-white text-stone-800 font-sans text-sm"
                  placeholder="https://..."
                />
                <div className="w-12 h-12 rounded-md bg-stone-150 border border-stone-200 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-inner">
                  {watchFavicon ? (
                    <img src={watchFavicon} className="w-8 h-8 object-contain" alt="Favicon preview" referrerPolicy="no-referrer" />
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
                {...register('socialImage')}
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
                    onClick={() => setValue('socialImage', preset.url)}
                    className={`text-[9px] font-sans font-extrabold uppercase py-1 px-2 border rounded-sm transition-colors cursor-pointer text-left truncate ${
                      watchSocialImage === preset.url
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
              <h4 className="font-sans text-lg font-bold text-stone-900">Google Engine Integrations</h4>
            </div>

            <div className="space-y-1">
              <label className="block text-stone-500 font-extrabold text-[10px] tracking-widest uppercase flex items-center gap-1.5">
                <span>Google Analytics Measurement ID</span>
                <strong className="text-[9px] font-mono font-bold bg-[#FAF9F6] border border-stone-200 px-1.5 py-0.5 rounded-sm text-amber-900">G-XXXXXXXXXX</strong>
              </label>
              <p className="text-[#8C8375] text-[10px] leading-relaxed">Connect your site to track live traffic telemetry, active user click paths, and session statistics securely.</p>
              <input
                type="text"
                {...register('googleAnalyticsId')}
                className="w-full bg-[#FCFBF9] border border-stone-200 p-3 rounded-md focus:border-amber-600 focus:outline-none focus:bg-white text-stone-800 font-sans text-sm focus:border-amber-600"
                placeholder="e.g. G-B2LKNRE3W7"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-stone-500 font-extrabold text-[10px] tracking-widest uppercase">Google Search Console Verification Token</label>
              <p className="text-[#8C8375] text-[10px] leading-relaxed">Verify domain ownership of your Lookbook to optimize page rankings, request immediate indexation, and review crawling errors.</p>
              <input
                type="text"
                {...register('googleSearchConsoleToken')}
                className="w-full bg-[#FCFBF9] border border-stone-200 p-3 rounded-md focus:border-amber-600 focus:outline-none focus:bg-white text-stone-800 font-sans text-sm focus:border-amber-600"
                placeholder="e.g. google-site-verification-token-string"
              />
            </div>
          </div>
        </div>

        {/* Simulated Live Previews Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Preview 1: Google SERP Preview Card */}
          <div className="bg-[#FAF9F6] border border-stone-200 rounded-xl p-6 shadow-sm space-y-4 transition-transform hover:scale-[1.01]">
            <div className="flex items-center gap-1.5 pb-2 border-b border-stone-200/60 justify-between">
              <span className="text-[10px] tracking-wider uppercase font-bold text-stone-400 font-sans flex items-center gap-1">
                <MaterialIcon name="visibility" className="text-xs text-blue-500" />
                Google Search Listing Preview
              </span>
              <span className="text-[9px] font-mono font-bold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-sm text-blue-600 shadow-xs">
                Live Simulator
              </span>
            </div>

            <div className="space-y-1.5 bg-white p-5 border border-stone-150 rounded-lg shadow-sm hover:shadow-md transition-shadow max-w-full overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center p-1 shadow-inner">
                  <img 
                    src={watchFavicon || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=128&auto=format&fit=crop&q=80"} 
                    className="w-5 h-5 object-contain rounded-sm" 
                    alt="favicon icon"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-left font-sans flex-1 min-w-0">
                  <p className="text-[12px] text-stone-800 font-semibold leading-none truncate">CafeTags Hyderabad</p>
                  <p className="text-[11px] text-stone-500 leading-none truncate mt-1 tracking-tight">https://coffeetags.in/hyd</p>
                </div>
                <MaterialIcon name="more_vert" className="text-stone-400 text-sm" />
              </div>
              
              <h5 className="text-left text-[#1a0dab] hover:underline font-sans text-[20px] font-normal cursor-pointer leading-tight line-clamp-2 mt-2">
                {watchWebsiteTitle || "Curated Specialty Coffee Corner Logs"}
              </h5>

              <p className="text-left text-[#4d5156] font-sans text-[13px] leading-[1.5] line-clamp-2 mt-1">
                {watchWebsiteDescription || "No website description supplied yet. Provide custom details to represent your lookbook properly in modern crawlers."}
              </p>
            </div>
          </div>

          {/* Preview 2: Social Card Preview */}
          <div className="bg-[#FAF9F6] border border-stone-200 rounded-xl p-6 shadow-sm space-y-4 transition-transform hover:scale-[1.01]">
            <div className="flex items-center gap-1.5 pb-2 border-b border-stone-200/60 justify-between">
              <span className="text-[10px] tracking-wider uppercase font-bold text-stone-400 font-sans flex items-center gap-1">
                <MaterialIcon name="share" className="text-xs text-indigo-500" />
                Rich Shared card preview
              </span>
              <span className="text-[9px] font-mono font-bold bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-sm text-indigo-600 shadow-xs">
                Facebook/Slack/iMessage
              </span>
            </div>

            <div className="bg-white border border-[#E1E8ED] rounded-xl overflow-hidden text-left max-w-full shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-[1.91/1] w-full bg-stone-100 flex items-center justify-center overflow-hidden border-b border-[#E1E8ED] relative group">
                {watchSocialImage ? (
                  <img src={watchSocialImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="site card visual" referrerPolicy="no-referrer" />
                ) : (
                  <div className="p-4 text-center text-stone-400 font-sans italic text-sm flex flex-col items-center gap-2">
                    <MaterialIcon name="image_not_supported" className="text-3xl text-stone-300" />
                    Specify a social preview image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-5 space-y-1.5 font-sans bg-[#F8F9FA]">
                <div className="text-[11px] text-[#536471] uppercase font-bold tracking-wider truncate">coffeetags.in</div>
                <div className="text-[15px] font-bold text-stone-900 leading-tight line-clamp-1">
                  {watchWebsiteTitle || "Curated Specialty Coffee Corner Logs"}
                </div>
                <div className="text-[13px] text-[#536471] leading-snug line-clamp-2">
                  {watchWebsiteDescription || "Provide custom details to represent your lookbook properly in modern crawlers."}
                </div>
              </div>
            </div>
          </div>

          {/* Connected Insights Analytics Panel */}
          <div className="bg-[#FAF9F6] border border-stone-200 rounded-xl p-6 shadow-sm space-y-4">
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
  );
}
