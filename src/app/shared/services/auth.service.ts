import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  defaultPassword = 'Test123!';
  constructor(
    private cookie: StorageService
  ) { }


  login(c: AbstractControl): boolean {
    if(c.get('password')?.value === this.defaultPassword ) {
      return true;
    } 

    return false;
  }
}
