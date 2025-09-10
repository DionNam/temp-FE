'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const img = "http://localhost:3845/assets/69c2d48ba81567d28893e15cd0baf517c39f52ee.png";
const img1 = "http://localhost:3845/assets/6424b0d14893954b1bbf127484daab7d652e2e3f.png";
const img2 = "http://localhost:3845/assets/a4c52ab3a3c522719b54dd45b1795921034a3f00.png";
const img3 = "http://localhost:3845/assets/ab9201148cfdefe023e21366139405f0dda8c4d3.png";
const img4 = "http://localhost:3845/assets/4f7cb156af7440d6883d7ce6e71818b4d55fde88.png";
const img5 = "http://localhost:3845/assets/f411169b0890cb85aaf2ca68bc27e793bfc47b0c.png";
const imgSizeMdPlaceholderFalseTextFalseStatusIconFalse = "http://localhost:3845/assets/08a3b47613f2d0f6aced2c3c467602e3aa1638f1.png";

interface BlogPost {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
    date: string;
  };
}

const blogPosts: BlogPost[] = [
  {
    image: img,
    category: "AI",
    title: "AI-Driven Market Insights: How Geo Analytics Transforms Campaigns",
    excerpt: "Discover how leveraging geo analytics and generative AI sharpens targeting and boosts ROI in modern marketing strategies.",
    author: {
      name: "Olivia Rhye",
      avatar: img1,
      date: "20 Jan 2025"
    }
  },
  {
    image: img2,
    category: "AI",
    title: "Mastering Local Reach: Geo Optimization Engine Best Practices",
    excerpt: "Explore actionable tips for marketers to harness generative optimization engines, maximizing customer engagement and local market penetration.",
    author: {
      name: "Phoenix Baker",
      avatar: img3,
      date: "19 Jan 2025"
    }
  },
  {
    image: img4,
    category: "AI",
    title: "From Data to Action: Next-Gen Tech for Hyperlocal Audience Intelligence",
    excerpt: "A look at the latest AI-powered tools driving smarter decision-making and competitive advantage in geo-targeted campaigns.",
    author: {
      name: "Lana Steiner",
      avatar: img5,
      date: "18 Jan 2025"
    }
  }
];

interface BlogSectionProps {
  className?: string;
}

export default function BlogSection({ className }: BlogSectionProps) {
  return (
    <section className={`bg-white py-24 ${className}`}>
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Header */}
        <div className="flex flex-col gap-8 mb-16">
          <div className="flex flex-wrap gap-8 items-start justify-between w-full">
            <div className="flex-1 flex flex-col gap-5 max-w-[768px] min-w-[480px]">
              <div className="flex flex-col gap-3">
                <div className="text-[16px] text-blue-600 font-semibold">
                  <p className="leading-[24px]">Our blog</p>
                </div>
                <div className="text-[#181d27] text-[36px] tracking-[-0.72px] font-semibold">
                  <p className="leading-[44px]">Lastest blog posts</p>
                </div>
              </div>
              <div className="text-[#535862] text-[20px] font-normal">
                <p className="leading-[30px]">Tool and strategies modern teams need to help their companies grow.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="flex flex-col gap-8 mb-16">
          <div className="flex flex-wrap gap-8 items-start justify-start w-full">
            {blogPosts.map((post, index) => (
              <article key={index} className="flex-1 flex flex-col gap-4 min-w-80">
                {/* Image */}
                <div 
                  className="aspect-[384/256] bg-center bg-cover bg-no-repeat rounded-[16px] w-full"
                  style={{ backgroundImage: `url('${post.image}')` }}
                />
                
                {/* Content */}
                <div className="flex flex-col gap-5 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    {/* Category */}
                    <div className="text-[#141c25] text-[14px] font-semibold">
                      <p className="leading-[20px]">{post.category}</p>
                    </div>
                    
                    {/* Title and Description */}
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex gap-4 items-start justify-between w-full">
                        <div className="flex-1 text-[#181d27] text-[18px] font-semibold">
                          <p className="leading-[28px]">{post.title}</p>
                        </div>
                        <div className="flex flex-col items-start justify-start pt-0.5">
                          <ArrowUpRight className="w-6 h-6 text-gray-600" />
                        </div>
                      </div>
                      <div className="text-[#535862] text-[16px] font-normal line-clamp-3">
                        <p className="leading-[24px]">{post.excerpt}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Author */}
                  <div className="flex gap-2 items-center">
                    <div 
                      className="w-10 h-10 rounded-full bg-center bg-cover bg-no-repeat border border-[rgba(0,0,0,0.08)]"
                      style={{ backgroundImage: `url('${post.author.avatar}')` }}
                    />
                    <div className="flex flex-col text-[14px]">
                      <div className="text-[#181d27] font-semibold">
                        <p className="leading-[20px]">{post.author.name}</p>
                      </div>
                      <div className="text-[#535862] font-normal">
                        <p className="leading-[20px]">{post.author.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* View More Button */}
        <div className="flex justify-center">
          <div className="w-80">
            <button className="w-full bg-white border border-[rgba(10,13,18,0.18)] rounded-[8px] px-[18px] py-3 flex gap-1.5 items-center justify-center">
              <div className="text-[#414651] text-[16px] font-semibold">
                <p className="leading-[24px]">View more posts</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
