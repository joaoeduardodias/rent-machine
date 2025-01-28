"use client";
import { createContext, ReactNode, useState } from "react";

interface RentMachineContextType {
  currentMachine: string;
  periodRent: string;
  currentMachineName: string;
  setCurrentMachineName: (machineName: string) => void;
  setPeriodRent: (period: string) => void;
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
  const [periodRent, setPeriodRent] = useState<string>("");
  const [currentMachineName, setCurrentMachineName] = useState<string>("");

  return (
    <RentMachineContext.Provider
      value={{
        currentMachine,
        setCurrentMachine,
        periodRent,
        setPeriodRent,
        currentMachineName,
        setCurrentMachineName,
      }}
    >
      {children}
    </RentMachineContext.Provider>
  );
};
