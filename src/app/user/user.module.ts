import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PoliciesComponent } from './components/policies/policies.component';
import { ClientsComponent } from './components/clients/clients.component';
import { RoleComponent } from './components/role/role.component';
import { HeaderComponent } from './layout/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { UserDetailsComponent } from './components/user-details/user-details.component';


@NgModule({
  declarations: [
    UserComponent,
    DashboardComponent,
    PoliciesComponent,
    ClientsComponent,
    RoleComponent,
    HeaderComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
