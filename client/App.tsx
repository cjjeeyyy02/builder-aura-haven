import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { ThemeProvider } from "./hooks/use-theme";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/onboarding"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Onboarding</h1>
                  <p className="text-muted-foreground">Coming soon...</p>
                </div>
              }
            />
            <Route
              path="/records"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Records</h1>
                  <p className="text-muted-foreground">Coming soon...</p>
                </div>
              }
            />
            <Route
              path="/performance"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Performance</h1>
                  <p className="text-muted-foreground">Coming soon...</p>
                </div>
              }
            />
            <Route
              path="/media-resources"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Media Resources</h1>
                  <p className="text-muted-foreground">Coming soon...</p>
                </div>
              }
            />
            <Route
              path="/payroll"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Payroll</h1>
                  <p className="text-muted-foreground">Coming soon...</p>
                </div>
              }
            />
            <Route
              path="/offboarding"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Offboarding</h1>
                  <p className="text-muted-foreground">Coming soon...</p>
                </div>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
