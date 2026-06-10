/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface MaterialIconProps {
  name: string;
  className?: string;
}

export function MaterialIcon({ name, className = "" }: MaterialIconProps) {
  return (
    <span 
      className={`material-symbols-outlined material-icon select-none align-middle ${className}`}
      style={{
        fontFamily: "'Material Symbols Outlined', 'Material Icons', sans-serif",
        fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 200, 'opsz' 48",
        fontSize: "inherit",
        display: "inline-block"
      }}
    >
      {name}
    </span>
  );
}
