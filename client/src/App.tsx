import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import Home from "@/pages/Home";
import EnrollmentWizard from "@/pages/EnrollmentWizard";
import Dashboard from "@/pages/Dashboard";
import Success from "@/pages/Success";
import AboutICHRA from "@/pages/AboutICHRA";
import ForEmployers from "@/pages/ForEmployers";
import Resources from "@/pages/Resources";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/enroll" component={EnrollmentWizard} />
      <Route path="/dashboard/:businessId" component={Dashboard} />
      <Route path="/success/:enrollmentId" component={Success} />
      <Route path="/about-ichra" component={AboutICHRA} />
      <Route path="/for-employers" component={ForEmployers} />
      <Route path="/resources" component={Resources} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
