import { Component, OnInit } from '@angular/core';
import { CsharpService } from '../csharp.service';
import { CsharpField } from '../Models/CsharpField';

@Component({
  selector: 'app-csharp-field-details-list',
  templateUrl: './csharp-field-details-list.component.html',
  styleUrls: ['./csharp-field-details-list.component.css']
})
export class CsharpFieldDetailsListComponent implements OnInit {

  constructor(
    public csharpService: CsharpService
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
    this.csharpService.updateField(id);

    // Stop the event from propogating further and expanding
    // the expansion panel
    event.stopPropagation();
  }

  removeField(event: any, id: number) {
    this.debug(this.className + "::removeField()", { id });

    let removedField = this.csharpService.removeField(id);

    this.debug(this.className + "::removeField()", { removedField });

    event.stopPropagation();
  }

}
