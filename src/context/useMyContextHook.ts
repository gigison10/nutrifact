import { useContext } from "react";
import { MyContext, MyContextValue } from "./context";

// Create a consumer hook
const useMyContext = (): MyContextValue => {
  const contextValue = useContext(MyContext);
  if (contextValue === undefined) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return contextValue;
};

export default useMyContext;
