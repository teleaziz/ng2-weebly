import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ModalContainerDirective } from './modal-container.directive';
@Component({
  selector: 'zz-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @ViewChild(ModalContainerDirective) modalContainer: ModalContainerDirective;

  @Input()
  params: any;

  @Input()
  set component(component: any) {
    if (component) {
      const componentFactory = this.resolver.resolveComponentFactory(component);
      const viewRef = this.modalContainer.viewContainerRef;
      viewRef.clear();
      const componentRef = viewRef.createComponent(componentFactory);
      this.componentInstance = componentRef.instance;
      this.componentInstance.params = this.params;
    } else {
      this.componentInstance = null;
      this.modalContainer.viewContainerRef.clear();
    }
  };

  @Output()
  backdropClick = new EventEmitter;

  componentInstance: any;

  constructor(private resolver: ComponentFactoryResolver) { }
}
