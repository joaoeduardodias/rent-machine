"use client";
import { createContext, ReactNode, useState } from "react";

interface RentMachineContextType {
  currentMachine: string;
  startDate?: Date;
  endDate?: Date;
  currentMachineName: string;
  setStartDate: (startDate: Date) => void;
  setEndDate: (startDate: Date) => void;
  setCurrentMachineName: (machineName: string) => void;
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
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [currentMachineName, setCurrentMachineName] = useState<string>("");

  return (
    <RentMachineContext.Provider
      value={{
        currentMachine,
        setCurrentMachine,
        endDate,
        setEndDate,
        setStartDate,
        startDate,
        currentMachineName,
        setCurrentMachineName,
      }}
    >
      {children}
    </RentMachineContext.Provider>
  );
};
