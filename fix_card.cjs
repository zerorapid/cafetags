const fs = require('fs');
let content = fs.readFileSync('src/components/CafeCard.tsx', 'utf8');

// Unify tags to text-[11px] font-semibold (sleek, native-app feel)
content = content.replace(/text-\[11px\] font-bold uppercase/g, 'text-xs font-semibold tracking-wide uppercase');
content = content.replace(/text-\[10px\] font-bold uppercase tracking-widest/g, 'text-[11px] font-semibold uppercase tracking-wider');

// Unify short desc & location to text-[13px]
content = content.replace(/text-xs text-\[#6B7280\] mb-3 truncate/g, 'text-[13px] text-[#6B7280] font-medium leading-relaxed mb-3 truncate');
content = content.replace(/text-sm font-medium/g, 'text-[13px] font-medium tracking-tight');

// Unify filter tags
content = content.replace(/text-xs font-normal rounded-md/g, 'text-[11px] font-medium rounded-md tracking-wide');

// Unify List Mode Title
content = content.replace(/text-3xl md:text-4xl/g, 'text-2xl md:text-3xl');

fs.writeFileSync('src/components/CafeCard.tsx', content);
console.log('Fixed CafeCard');
