import { useAuth } from "@hooks";
import { WorkTimeType } from "@types";
import React, { createContext, useContext, useReducer } from "react";
import { WorkTimeAction, reducer } from "./reducer";

const days = ["شنبه", "یکشنبه", "دوشنبه", "سشنبه", "چهارشنبه", "پنجشنبه", "جمعه"];

type ContextType = {
  state: WorkTimeType[];
  dispatch: React.Dispatch<WorkTimeAction>;
  days: string[];
};

const worktimeContext = createContext<ContextType | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

const WorkTimeProvider: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(reducer, user.workTime);
  return (
    <worktimeContext.Provider value={{ days, state, dispatch }}>
      {children}
    </worktimeContext.Provider>
  );
};

export const useWorktimeContext = () => {
  const context = useContext(worktimeContext);
  if (!context) {
    throw new Error("invalid context");
  }

  return context;
};

export default WorkTimeProvider;
