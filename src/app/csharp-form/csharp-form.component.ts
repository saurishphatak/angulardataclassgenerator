import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormComponent } from '../Interfaces/FormComponent';

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
      name: new FormControl(),
      dataType: new FormControl(),
      comment: new FormControl(''),
      getterName: new FormControl(),
      getterAttributes: new FormControl(),
      setterName: new FormControl(),
      setterAttributes: new FormControl(),
      initializerName: new FormControl(),
      initializerAttributes: new FormControl(),
      accessModifier: new FormControl('public')
    }
  );

  isGetterEnabled = false;
  isSetterEnabled = false;
  isInitEnabled = false;


  constructor() { }

  ngOnInit(): void {
  }

  // Handler for field details submission
  onAddField() {
    // Get the value of the form
    let values = this.formGroup.value;

    console.log(values);

    // Reset the value of the form
    this.formGroup.reset({ accessModifier: 'public' });
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
      accessModifierFormControl.setValue(accessModifier);
    }
  }
}
