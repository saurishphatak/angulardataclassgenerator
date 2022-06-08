export class CsharpField {
  protected static _lastID = 0;

  public id = ++CsharpField._lastID;

  public constructor(
    public name: string,
    public dataType: string,
    public defaultValue: string,
    public comment: string = '',
    public accessModifier: string,
    public propertyName: string,
    public propertyType: string,
    public propertyAccessModifier: string,
    public accessors: Map<string, any>
  ) {
  }
}
