import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Users, Shield, ArrowLeft, CheckCircle, XCircle, BarChart3, DollarSign, Save } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useUser } from '@/contexts/UserContext';

const AdminPanel = () => {
  const { isAdmin } = useUser();
  const [activeTab, setActiveTab] = useState('games');
  const [editingPrice, setEditingPrice] = useState<number | null>(null);
  const [newPrice, setNewPrice] = useState<string>('');

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-6">You need admin privileges to access this page.</p>
          <Button asChild>
            <Link to="/">Back to Store</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Mock data with state management
  const [games, setGames] = useState([
    { id: 1, title: "Cyber Strike 2077", status: "Active", downloads: 15000, price: 29.99 },
    { id: 2, title: "Dragon Quest Legends", status: "Active", downloads: 8500, price: 0 },
    { id: 3, title: "Racing Thunder", status: "Active", downloads: 12000, price: 19.99 },
    { id: 4, title: "Puzzle Master", status: "Active", downloads: 5000, price: 9.99 },
  ]);

  const [users, setUsers] = useState([
    { id: 1, username: "gamer123", email: "gamer@example.com", role: "User", status: "Active" },
    { id: 2, username: "moderator1", email: "mod@example.com", role: "Moderator", status: "Active" },
  ]);

  const [pendingGames, setPendingGames] = useState([
    { id: 1, title: "New Adventure Game", developer: "IndieStudio", uploadDate: "2024-01-20", fromModerator: true },
    { id: 2, title: "Puzzle Kingdom", developer: "CasualGames", uploadDate: "2024-01-19", fromModerator: true },
  ]);

  // Download chart data
  const downloadChartData = games.map(game => ({
    name: game.title.length > 15 ? game.title.substring(0, 15) + '...' : game.title,
    downloads: game.downloads
  }));

  const chartConfig = {
    downloads: {
      label: "Downloads",
      color: "#8b5cf6",
    },
  };

  const handleApproveGame = (gameId: number) => {
    setPendingGames(prev => prev.filter(game => game.id !== gameId));
    const approvedGame = pendingGames.find(game => game.id === gameId);
    if (approvedGame) {
      setGames(prev => [...prev, {
        id: Date.now(),
        title: approvedGame.title,
        status: "Active",
        downloads: 0,
        price: 0
      }]);
    }
    console.log('Game approved by admin:', gameId);
  };

  const handleRejectGame = (gameId: number) => {
    setPendingGames(prev => prev.filter(game => game.id !== gameId));
    console.log('Game rejected by admin:', gameId);
  };

  const handleDeleteGame = (gameId: number) => {
    setGames(prev => prev.filter(game => game.id !== gameId));
    console.log('Game deleted:', gameId);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    console.log('User deleted:', userId);
  };

  const handleEditPrice = (gameId: number, currentPrice: number) => {
    setEditingPrice(gameId);
    setNewPrice(currentPrice.toString());
  };

  const handleSavePrice = (gameId: number) => {
    const price = parseFloat(newPrice);
    if (!isNaN(price) && price >= 0) {
      setGames(prev => prev.map(game => 
        game.id === gameId ? { ...game, price } : game
      ));
      setEditingPrice(null);
      setNewPrice('');
      console.log('Price updated for game:', gameId, 'New price:', price);
    }
  };

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
            variant={activeTab === 'analytics' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
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
            Final Approval ({pendingGames.length})
          </Button>
        </div>

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="bg-card rounded-xl p-6 border border-epic-gray">
            <h2 className="text-xl font-semibold text-white mb-6">Download Statistics</h2>
            
            <ChartContainer config={chartConfig} className="h-[400px]">
              <BarChart data={downloadChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="downloads" fill="var(--color-downloads)" />
              </BarChart>
            </ChartContainer>
          </div>
        )}

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
                    <TableCell>
                      {editingPrice === game.id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            className="w-20"
                            min="0"
                            step="0.01"
                          />
                          <Button size="sm" onClick={() => handleSavePrice(game.id)}>
                            <Save className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-300">
                            {game.price === 0 ? 'FREE' : `$${game.price}`}
                          </span>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleEditPrice(game.id, game.price)}
                          >
                            <DollarSign className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-gray-300">{game.downloads.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                        {game.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-400 hover:text-red-300"
                          onClick={() => handleDeleteGame(game.id)}
                        >
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
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-400 hover:text-red-300"
                          onClick={() => handleDeleteUser(user.id)}
                        >
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

        {/* Final Approval from Moderators */}
        {activeTab === 'pending' && (
          <div className="bg-card rounded-xl p-6 border border-epic-gray">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Games Awaiting Final Approval</h2>
              <span className="text-sm text-gray-400">Reviewed by Moderators</span>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-300">Title</TableHead>
                  <TableHead className="text-gray-300">Developer</TableHead>
                  <TableHead className="text-gray-300">Upload Date</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
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
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                        Approved by Moderator
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApproveGame(game.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Final Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleRejectGame(game.id)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                        <Button size="sm" variant="ghost">
                          Review Details
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {pendingGames.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400">No games awaiting final approval</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
