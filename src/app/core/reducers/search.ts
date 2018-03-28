import { SearchAction, SearchActionTypes } from '../actions/search';

export interface State {
  products: Array<any>;
  loadingIndicators: { products: boolean, page: boolean },
  query: any,
  metadata: any
}

const initialState: State = {
  products: null,
  loadingIndicators: null,
  metadata: null,
  query: null,
};

export function reducer(
  state: State = initialState,
  action: SearchAction
): State {
  switch (action.type) {
    case SearchActionTypes.initApiDataset:
      return {
        ...state,
        loadingIndicators: { products: true, page: false },
      };

    case SearchActionTypes.completeApiDataset:
      return {
        ...state,
        loadingIndicators: null,
        metadata: {
          dataset: action.payload,
        },
        products: action.payload,
      };

    case SearchActionTypes.doSearch:
      return {
        ...state,
        query: {
          ...state.query,
          ...action.payload,
        },
      };

    case SearchActionTypes.completeSearch:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export const getProducts = (state: State) => state.products;
export const getLoadingIndicators = (state: State) => state.loadingIndicators;
export const getQuery = (state: State) => state.query;
export const getMetadata = (state: State) => state.metadata;
