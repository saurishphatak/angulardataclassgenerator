import { Component, Type, ViewChild } from '@angular/core';
import { CsharpFormComponent } from './csharp-form/csharp-form.component';
import { FieldDetailsFormHostDirective } from './field-details-form-host.directive';
import { FormComponent } from './Interfaces/FormComponent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'common-service-demo';

  // Map that holds a key-value pair of
  // language to its component
  languageMap = new Map<string, Type<FormComponent>>(
    [
      ["csharp", CsharpFormComponent]
    ]
  );

  // Reference to the host directive that will host
  // the form details field
  @ViewChild(FieldDetailsFormHostDirective) fieldDetailsFormHostDirective!: FieldDetailsFormHostDirective;

  // Will create a new component containing the form
  // for field details of the given language
  createFieldDetailsFormComponent(language: string) {
    language = language.toLowerCase();

    if (this.languageMap.has(language)) {

      console.log(this.fieldDetailsFormHostDirective.viewContainerRef);

      // Get the component
      let formComponent = this.languageMap.get('csharp');

      // Clear the host
      this.fieldDetailsFormHostDirective.viewContainerRef.clear();

      // Create a new component
      let formComponentRef = this.fieldDetailsFormHostDirective.viewContainerRef.createComponent(formComponent!);
    }
  }
}
