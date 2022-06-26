import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IDataClassService } from 'src/app/Interfaces/IDataClassService';
import { ICsharpClass } from 'src/app/Models/CsharpClass';
import { environment } from 'src/environments/environment.prod';
import { CsharpField, ICsharpField } from '../../Models/CsharpField';
import { BaseService } from '../common/BaseService';

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
  protected _fields: CsharpField[] = [];

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

  // Transforms csharp class to valid JSON without the loss of data
  async transformObject(dataClassDescription: ICsharpClass): Promise<any> {

    let dataClassDescriptionObject = {
      language: dataClassDescription.language,
      name: dataClassDescription.name,
      namespace: dataClassDescription.namespace,
      classAttributes: dataClassDescription.classAttributes,
      comment: dataClassDescription.comment,
      fields: dataClassDescription.fields
    };

    dataClassDescriptionObject.fields = [] as ICsharpField[];

    for (const field of dataClassDescription.fields) {
      let fieldObject = {
        name: field.name,
        dataType: field.dataType,
        defaultValue: field.defaultValue,
        comment: field.comment,
        fieldAttributes: field.fieldAttributes,
        isConstructorParam: field.isConstructorParam,
        accessModifier: field.accessModifier,

        property: {
          propertyName: field.property.propertyName,
          propertyType: field.property.propertyType,
          accessors: Object.fromEntries(field.property.accessors) as any,
          propertyAttributes: field.property.propertyAttributes,
          propertyAccessModifier: field.property.propertyAccessModifier
        }
      }

      // Push the field object inside the dataClassDescriptionObject fields list
      dataClassDescriptionObject.fields.push(fieldObject);
    }

    return dataClassDescriptionObject;
  }

  // Removes all the fields
  public removeAllFields() {
    let functionName = `removeAllFields()`;

    this.debug(`${this.className}::${functionName}`);

    this._fields = [];
  }
}
