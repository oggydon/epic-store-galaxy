
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Eye, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ModeratorPanel = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const pendingGames = [
    {
      id: 1,
      title: "Space Adventure",
      developer: "IndieDevStudio",
      uploadDate: "2024-01-20",
      status: "Pending Review",
      description: "An exciting space exploration game with stunning graphics."
    },
    {
      id: 2,
      title: "Puzzle Kingdom",
      developer: "CasualGames Inc",
      uploadDate: "2024-01-19",
      status: "Pending Review",
      description: "Match-3 puzzle game with RPG elements."
    }
  ];

  const reviewedGames = [
    {
      id: 3,
      title: "Racing Thunder",
      developer: "SpeedGames",
      reviewDate: "2024-01-18",
      status: "Approved",
      action: "Sent to Admin"
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
          <Shield className="w-8 h-8 text-epic-accent" />
          <h1 className="text-3xl font-bold text-white">Moderator Panel</h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === 'pending' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('pending')}
          >
            Pending Reviews
          </Button>
          <Button
            variant={activeTab === 'reviewed' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('reviewed')}
          >
            Reviewed Games
          </Button>
        </div>

        {/* Pending Reviews */}
        {activeTab === 'pending' && (
          <div className="bg-card rounded-xl p-6 border border-epic-gray">
            <h2 className="text-xl font-semibold text-white mb-6">Games Pending Review</h2>

            <div className="space-y-6">
              {pendingGames.map((game) => (
                <div key={game.id} className="bg-epic-gray rounded-lg p-6 border border-epic-gray-light">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{game.title}</h3>
                      <p className="text-gray-400 text-sm">by {game.developer}</p>
                      <p className="text-gray-400 text-sm">Uploaded: {game.uploadDate}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">
                      {game.status}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-4">{game.description}</p>

                  <div className="flex gap-3">
                    <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                      <Eye className="w-4 h-4 mr-2" />
                      Review Details
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve & Send to Admin
                    </Button>
                    <Button size="sm" variant="destructive">
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviewed Games */}
        {activeTab === 'reviewed' && (
          <div className="bg-card rounded-xl p-6 border border-epic-gray">
            <h2 className="text-xl font-semibold text-white mb-6">Recently Reviewed Games</h2>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-300">Title</TableHead>
                  <TableHead className="text-gray-300">Developer</TableHead>
                  <TableHead className="text-gray-300">Review Date</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Action Taken</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviewedGames.map((game) => (
                  <TableRow key={game.id}>
                    <TableCell className="text-white">{game.title}</TableCell>
                    <TableCell className="text-gray-300">{game.developer}</TableCell>
                    <TableCell className="text-gray-300">{game.reviewDate}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                        {game.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-300">{game.action}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModeratorPanel;
