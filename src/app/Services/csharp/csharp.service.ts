import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IFieldDetailsService } from '../../Interfaces/IFieldDetailsService'
import { CsharpField } from '../../Models/CsharpField';

@Injectable({
  providedIn: 'root'
})
export class CsharpService implements IFieldDetailsService {

  constructor() { }

  // Holds all the fields
  protected _fields: CsharpField[] = [
    new CsharpField(
      "customerName",
      "string",
      "",
      "",
      "",
      "public",
      "",
      "virtual",
      "public",
      new Map<string, any>()
    ),
    new CsharpField(
      "phoneNumber",
      "string",
      "",
      "Customer phone number",
      "",
      "private",
      "PhoneNumber",
      "virtual",
      "private",
      new Map<string, any>(
        [
          ["setter", { setterAttributes: "[Required]" }],
        ]
      ),
    ),
    new CsharpField(
      "addres",
      "string",
      "",
      "",
      "",
      "protected",
      "Address",
      "abstract",
      "protected",
      new Map<string, any>(
        [
          ["getter", "[Required]"]
        ]
      ),
    )
  ];

  private className = "CsharpService";
  private debug = console.log;

  updateFieldSubject: Subject<CsharpField> = new Subject<CsharpField>();

  addField(newField: any) {
    this.debug(this.className + "::addField()", newField);

    let field = newField as CsharpField;

    if (field)
      this._fields.push(field);
  }

  removeField(id: number) {
    this.debug(this.className + "::removeField()", { id });

    let fieldIndex = this._fields.findIndex((field) => field.id == id);

    if (-1 != fieldIndex) {
      let removedField = this._fields.splice(fieldIndex, 1)[0];

      this.debug(this.className + "::removeField()", { removedField });
      return removedField;
    }

    return null;
  }

  updateField(id: number) {
    this.debug(this.className + "::updateField()", { id });

    // Get the removed field
    let field = this.removeField(id);

    this.debug(this.className + "::updateField()", { fieldToUpdate: field });
    if (field) {
      this.updateFieldSubject.next(field);
    }
  }

  get fields(): CsharpField[] {
    return this._fields;
  }
}
