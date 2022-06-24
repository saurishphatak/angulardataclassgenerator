import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { IDataClassService } from "src/app/Interfaces/IDataClassService";
import { environment } from "src/environments/environment.prod";

export abstract class BaseService implements IDataClassService {
  debug = environment.production ? () => { } : console.log;
  protected className = "BaseService";

  updateFieldSubject: Subject<any> = new Subject<any>();

  public abstract addField(newField: any): any;
  public abstract removeField(id: number): any;
  public abstract updateField(id: number): any;
  public abstract getField(id: number): any;
  public abstract get fields(): any[];

  public constructor(protected httpClient: HttpClient) {
    this.debug(`${this.className}::constructor()`, this.httpClient);
  }

  dataClassResultSubject: Subject<any> = new Subject<any>();

  generateClass(dataClassDescription: any) {
    let functionName = "generateClass()";

    this.debug(`${this.className}::${functionName}`, dataClassDescription);

    return this.httpClient.post(environment.baseURL + "/csharp", dataClassDescription, {
      responseType: "json"
    });
  }
}
