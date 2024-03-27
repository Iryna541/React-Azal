import { PropsWithChildren, createContext, useContext, useState } from "react";
import { useSendStoreRankingToEmail } from "./api/useSendStoreRankingToEmail";

export interface Insight {
  photo: string[];
  store_id:string;
  email_text:string;
}

export interface Photo{
  photo:string;
}

export const InsightsContext = createContext<
  {  photos:Photo[],insights: Insight[] ; addPhoto: (photo: Photo) => void; addInsight: (insight: Insight) => void; submit: boolean; 
  setSubmit: (value: boolean) => void;setStoreId: (value: string) => void;setEmailText: (value: string) => void; } | undefined
>(undefined);


export function InsightsProvider({ children }: PropsWithChildren) {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [submit, setSubmit] = useState<boolean>(false);
  const [storeId,setStoreId] = useState<string>("");
  const [emailText,setEmailText] = useState<string>("");
  const { mutate: handleSendStoreRankingtoEmail } = useSendStoreRankingToEmail();

  function addPhoto(photo: Photo) {
    setPhotos((prevPhotos) => {
      const updatedPhotos = photo.photo.length > 1 ? [...prevPhotos, photo] : [];

      if (updatedPhotos.length === 3) {
        const photoStrings = updatedPhotos.map(p => p.photo);
        handleSendStoreRankingtoEmail({ photo: photoStrings, store_id: storeId, email_text:emailText });
      }

      return updatedPhotos;
    });
  }

  function addInsight(insight: Insight) {
    setInsights((prev) => {
      return [...prev, insight];
    });
  }

  return (
    <InsightsContext.Provider value={{ insights, addInsight, submit, setSubmit, photos, addPhoto,setStoreId,setEmailText }}> 
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
