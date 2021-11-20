import { NonNullAssert } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject,combineLatest } from 'rxjs';
import { debounceTime, distinct, distinctUntilChanged, exhaustMap, filter, map, tap } from 'rxjs/operators';
import { clientFilters } from 'src/app/shared/constants/clients-filter';
import { User } from 'src/app/shared/model/user-model';

import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsComponent implements OnInit {

  searchSubject = new BehaviorSubject<string>('');
  searchText$ = this.searchSubject.asObservable();
  users$ = this.userService.users$;
  userWithPolicies$ = this.userService.usersWithPolicies$;
  userWithoutPolicies$ = this.userService.usersWithoutPolicies$;
  filters = clientFilters;
  selectedFilter:any = null;

  filterEventSubject = new BehaviorSubject<any>(null);
  filterEvent$ = this.filterEventSubject.asObservable();

  currentFilterSubject = new BehaviorSubject(null);
  currentFilter$ = this.currentFilterSubject.asObservable();


  filterByText$ = this.searchText$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    exhaustMap(
      text=> {
        return this.users$.pipe(
          map( (user: User[]) => {
            return user.filter( (u: User) => {
              return text ? (u.name.toLocaleLowerCase().startsWith(text.toLocaleLowerCase()) || u.email.toLocaleLowerCase().startsWith(text.toLocaleLowerCase()) ): true;
            })
          })
        )
      }
    )
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
  ) { }

  

  ngOnInit(): void {
    this.filteredList$.subscribe( changes => {
      console.log('changes',changes);
    })
  }

  searchEvent(text: string): void {
    this.searchSubject.next(text);
  }

  changeFilterBy(event: any): void {
    this.currentFilterSubject.next(event);
  }

  filterEvent(event: any): void {
    this.filterEventSubject.next(event);
  }

}
