import React, {
  createContext,
  FunctionComponent,
  useContext,
  Context,
} from "react";

export function createGlobalHook<ReturnValues>(useHook: () => ReturnValues): {
  Provider: FunctionComponent;
  useGlobal: () => ReturnValues;
  Context: Context<ReturnValues>;
} {
  // @ts-ignore
  const Context = createContext<ReturnValues>(undefined);

  const Provider: FunctionComponent = ({ children }) => {
    const returnValues = useHook();
    return <Context.Provider value={returnValues}>{children}</Context.Provider>;
  };

  const useGlobal = () => {
    return useContext(Context);
  };

  return { Provider, useGlobal, Context };
}
