
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useUser } from '@/contexts/UserContext';
import { useLibrary } from '@/contexts/LibraryContext';
import { useToast } from '@/hooks/use-toast';

const Purchase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { convertPrice } = useCurrency();
  const { isLoggedIn } = useUser();
  const { addGameToLibrary } = useLibrary();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'upi'>('qr');

  // Mock game data - in real app, fetch based on ID
  const games = [
    { id: 1, title: "Cyber Strike 2077", price: 29.99, image: "/placeholder.svg", isFree: false },
    { id: 2, title: "Dragon Quest Legends", price: 0, image: "/placeholder.svg", isFree: true },
    { id: 3, title: "Racing Thunder", price: 19.99, image: "/placeholder.svg", isFree: false },
    { id: 4, title: "Puzzle Master", price: 9.99, image: "/placeholder.svg", isFree: false },
    { id: 5, title: "Space Adventure", price: 0, image: "/placeholder.svg", isFree: true },
    { id: 6, title: "Strategy Empire", price: 39.99, image: "/placeholder.svg", isFree: false }
  ];

  const game = games.find(g => g.id === parseInt(id || '1')) || games[0];

  const handlePurchase = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Add game to library
    addGameToLibrary({
      id: game.id,
      title: game.title,
      image: game.image,
      purchaseDate: new Date().toISOString().split('T')[0],
      price: game.price,
      isFree: game.isFree
    });

    if (game.isFree) {
      toast({
        title: "Game Added!",
        description: `${game.title} has been added to your library!`,
      });
    } else {
      toast({
        title: "Purchase Successful!",
        description: `Payment of ${convertPrice(game.price)} processed successfully! ${game.title} added to your library.`,
      });
    }
    
    navigate('/library');
  };

  // Generate QR code data for UPI payment
  const generateUPILink = () => {
    const amount = game.price;
    const upiId = 'pavishivani6@okhdfcbank';
    const merchantName = 'GameStore';
    const transactionNote = `Purchase of ${game.title}`;
    
    return `upi://pay?pa=${upiId}&pn=${merchantName}&tn=${transactionNote}&am=${amount}&cu=USD`;
  };

  return (
    <div className="min-h-screen bg-hero-gradient">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link to={`/game/${game.id}`} className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Game Details
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-xl p-8 border border-epic-gray">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">
              {game.isFree ? 'Get Game' : 'Purchase Game'}
            </h1>

            <div className="flex items-center gap-4 mb-6 p-4 bg-epic-gray rounded-lg">
              <img
                src={game.image}
                alt={game.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="text-xl font-semibold text-white">{game.title}</h2>
                <p className="text-2xl font-bold text-epic-accent">
                  {game.isFree ? 'FREE' : convertPrice(game.price)}
                </p>
              </div>
            </div>

            {!game.isFree && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Choose Payment Method</h3>
                <div className="flex gap-4 mb-4">
                  <Button
                    variant={paymentMethod === 'qr' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('qr')}
                    className="flex-1"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    QR Code
                  </Button>
                  <Button
                    variant={paymentMethod === 'upi' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('upi')}
                    className="flex-1"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    UPI Direct
                  </Button>
                </div>

                {paymentMethod === 'qr' && (
                  <div className="bg-white p-4 rounded-lg text-center mb-4">
                    <div className="text-6xl mb-2">📱</div>
                    <p className="text-gray-800 font-medium">Scan QR Code to Pay</p>
                    <p className="text-sm text-gray-600">Amount: {convertPrice(game.price)}</p>
                    <p className="text-sm text-gray-600">UPI ID: pavishivani6@okhdfcbank</p>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="bg-epic-gray p-4 rounded-lg mb-4">
                    <p className="text-white font-medium mb-2">UPI Payment Details:</p>
                    <p className="text-gray-300">UPI ID: pavishivani6@okhdfcbank</p>
                    <p className="text-gray-300">Amount: {convertPrice(game.price)}</p>
                    <Button
                      className="mt-3 w-full"
                      onClick={() => window.open(generateUPILink(), '_blank')}
                    >
                      Pay with UPI App
                    </Button>
                  </div>
                )}
              </div>
            )}

            <Button
              onClick={handlePurchase}
              className="w-full epic-button text-lg py-3"
            >
              {game.isFree ? 'Add to Library' : `Complete Purchase - ${convertPrice(game.price)}`}
            </Button>

            {!isLoggedIn && (
              <p className="text-center text-gray-400 mt-4">
                Please <Link to="/login" className="text-epic-accent hover:underline">login</Link> to complete your purchase
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
