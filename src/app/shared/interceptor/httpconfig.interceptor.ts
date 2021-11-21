import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { CustomDialogService } from '../services/custom-dialog.service';
import { DialogOptions } from '../model/dialog-model';
import { DIALOG_TYPES } from '../enums/dialog.enum';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(
        public customDialogService: CustomDialogService,
        public loaderService: LoaderService
    ) { }
    counter = 0;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.showLoaderSubject.next(this.counter++);
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                this.loaderService.showLoaderSubject.next(this.counter? this.counter-- : 0);
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                const data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                console.log('error ',data);
                const dialogOptions: DialogOptions = {
                    type: DIALOG_TYPES.ERROR,
                    title: 'Error',
                    desc: 'Something went wrong! Try again later!',
                    buttons: ['Ok'],
                    timeout: 2000
                }
                this.customDialogService.openDialog(dialogOptions);
                return throwError(error);
            })
        )
    }
}