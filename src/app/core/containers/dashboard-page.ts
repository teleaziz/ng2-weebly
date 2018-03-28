


import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { take, map } from 'rxjs/operators';

import * as fromRoot from '../../reducers';
import * as layout from '../actions/layout';
import * as search from '../actions/search';

@Component({
  selector: 'zz-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="header">
      <h1>Products</h1>
      <zz-search-input [query]="query$ | async" (search)="search($event)"></zz-search-input>
      <div>
        <button class="action" (click)="addProduct()">Add Product</button>
        <button><img class="export" src="assets/export.png"></button>
      </div>
    </div>
    <zz-products-list
      [products]="products$ | async"
      [query]="query$ | async"
      (search)="search($event)"
      (productAction)="onProductAction($event)">
    </zz-products-list>
    <zz-pagination-footer
      [query]="query$ | async"
      [total]="(metadata$ | async).total"
      (search)="search($event)">
    </zz-pagination-footer>
  `,
})
export class DashboardPageComponent {
  products$ = this.store.select(fromRoot.getProducts);
  query$ = this.store.select(fromRoot.getQuery);
  metadata$ = this.store.select(fromRoot.getMetadata);

  private defaultSearchQuery = {
    page: 1,
    sort: 'name',
    limit: 10,
    search: '',
  };

  constructor(private store: Store<fromRoot.State>) {
    this.search(this.defaultSearchQuery);
  }

  search(query) {
    this.store.dispatch(new search.DoSearch(query));
  }

  export() {
    this.metadata$.pipe(take(1), map(meta => {
      const products = meta.dataset;
      if (products.length) {
        const urlObject = URL.createObjectURL(new Blob([
          `[${products.map(item => JSON.stringify(item, null, 2)).join()}]`,
        ]));
        const link = document.createElement('a');
        link.setAttribute('href', urlObject);
        link.setAttribute('download', 'products.json');
        link.click();
      }

    })).subscribe();
  }

  onProductAction(action) {
    this.store.dispatch(action);
  }

  addProduct() {
    this.store.dispatch(new layout.AddProduct);
  }
}
