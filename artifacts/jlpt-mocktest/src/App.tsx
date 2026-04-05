import { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Exam } from "./types/exam";
import { saveExams } from "./lib/examStore";
import { ThemeProvider } from "./lib/themeContext";
import Home from "./pages/Home";
import ExamPage from "./pages/ExamPage";
import ResultsPage from "./pages/ResultsPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

const EXAM_FILES = [
  "N3_1775316511181.json",
  "N2_1775317079866.json",
  "N1_mixed.json",
  "N4_mixed.json",
];

const EXAMS_VERSION = "v6";
const VERSION_KEY = "jlpt_exams_version";

function AppRouter({ exams }: { exams: Exam[] }) {
  return (
    <Switch>
      <Route path="/" component={() => <Home exams={exams} />} />
      <Route path="/exam/:level/:examNumber" component={() => <ExamPage exams={exams} />} />
      <Route path="/results/:level/:examNumber" component={() => <ResultsPage exams={exams} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    const currentVersion = localStorage.getItem(VERSION_KEY);

    const loadFromFiles = () =>
      Promise.allSettled(
        EXAM_FILES.map((file) =>
          fetch(import.meta.env.BASE_URL + file)
            .then((r) => {
              if (!r.ok) return [] as Exam[];
              return r.json() as Promise<Exam[]>;
            })
            .then((data) => (Array.isArray(data) ? data : [data] as Exam[]))
            .catch(() => [] as Exam[])
        )
      ).then((results) => {
        const allExams: Exam[] = results.flatMap((r) =>
          r.status === "fulfilled" ? r.value : []
        );
        setExams(allExams);
        saveExams(allExams);
        localStorage.setItem(VERSION_KEY, EXAMS_VERSION);
      });

    if (currentVersion !== EXAMS_VERSION) {
      loadFromFiles();
    } else {
      const stored = localStorage.getItem("jlpt_exams");
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as Exam[];
          if (parsed.length > 0) {
            setExams(parsed);
            return;
          }
        } catch {}
      }
      loadFromFiles();
    }
  }, []);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <AppRouter exams={exams} />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
