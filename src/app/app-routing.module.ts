import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AUTH_ROUTES, USER_ROUTES } from './shared/enums/routes.enum';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { 
    path: USER_ROUTES.DEFAULT,
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  }, 
  {
    path: AUTH_ROUTES.LOGIN,
    component: LoginComponent,
  },
  { 
    path: '**',
    pathMatch: 'full',
    redirectTo: USER_ROUTES.DEFAULT
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
