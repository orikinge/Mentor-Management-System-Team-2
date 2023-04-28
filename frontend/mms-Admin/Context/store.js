"use client";

import { createContext, useContext, useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

export const GlobalContext = createContext({
  userData: "",
  setUserData: () => "",
  isMobileSideBarOpen: false,
  setMobileSideBarState: (state) => state,
});

export const GlobalContextProvider = ({ children }) => {
  const [userData, setUserData] = useState("");
  const [isMobileSideBarOpen, setMobileSideBarState] = useState(false);
  const matches = useMediaQuery('(max-width: 768px)')
  useEffect(()=>{
    setMobileSideBarState(matches)
  }, [matches])

  return (
    <GlobalContext.Provider
      value={{
        userData,
        setUserData,
        isMobileSideBarOpen,
        setMobileSideBarState,
        isMobile: matches,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
