import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { take, mapTo } from 'rxjs/operators';
import * as search from '../actions/search';

@Injectable()
export class DashboardGuard implements CanActivate {
  constructor(private actions$: Actions) { }

  canActivate(): Observable<boolean> {
    return this.actions$.pipe(
      ofType(search.SearchActionTypes.completeApiDataset),
      take(1),
      mapTo(true),
    );
  }
}