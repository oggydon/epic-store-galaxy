
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Users, TrendingUp, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';

const Community = () => {
  const communityPosts = [
    {
      id: 1,
      title: "Best RPG Games of 2024",
      author: "GameMaster92",
      replies: 24,
      likes: 156,
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "Looking for co-op partners",
      author: "PlayerOne",
      replies: 12,
      likes: 45,
      time: "5 hours ago"
    },
    {
      id: 3,
      title: "Game development tips",
      author: "DevGuru",
      replies: 38,
      likes: 203,
      time: "1 day ago"
    }
  ];

  return (
    <div className="min-h-screen bg-hero-gradient">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Store
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-white">Community</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl p-6 border border-epic-gray mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Recent Discussions</h2>
              
              <div className="space-y-4">
                {communityPosts.map((post) => (
                  <div key={post.id} className="bg-epic-gray rounded-lg p-4 hover:bg-epic-gray-light transition-colors">
                    <h3 className="text-white font-medium mb-2">{post.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>by {post.author}</span>
                      <span>{post.time}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.replies} replies</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{post.likes} likes</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 border border-epic-gray">
              <h3 className="text-lg font-semibold text-white mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Members</span>
                  <span className="text-epic-accent font-semibold">12,543</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Online Now</span>
                  <span className="text-green-400 font-semibold">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Posts Today</span>
                  <span className="text-epic-secondary font-semibold">89</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-epic-gray">
              <h3 className="text-lg font-semibold text-white mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['RPG', 'Action', 'Indie', 'Multiplayer', 'Strategy'].map((tag) => (
                  <span key={tag} className="bg-epic-secondary px-3 py-1 rounded-full text-sm text-white">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
