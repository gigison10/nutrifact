import React, { createContext, Dispatch, SetStateAction } from "react";

export type MyContextValue = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

// Create a context
export const MyContext = createContext<MyContextValue | undefined>(undefined);
