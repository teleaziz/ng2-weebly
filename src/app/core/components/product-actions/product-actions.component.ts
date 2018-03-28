import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import * as fromLayout from '../../actions/layout';

@Component({
  selector: 'zz-product-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-actions.component.html',
  styleUrls: ['./product-actions.component.scss'],
})
export class ProductActionsComponent {
  @Input()
  product: any;

  @Output()
  action = new EventEmitter;

  actions = [{
    name: 'edit',
    svg: 'assets/edit.svg',
    class: fromLayout.EditProduct,
  }, {
    name: 'copy',
    svg: 'assets/copy.svg',
    class: fromLayout.DuplicateProduct,
  }, {
    name: 'delete',
    svg: 'assets/delete.svg',
    class: fromLayout.DeleteProduct,
  }];

  pick(action, event) {
    if (action.class) {
      this.action.next(action.class);
    }
    event.stopPropagation();
  }
}
