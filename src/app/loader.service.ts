import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ILoaderService } from './Interfaces/ILoaderService';

@Injectable({
  providedIn: 'root'
})
export class LoaderService implements ILoaderService {

  constructor() { }
  showLoaderSubject = new Subject<boolean>();

  showLoader$: Observable<boolean> = this.showLoaderSubject.asObservable();
}
