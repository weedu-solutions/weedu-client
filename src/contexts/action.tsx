import { createContext } from "react";

//os daqui
export type ActionProps = {};

export interface IActionContextState {}

export const ActionContext = createContext<ActionProps>({} as ActionProps);

export const ActionProvider: React.FC = ({ children }) => {
  return <ActionContext.Provider value={{}}>{children}</ActionContext.Provider>;
};
