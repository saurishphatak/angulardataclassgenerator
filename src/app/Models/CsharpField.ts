export class CsharpField {
  protected static _lastID = 0;

  public id = ++CsharpField._lastID;

  public constructor(
    public name: string,
    public dataType: string,
    public defaultValue: string = '',
    public comment: string = '',
    public fieldAttributes: string = '',
    public accessModifier: string = 'public',
    public propertyName: string,
    public propertyType: string = 'virtual',
    public propertyAccessModifier: string = 'public',
    public accessors: Map<string, any>,
    public isConstructorParam: boolean = true
  ) {
  }
}
