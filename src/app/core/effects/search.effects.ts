import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { tap, map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import * as searchActions from '../actions/search';
import { ProductsService } from '../services/products.service';
import * as fromRoot from '../../reducers';

@Injectable()
export class SearchEffects {
  @Effect()
  doSearch$ = this.actions$.pipe(
    ofType(searchActions.SearchActionTypes.doSearch),
    withLatestFrom(this.store),
    map(([_, state]) => this.productsService.search(state.search.metadata.dataset, state.search.query)),
    map(response => new searchActions.CompleteSearch(response)),
  );

  @Effect()
  initApiDataSet$ = this.actions$.pipe(
    ofType(searchActions.SearchActionTypes.initApiDataset),
    switchMap(() =>
      fromPromise(this.productsService.getAll()).pipe(
        map(response => new searchActions.CompleteApiDataset(response)),
        catchError((err: any) => of(new searchActions.ApiError(err))),
      ))
  );

  @Effect()
  addProduct$ = this.actions$.pipe(
    ofType(searchActions.SearchActionTypes.addProduct),
    withLatestFrom(this.store.select(fromRoot.getSearchState)),
    switchMap(([action, search]) =>
      fromPromise(this
        .productsService
        .create((action as searchActions.SearchAction).payload.product, search.metadata.dataset, search.query))
        .pipe(
          map(response => new searchActions.CompleteSearch(response)),
          catchError((err: any) => of(new searchActions.ApiError(err))),
      ))
  );

  @Effect()
  editProduct$ = this.actions$.pipe(
    ofType(searchActions.SearchActionTypes.editProduct),
    withLatestFrom(this.store.select(fromRoot.getSearchState)),
    switchMap(([action, search]) =>
      fromPromise(this
        .productsService
        .update((action as searchActions.SearchAction).payload.product, search.metadata.dataset, search.query))
        .pipe(
          map(response => new searchActions.CompleteSearch(response)),
          catchError((err: any) => of(new searchActions.ApiError(err))),
      ))
  );


  @Effect()
  deleteProduct$ = this.actions$.pipe(
    ofType(searchActions.SearchActionTypes.deleteProduct),
    withLatestFrom(this.store.select(fromRoot.getSearchState)),
    switchMap(([action, search]) =>
      fromPromise(this
        .productsService
        .delete((action as searchActions.SearchAction).payload.product, search.metadata.dataset, search.query))
        .pipe(
          map(response => new searchActions.CompleteSearch(response)),
          catchError((err: any) => of(new searchActions.ApiError(err))),
      ))
  );

  constructor(
    private store: Store<fromRoot.State>,
    private actions$: Actions,
    private productsService: ProductsService,
  ) { }
}
