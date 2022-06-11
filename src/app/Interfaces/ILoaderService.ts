import { Observable } from "rxjs";

export interface ILoaderService {
  showLoader$: Observable<boolean>;

}
