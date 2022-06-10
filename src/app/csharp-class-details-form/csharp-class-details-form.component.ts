import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDataClassLanguageComponent } from '../Interfaces/IDataClassLanguageComponent';
import { CsharpService } from '../Services/csharp/csharp.service';

@Component({
  selector: 'app-csharp-class-details-form',
  templateUrl: './csharp-class-details-form.component.html',
  styleUrls: ['./csharp-class-details-form.component.css']
})
export class CsharpClassDetailsFormComponent implements OnInit, IDataClassLanguageComponent {

  // Emits event to the parent componenent letting it
  // know that the result has been received
  @Output() resultNotReceieved = new EventEmitter<boolean>();

  className = "CsharpClassDetailsFormComponent";

  formGroup: FormGroup;

  constructor(
    protected formBuilder: FormBuilder,
    public languageService: CsharpService
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

    this.languageService.dataClassResultReceivedSubject.next(true);

    this.languageService.generateClass().then(result => {
      console.log(result, "Emitting false now");

      this.languageService.dataClassResultReceivedSubject.next(false);
    });
  }



}
