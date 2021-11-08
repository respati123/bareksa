export enum ActionType {
  SetDisplay,
}

export interface SetDisplay {
  type: ActionType.SetDisplay;
  payload: string;
}

export type GlobalActionsType = SetDisplay;
