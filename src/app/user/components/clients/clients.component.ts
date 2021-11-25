import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject,combineLatest, EMPTY, forkJoin, of, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, exhaustMap, map, tap, toArray, withLatestFrom } from 'rxjs/operators';
import { clientFilters } from 'src/app/shared/constants/clients-filter';
import { User } from 'src/app/shared/model/user-model';

import { UsersService } from 'src/app/shared/services/users.service';
import { clientTableOptions } from './clients-table-options';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsComponent {

  searchSubject = new BehaviorSubject<string>('');
  searchText$ = this.searchSubject.asObservable();
  
  filterEventSubject = new BehaviorSubject<any>(null);
  filterEvent$ = this.filterEventSubject.asObservable();
  
  currentFilterSubject = new BehaviorSubject(null);
  currentFilter$ = this.currentFilterSubject.asObservable();
  
  users$ = this.userService.users$;
  userWithPolicies$ = this.userService.usersWithPolicies$;
  userWithoutPolicies$ = this.userService.usersWithoutPolicies$;
  
  selectedFilter:any = null;
  filters = clientFilters;
  tableOptions = clientTableOptions;

  textFilter$ = this.searchText$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    exhaustMap(text => of(text))
  );

  filterByText$ = combineLatest([this.textFilter$,this.users$])
  .pipe(
    map( ([text, user] : [string,User[]]) => {
      return user.filter( (u: User) => {
        return text ? ( u.name.toLowerCase().startsWith( text.toLowerCase()) || u.email.toLowerCase().startsWith(text.toLowerCase()) ): true;
      })
    })
  );

  changeFilter$ = this.currentFilter$.pipe(
    distinctUntilChanged()
  ).subscribe( (data: any) => {
    if(data?.filters) {
      this.selectedFilter = data;
    } else {
      this.selectedFilter = null;
    } 
    this.filterEventSubject.next(null);
  });

  filterByKey$ = combineLatest([
      this.filterEvent$, 
      this.filterByText$,
      this.userWithPolicies$,
      this.userWithoutPolicies$
    ])
    .pipe(
      map(([filter, users, withPolicy, withoutPolicy]) => {
        if(!filter) {
          return users;
        } else {
          if(filter.filterBy === 'role') {
            return users.filter( user => {
              return filter.value ? user.role === filter.value : true;
            })
          } else {
            return filter.value ? filter.value === 'with' ? withPolicy : withoutPolicy : users;
          }
        };
      })
    );

  filteredList$ = combineLatest([this.filterByKey$, this.filterByText$])
    .pipe(
      map(([key, text]) => key.filter(
        k => text.find(t => t.email === k.email)
      ))
    );

  constructor(
    private userService: UsersService
  ) {}

  searchEvent(text: string): void {
    this.searchSubject.next(text);
  }

  changeFilterBy(event: any): void {
    this.currentFilterSubject.next(event);
  }

  filterEvent(event: any): void {
    this.filterEventSubject.next(event);
  }

  rowClicked(event: User) {
    this.userService.getUserDetailsSubject.next(event);
  }

}
