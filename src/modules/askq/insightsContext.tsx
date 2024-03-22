import { PropsWithChildren, createContext, useContext, useState } from "react";

export interface Insight {
  base64: string;
}

export const InsightsContext = createContext<
  { insights: Insight[]; addInsight: (insight: Insight) => void; submit: boolean; 
  setSubmit: (value: boolean) => void; } | undefined
>(undefined);

export function InsightsProvider({ children }: PropsWithChildren) {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [submit, setSubmit] = useState<boolean>(false);

  function addInsight(insight: Insight) {
    setInsights((prev) => {
      return [...prev, insight];
    });
  }

  return (
    <InsightsContext.Provider value={{ insights, addInsight, submit, setSubmit }}> 
      {children}
    </InsightsContext.Provider>
  );
}

export function useInsightsContext() {
  const context = useContext(InsightsContext);
  if (context === undefined) {
    throw new Error("useInsights must be used within a InsightsProvider");
  }
  return context;
}
