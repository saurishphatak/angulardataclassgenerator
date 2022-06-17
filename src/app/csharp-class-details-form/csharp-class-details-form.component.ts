import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDataClassDetailsFormComponent } from '../Interfaces/IDataClassLanguageComponent';
import { CsharpService } from '../Services/csharp/csharp.service';
import { LoaderService } from '../Services/loader.service';

@Component({
  selector: 'app-csharp-class-details-form',
  templateUrl: './csharp-class-details-form.component.html',
  styleUrls: ['./csharp-class-details-form.component.css']
})
export class CsharpClassDetailsFormComponent implements OnInit, IDataClassDetailsFormComponent {

  className = "CsharpClassDetailsFormComponent";

  formGroup: FormGroup;

  constructor(
    protected formBuilder: FormBuilder,
    public languageService: CsharpService,
    public loaderService: LoaderService
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

    this.languageService.generateClass().subscribe(result => {
      console.log(result);
      this.languageService.dataClassResultSubject.next(result);
    });
  }
}
