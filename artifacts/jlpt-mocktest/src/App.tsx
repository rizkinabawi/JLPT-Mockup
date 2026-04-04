import { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Exam } from "./types/exam";
import { saveExams, loadExams } from "./lib/examStore";
import Home from "./pages/Home";
import ExamPage from "./pages/ExamPage";
import ResultsPage from "./pages/ResultsPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function AppRouter({ exams, onExamsLoaded }: { exams: Exam[]; onExamsLoaded: (e: Exam[]) => void }) {
  return (
    <Switch>
      <Route path="/" component={() => <Home exams={exams} onExamsLoaded={onExamsLoaded} />} />
      <Route path="/exam/:level/:examNumber" component={() => <ExamPage exams={exams} />} />
      <Route path="/results/:level/:examNumber" component={() => <ResultsPage exams={exams} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    const stored = loadExams();
    if (stored && stored.length > 0) {
      setExams(stored);
    } else {
      fetch(import.meta.env.BASE_URL + "N3_1775316511181.json")
        .then((r) => r.json())
        .then((data: Exam[]) => {
          const loaded = Array.isArray(data) ? data : [data];
          setExams(loaded);
          saveExams(loaded);
        })
        .catch(() => {});
    }
  }, []);

  const handleExamsLoaded = (newExams: Exam[]) => {
    setExams(newExams);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppRouter exams={exams} onExamsLoaded={handleExamsLoaded} />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
