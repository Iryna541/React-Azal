import { MutableRefObject, PropsWithChildren, createContext, useContext, useRef, useState } from "react";
import { useSendStoreRankingToEmail } from "./api/useSendStoreRankingToEmail";
import html2canvas from "html2canvas";


export interface Insight {
  photo: string[];
  store_id:string;
  email_text:string;
}

export interface Photo{
  photo:string;
}


export const InsightsContext = createContext<
  {  photos:Photo[],insights: Insight[] ; addPhoto: (photo: Photo) => void; addInsight: (insight: Insight) => void; submit: boolean; handleSubmit : ()=>void;
  setSubmit: (value: boolean) => void;setStoreId: (value: string) => void;setEmailText: (value: string) => void; boxref1: MutableRefObject <HTMLDivElement | null >;boxref2: MutableRefObject <HTMLDivElement | null >;boxref3: MutableRefObject <HTMLDivElement | null >} | undefined
>(undefined);


export function InsightsProvider({ children }: PropsWithChildren) {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [submit, setSubmit] = useState<boolean>(false);
  const [storeId,setStoreId] = useState<string>("");
  const [emailText,setEmailText] = useState<string>("");
  const { mutate: handleSendStoreRankingtoEmail } = useSendStoreRankingToEmail();
  const boxref1= useRef<HTMLDivElement | null>(null);
  const boxref2= useRef(null);
  const boxref3= useRef(null);

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

  function baseConvert(boxRef: React.RefObject<HTMLDivElement>) {
    if (boxRef.current) {
      html2canvas(boxRef.current).then((canvas) => {
        const base64image = canvas.toDataURL("image/png");
        addPhoto({ photo: base64image });
      });
    }
  }


  function handleSubmit(){
    if(submit){
      baseConvert(boxref1);
      baseConvert(boxref2);
      baseConvert(boxref3);
      setSubmit(false);
    }
    }
  

  function addInsight(insight: Insight) {
    setInsights((prev) => {
      return [...prev, insight];
    });
  }

  return (
    <InsightsContext.Provider  value={{ insights, addInsight, submit, setSubmit, photos, addPhoto,setStoreId,setEmailText, boxref1, boxref2,boxref3,handleSubmit }}> 
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
