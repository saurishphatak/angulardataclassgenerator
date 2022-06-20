import { CsharpField, ICsharpField } from "./CsharpField";

export class CsharpClass {
  public language = "csharp";

  public name: string;
  public namespace = '';
  public classAttributes = '';
  public comment = '';

  public fields: ICsharpField[];

  public constructor(
    initialValues: ICsharpClass
  ) {
    this.name = initialValues.name;
    this.namespace = initialValues.namespace;
    this.classAttributes = initialValues.classAttributes;
    this.fields = initialValues.fields;
    this.comment = initialValues.comment;
  }
}

export interface ICsharpClass {
  language: string;
  name: string;
  namespace: string;
  classAttributes: string;
  comment: string;

  fields: ICsharpField[];
}
