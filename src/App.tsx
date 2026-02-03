import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Pages
import HomePage from "./pages/HomePage";
import ChallengesPage from "./pages/ChallengesPage";
import ChallengeDetailPage from "./pages/ChallengeDetailPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ShaftsPage from "./pages/ShaftsPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <Routes>
            {/* Slovak Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/challenges/:slug" element={<ChallengeDetailPage />} />
            <Route path="/produkty" element={<ProductsPage />} />
            <Route path="/produkty/:slug" element={<ProductDetailPage />} />
            <Route path="/hriadele" element={<ShaftsPage />} />
            <Route path="/galeria" element={<GalleryPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            
            {/* English Routes */}
            <Route path="/en" element={<HomePage />} />
            <Route path="/en/challenges" element={<ChallengesPage />} />
            <Route path="/en/challenges/:slug" element={<ChallengeDetailPage />} />
            <Route path="/en/products" element={<ProductsPage />} />
            <Route path="/en/products/:slug" element={<ProductDetailPage />} />
            <Route path="/en/shafts" element={<ShaftsPage />} />
            <Route path="/en/gallery" element={<GalleryPage />} />
            <Route path="/en/contact" element={<ContactPage />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
