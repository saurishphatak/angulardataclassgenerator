import { Component, Type, ViewChild } from '@angular/core';
import { CsharpFieldDetailsListComponent } from './csharp-field-details-list/csharp-field-details-list.component';
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
  // language to its field details form component
  languageFieldDetailsFormComponentMap = new Map<string, Type<FormComponent>>(
    [
      ["csharp", CsharpFormComponent]
    ]
  );

  // Map that holds a key-value pair of
  // language to its field details list component
  languageFieldDetailsListComponent = new Map<string, Type<Object>>(
    [
      ["csharp", CsharpFieldDetailsListComponent]
    ]
  );

  // Reference to the host directive that will host
  // the form details field
  @ViewChild(FieldDetailsFormHostDirective) fieldDetailsFormHostDirective!: FieldDetailsFormHostDirective;

  // Will create a new component containing the form
  // for field details of the given language
  createFieldDetailsFormComponent(language: string) {
    language = language.toLowerCase();

    // Create the form component and the list component
    if (this.languageFieldDetailsFormComponentMap.has(language)) {
      // Get the form component
      let formComponent = this.languageFieldDetailsFormComponentMap.get(language);

      // Clear the host
      this.fieldDetailsFormHostDirective.viewContainerRef.clear();

      // Create a new form component
      let formComponentRef = this.fieldDetailsFormHostDirective.viewContainerRef.createComponent(formComponent!);
    }
  }
}
