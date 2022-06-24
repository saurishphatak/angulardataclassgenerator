import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from './Services/common/loader.service';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  constructor(protected loader: LoaderService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("NetworkInterceptor::intercept()");

    // Show loader as soon as the API is called
    this.loader.showLoaderSubject.next(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.loader.showLoaderSubject.next(false);
      })
    );
  }
}
