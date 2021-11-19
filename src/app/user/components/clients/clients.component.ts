import { NonNullAssert } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject,combineLatest } from 'rxjs';
import { concatMap, debounceTime, distinctUntilChanged, exhaustMap, filter, map, tap } from 'rxjs/operators';
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
  filters = clientFilters;
  selectedFilter:any = null;

  filterEventSubject = new BehaviorSubject(null);
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
              return text ? (u.name.includes(text) || u.email.includes(text) ): true;
            })
          })
        )
      }
    )
  );

  changeFilter$ = this.currentFilter$.pipe(
    distinctUntilChanged()
  ).subscribe( data => this.selectedFilter = data);

  filterByKey$ = combineLatest([this.filterEvent$, this.users$])
    .pipe(
      tap(data => console.log('data1', data)),
      map((filter, users) => ({user: users})),
      tap(data => console.log('data2', data))
    );

  // this.filterEvent$.pipe(
  //   distinctUntilChanged(),
  //   exhaustMap(
  //     (filter: any) => {
  //       return this.users$.pipe(
  //         map( (user: User[]) => {
  //           return filter ? this.users$ : user.filter( (u: any) => {
  //             return filter ? 
  //             filter.filterBy === 'role' ? u[filter.filterBy] === filter.value : 
  //             true //for policy filter
  //             : true;
  //           })
  //         })
  //       )
  //     }
  //   )
  // )

  // filteredList$ = 

  constructor(
    private userService: UsersService
  ) { }

  

  ngOnInit(): void {
    this.filterByText$.subscribe( changes => {
      console.log('changes', changes);
    })
   

    this.userService.WithPolicies$.subscribe( filters => {
      console.log('WithPolicies', filters);
    })
    this.filterByKey$.subscribe( filters => {
      console.log('filter', filters);
    })
    this.userWithPolicies$.subscribe( (changes: any) => {
      console.log('with policy', changes);
    })
  }

  searchEvent(text: string): void {
    this.searchSubject.next(text);
  }

  changeFilterBy(event: any): void {
    this.currentFilterSubject.next(event.filters ? event : null);
    // this.filterEventSubject.next(null);
  }

  filterEvent(event: any): void {
    this.filterEventSubject.next(event);
  }

}
