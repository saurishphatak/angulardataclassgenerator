import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CsharpService } from '../Services/csharp/csharp.service';

@Component({
  selector: 'app-csharp-class-details-form',
  templateUrl: './csharp-class-details-form.component.html',
  styleUrls: ['./csharp-class-details-form.component.css']
})
export class CsharpClassDetailsFormComponent implements OnInit {

  // Emits event to the parent componenent letting it
  // know that the result has been received
  @Output() resultNotReceieved = new EventEmitter<boolean>();

  className = "CsharpClassDetailsFormComponent";

  formGroup: FormGroup;

  constructor(
    protected formBuilder: FormBuilder,
    protected csharpService: CsharpService
  ) {
    this.formGroup = formBuilder.group({
      name: new FormControl('', Validators.required),
      namespace: new FormControl(''),
      classAttributes: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  gennerateClass() {
    console.log("CsharpClassDetailsFormComponent::generateClass()");

    this.resultNotReceieved.emit(true);

    this.csharpService.generateClass().then(result => {
      console.log(result, "Emitting false now");

      this.doEmit(false);
    });
  }

  doEmit(value: boolean) {
    this.resultNotReceieved.emit(false);
  }

}
