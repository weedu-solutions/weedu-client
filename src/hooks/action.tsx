import { useContext } from "react";
import { ActionContext, IActionContextState } from "../contexts/action";

export function useAction(): IActionContextState {
  const context = useContext(ActionContext);
  return context;
}
