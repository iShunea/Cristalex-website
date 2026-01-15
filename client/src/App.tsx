import { Switch, Route } from "wouter";
import { lazy, Suspense, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import "./lib/i18n"; // Init i18n

// Lazy load pages for code splitting
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Services = lazy(() => import("@/pages/Services"));
const Contact = lazy(() => import("@/pages/Contact"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:id" component={BlogPost} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  // Keep-alive mechanism to prevent Render.com backend from sleeping
  useEffect(() => {
    const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'https://backend-cristalex-dent.onrender.com';

    // Ping backend every 13 minutes (780000ms) to keep it alive
    const keepAliveInterval = setInterval(async () => {
      try {
        await fetch(`${BACKEND_URL}/api/health`);
      } catch (error) {
        // Silently handle errors - keep-alive is best effort
        console.debug('Keep-alive ping failed:', error);
      }
    }, 780000); // 13 minutes

    // Initial ping on mount
    fetch(`${BACKEND_URL}/api/health`).catch(() => {});

    return () => clearInterval(keepAliveInterval);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;