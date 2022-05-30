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

      getterForm: new FormGroup({
        getterName: new FormControl(''),
        getterAttributes: new FormControl('')
      }
      ),

      setterForm: new FormGroup({
        setterName: new FormControl(''),
        setterAttributes: new FormControl('')
      }
      ),

      initializerForm: new FormGroup({
        initializerName: new FormControl(''),
        initializerAttributes: new FormControl('')
      }
      )
    }
  );

  isGetterEnabled = false;
  isSetterEnabled = false;
  isInitEnabled = false;


  constructor(
    public csharpService: CsharpService
  ) { }

  ngOnInit(): void {
  }

  // Handler for field details submission
  onAddField() {
    // Only if all the validators are true, print the field
    let name = this.formGroup.get('name');
    let dataType = this.formGroup.get('dataType');

    if (!name?.errors && !dataType?.errors) {
      let properties = new Map<string, any>();
      properties.set("getter", this.formGroup.get("getterForm")?.value);
      properties.set("setter", this.formGroup.get("setterForm")?.value);
      properties.set("initializer", this.formGroup.get("initializerForm")?.value);

      let csharpField = new CsharpField(
        name?.value,
        dataType?.value,
        this.formGroup.get("comment")?.value,
        this.formGroup.get("accessModifier")?.value,
        properties
      );

      console.log(csharpField);
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
      accessModifierFormControl.setValue(accessModifier);
    }
  }
}
