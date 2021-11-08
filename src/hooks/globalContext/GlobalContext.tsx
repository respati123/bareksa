import React, { createContext, useEffect, useReducer } from 'react';
import { GlobalState, GlobalStateType } from './GlobalContext.state';
import { ActionType, GlobalActionsType } from './GlobalContext.actions';
import { GlobalReducers } from './GlobalContext.reducers';

const GlobalContext = createContext<{
  state: GlobalStateType;
  dispatch: React.Dispatch<GlobalActionsType>;
}>({ state: GlobalState, dispatch: () => undefined });

export const useGlobal = () => {
  const [state, dispatch] = useReducer(GlobalReducers, GlobalState);

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);

    return () => {
      window.addEventListener('resize', updateWindowDimensions);
    };
  }, []);

  const updateWindowDimensions = () => {
    if (window.innerWidth <= 320) {
      return dispatch({ type: ActionType.SetDisplay, payload: 'mobileS' });
    }
    if (window.innerWidth <= 375) {
      return dispatch({ type: ActionType.SetDisplay, payload: 'mobileL' });
    }
    if (window.innerWidth <= 425) {
      return dispatch({ type: ActionType.SetDisplay, payload: 'mobileM' });
    }
    if (window.innerWidth <= 768) {
      return dispatch({ type: ActionType.SetDisplay, payload: 'tablet' });
    }
    if (window.innerWidth <= 1024) {
      return dispatch({ type: ActionType.SetDisplay, payload: 'laptop' });
    }
    if (window.innerWidth <= 1440) {
      return dispatch({ type: ActionType.SetDisplay, payload: 'laptopL' });
    }
    if (window.innerWidth <= 2560) {
      return dispatch({ type: ActionType.SetDisplay, payload: 'desktop' });
    }
  };

  return {
    state,
    dispatch,
  };
};

export const DisplayProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <GlobalContext.Provider value={useGlobal() as ReturnType<typeof useGlobal>}>
      {children}
    </GlobalContext.Provider>
  );
};
