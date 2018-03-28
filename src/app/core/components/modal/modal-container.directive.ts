import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[zzModalContainer]',
})
export class ModalContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
