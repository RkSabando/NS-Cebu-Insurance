import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }
  showLoaderSubject = new BehaviorSubject<number>(1);
  showLoader$ = this.showLoaderSubject.asObservable();



}
