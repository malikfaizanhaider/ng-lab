import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {UnstyledLoadingService} from '@unstyled/services/loading/loading.service';
import {finalize, Observable, take} from 'rxjs';

export const unstyledLoadingInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const unstyledLoadingService = inject(UnstyledLoadingService);
  let handleRequestsAutomatically = false;

  unstyledLoadingService.auto$
    .pipe(take(1))
    .subscribe((value) => {
      handleRequestsAutomatically = value;
    });

  // If the Auto mode is turned off, do nothing
  if (!handleRequestsAutomatically) {
    return next(req);
  }

  // Set the loading status to true
  unstyledLoadingService._setLoadingStatus(true, req.url);

  return next(req).pipe(
    finalize(() => {
      // Set the status to false if there are any errors or the request is completed
      unstyledLoadingService._setLoadingStatus(false, req.url);
    }));
};
