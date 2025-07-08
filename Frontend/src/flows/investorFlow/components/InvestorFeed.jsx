import React from 'react';
import PostCard from './PostCard';

const InvestorFeed = () => {
  const posts = [
    {
      title: 'Pitch Deck AI – Automate your Investor Decks',
      author: { name: 'Anna Clark' },
      description: 'A tool that helps founders generate investor-ready pitch decks.',
      timeAgo: '2 hours ago',
    },
    {
      title: 'Smart Mentor – AI-Powered Career Guidance',
      author: { name: 'Joshan' },
      description: 'A virtual mentor to match students with career paths.',
      timeAgo: '1 day ago',
    },
  ];

  return (
    <div className="mt-6 space-y-6">
      {posts.map((post, idx) => (
        <PostCard key={idx} post={post} />
      ))}
    </div>
  );
};

export default InvestorFeed;
