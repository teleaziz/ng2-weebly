import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './containers/app';
import { NotFoundPageComponent } from './containers/not-found-page';
import { DashboardPageComponent } from './containers/dashboard-page';

import { ProductsListComponent } from './components/products-list/products-list.component';
import { PaginationFooterComponent } from './components/pagination-footer/pagination-footer.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { ProductActionsComponent } from './components/product-actions/product-actions.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalContainerDirective } from './components/modal/modal-container.directive'
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

export const COMPONENTS = [
  ProductFormComponent,
  ModalContainerDirective,
  ConfirmDialogComponent,
  AppComponent, ModalComponent, NotFoundPageComponent, DashboardPageComponent, ProductsListComponent, PaginationFooterComponent, SearchInputComponent, ProductActionsComponent
];

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  declarations: COMPONENTS,
  entryComponents: [ProductFormComponent, ConfirmDialogComponent],
  exports: COMPONENTS,
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
    };
  }
}
