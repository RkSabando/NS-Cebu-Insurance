import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { User } from 'src/app/shared/model/user-model';
import { UsersService } from 'src/app/shared/services/users.service';
import { DIALOG_TYPES } from '../shared/enums/dialog.enum';
import { EMAIL_ERROR } from '../shared/enums/email-error.enum';
import { ROLE_TYPES } from '../shared/enums/roles.enum';
import { USER_ROUTES } from '../shared/enums/routes.enum';
import { DialogOptions } from '../shared/model/dialog-model';
import { AuthService } from '../shared/services/auth.service';
import { CustomDialogService } from '../shared/services/custom-dialog.service';
import { StorageService } from '../shared/services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | undefined;
  passType = 'password';
  users$ = this.users.users$;
  emailErrorMessage = '';
  userList: User[] | undefined;
  submitted = false;

 

  constructor(
    private fb: FormBuilder,
    private users: UsersService,
    private auth: AuthService,
    private storage: StorageService,
    private router: Router,
    private dialog: CustomDialogService
  ) {
    this.users$.subscribe(
      users => {
        this.userList = users;
      }
    );
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]], 
      password: ['', Validators.required]
    });
  }
 

  ngOnInit(): void {
    this.initializeForm();

    const emailControl = this.loginForm?.get('email');
    emailControl?.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe(
      () => {
          this.setEmailErrorMessage(emailControl);
      }
    )
  }

  

  setEmailErrorMessage(c: AbstractControl | null): void {
    this.emailErrorMessage = '';
    if(c && (c.touched || c.dirty ) && c.errors){
      Object.keys(c.errors).map(
        (key:any) => {
          this.emailErrorMessage = EMAIL_ERROR[key.toUpperCase() as keyof typeof EMAIL_ERROR];
        }
      );
    }
  }

  checkIfEmailExist(): boolean {
    const emailControl = this.loginForm?.get('email');
    this.emailErrorMessage = '';
    const user = this.userList?.find(
      u => u.email === emailControl?.value
    );
    if(user){
      if( user.role !== ROLE_TYPES.ADMIN ) {
        this.emailErrorMessage = EMAIL_ERROR.INVALID_ROLE;
        return false;
      }
      return true;
    } 
    this.emailErrorMessage = EMAIL_ERROR.NOT_EXISTS;
    return false;
  }

  onSubmit() {
    this.submitted = true;
    if(this.loginForm?.valid && this.checkIfEmailExist()){
        if(this.auth.login(this.loginForm)) {
          const email = this.loginForm?.get('email')?.value;
          const user = this.userList?.find( u => u.email === email);
   
          this.storage.setCookie('user', JSON.stringify(user),1);
          this.router.navigate([USER_ROUTES.DEFAULT]);
        } else {
          const dialogOptions: DialogOptions = {
            type: DIALOG_TYPES.ERROR,
            title: 'Error',
            desc: 'Invalid credentials! Please try again!',
            buttons: ['Ok'],
            timeout: 2000
          }
          this.dialog.openDialog(dialogOptions);
        }

        
    }
  }

}
