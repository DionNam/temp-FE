import React from 'react';
import Image from 'next/image';
import { BlogPost } from './types';

interface AuthorAvatarProps {
  post: BlogPost;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10 lg:w-12 lg:h-12',
  lg: 'w-12 h-12 lg:w-16 lg:h-16'
};

const textSizes = {
  sm: 'text-xs',
  md: 'text-base lg:text-lg',
  lg: 'text-lg lg:text-xl'
};

export function AuthorAvatar({ post, size = 'md' }: AuthorAvatarProps) {
  const avatarUrl = post.avatar || (typeof post.author === 'object' && post.author?.avatar);
  
  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden flex-shrink-0`}>
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={post.author_name}
          width={size === 'sm' ? 24 : size === 'md' ? 48 : 64}
          height={size === 'sm' ? 24 : size === 'md' ? 48 : 64}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
          <span className={`${textSizes[size]} font-semibold text-gray-700`}>
            {post.author_name?.charAt(0) || 'A'}
          </span>
        </div>
      )}
    </div>
  );
}
