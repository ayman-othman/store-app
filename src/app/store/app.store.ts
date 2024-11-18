import { ActionReducerMap } from '@ngrx/store';

export interface IAppState {
  [x: string]: any;
}

export const INITIAL_APP_STATE: IAppState = {};

export const APP_REDUCERS: ActionReducerMap<IAppState> = {};

export const APP_EFFECTS = [];
