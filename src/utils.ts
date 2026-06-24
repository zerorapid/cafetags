/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Cafe } from './types';

export const generateSlug = (text: string) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

export const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const injectSmartCafeLinks = (content: string, cafes: Cafe[]): string => {
  if (!content || !cafes) return content;
  
  let processedContent = content;
  
  // Sort cafes by name length descending to avoid partial matches (e.g., "Roastery Coffee House" vs "Roastery")
  const sortedCafes = [...cafes].sort((a, b) => b.name.length - a.name.length);

  sortedCafes.forEach(cafe => {
    // Only link if the cafe name is longer than 3 characters to avoid false positives on common words
    if (cafe.name.length <= 3) return;

    const escapedName = escapeRegExp(cafe.name);
    // Regex matches the cafe name if it is not inside an HTML tag.
    // (?![^<]*>) ensures the matched text is not followed by a closing tag bracket without an opening one first.
    // It also tries to avoid matching inside an existing anchor tag.
    const regex = new RegExp(`(?!(?:[^<]+>|[^>]+<\\/a>))\\b(${escapedName})\\b`, 'g');
    
    processedContent = processedContent.replace(regex, (match) => {
      const slug = generateSlug(cafe.name);
      return `<a href="/cafe/${slug}" class="text-amber-600 font-bold hover:underline transition-colors" title="View ${cafe.name}">${match}</a>`;
    });
  });

  return processedContent;
};
