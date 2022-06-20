import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDataClassDetailsFormComponent } from '../Interfaces/IDataClassLanguageComponent';
import { CsharpClass } from '../Models/CsharpClass';
import { CsharpService } from '../Services/csharp/csharp.service';
import { LoaderService } from '../Services/loader.service';

let debug = console.log;
@Component({
  selector: 'app-csharp-class-details-form',
  templateUrl: './csharp-class-details-form.component.html',
  styleUrls: ['./csharp-class-details-form.component.css']
})
export class CsharpClassDetailsFormComponent implements OnInit, IDataClassDetailsFormComponent {

  className = "CsharpClassDetailsFormComponent";

  formGroup: FormGroup;

  constructor(
    formBuilder: FormBuilder,
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

  public async gennerateClass() {
    let functionName = "generateClass()";

    debug(`${this.className}::${functionName}`);

    let dataClassNameFormControl = this.formGroup.get("name");

    // The data class needs to have a class name
    if (!dataClassNameFormControl?.errors) {
      console.log(`${this.className}::generateClass()::nameErrors`, dataClassNameFormControl?.errors);

      let dataClassName = dataClassNameFormControl?.value;

      let dataClassDescription = new CsharpClass(
        {
          language: "csharp",
          name: dataClassName,
          namespace: this.formGroup.get("namespace")?.value ?? "",
          comment: this.formGroup.get("comment")?.value ?? "",
          classAttributes: this.formGroup.get("classAttributes")?.value ?? "",
          fields: this.languageService.fields
        }
      );

      // Start the spinner
      this.loaderService.showLoaderSubject.next(true);

      let dataClassDescriptionObject = await this.languageService.transformObject(dataClassDescription);

      this.languageService.generateClass(dataClassDescriptionObject).subscribe(result => {
        console.log(result);
        this.languageService.dataClassResultSubject.next(result);
      });
    }
  }
}
