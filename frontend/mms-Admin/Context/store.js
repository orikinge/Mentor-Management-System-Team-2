"use client";

import { createContext, useContext, useState } from "react";

const GlobalContext = createContext({
  userData: "",
  setUserData: () => "",
});

export const GlobalContextProvider = ({ children }) => {
  const [userData, setUserData] = useState("");

  return (
    <GlobalContext.Provider value={{ userData, setUserData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
