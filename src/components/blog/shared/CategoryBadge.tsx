import React from 'react';
import { categoryColors } from './constants';

interface CategoryBadgeProps {
  category: string;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const colors = categoryColors[category] || categoryColors.default;
  
  return (
    <div className={`${colors.bg} border ${colors.border} rounded-full px-3 py-1 inline-flex items-center`}>
      <span className={`font-medium text-sm ${colors.text}`}>
        {category}
      </span>
    </div>
  );
}
