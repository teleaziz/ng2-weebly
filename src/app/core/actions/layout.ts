import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  addProduct = '[layout] add product',
  deleteProduct = '[layout] delete product',
  editProduct = '[layout] edit product',
  duplicateProduct = '[layout] duplicate product',
  showModal = '[layout] show modal',
  closeModal = '[layout] close modal',
}

export class AddProduct implements Action {
  readonly type = LayoutActionTypes.addProduct;

  constructor(public payload?: any) { }
}

export class DeleteProduct implements Action {
  readonly type = LayoutActionTypes.deleteProduct;

  constructor(public payload: any) { }
}

export class EditProduct implements Action {
  readonly type = LayoutActionTypes.editProduct;

  constructor(public payload: any) { }
}

export class DuplicateProduct implements Action {
  readonly type = LayoutActionTypes.duplicateProduct;

  constructor(public payload: any) { }
}

export class CloseModal implements Action {
  readonly type = LayoutActionTypes.closeModal;

  constructor(public payload: any) { }
}

export class ShowModal implements Action {
  readonly type = LayoutActionTypes.showModal;

  constructor(public payload: any) { }
}

export type LayoutAction = AddProduct | EditProduct | DeleteProduct | ShowModal | CloseModal | DuplicateProduct;
