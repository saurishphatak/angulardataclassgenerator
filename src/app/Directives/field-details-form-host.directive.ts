import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFieldDetailsFormHost]'
})
export class FieldDetailsFormHostDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
