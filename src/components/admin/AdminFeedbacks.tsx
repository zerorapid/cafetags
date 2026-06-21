import React from 'react';
import { supabase } from '../../lib/supabase';
import { UserFeedback } from '../../types';
import { MaterialIcon } from '../MaterialIcon';
import { useToast } from '../ui/ToastContext';

interface AdminFeedbacksProps {
  feedbacks: UserFeedback[];
  setFeedbacks: React.Dispatch<React.SetStateAction<UserFeedback[]>>;
}

export function AdminFeedbacks({ feedbacks, setFeedbacks }: AdminFeedbacksProps) {
  const { toast } = useToast();
  const [submittingId, setSubmittingId] = React.useState<number | null>(null);

  const handlePromoteFeedback = async (f: UserFeedback) => {
    setSubmittingId(f.id);
    let updated = { ...f, status: 'approved' };
    if (import.meta.env.VITE_SUPABASE_URL) {
      await supabase.from('feedbacks').update({ status: 'approved' }).eq('id', f.id);
      
      const { data: cafe } = await supabase.from('cafes').select('user_reviews').eq('id', f.cafeId).single();
      if (cafe) {
        const currentReviews = cafe.user_reviews || [];
        const newReview = {
          author: f.author,
          rating: f.rating,
          text: f.text,
          date: f.date,
          role: f.role || 'Guest Reviewer'
        };
        await supabase.from('cafes').update({
          user_reviews: [newReview, ...currentReviews]
        }).eq('id', f.cafeId);
      }
      setFeedbacks(prev => prev.map(item => item.id === f.id ? updated as UserFeedback : item));
    } else {
      setFeedbacks(prev => prev.map(item => item.id === f.id ? updated as UserFeedback : item));
    }

    setSubmittingId(null);
    toast(`Feedback Promoted! This is now published as a Verified Influencer Review on ${f.cafeName}.`);
  };

  const handleSpamFlagFeedback = async (id: number) => {
    setSubmittingId(id);
    let updated = { status: 'spam' };
    if (import.meta.env.VITE_SUPABASE_URL) {
      await supabase.from('feedbacks').update({ status: 'spam' }).eq('id', id);
      setFeedbacks(prev => prev.map(item => item.id === id ? { ...item, status: 'spam' } as UserFeedback : item));
    } else {
      setFeedbacks(prev => prev.map(item => item.id === id ? { ...item, status: 'spam' } as UserFeedback : item));
    }
    setSubmittingId(null);
    toast("Feedback flagged as spam / locked out.");
  };

  return (
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
                    disabled={submittingId !== null}
                    className={`flex-1 md:flex-none bg-green-700 hover:bg-green-800 text-white text-[11px] font-bold px-4 py-2.5 rounded-md transition-all flex items-center justify-center gap-1 font-mono ${submittingId !== null ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {submittingId === f.id ? (
                      <MaterialIcon name="refresh" className="text-xs animate-spin" />
                    ) : (
                      <MaterialIcon name="check" className="text-xs" />
                    )}
                    <span>APPROVE & ESCALATE</span>
                  </button>
                  <button
                    onClick={() => handleSpamFlagFeedback(f.id)}
                    disabled={submittingId !== null}
                    className={`flex-1 md:flex-none bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-bold px-4 py-2.5 rounded-md transition-all flex items-center justify-center gap-1 font-mono ${submittingId !== null ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {submittingId === f.id ? (
                      <MaterialIcon name="refresh" className="text-xs animate-spin" />
                    ) : (
                      <MaterialIcon name="block" className="text-xs" />
                    )}
                    <span>SPAM DECLINE</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
