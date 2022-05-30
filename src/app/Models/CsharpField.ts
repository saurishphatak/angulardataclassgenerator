export class CsharpField {
  protected static _lastID = 0;

  public id = ++CsharpField._lastID;

  public constructor(
    public name: string,
    public dataType: string,
    public comment: string = '',
    public accessModifier: string,
    public properties: Map<string, any>,
  ) {
  }
}
