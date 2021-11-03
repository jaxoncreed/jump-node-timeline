import React, { createContext, FunctionComponent, useContext } from "react";

export function createGlobalHook<ReturnValues>(useHook: () => ReturnValues): {
  Provider: FunctionComponent;
  useGlobal: () => ReturnValues;
} {
  // @ts-ignore
  const Context = createContext<ReturnValues>(undefined);

  const Provider: FunctionComponent = ({ children }) => {
    const returnValues = useHook();
    return <Context.Provider value={returnValues}>{children}</Context.Provider>;
  };

  // @ts-ignore
  console.log(this);

  const useGlobal = () => {
    return useContext(Context);
  };

  return { Provider, useGlobal };
}
