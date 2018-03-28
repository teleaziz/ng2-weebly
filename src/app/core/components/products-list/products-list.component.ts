import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { EditProduct, AddProduct } from '../../actions/layout';

@Component({
  selector: 'zz-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  @Input()
  products: Array<any>;

  @Input()
  loadingIndicators: any;

  @Input()
  query: any;

  @Output()
  search = new EventEmitter();

  @Output()
  productAction = new EventEmitter();

  props = ['name', 'order', 'type', 'price', 'inventory'];

  hovers = {};

  sort(prop) {
    this.search.emit({
      sort: prop,
      descend: !this.query.descend,
    });
  }

  onMouseover(index) {
    this.hovers[index] = true;
  }

  onMouseleave(index) {
    delete this.hovers[index];
  }

  onRowClick(product: any, index: number) {
    this.productAction.emit(new EditProduct({ product, index }));
  }

  onProductAction(action: any, product: any, index: number) {
    this.productAction.emit(new action({ product, index }));
  }
}
