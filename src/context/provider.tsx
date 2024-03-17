import React, { ReactNode } from "react";
import { useState } from "react";
import { MyContext, MyContextValue } from "./context";

// Create a provider component
const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [value, setValue] = useState<string>("");

  const contextValue: MyContextValue = {
    value,
    setValue,
  };
  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export default MyProvider;
