import { Action } from '@ngrx/store';

export enum SearchActionTypes {
  doSearch = '[Search] do',
  completeSearch = '[Search] complete',
  initApiDataset = '[Search] init api dataset',
  completeApiDataset = '[Search] complete api dataset',
  apiError = '[Search] api error',
  addProduct = '[Search] add product',
  deleteProduct = '[Search] delete product',
  editProduct = '[Search] edit product',
}

export class InitApiDataset implements Action {
  readonly type = SearchActionTypes.initApiDataset;

  constructor(public payload?: any) { }
}

export class CompleteApiDataset implements Action {
  readonly type = SearchActionTypes.completeApiDataset;

  constructor(public payload: any) { }
}

export class DoSearch implements Action {
  readonly type = SearchActionTypes.doSearch;

  constructor(public payload: any) { }
}

export class CompleteSearch implements Action {
  readonly type = SearchActionTypes.completeSearch;

  constructor(public payload: any) { }
}

export class ApiError implements Action {
  readonly type = SearchActionTypes.apiError;

  constructor(public payload: any) { }
}

export class AddProduct implements Action {
  readonly type = SearchActionTypes.addProduct;

  constructor(public payload: any) { }
}

export class DeleteProduct implements Action {
  readonly type = SearchActionTypes.deleteProduct;

  constructor(public payload: any) { }
}

export class EditProduct implements Action {
  readonly type = SearchActionTypes.editProduct;

  constructor(public payload: any) { }
}

export type SearchAction = InitApiDataset |
  CompleteApiDataset |
  CompleteSearch | DoSearch |
  ApiError |
  AddProduct |
  EditProduct |
  DeleteProduct;
