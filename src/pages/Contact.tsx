
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Mail, User, MessageSquare, ArrowLeft, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gameTitle: '',
    description: '',
    genre: '',
    price: ''
  });
  const [gameFile, setGameFile] = useState<File | null>(null);
  const [gameImages, setGameImages] = useState<FileList | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Game submission:', { formData, gameFile, gameImages });
    // TODO: Implement actual file upload and form submission
    alert('Thank you for your submission! We will review your game and get back to you within 24-48 hours.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setGameFile(e.target.files[0]);
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGameImages(e.target.files);
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Store
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Submit Your Game</h1>
            <p className="text-gray-300 text-lg">
              Share your amazing games with our community! Fill out the form below to submit your game for review.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl p-6 border border-epic-gray">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Developer Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Your Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="pl-12 bg-epic-gray border-epic-gray-light focus:border-epic-secondary"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-12 bg-epic-gray border-epic-gray-light focus:border-epic-secondary"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Game Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Game Title *
                      </label>
                      <Input
                        type="text"
                        name="gameTitle"
                        value={formData.gameTitle}
                        onChange={handleChange}
                        className="bg-epic-gray border-epic-gray-light focus:border-epic-secondary"
                        placeholder="Enter game title"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Genre *
                      </label>
                      <select
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        className="w-full h-10 px-3 py-2 bg-epic-gray border border-epic-gray-light rounded-md text-white focus:border-epic-secondary focus:outline-none"
                        required
                      >
                        <option value="">Select Genre</option>
                        <option value="action">Action</option>
                        <option value="adventure">Adventure</option>
                        <option value="rpg">RPG</option>
                        <option value="strategy">Strategy</option>
                        <option value="puzzle">Puzzle</option>
                        <option value="racing">Racing</option>
                        <option value="sports">Sports</option>
                        <option value="simulation">Simulation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Price
                    </label>
                    <Input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="bg-epic-gray border-epic-gray-light focus:border-epic-secondary"
                      placeholder="Free or $X.XX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Game Description *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full pl-12 pt-3 pb-3 pr-3 bg-epic-gray border border-epic-gray-light rounded-md text-white placeholder-gray-400 focus:border-epic-secondary focus:outline-none resize-none"
                        placeholder="Describe your game, its features, gameplay, and what makes it special..."
                        required
                      />
                    </div>
                  </div>

                  {/* File Uploads */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Game File * (.apk, .zip, .exe)
                      </label>
                      <div className="relative">
                        <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept=".apk,.zip,.exe"
                          className="w-full pl-12 h-10 bg-epic-gray border border-epic-gray-light rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-epic-secondary file:text-white hover:file:bg-epic-primary"
                          required
                        />
                      </div>
                      {gameFile && (
                        <p className="text-sm text-gray-400 mt-1">
                          Selected: {gameFile.name} ({(gameFile.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Game Images/Screenshots (Multiple files allowed)
                      </label>
                      <div className="relative">
                        <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="file"
                          onChange={handleImagesChange}
                          accept="image/*"
                          multiple
                          className="w-full pl-12 h-10 bg-epic-gray border border-epic-gray-light rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-epic-secondary file:text-white hover:file:bg-epic-primary"
                        />
                      </div>
                      {gameImages && (
                        <p className="text-sm text-gray-400 mt-1">
                          Selected: {gameImages.length} image(s)
                        </p>
                      )}
                    </div>
                  </div>

                  <Button type="submit" className="w-full epic-button text-lg py-3">
                    Submit Game for Review
                  </Button>
                </form>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <div className="bg-card rounded-xl p-6 border border-epic-gray">
                <h3 className="text-lg font-bold text-white mb-4">Submission Guidelines</h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-epic-accent rounded-full mt-2"></div>
                    <p>Game must be your original work or you must have proper licensing</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-epic-accent rounded-full mt-2"></div>
                    <p>File size should not exceed 500MB</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-epic-accent rounded-full mt-2"></div>
                    <p>Include at least 3 screenshots or gameplay images</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-epic-accent rounded-full mt-2"></div>
                    <p>Provide detailed game description</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-epic-accent rounded-full mt-2"></div>
                    <p>No malicious or inappropriate content</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-epic-gray">
                <h3 className="text-lg font-bold text-white mb-4">Review Process</h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-epic-secondary rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <p>Submit your game</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-epic-secondary rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <p>We review within 24-48 hours</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-epic-secondary rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <p>Get approval notification</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-epic-secondary rounded-full flex items-center justify-center text-white font-bold">4</div>
                    <p>Your game goes live!</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-epic-gray">
                <h3 className="text-lg font-bold text-white mb-4">Need Help?</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Have questions about the submission process? Contact our support team.
                </p>
                <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-black">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
