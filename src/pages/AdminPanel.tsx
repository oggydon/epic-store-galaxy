
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Users, Shield, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('games');

  // Mock data
  const games = [
    { id: 1, title: "Cyber Strike 2077", status: "Active", downloads: 15000, price: "$29.99" },
    { id: 2, title: "Dragon Quest Legends", status: "Pending", downloads: 8500, price: "Free" },
  ];

  const users = [
    { id: 1, username: "gamer123", email: "gamer@example.com", role: "User", status: "Active" },
    { id: 2, username: "moderator1", email: "mod@example.com", role: "Moderator", status: "Active" },
  ];

  const pendingGames = [
    { id: 1, title: "New Adventure Game", developer: "IndieStudio", uploadDate: "2024-01-20" },
    { id: 2, title: "Puzzle Master", developer: "CasualGames", uploadDate: "2024-01-19" },
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
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === 'games' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('games')}
          >
            Games Management
          </Button>
          <Button
            variant={activeTab === 'users' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('users')}
          >
            <Users className="w-4 h-4 mr-2" />
            User Management
          </Button>
          <Button
            variant={activeTab === 'pending' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('pending')}
          >
            <Shield className="w-4 h-4 mr-2" />
            Pending Games
          </Button>
        </div>

        {/* Games Management */}
        {activeTab === 'games' && (
          <div className="bg-card rounded-xl p-6 border border-epic-gray">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Games Management</h2>
              <Button className="epic-button">
                <Plus className="w-4 h-4 mr-2" />
                Add New Game
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-300">Title</TableHead>
                  <TableHead className="text-gray-300">Price</TableHead>
                  <TableHead className="text-gray-300">Downloads</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {games.map((game) => (
                  <TableRow key={game.id}>
                    <TableCell className="text-white">{game.title}</TableCell>
                    <TableCell className="text-gray-300">{game.price}</TableCell>
                    <TableCell className="text-gray-300">{game.downloads.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        game.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {game.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* User Management */}
        {activeTab === 'users' && (
          <div className="bg-card rounded-xl p-6 border border-epic-gray">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">User Management</h2>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-300">Username</TableHead>
                  <TableHead className="text-gray-300">Email</TableHead>
                  <TableHead className="text-gray-300">Role</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="text-white">{user.username}</TableCell>
                    <TableCell className="text-gray-300">{user.email}</TableCell>
                    <TableCell>
                      <select className="bg-epic-gray border border-epic-gray-light rounded px-2 py-1 text-white text-sm">
                        <option value="User">User</option>
                        <option value="Moderator">Moderator</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Pending Games */}
        {activeTab === 'pending' && (
          <div className="bg-card rounded-xl p-6 border border-epic-gray">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Pending Game Approvals</h2>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-300">Title</TableHead>
                  <TableHead className="text-gray-300">Developer</TableHead>
                  <TableHead className="text-gray-300">Upload Date</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingGames.map((game) => (
                  <TableRow key={game.id}>
                    <TableCell className="text-white">{game.title}</TableCell>
                    <TableCell className="text-gray-300">{game.developer}</TableCell>
                    <TableCell className="text-gray-300">{game.uploadDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          Reject
                        </Button>
                        <Button size="sm" variant="ghost">
                          Review
                        </Button>
                      </div>
                    </TableCell>
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

export default AdminPanel;
