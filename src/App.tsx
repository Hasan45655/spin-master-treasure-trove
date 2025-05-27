
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import IndexPage from "./pages/Index";
import EventsPage from "./pages/Events";
import StickersPage from "./pages/Stickers";
import SpinWheelPage from "./pages/SpinWheelPage";
import AuthPage from "./pages/AuthPage"; // Import AuthPage
import AdminPage from "./pages/AdminPage"; // Import AdminPage
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import { useAuthSession } from "./hooks/useAuthSession"; // Import useAuthSession
import { Loader2 } from "lucide-react";

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

// ProtectedRoute component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuthSession();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={`/auth?redirect=${location.pathname}${location.search}`} replace />;
  }

  return children;
};

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
            <Route path="/spin-wheel" element={<SpinWheelPage />} />
            <Route path="/auth" element={<AuthPage />} /> {/* Add route for AuthPage */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } 
            /> {/* Add protected route for AdminPage */}
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
