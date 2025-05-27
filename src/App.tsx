
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import IndexPage from "./pages/Index";
import EventsPage from "./pages/Events";
import StickersPage from "./pages/Stickers";
import SpinWheelPage from "./pages/SpinWheelPage"; // Import the new page
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

const queryClient = new QueryClient();

// Layout component to include Header
const AppLayout = () => (
  <div className="flex flex-col min-h-screen bg-background">
    <Header />
    <main className="flex-grow">
      <Outlet /> {/* This is where nested routes will render their element */}
    </main>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}> {/* Use AppLayout for routes that need the header */}
            <Route path="/" element={<IndexPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/stickers" element={<StickersPage />} />
            <Route path="/spin-wheel" element={<SpinWheelPage />} /> {/* Add route for Spin Wheel */}
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          {/* NotFound route can be outside AppLayout if it doesn't need the header, or inside if it does */}
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
