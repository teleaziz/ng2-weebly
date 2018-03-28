import { LayoutActionTypes, LayoutAction } from '../actions/layout';

export interface State {
  modalComponent: any // Component
  modalParams: any // params to pass to modal componen
  modalResolveValue: any // resolve value when closing the modal
}

const initialState: State = {
  modalComponent: null,
  modalParams: null,
  modalResolveValue: null,
};

export function reducer(
  state: State = initialState,
  action: LayoutAction
): State {
  switch (action.type) {
    case LayoutActionTypes.showModal:
      return {
        ...action.payload
      };

    case LayoutActionTypes.closeModal:
      return {
        modalComponent: null,
        modalParams: null,
        modalResolveValue: action.payload
      };

    default:
      return state;
  }
}

export const getModalComponent = (state: State) => state.modalComponent;
export const getModalParams = (state: State) => state.modalParams;
export const getModalResolveValue = (state: State) => state.modalResolveValue;
