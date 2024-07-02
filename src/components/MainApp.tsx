"use client";

import React, { useState, createContext } from "react";
import Provider from "./provider";
import Header from "./header";
import BlogPostList from "./BlogPostList";

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
