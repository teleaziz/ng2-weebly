import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as layout from '../actions/layout';
import * as search from '../actions/search';

@Component({
  selector: 'zz-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app">
      <router-outlet></router-outlet>
      <zz-modal
        [component]="modalComponent$ | async"
        [params]="modalParams$ | async"
        (backdropClick)="closeModal()">
      </zz-modal>
    </div>
  `,
})
export class AppComponent {
  modalComponent$ = this.store.select(fromRoot.getModalComponent);
  modalParams$ = this.store.select(fromRoot.getModalParams);

  constructor(private store: Store<fromRoot.State>) {
    this.store.dispatch(new search.InitApiDataset);
  }

  closeModal() {
    this.store.dispatch(new layout.CloseModal(false));
  }
}
