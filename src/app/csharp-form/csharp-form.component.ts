import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormComponent } from '../Interfaces/FormComponent';

@Component({
  selector: 'app-csharp-form',
  templateUrl: './csharp-form.component.html',
  styleUrls: ['./csharp-form.component.css']
})
export class CsharpFormComponent implements OnInit, FormComponent {

  formGroup = new FormGroup(
    {
      fieldName: new FormControl(),
      fieldDataType: new FormControl(),
      fieldComment: new FormControl(),
      fieldGetterName: new FormControl(),
      fieldGetterAttributes: new FormControl(),
      fieldSetterName: new FormControl(),
      fieldSetterAttributes: new FormControl()
    }
  );

  isGetterEnabled = false;
  isSetterEnabled = false;
  isInitEnabled = false;


  constructor() { }

  ngOnInit(): void {
  }

  onAddField() {
    // Get the value of the form
    let values = this.formGroup.value;

    console.log(values);

    // Reset the value of the form
    this.formGroup.reset();
  }

  test() {
    this.isGetterEnabled = !this.isGetterEnabled;


  }
}
