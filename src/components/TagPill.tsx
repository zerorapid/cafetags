import React from 'react';
import { MaterialIcon } from './MaterialIcon';
import { getTagIcon } from '../data';

interface TagPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  key?: React.Key;
  tag: string;
  className?: string;
}

export function TagPill({ tag, className = '' }: TagPillProps) {
  return (
    <span 
      className={`px-2.5 py-1 text-xs font-sans tracking-normal border border-tactile-divider bg-[#FAF7F2]/80 text-stone-gray rounded-full uppercase font-semibold flex items-center gap-1 pb-1 ${className}`}
    >
      <MaterialIcon name={getTagIcon(tag)} className="text-xs text-stone-gray" />
      <span>{tag}</span>
    </span>
  );
}
