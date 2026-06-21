import React, { useRef, useState } from 'react';
import Papa from 'papaparse';
import { supabase } from '../../lib/supabase';
import { generateSlug } from '../../utils';
import { BlogArticle } from '../../types';
import { MaterialIcon } from '../MaterialIcon';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useToast } from '../ui/ToastContext';
import { ConfirmModal } from '../ui/ConfirmModal';

interface AdminBlogsProps {
  blogs: BlogArticle[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogArticle[]>>;
}

export function AdminBlogs({ blogs, setBlogs }: AdminBlogsProps) {
  const { toast } = useToast();
  const blogFileInputRef = useRef<HTMLInputElement>(null);
  
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogArticle | null>(null);
  const [blogForm, setBlogForm] = useState<Partial<BlogArticle>>({
    title: '', excerpt: '', author: '', readTime: '5 min read', status: 'draft', tags: [], image: ''
  });
  const [blogTagInput, setBlogTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  const handleBlogCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        setIsSubmitting(true);
        const newBlogs: BlogArticle[] = [];
        for (const row of results.data as any[]) {
          const newBlog: BlogArticle = {
            id: Date.now() + Math.floor(Math.random() * 10000),
            title: row.title || 'Untitled Blog',
            excerpt: row.excerpt || '',
            content: row.content || '',
            image: row.image || 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&q=80',
            author: row.author || 'Admin',
            date: row.date || new Date().toLocaleDateString(),
            readTime: row.readTime || '5 min read',
            status: row.status === 'published' ? 'published' : 'draft',
            tags: row.tags ? row.tags.split(',').map((t: string) => t.trim()) : [],
            isFeatured: row.isFeatured === 'TRUE',
            seoTitle: row.seoTitle || '',
            seoDescription: row.seoDescription || ''
          };
          newBlogs.push(newBlog);
        }
        if (import.meta.env.VITE_SUPABASE_URL) {
          for (const b of newBlogs) {
            await supabase.from('posts').insert({
              title: b.title,
              slug: generateSlug(b.title),
              excerpt: b.excerpt,
              content: b.content,
              image: b.image,
              author: b.author,
              read_time: b.readTime,
              status: b.status,
              is_featured: b.isFeatured,
              seo_title: b.seoTitle,
              seo_description: b.seoDescription,
              tags: b.tags,
              post_date: b.date,
            });
          }
          setBlogs(prev => [...newBlogs, ...prev]);
        } else {
          setBlogs(prev => [...newBlogs, ...prev]);
        }
        setIsSubmitting(false);
        toast(`Successfully imported ${newBlogs.length} blog columns!`);
        if (blogFileInputRef.current) blogFileInputRef.current.value = '';
      }
    });
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingBlog) {
        if (import.meta.env.VITE_SUPABASE_URL) {
        await supabase.from('posts').update({
          title: editingBlog.title,
          slug: generateSlug(editingBlog.title),
          excerpt: editingBlog.excerpt,
          content: editingBlog.content,
          image: editingBlog.image,
          author: editingBlog.author,
          read_time: editingBlog.readTime,
          status: editingBlog.status,
          is_featured: editingBlog.isFeatured,
          seo_title: editingBlog.seoTitle,
          seo_description: editingBlog.seoDescription,
          tags: editingBlog.tags,
        }).eq('id', editingBlog.id);
        setBlogs(prev => prev.map(b => b.id === editingBlog.id ? { ...editingBlog } : b));
      } else {
        setBlogs(prev => prev.map(b => b.id === editingBlog.id ? { ...editingBlog } : b));
      }
      setEditingBlog(null);
      toast("Blog article content successfully updated!");
    } else {
      const newBlog: BlogArticle = {
        ...blogForm,
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        content: blogForm.content || '',
      } as BlogArticle;
      
      if (import.meta.env.VITE_SUPABASE_URL) {
        await supabase.from('posts').insert({
          title: newBlog.title,
          slug: generateSlug(newBlog.title),
          excerpt: newBlog.excerpt,
          content: newBlog.content,
          image: newBlog.image,
          author: newBlog.author,
          read_time: newBlog.readTime,
          status: newBlog.status,
          is_featured: newBlog.isFeatured,
          seo_title: newBlog.seoTitle,
          seo_description: newBlog.seoDescription,
          tags: newBlog.tags,
          post_date: newBlog.date,
        });
        setBlogs(prev => [newBlog, ...prev]);
      } else {
        setBlogs(prev => [newBlog, ...prev]);
      }
      setIsAddingBlog(false);
      setBlogForm({
        title: '', excerpt: '', content: '', author: '', readTime: '5 min read', status: 'draft', tags: [], image: '',
        isFeatured: false, seoTitle: '', seoDescription: ''
      });
      toast("New blog article successfully published on the journal forum!");
    }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBlog = async (id: number) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Journal Column",
      message: "Are you sure you want to permanently delete this journal article?",
      onConfirm: async () => {
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
        if (import.meta.env.VITE_SUPABASE_URL) {
          const { error } = await supabase.from('posts').delete().eq('id', id);
          if (error) console.error("Error deleting blog:", error);
        }
        setBlogs(prev => prev.filter(b => b.id !== id));
      }
    });
  };

  const handleAddBlogTag = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (blogTagInput) {
      if (editingBlog) {
        if (!editingBlog.tags) editingBlog.tags = [];
        if (!editingBlog.tags.includes(blogTagInput)) {
          setEditingBlog({ ...editingBlog, tags: [...editingBlog.tags, blogTagInput] });
        }
      } else {
        if (!blogForm.tags) blogForm.tags = [];
        if (!blogForm.tags.includes(blogTagInput)) {
          setBlogForm({ ...blogForm, tags: [...blogForm.tags, blogTagInput] });
        }
      }
      setBlogTagInput('');
    }
  };

  const removeBlogTag = (idx: number) => {
    if (editingBlog) {
      setEditingBlog({ ...editingBlog, tags: editingBlog.tags?.filter((_, i) => i !== idx) });
    } else {
      setBlogForm({ ...blogForm, tags: blogForm.tags?.filter((_, i) => i !== idx) });
    }
  };

  return (
    <>
      {!editingBlog && !isAddingBlog ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center sticky top-0 z-20 bg-[#FAF9F6] pt-10 pb-5 border-b border-stone-200/60 -mt-10 mb-6">
            <h3 className="font-sans text-2xl font-bold text-stone-950">Journal Columns Vault ({blogs.length})</h3>
            <div className="flex gap-4">
              <input type="file" accept=".csv" ref={blogFileInputRef} onChange={handleBlogCsvUpload} className="hidden" />
              <button
                onClick={() => blogFileInputRef.current?.click()}
                className="bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold tracking-wider uppercase px-5 py-3.5 rounded-md border border-stone-200 shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <MaterialIcon name="upload_file" className="text-[18px]" />
                <span>BULK IMPORT CSV</span>
              </button>
              <button
                onClick={() => setIsAddingBlog(true)}
                className="bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold tracking-wider uppercase px-6 py-3.5 rounded-md shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <MaterialIcon name="post_add" className="text-[18px]" />
                <span>PUBLISH NEW COLUMN</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map(blog => (
              <div key={blog.id} className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs flex flex-col justify-between hover:border-stone-400 transition-colors">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={blog.image} alt={blog.title} className="w-12 h-12 rounded-sm object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <span className="text-[10px] text-stone-400 font-extrabold uppercase tracking-widest block font-mono">{blog.date} • {blog.readTime}</span>
                      <h4 className="font-sans text-base font-bold text-stone-900 leading-snug line-clamp-2">{blog.title}</h4>
                    </div>
                  </div>
                  <p className="text-stone-500 text-xs leading-relaxed line-clamp-3">{blog.excerpt}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-stone-100 flex justify-between items-center text-xs font-bold">
                  <span className="text-stone-500 font-semibold text-[11px]">By {blog.author}</span>
                  <div className="space-x-1.5">
                    <button
                      onClick={() => setEditingBlog(blog)}
                      className="bg-stone-100 hover:bg-stone-200 text-stone-950 text-[11px] px-3 py-1.5 rounded-sm transition-colors cursor-pointer"
                    >
                      EDIT TEXT
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-700 text-[11px] px-3 py-1.5 rounded-sm transition-colors cursor-pointer"
                    >
                      PURGE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSaveBlog} className="bg-white border border-stone-200 rounded-lg p-6 md:p-8 space-y-5 shadow-sm">
          <div className="flex justify-between items-center border-b border-stone-200 pb-4">
            <h3 className="font-sans text-xl font-bold text-stone-950">
              {editingBlog ? `Modify Column: ${editingBlog.title}` : "Compose New Journal Column"}
            </h3>
            <button
              type="button"
              onClick={() => { setIsAddingBlog(false); setEditingBlog(null); }}
              className="text-stone-400 hover:text-stone-900 text-xs font-bold"
            >
              CANCEL
            </button>
          </div>

          <div className="space-y-4 text-xs font-sans">
            <div>
              <label className="block text-[#786F64] font-bold mb-1 uppercase tracking-wider">ARTICLE COLUMN TITLE</label>
              <input
                type="text"
                required
                value={editingBlog ? editingBlog.title : blogForm.title}
                onChange={e => editingBlog ? setEditingBlog({ ...editingBlog, title: e.target.value }) : setBlogForm({ ...blogForm, title: e.target.value })}
                className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:outline-none font-medium text-[#1C1C1E] text-sm"
                placeholder="The golden era of brews..."
              />
            </div>

            <div>
              <label className="block text-[#786F64] font-bold mb-1 uppercase tracking-wider">EXCERPT SNIPPET</label>
              <input
                type="text"
                required
                value={editingBlog ? editingBlog.excerpt : blogForm.excerpt}
                onChange={e => editingBlog ? setEditingBlog({ ...editingBlog, excerpt: e.target.value }) : setBlogForm({ ...blogForm, excerpt: e.target.value })}
                className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:outline-none font-medium text-[#1C1C1E]"
                placeholder="A brief preview shown in feed decks..."
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-[#786F64] font-bold mb-1 uppercase tracking-wider">COLUMN AUTHOR</label>
                <input
                  type="text"
                  required
                  value={editingBlog ? editingBlog.author : blogForm.author}
                  onChange={e => editingBlog ? setEditingBlog({ ...editingBlog, author: e.target.value }) : setBlogForm({ ...blogForm, author: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:outline-none font-medium text-[#1C1C1E]"
                />
              </div>
              <div>
                <label className="block text-[#786F64] font-bold mb-1 uppercase tracking-wider">READ TIME METRIC</label>
                <input
                  type="text"
                  required
                  value={editingBlog ? editingBlog.readTime : blogForm.readTime}
                  onChange={e => editingBlog ? setEditingBlog({ ...editingBlog, readTime: e.target.value }) : setBlogForm({ ...blogForm, readTime: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:outline-none font-medium text-[#1C1C1E]"
                  placeholder="e.g. 5 min read"
                />
              </div>
              <div>
                <label className="block text-[#786F64] font-bold mb-1 uppercase tracking-wider font-mono text-stone-500">COVER IMAGE URL</label>
                <input
                  type="text"
                  required
                  value={editingBlog ? editingBlog.image : blogForm.image}
                  onChange={e => editingBlog ? setEditingBlog({ ...editingBlog, image: e.target.value }) : setBlogForm({ ...blogForm, image: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded-md focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Advanced Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-[#F5F5F3] border border-stone-200 rounded-lg">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-[#786F64] font-bold uppercase tracking-wider text-[11px]">Publish Status</label>
                    <p className="text-[10px] text-stone-500">Drafts are hidden from public view</p>
                  </div>
                  <select 
                    value={editingBlog ? editingBlog.status || 'draft' : blogForm.status || 'draft'} 
                    onChange={e => editingBlog ? setEditingBlog({...editingBlog, status: e.target.value as any}) : setBlogForm({...blogForm, status: e.target.value as any})}
                    className="bg-white border border-stone-200 p-2 rounded focus:outline-none text-xs font-bold"
                  >
                    <option value="draft">Draft (Hidden)</option>
                    <option value="published">Published (Live)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-[#786F64] font-bold uppercase tracking-wider text-[11px]">Featured Hero Article</label>
                    <p className="text-[10px] text-stone-500">Pin to the top of the journal</p>
                  </div>
                  <div 
                    onClick={() => editingBlog ? setEditingBlog({...editingBlog, isFeatured: !editingBlog.isFeatured}) : setBlogForm({...blogForm, isFeatured: !blogForm.isFeatured})}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${ (editingBlog ? editingBlog.isFeatured : blogForm.isFeatured) ? 'bg-amber-600' : 'bg-stone-300' }`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${ (editingBlog ? editingBlog.isFeatured : blogForm.isFeatured) ? 'translate-x-6' : 'translate-x-0' }`} />
                  </div>
                </div>

                <div>
                  <label className="block text-[#786F64] font-bold uppercase tracking-wider text-[11px] mb-1">Article Categories / Tags</label>
                  <div className="flex gap-2 mb-2">
                    <input 
                      type="text" 
                      placeholder="e.g. Reviews" 
                      value={blogTagInput} 
                      onChange={e => setBlogTagInput(e.target.value)} 
                      onKeyDown={e => { if(e.key==='Enter') handleAddBlogTag(e) }}
                      className="flex-1 bg-white border border-stone-200 p-2 rounded-md focus:outline-none text-xs" 
                    />
                    <button type="button" onClick={handleAddBlogTag} className="bg-stone-200 hover:bg-stone-300 px-3 py-2 rounded-md text-xs font-bold transition-colors">ADD</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(editingBlog ? editingBlog.tags || [] : blogForm.tags || []).map((t, i) => (
                      <span key={i} className="bg-stone-900 text-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-sm flex items-center gap-1">
                        {t} <span className="cursor-pointer text-stone-400 hover:text-white" onClick={() => removeBlogTag(i)}>×</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[#786F64] font-bold mb-1 uppercase tracking-wider text-[11px]">SEO Meta Title Override</label>
                  <input
                    type="text"
                    value={editingBlog ? editingBlog.seoTitle || '' : blogForm.seoTitle || ''}
                    onChange={e => editingBlog ? setEditingBlog({ ...editingBlog, seoTitle: e.target.value }) : setBlogForm({ ...blogForm, seoTitle: e.target.value })}
                    className="w-full bg-white border border-stone-200 p-2 rounded-md focus:outline-none text-xs"
                    placeholder="Leave blank to use main title"
                  />
                </div>
                <div>
                  <label className="block text-[#786F64] font-bold mb-1 uppercase tracking-wider text-[11px]">SEO Meta Description</label>
                  <textarea
                    rows={4}
                    value={editingBlog ? editingBlog.seoDescription || '' : blogForm.seoDescription || ''}
                    onChange={e => editingBlog ? setEditingBlog({ ...editingBlog, seoDescription: e.target.value }) : setBlogForm({ ...blogForm, seoDescription: e.target.value })}
                    className="w-full bg-white border border-stone-200 p-2 rounded-md focus:outline-none text-xs"
                    placeholder="Optimal for search engines (120-160 chars)"
                  />
                </div>
              </div>
            </div>

            <div className="react-quill-wrapper">
              <label className="block text-[#786F64] font-bold mb-1 uppercase tracking-wider">LONG ARTICLE CONTENT BODY</label>
              <ReactQuill
                theme="snow"
                value={editingBlog ? editingBlog.content : blogForm.content}
                onChange={val => editingBlog ? setEditingBlog({ ...editingBlog, content: val }) : setBlogForm({ ...blogForm, content: val })}
                className="bg-white rounded-md mb-12"
                style={{ height: '350px' }}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-stone-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => { setIsAddingBlog(false); setEditingBlog(null); }}
              className="px-6 py-2.5 rounded-md border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-bold font-mono tracking-wide cursor-pointer"
            >
              DISCARD
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-amber-600 hover:bg-amber-700 text-white px-8 py-2.5 rounded-md text-xs font-bold font-mono tracking-wide shadow-sm flex items-center justify-center gap-2 transition-opacity ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {isSubmitting && <MaterialIcon name="refresh" className="animate-spin text-[14px]" />}
              {isSubmitting ? "PUBLISHING..." : "PUBLISH JOURNAL COLUMN"}
            </button>
          </div>
        </form>
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
