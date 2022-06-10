import { Component, OnInit } from '@angular/core';
import { CsharpService } from '../Services/csharp/csharp.service';
import { CsharpField } from '../Models/CsharpField';
import { IDataClassLanguageComponent } from '../Interfaces/IDataClassLanguageComponent';

@Component({
  selector: 'app-csharp-field-details-list',
  templateUrl: './csharp-field-details-list.component.html',
  styleUrls: ['./csharp-field-details-list.component.css']
})
export class CsharpFieldDetailsListComponent implements OnInit, IDataClassLanguageComponent {

  constructor(
    public languageService: CsharpService
  ) { }

  private className = "CsharpFieldDetailsListComponent";
  private debug = console.log;

  ngOnInit(): void {
  }

  // Click on the edit button will not open the
  // expansion panel
  editField(event: any, id: number) {
    this.debug(this.className + "::editField()", { id });

    // Emit the id to the csharp service to get the
    // field updated
    this.languageService.updateField(id);

    // Stop the event from propogating further and expanding
    // the expansion panel
    event.stopPropagation();
  }

  removeField(event: any, id: number) {
    this.debug(this.className + "::removeField()", { id });

    let removedField = this.languageService.removeField(id);

    this.debug(this.className + "::removeField()", { removedField });

    event.stopPropagation();
  }

}
