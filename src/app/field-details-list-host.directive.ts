import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFieldDetailsListHost]'
})
export class FieldDetailsListHostDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }


}
