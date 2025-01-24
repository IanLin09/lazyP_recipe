import { createContext, useContext, useState, ReactNode } from 'react';

interface HeaderData {
  heading: string;
  subheading: string;
}

interface HeaderContextType {
  setHeader: (heading: string, subheading: string) => void;
  headerData: HeaderData;
}

const HeaderContext = createContext<HeaderContextType>({
  setHeader: () => {},
  headerData: { 
    heading: "LazyP", 
    subheading: "For the people who think cooking spend to much time." 
  }
});

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [headerData, setHeaderData] = useState<HeaderData>({
    heading: "LazyP",
    subheading: "For the people who think cooking spend to much time."
  });

  const setHeader = (heading: string, subheading: string) => {
    setHeaderData({ heading, subheading });
  };

  return (
    <HeaderContext.Provider value={{ setHeader, headerData }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => useContext(HeaderContext);