
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GameDetails from "./pages/GameDetails";
import Contact from "./pages/Contact";
import Library from "./pages/Library";
import Community from "./pages/Community";
import AdminPanel from "./pages/AdminPanel";
import ModeratorPanel from "./pages/ModeratorPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <UserProvider>
          <CurrencyProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/game/:id" element={<GameDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/library" element={<Library />} />
              <Route path="/community" element={<Community />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/moderator" element={<ModeratorPanel />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CurrencyProvider>
        </UserProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
