import { Component, OnInit } from '@angular/core';
import { IDataClassFieldsListComponent } from 'src/app/Interfaces/IDataClassFieldsListComponent';
import { CsharpService } from 'src/app/Services/csharp/csharp.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-csharp-field-details-list',
  templateUrl: './csharp-field-details-list.component.html',
  styleUrls: ['./csharp-field-details-list.component.css']
})
export class CsharpFieldDetailsListComponent implements OnInit, IDataClassFieldsListComponent {

  constructor(
    public languageService: CsharpService
  ) { }

  private className = "CsharpFieldDetailsListComponent";

  private debug = !environment.production ? console.log : () => { };

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
