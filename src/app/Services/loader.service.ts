import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ILoaderService } from '../Interfaces/ILoaderService';

@Injectable({
  providedIn: 'root'
})
export class LoaderService implements ILoaderService {

  constructor() { }

  // Emits whether the loader is to be displayed or not
  showLoaderSubject = new Subject<boolean>();

  showLoader$: Observable<boolean> = this.showLoaderSubject.asObservable();
}
