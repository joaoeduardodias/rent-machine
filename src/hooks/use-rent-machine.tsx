import { RentMachineContext } from "@/context/rent-machine";
import { useContext } from "react";

export const useRentMachine = () => {
  const context = useContext(RentMachineContext);
  if (!context) {
    throw new Error("useRentMachine must be used within a RentMachineProvider");
  }
  return context;
};
