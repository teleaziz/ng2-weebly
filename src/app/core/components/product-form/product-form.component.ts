import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CloseModal } from '../../actions/layout';
import { AddProduct, EditProduct } from '../../actions/search';
import * as fromRoot from '../../../reducers';

@Component({
  selector: 'zz-product-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  params: any;
  productForm: FormGroup;
  productTypes = ['Physical', 'Digital', 'Service'];
  title: string;

  get name() {
    return this.productForm.get('name');
  }

  get type() {
    return this.productForm.get('type');
  }

  get price() {
    return this.productForm.get('price');
  }

  get inventory() {
    return this.productForm.get('inventory');
  }

  ngOnInit() {
    this.title = this.params ? 'Edit Product' : 'Add Product';
    const product = this.params && this.params.product;;

    this.productForm = new FormGroup({
      name: new FormControl(product ? product.name : '', Validators.required),
      type: new FormControl(product ? product.type : '', Validators.required),
      price: new FormControl(product ? product.price : '', Validators.pattern('([0-9]*[.])?[0-9]+')),
      inventory: new FormControl(product ? product.inventory : '', Validators.pattern('[0-9]+')),
    });
  }

  save() {
    if (this.productForm.invalid) {
      return;
    }

    let resolveValue = null;

    if (this.params) {
      resolveValue = {
        product: {
          ...this.params.product,
          ...this.productForm.value,
        }, index: this.params.index
      };
    } else {
      resolveValue = { product: this.productForm.value };
    }

    this.close(resolveValue);
  }

  close(value?: any) {
    this.store.dispatch(new CloseModal(value));
  }

  constructor(private store: Store<fromRoot.State>) {
  }
}
