/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";

const LoadingCtx = createContext();
export const useLoading = () => useContext(LoadingCtx);

export default function LoadingProviderContext({ children }) {
  const [count, setCount] = useState(0);

  const start  = () => setCount(c => c + 1);
  const finish = () => setCount(c => Math.max(c - 1, 0));

  return (
    <LoadingCtx.Provider value={{ start, finish }}>
      {children}
      {count > 0 && <div className="globalLoader"><div className="spinner"/></div>}
    </LoadingCtx.Provider>
  );
}
