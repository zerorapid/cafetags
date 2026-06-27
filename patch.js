const fs = require('fs');

function patchFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Make tags more District-style (sleeker, wider tracking, smaller)
    content = content.replace(/text-xs font-normal rounded-md/g, 'text-[10px] sm:text-[11px] font-semibold tracking-wide rounded-md uppercase');
    content = content.replace(/text-sm font-medium/g, 'text-[13px] font-medium tracking-tight');
    content = content.replace(/text-xs text-\[#6B7280\]/g, 'text-[13px] text-[#6B7280] font-medium leading-relaxed');
    
    // Adjust hero titles for District-style sleekness
    content = content.replace(/font-bold text-\[#1C1C1C\] leading-snug/g, 'font-bold text-[#111] leading-tight tracking-tight');
    
    fs.writeFileSync(filePath, content);
}

patchFile('src/components/CafeCard.tsx');
