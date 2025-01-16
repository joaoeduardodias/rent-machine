"use client";
import { createContext, ReactNode, useState } from "react";

interface RentMachineContextType {
  currentMachine: string;
  setCurrentMachine: (machine: string) => void;
}

export const RentMachineContext = createContext<
  RentMachineContextType | undefined
>(undefined);

interface RentMachineProviderProps {
  children: ReactNode;
}

export const RentMachineProvider = ({ children }: RentMachineProviderProps) => {
  const [currentMachine, setCurrentMachine] = useState<string>("");

  return (
    <RentMachineContext.Provider value={{ currentMachine, setCurrentMachine }}>
      {children}
    </RentMachineContext.Provider>
  );
};
