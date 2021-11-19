import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { USER_ROUTES } from '../shared/enums/routes.enum';
import { ClientsComponent } from './components/clients/clients.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PoliciesComponent } from './components/policies/policies.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: USER_ROUTES.DEFAULT,
    component: UserComponent,
    children: [
      {
        path: USER_ROUTES.DEFAULT,
        component: DashboardComponent,
      },
      { 
        path: USER_ROUTES.POLICIES,
        component: PoliciesComponent
      },
      { 
        path: USER_ROUTES.CLIENTS,
        component: ClientsComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
