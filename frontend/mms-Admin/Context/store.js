"use client";

import { createContext, useContext, useState } from "react";

const GlobalContext = createContext({
  user: "",
  setUser: () => {},
});

export const GlobalContextProvider = ({ children }) => {
  const [state, setState] = useState({});

  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
