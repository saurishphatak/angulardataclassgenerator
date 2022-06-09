import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appClassDetailsFormHost]'
})
export class ClassDetailsFormHostDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
