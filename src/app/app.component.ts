import { AfterViewInit, Component, OnInit, Type, ViewChild } from '@angular/core';
import { ClassDetailsFormHostDirective } from './Directives/class-details-form-host.directive';
import { CsharpClassDetailsFormComponent } from './csharp-class-details-form/csharp-class-details-form.component';
import { CsharpFieldDetailsListComponent } from './csharp-field-details-list/csharp-field-details-list.component';
import { CsharpFormComponent } from './csharp-form/csharp-form.component';
import { FieldDetailsFormHostDirective } from './Directives/field-details-form-host.directive';
import { FieldDetailsListHostDirective } from './Directives/field-details-list-host.directive';
import { IDataClassDetailsFormComponent } from './Interfaces/IDataClassLanguageComponent';
import { MatSidenav } from '@angular/material/sidenav';
import { IDataClassFieldDetailsFormComponent } from './Interfaces/IDataClassFieldDetailsFormComponent';
import { IDataClassFieldsListComponent } from './Interfaces/IDataClassFieldsListComponent';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {

  public constructor(
    public loaderSerice: LoaderService
  ) { }

  ngOnInit(): void {
    this.loaderSerice.showLoader$.subscribe((loaderStatus) => this.showLoader = loaderStatus);
  }


  ngAfterViewInit(): void {
    console.log(this.drawer);
  }

  title = 'common-service-demo';

  // Whether to show the loader
  showLoader = false;

  languageList = [
    "csharp",
  ];

  // Map that holds a key-value pair of
  // language to its field details form component
  languageFieldDetailsFormComponentMap = new Map<string, Type<IDataClassFieldDetailsFormComponent>>(
    [
      ["csharp", CsharpFormComponent]
    ]
  );

  // Map that holds a key-value pair of
  // language to its field details list component
  languageFieldDetailsListComponent = new Map<string, Type<IDataClassFieldsListComponent>>(
    [
      ["csharp", CsharpFieldDetailsListComponent]
    ]
  );

  // Map that holds a key-value pair of
  // langauge to its language details form component
  languageDetailsFormComponentMap = new Map<string, Type<IDataClassDetailsFormComponent>>(
    [
      ["csharp", CsharpClassDetailsFormComponent]
    ]
  );

  // Reference to the directive that will host
  // the form details field
  @ViewChild(FieldDetailsFormHostDirective) fieldDetailsFormHostDirective!: FieldDetailsFormHostDirective;

  // Reference to the directive that will host
  // the field details list
  @ViewChild(FieldDetailsListHostDirective) fieldDetailsListHostDirective!: FieldDetailsListHostDirective;

  // Reference to the directive that will host
  // the class details form
  @ViewChild(ClassDetailsFormHostDirective) languageDetailsFormHostDirective!: ClassDetailsFormHostDirective;

  @ViewChild('drawer') drawer!: MatSidenav;

  // Will create new components containing the
  // that together will take care of the data class generation
  createLanguageComponents(language: string) {
    language = language.toLowerCase();

    // Create the form component
    if (this.languageFieldDetailsFormComponentMap.has(language)) {
      // Get the form component
      let formComponent = this.languageFieldDetailsFormComponentMap.get(language);

      // Clear the host
      this.fieldDetailsFormHostDirective.viewContainerRef.clear();

      // Create a new form component
      let formComponentRef = this.fieldDetailsFormHostDirective.viewContainerRef.createComponent(formComponent!);
    }

    // Create the the list component
    if (this.languageFieldDetailsListComponent.has(language)) {
      // Get the list component
      let listComponent = this.languageFieldDetailsListComponent.get(language);

      // Clear the host
      this.fieldDetailsListHostDirective.viewContainerRef.clear();

      // Create a new list component
      let listComponentRef = this.fieldDetailsListHostDirective.viewContainerRef.createComponent(listComponent!);
    }

    // Create the language details list component
    if (this.languageDetailsFormComponentMap.has(language)) {
      // Get the language details form component
      let classDetailsFormComponent = this.languageDetailsFormComponentMap.get(language);

      // Clear the host
      this.languageDetailsFormHostDirective.viewContainerRef.clear();

      // Create the new component
      let languageDetailsFormComponentRef = this.languageDetailsFormHostDirective.viewContainerRef.createComponent(classDetailsFormComponent!);
    }

    this.toggleDrawer();
  }

  toggleDrawer() {
    this.drawer.toggle();
  }
}
