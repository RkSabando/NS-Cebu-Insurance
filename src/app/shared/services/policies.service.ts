import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay, take } from 'rxjs/operators';
import { API_ROUTES } from '../enums/api-routes.enum';
import { Policy } from '../model/policy-model';

@Injectable({
  providedIn: 'root'
})
export class PoliciesService {

  constructor(
    private http: HttpClient
  ) { }

  policies$ = this.http.get<Policy[]>(API_ROUTES.POLICIES).pipe(
    shareReplay(1),
    take(1),
    map(
      (response: any) => response.policies as Policy
    )
  );
}
