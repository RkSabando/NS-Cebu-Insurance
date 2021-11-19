import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { USER_ROUTES } from 'src/app/shared/enums/routes.enum';
import { Policy } from 'src/app/shared/model/policy-model';
import { User } from 'src/app/shared/model/user-model';
import { PoliciesService } from 'src/app/shared/services/policies.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  public ROUTE = USER_ROUTES;
  users$ = this.users.users$;
  usersWithPolicies$ = this.users.usersWithPolicies$;

  constructor(
    private users: UsersService
  ) { }

  ngOnInit(): void {}

}
