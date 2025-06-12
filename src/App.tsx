import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductPage from "./pages/ProductPage";
import ProductDetails from "./pages/ProductDetails";
import ChatPage from "./pages/ChatPage";
import DonationForm from "./pages/DonationForm";
import History from "./pages/History";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/masuk" element={<Login />} />
          <Route path="/daftar" element={<Register />} />
          <Route path="/donasi" element={<ProductPage />} />
          <Route path="/donasi/:id" element={<ProductDetails />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/bagi" element={<DonationForm />} />
          <Route path="/riwayat" element={<History />} />
          <Route path="/profil/:id" element={<UserProfile />} />
          <Route path="/profil/edit" element={<EditProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
