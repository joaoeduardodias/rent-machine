"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface MachineData {
  id: string;
  name: string;
}

interface ModalContextProps {
  modals: { [key: string]: boolean };
  machineData: MachineData | null;
  openModal: (modalName: string, machineData?: MachineData) => void;
  closeModal: (modalName: string) => void;
  toggleModal: (modalName: string) => void;
}

const ModalsContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalsProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<{ [key: string]: boolean }>({});
  const [machineData, setMachineData] = useState<MachineData | null>(null);

  const openModal = (modalName: string, machineData?: MachineData) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
    if (machineData) setMachineData(machineData);
  };

  const closeModal = (modalName: string) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const toggleModal = (modalName: string) => {
    setModals((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }));
  };

  return (
    <ModalsContext.Provider
      value={{ modals, machineData, openModal, closeModal, toggleModal }}
    >
      {children}
    </ModalsContext.Provider>
  );
};

export const useModals = () => {
  const context = useContext(ModalsContext);
  if (!context) {
    throw new Error("useModals must be used within a ModalsProvider");
  }
  return context;
};
