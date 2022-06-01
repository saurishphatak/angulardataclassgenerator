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
      defaultValue: new FormControl(''),
      comment: new FormControl(''),
      accessModifier: new FormControl('public'),
      propertyName: new FormControl(''),
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

    if (!nameFormControl?.errors && !dataTypeFormControl?.errors) {

      let accessors = new Map<string, any>();

      let csharpField = new CsharpField(
        nameFormControl?.value,
        dataTypeFormControl?.value,
        this.formGroup.get("defaultValue")?.value,
        this.formGroup.get("comment")?.value,
        this.formGroup.get("accessModifier")?.value,
        this.formGroup.get("propertyName")?.value,
        this.formGroup.get("propertyType")?.value,
        accessors
      );

      // If the property is to be generated
      if (this.showPropertyConfig == true) {
        let getterAttributesFormControl = this.formGroup.get("getterAttribues")?.value;
        let setterAttributesFormControl = this.formGroup.get("setterAttributes")?.value;
        let initializerAttributesFormControl = this.formGroup.get("initializerAttributes")?.value;

        accessors.set("getter", getterAttributesFormControl?.value);
        accessors.set("setter", setterAttributesFormControl?.value);
        accessors.set("initializer", initializerAttributesFormControl?.value);
      }

      console.log(csharpField);

      // Add the new field to the list
      this.csharpService.addField(csharpField);

      // Reset the form
      this.resetForm();
    }
  }

  // Resets the form to the original state
  resetForm() {

    this.formGroup.reset({ accessModifier: 'public', propertyType: 'virtual' });
    this.isGetterEnabled = this.isSetterEnabled = this.isInitEnabled = false;
    this.toggleAccessModifier('public');
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

  // Toggles the property type (virtual/abstract)
  togglePropertyType(propertyType: string) {
    let propertyTypeFormControl = this.formGroup.get("propertyType");

    if (propertyTypeFormControl) {
      propertyTypeFormControl.setValue(propertyType);
    }
  }

  // Toggles whether to show the property config UI
  togglePropertyConfig(event: any) {
    this.showPropertyConfig = !this.showPropertyConfig;
    this.propertyConfigButtonColor = this.showPropertyConfig ? "warn" : "primary";
  }

}
