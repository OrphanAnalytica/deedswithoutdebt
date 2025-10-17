import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Archive from "@/pages/Archive";
import About from "@/pages/About";
import Subscribe from "@/pages/Subscribe";
import Resources from "@/pages/Resources";
import StateGuides from "@/pages/StateGuides";
import StateGuidePage from "@/pages/StateGuidePage";
import UpcomingAuctions from "@/pages/UpcomingAuctions";
import NewsletterPost from "@/pages/NewsletterPost";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import Disclaimer from "@/pages/Disclaimer";
import Contact from "@/pages/Contact";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";

function Router() {
  return (
    <Layout>
      <Switch>
        {/* Public routes - no subscription required */}
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/subscribe" component={Subscribe} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/terms" component={TermsOfService} />
        <Route path="/disclaimer" component={Disclaimer} />
        <Route path="/contact" component={Contact} />
        <Route path="/archive" component={Archive} />
        <Route path="/archive/:slug" component={NewsletterPost} />
        
        {/* Protected routes - subscription required */}
        
        <Route path="/resources">
          <ProtectedRoute variant="resources">
            <Resources />
          </ProtectedRoute>
        </Route>
        
        <Route path="/state-guides">
          <ProtectedRoute variant="guides">
            <StateGuides />
          </ProtectedRoute>
        </Route>
        
        <Route path="/state-guides/:slug">
          <ProtectedRoute variant="guides">
            <StateGuidePage />
          </ProtectedRoute>
        </Route>
        
        <Route path="/upcoming-auctions">
          <ProtectedRoute variant="auctions">
            <UpcomingAuctions />
          </ProtectedRoute>
        </Route>
        
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SubscriptionProvider>
          <Toaster />
          <Router />
        </SubscriptionProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
