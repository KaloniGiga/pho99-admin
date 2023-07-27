import React, { useState } from "react";

export const LayoutContext = React.createContext<createContextProps | null>(null);

export interface LayoutProviderProps {
   children: React.ReactNode,
}

export interface createContextProps {
    topSheetData: React.ReactNode | null,
    setTopSheetData: React.Dispatch<React.SetStateAction<boolean | null>>,
    topSheet: boolean,
    setTopSheet: React.Dispatch<React.SetStateAction<boolean>>,
    backgroundOverlay: boolean,
    setBackgroundOverlay: React.Dispatch<React.SetStateAction<boolean>>,
    topSheetContent: React.ReactNode | null,
    setTopSheetContent: React.Dispatch<React.SetStateAction<React.ReactNode| null>>,

}
const LayoutProvider = ({ children }: LayoutProviderProps) => {

  const [topSheetData, setTopSheetData] = useState<boolean | null>(null);

  const [backgroundOverlay, setBackgroundOverlay] = useState(false);

  const [topSheet, setTopSheet] = useState(false);

  const [topSheetContent, setTopSheetContent] = useState<React.ReactNode | null>(null);







  


  const providerValue = {
    topSheetData,
    setTopSheetData,
    backgroundOverlay,
    setBackgroundOverlay,
    topSheet,
    setTopSheet,
    topSheetContent,
    setTopSheetContent,
  };
  
  return (
    <LayoutContext.Provider value={providerValue}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
