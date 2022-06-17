import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IDataClassService } from 'src/app/Interfaces/IDataClassService';
import { environment } from 'src/environments/environment.prod';
import { CsharpField } from '../../Models/CsharpField';
import { BaseService } from '../BaseService';

@Injectable({
  providedIn: 'root'
})
export class CsharpService extends BaseService {
  protected override className = "CsharpService";

  override debug = environment.production ? () => { } : console.log;

  constructor(httpClient: HttpClient) {
    super(httpClient);

    this.debug(`${this.className}::constructor()`);
  }

  override dataClassResultSubject: Subject<any> = new Subject<string>();

  override updateFieldSubject: Subject<CsharpField> = new Subject<CsharpField>();

  // Holds all the fields
  protected _fields: CsharpField[] = [
    new CsharpField({
      name: "customerName",
      dataType: "string",
      defaultValue: "",
      comment: "",
      fieldAttributes: "Required",
      accessModifier: "public",
      property: {
        propertyName: "",
        propertyType: "virtual",
        propertyAccessModifier: "public",
        accessors: new Map<string, any>(),
        propertyAttributes: ""
      },
      isConstructorParam: false,
    }
    ),
    new CsharpField({
      name: "phoneNumber",
      dataType: "string",
      defaultValue: "",
      comment: "Customer phone number",
      fieldAttributes: "",
      accessModifier: "private",
      property: {
        propertyName: "PhoneNumber",
        propertyType: "virtual",
        propertyAccessModifier: "private",
        accessors: new Map<string, any>(
          [
            ["setter", { setterAttributes: "[Required]" }],
          ]
        ),
        propertyAttributes: "",
      },
      isConstructorParam: true
    }
    ),
    new CsharpField(
      {
        name: "address",
        dataType: "string",
        defaultValue: "",
        comment: "",
        fieldAttributes: "",
        accessModifier: "protected",
        property: {
          propertyName: "Address",
          propertyType: "abstract",
          propertyAccessModifier: "protected",
          accessors: new Map<string, any>(
            [
              ["getter", { getterAttributes: "[Required]" }]
            ]
          ),
          propertyAttributes: ""
        },
        isConstructorParam: true
      }
    )
  ];

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
}
