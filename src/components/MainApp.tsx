"use client";

import React, { useState, createContext } from "react";
import Header from "./header";

export const toSearchContext = createContext({
  toSearch: "",
  settoSearch: (toSearch: string) => {},
});

function MainApp({ children }: { children: React.ReactNode }) {
  const [toSearch, settoSearch] = useState("");
  return (
    
      <toSearchContext.Provider value={{ toSearch, settoSearch }}>
        <Header />
        {children}
      </toSearchContext.Provider>
    
  );
}

export default MainApp;
