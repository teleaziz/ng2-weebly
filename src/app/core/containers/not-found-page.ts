import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'zz-not-found-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` 404 not found`,
  styles: [
    `
    :host {
      text-align: center;
    }
  `,
  ],
})
export class NotFoundPageComponent {}
