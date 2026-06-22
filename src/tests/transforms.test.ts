import { describe, it, expect } from 'vitest';
import { transformCafe, transformPost } from '../lib/transforms';

describe('Data Transforms', () => {
  it('correctly transforms raw supabase cafe row to internal Cafe model', () => {
    const rawRow = {
      id: 1,
      name: 'Test Cafe',
      area: 'Banjara Hills',
      status: 'open',
      tags: null, // Test fallback
      facilities: null, // Test fallback
      featured_menu: null, // Test fallback
    };

    const cafe = transformCafe(rawRow);
    
    expect(cafe.id).toBe(1);
    expect(cafe.name).toBe('Test Cafe');
    expect(cafe.area).toBe('Banjara Hills');
    expect(cafe.status).toBe('open');
    
    // Fallbacks
    expect(cafe.tags).toEqual([]);
    expect(cafe.facilities).toEqual([]);
    expect(cafe.featuredMenu).toEqual([]);
  });

  it('correctly transforms raw supabase post row to internal BlogArticle model', () => {
    const rawPost = {
      id: 10,
      title: 'Aesthetic Review',
      post_date: '2026-05-10',
      status: 'published'
    };

    const post = transformPost(rawPost);

    expect(post.id).toBe(10);
    expect(post.title).toBe('Aesthetic Review');
    expect(post.date).toBe('2026-05-10');
    expect(post.status).toBe('published');
    expect(post.tags).toEqual([]); // Fallback check
  });
});
