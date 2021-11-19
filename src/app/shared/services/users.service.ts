import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' 
import { API_ROUTES } from '../enums/api-routes.enum';
import { concatMap, filter,withLatestFrom, groupBy, map, mergeMap, reduce, shareReplay, tap, toArray } from 'rxjs/operators'
import { StorageService } from './storage.service';
import { PoliciesService } from './policies.service';
import { User } from '../model/user-model';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user = this.storage.getCookie('user');

  
  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private policyService: PoliciesService
  ) { }
  policies$ = this.policyService.policies$;
  users$ = this.http.get<User[]>(API_ROUTES.USERS).pipe(
    shareReplay(1),
    map( (users: any) => users.clients as User[] )
  );

  WithPolicies$ = this.policies$.pipe(
    groupBy(
      policy => policy.email
    ),
    mergeMap(group => group.pipe(toArray())),
    map( (policy: any) => policy.map(
      (p: any) => ({ email: p[0].email, value: p})
    ))
  );

  usersWithPolicies$ = combineLatest([this.users$, this.WithPolicies$])
    .pipe(
      tap(data => console.log('test', data)),
      map(([users, withPolicies]) => 
        users.filter( u => withPolicies.find( (p: any) => p.email === u.email))
      )
  );

  usersWithoutPolicies$ = combineLatest([this.users$, this.WithPolicies$])
    .pipe(
      tap(data => console.log('test', data)),
      map(([users, withPolicies]) => 
        users.filter( u =>  !withPolicies.find( (p: any) => p.email === u.email))
      )
  );
}
