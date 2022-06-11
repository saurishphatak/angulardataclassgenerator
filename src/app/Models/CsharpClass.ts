import { CsharpField } from "./CsharpField";

export class CsharpClass {
  public constructor(
    public name: string,
    public namespace = '',
    public classAttributes = '',
    public comment = '',

    public fields: CsharpField[]
  ) { }
}
