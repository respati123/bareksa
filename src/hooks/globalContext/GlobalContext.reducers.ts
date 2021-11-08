import { GlobalState, GlobalStateType } from './GlobalContext.state';
import { ActionType, GlobalActionsType } from './GlobalContext.actions';

export const GlobalReducers = (
  state: GlobalStateType = GlobalState,
  action: GlobalActionsType
) => {
  const { type, payload } = action;

  switch (type) {
    case ActionType.SetDisplay:
      return {
        ...state,
        display: payload,
      };
    default:
      return state;
  }
};
