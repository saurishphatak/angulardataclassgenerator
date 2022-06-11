import { Observable, Subject } from "rxjs";

export interface ILoaderService {
  showLoader$: Observable<boolean>;

  showLoaderSubject: Subject<boolean>;
}
