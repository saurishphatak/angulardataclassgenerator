import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IFieldDetailsService } from './Interfaces/IFieldDetailsService'
import { CsharpField } from './Models/CsharpField';

@Injectable({
  providedIn: 'root'
})
export class CsharpService implements IFieldDetailsService {

  constructor() { }

  // Holds all the fields
  protected _fields: CsharpField[] = [];

  updateFieldSubject: Subject<CsharpField> = new Subject<CsharpField>();

  addField(newField: any) {
    let field = newField as CsharpField;

    if (field)
      this._fields.push(field);
  }

  removeField(id: number) {
    let fieldIndex = this._fields.findIndex((field) => field.id == id);

    if (-1 != fieldIndex) {
      let removedField = this._fields.splice(fieldIndex, 1)[0];

      return removedField;
    }

    return null;
  }

  updateField(id: number) {
    // Get the removed field
    let field = this.removeField(id);

    if (field) {
      this.updateFieldSubject.next(field);
    }
  }

  get fields(): any[] {
    return this._fields;
  }
}
