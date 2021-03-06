import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' 
import { API_ROUTES } from '../enums/api-routes.enum';
import { concatMap, filter,withLatestFrom, groupBy, map, mergeMap, reduce, shareReplay, tap, toArray, exhaust, exhaustMap, distinctUntilChanged, take } from 'rxjs/operators'
import { StorageService } from './storage.service';
import { PoliciesService } from './policies.service';
import { User, UserDetails } from '../model/user-model';
import { Policy } from '../model/policy-model';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from 'src/app/user/components/user-details/user-details.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user = this.storage.getCookie('user');
  getUserDetailsSubject = new Subject<User>();
  getUserDetails$ = this.getUserDetailsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private policyService: PoliciesService,
    private dialog: MatDialog
  ) { }
  policies$ = this.policyService.policies$;

  editUserSubject = new BehaviorSubject<User | null>(null);
  editUser$ = this.editUserSubject.asObservable();

  userLists$ = this.http.get<User[]>(API_ROUTES.USERS).pipe(
    shareReplay(1),
    map( (users: any) => users.clients as User[] )
  );

  users$ = combineLatest([this.editUser$, this.userLists$])
  .pipe(
    map(([edit,users]) => {
      if(edit) {
        const userIndex = users.findIndex(u => u.email === edit.email);
        users[userIndex] = edit;
        return users;
      }
      return users;
    })
  )

  WithPolicies$ = this.policies$.pipe(
    groupBy(
      policy => policy.email
    ),
    mergeMap(group => group.pipe(toArray())),
    map( (policy: Policy[]) => policy.map(
      (p: any) => ({ email: p[0].email as string, value: p as Policy[]})
    ))
  );

  usersWithPolicies$ = combineLatest([this.users$, this.WithPolicies$])
    .pipe(
      map(([users, withPolicies]) => 
        users.filter( u => withPolicies.find( (p: any) => p.email === u.email))
      )
  );

  usersWithoutPolicies$ = combineLatest([this.users$, this.WithPolicies$])
    .pipe(
      map(([users, withPolicies]) => 
        users.filter( u => !(withPolicies.find( (p: any) => p.email === u.email)))
      )
  );




  userDetails$ = this.getUserDetails$.pipe(
    withLatestFrom(this.users$,this.WithPolicies$),
    map(([user, users, withPolicy]) => ({ 
      user: users.find(u => u.id === user.id),
      policies: withPolicy.find( p => p.email === user.email ) ?? null
    }) as UserDetails)
  )
  .subscribe( (data: UserDetails) => {
    this.dialog.open(UserDetailsComponent,{
      data: data,
      panelClass: 'user-details-modal',
      disableClose: true
    });
  })
}
