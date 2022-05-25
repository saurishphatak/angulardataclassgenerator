import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-csharp-field-details-list',
  templateUrl: './csharp-field-details-list.component.html',
  styleUrls: ['./csharp-field-details-list.component.css']
})
export class CsharpFieldDetailsListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // Temporarily holds a list of the field
  // details
  fieldList: Map<string, object>[] = [
  ];

  // Click on the edit button will not open the
  // expansion panel
  editField(event: any) {
    console.log(event.stopPropagation());

    console.log("edit");
  }

  removeField(event: any) {
    event.stopPropagation();
    console.log("remove");
  }
}
