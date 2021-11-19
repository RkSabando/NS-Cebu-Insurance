import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ROLE_TYPES } from '../enums/roles.enum';
import { AUTH_ROUTES } from '../enums/routes.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( 
    private storage: StorageService,
    private route: Router
  ) {}

  
  canActivate() {
    const user = this.storage.getCookie('user');
    if (user) { 
      if(user.role !== ROLE_TYPES.ADMIN) {
        return false;
      }
      return true;
    } 

    this.route.navigate([AUTH_ROUTES.LOGIN]);
    return false;
  }
  
}
