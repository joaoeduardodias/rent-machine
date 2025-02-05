"use client";
import { SelectedMachineType } from "@/types/machine";
import { createContext, ReactNode, useState } from "react";

interface RentMachineContextType {
  currentMachines: SelectedMachineType[];
  startDate?: Date;
  endDate?: Date;
  setStartDate: (startDate: Date) => void;
  setEndDate: (startDate: Date) => void;
  setCurrentMachines: (machines: SelectedMachineType[]) => void;
}

export const RentMachineContext = createContext<
  RentMachineContextType | undefined
>(undefined);

interface RentMachineProviderProps {
  children: ReactNode;
}

export const RentMachineProvider = ({ children }: RentMachineProviderProps) => {
  const [currentMachines, setCurrentMachines] = useState<SelectedMachineType[]>(
    []
  );
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  return (
    <RentMachineContext.Provider
      value={{
        currentMachines,
        setCurrentMachines,
        endDate,
        setEndDate,
        setStartDate,
        startDate,
      }}
    >
      {children}
    </RentMachineContext.Provider>
  );
};
