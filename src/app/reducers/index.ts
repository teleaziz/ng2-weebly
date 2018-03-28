import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

import * as fromLayout from '../core/reducers/layout';
import * as fromSearch from '../core/reducers/search';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  layout: fromLayout.State;
  search: fromSearch.State;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer,
  search: fromSearch.reducer,
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];

/**
 * Layout Selectors
 */
export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

export const getModalComponent = createSelector(
  getLayoutState,
  fromLayout.getModalComponent
);

export const getModalParams = createSelector(
  getLayoutState,
  fromLayout.getModalParams
);

export const getModalResolveValue = createSelector(
  getLayoutState,
  fromLayout.getModalResolveValue
);

/**
 * Search Selectors
 */
export const getSearchState = createFeatureSelector<fromSearch.State>('search');

export const getProducts = createSelector(
  getSearchState,
  fromSearch.getProducts
);

export const getQuery = createSelector(
  getSearchState,
  fromSearch.getQuery
);

export const getLoadingIndicators = createSelector(
  getSearchState,
  fromSearch.getLoadingIndicators
);

export const getMetadata = createSelector(getSearchState, fromSearch.getMetadata);
