import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/archive" component={Archive} />
        <Route path="/about" component={About} />
        <Route path="/subscribe" component={Subscribe} />
        <Route path="/resources" component={Resources} />
        <Route path="/state-guides" component={StateGuides} />
        <Route path="/state-guides/:slug" component={StateGuidePage} />
        <Route path="/upcoming-auctions" component={UpcomingAuctions} />
        <Route path="/archive/:slug" component={NewsletterPost} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/terms" component={TermsOfService} />
        <Route path="/disclaimer" component={Disclaimer} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
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
