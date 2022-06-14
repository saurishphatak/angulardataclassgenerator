import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { IDataClassService } from '../../Interfaces/IDataClassService'
import { CsharpField } from '../../Models/CsharpField';

@Injectable({
  providedIn: 'root'
})
export class CsharpService implements IDataClassService {

  constructor() { }

  dataClassResultSubject: Subject<any> = new Subject<string>();

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
      new Map<string, any>(),
      false
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
      false
    )
  ];

  private className = "CsharpService";
  private debug = console.log;

  updateFieldSubject: Subject<CsharpField> = new Subject<CsharpField>();

  // Adds a new field to the collection
  addField(newField: any) {
    this.debug(this.className + "::addField()", newField);

    let field = newField as CsharpField;

    if (field)
      this._fields.push(field);
  }

  // Removes field with the given id from the collection
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

  // Updates the field with the given id from the collection
  updateField(id: number) {
    this.debug(this.className + "::updateField()", { id });

    // Get the removed field
    let field = this.removeField(id);

    this.debug(this.className + "::updateField()", { fieldToUpdate: field });
    if (field) {
      this.updateFieldSubject.next(field);
    }
  }

  // Returns all the fields
  get fields(): CsharpField[] {
    return this._fields;
  }

  // Returns the field with the given id
  getField(id: number) {
    let fieldIndex = this._fields.findIndex((field) => field.id == id);

    if (-1 == fieldIndex)
      return null;

    return this._fields[fieldIndex];
  }

  generateClass() {
    return new Promise<string>((resolve, reject) => {
      setTimeout(
        () => { resolve("result"); },
        5000
      );
    });
  }
}
