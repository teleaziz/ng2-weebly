import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CloseModal } from '../../actions/layout';
import * as fromRoot from '../../../reducers';

@Component({
  selector: 'zz-confirm-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  params: any;
  message = '';
  cta = '';

  confirm(resolveValue: boolean) {
    this.store.dispatch(new CloseModal(resolveValue));
  }

  constructor(private store: Store<fromRoot.State>) {
  }
}
