import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CsharpService } from '../csharp.service';
import { FormComponent } from '../Interfaces/FormComponent';
import { CsharpField } from '../Models/CsharpField';

@Component({
  selector: 'app-csharp-form',
  templateUrl: './csharp-form.component.html',
  styleUrls: ['./csharp-form.component.css']
})
export class CsharpFormComponent implements OnInit, FormComponent {

  // Form group for getting the field
  // details of a csharp field
  formGroup = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      dataType: new FormControl('', Validators.required),
      comment: new FormControl(''),
      accessModifier: new FormControl('public'),
      propertyName: new FormControl('', Validators.required),
      propertyType: new FormControl('virtual'),

      getterAttributes: new FormControl(''),

      setterAttributes: new FormControl(''),

      initializerAttributes: new FormControl(''),
    }
  );

  isGetterEnabled = false;
  isSetterEnabled = false;
  isInitEnabled = false;

  // Whether to properties configuration controls
  showPropertyConfig = false;
  showPropertyConfigButton = true;

  propertyConfigButtonColor = "primary";
  propertyConfigButtonText = "Configure Property";

  constructor(
    public csharpService: CsharpService
  ) { }

  ngOnInit(): void {
    this.toggleAccessModifier('public');
  }

  // Handler for field details submission
  onAddField() {
    // Name and DataType of a field are required
    let nameFormControl = this.formGroup.get('name');
    let dataTypeFormControl = this.formGroup.get('dataType');
    let propertyNameFormControl = this.formGroup.get('propertyName');

    if (!nameFormControl?.errors && !dataTypeFormControl?.errors) {

      if (this.showPropertyConfig == false) {
        console.log("Without", this.formGroup.value);
      }

      else {
        let getterForm = this.formGroup.get("getterForm");
        let setterForm = this.formGroup.get("setterForm");
        let initializerForm = this.formGroup.get("initializerForm");

        console.log(this.formGroup.value);
      }


    }
  }

  // Resets the form to the original state
  resetForm() {

    this.formGroup.reset({ accessModifier: 'public' });
    this.isGetterEnabled = this.isSetterEnabled = this.isInitEnabled = false;

  }
  // Toggles whether setter form is to be
  // displayed or not
  toggleSetter() {
    this.isSetterEnabled = !this.isSetterEnabled;
    this.isInitEnabled = false;
  }

  // Toggles whether initializer form is to be
  // displayed or not
  toggleInitializer() {
    this.isInitEnabled = !this.isInitEnabled;
    this.isSetterEnabled = false;
  }

  // Toggles whether getter form is to be
  // displayed or not
  toggleGetter() {
    this.isGetterEnabled = !this.isGetterEnabled;
  }

  toggleAccessModifier(accessModifier: string) {
    let accessModifierFormControl = this.formGroup.get("accessModifier");

    if (accessModifierFormControl) {
      // If accessModifer is public, don't show property config button
      if ("public" == accessModifier) {
        // Whenever accessModifier is public, any UI related
        // to property config should be hidden
        this.isGetterEnabled = this.isSetterEnabled = this.isInitEnabled = false;
        this.showPropertyConfig = false;
        this.showPropertyConfigButton = false;
      }
      else {
        this.showPropertyConfigButton = true;
        this.propertyConfigButtonColor = this.showPropertyConfig ? "warn" : "primary";
      }

      accessModifierFormControl.setValue(accessModifier);
    }
  }

  togglePropertyType(propertyType: string) {
    let propertyTypeFormControl = this.formGroup.get("propertyType");

    if (propertyTypeFormControl) {
      propertyTypeFormControl.setValue(propertyType);
    }
  }

  togglePropertyConfig(event: any) {
    this.showPropertyConfig = !this.showPropertyConfig;
    this.propertyConfigButtonColor = this.showPropertyConfig ? "warn" : "primary";
  }

}
