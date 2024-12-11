"use client"
import { createContext, Dispatch, SetStateAction, useState } from "react";

type TContext = {
  showNav: string;
  setShowNav: Dispatch<SetStateAction<string>>
}
export const ShowNavContext = createContext<TContext | null>(null);

function ShowNanContextProvider({ children }: { children: React.ReactNode }) {
  const [showNav, setShowNav] = useState("");

  return (
    <ShowNavContext.Provider value={{ showNav, setShowNav }}>{children}</ShowNavContext.Provider>
  )

}
export default ShowNanContextProvider;
