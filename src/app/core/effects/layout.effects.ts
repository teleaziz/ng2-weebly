import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { map, tap, switchMap, take } from 'rxjs/operators';
import { LayoutAction, LayoutActionTypes, ShowModal, DuplicateProduct, } from '../actions/layout';
import * as searchActions from '../actions/search';
import * as fromRoot from '../../reducers'
import { ProductFormComponent } from '../components/product-form/product-form.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

const noActionNeeded = { type: 'NO_ACTION' };

@Injectable()
export class LayoutEffects {

  @Effect()
  addProduct$ = this.actions$
    .ofType(LayoutActionTypes.addProduct)
    .pipe(
      tap((action: LayoutAction) => {
        this.store.dispatch(new ShowModal({ modalComponent: ProductFormComponent, modalParams: null }));
      }),
      switchMap(() => {
        return this.actions$.ofType(LayoutActionTypes.closeModal).pipe(
          take(1),
          map((action: LayoutAction) => {
            if (action.payload) {
              return new searchActions.AddProduct(action.payload);
            }
            return noActionNeeded;
          }))
      })
    );


  @Effect()
  editProduct$ = this.actions$
    .ofType(LayoutActionTypes.editProduct)
    .pipe(
      tap((action: LayoutAction) => {
        this.store.dispatch(new ShowModal({ modalComponent: ProductFormComponent, modalParams: action.payload }));
      }),
      switchMap(() => {
        return this.actions$.ofType(LayoutActionTypes.closeModal).pipe(take(1),
          map((closeModalAction: LayoutAction) => {
            if (closeModalAction.payload) {
              return new searchActions.EditProduct(closeModalAction.payload);
            }
            return noActionNeeded;
          }))
      })
    );

  @Effect()
  duplicateProduct$ = this.actions$
    .ofType(LayoutActionTypes.duplicateProduct)
    .pipe(
      map((action: DuplicateProduct) => new searchActions.AddProduct({
        product: {
          ...action.payload.product,
          id: action.payload.product.id + Math.ceil(Math.random() * 100),
          name: `${action.payload.product.name} (copy)`
        }
      }))
    );

  @Effect()
  deleteProduct$ = this.actions$
    .ofType(LayoutActionTypes.deleteProduct)
    .pipe(
      tap((action: LayoutAction) => {
        this.store.dispatch(new ShowModal({
          modalComponent: ConfirmDialogComponent, modalParams: {
            message: `This will delete ${action.payload.product.name}`,
            cta: 'Delete Product',
          }
        }));
      }),
      switchMap((action: LayoutAction) => {
        return this.actions$.ofType(LayoutActionTypes.closeModal).pipe(take(1),
          map((closeModalAction: LayoutAction) => {
            if (closeModalAction.payload) {
              return new searchActions.DeleteProduct(action.payload);
            }
            return noActionNeeded;
          }))
      })
    );

  constructor(
    private store: Store<fromRoot.State>,
    private actions$: Actions,
  ) { }
}
