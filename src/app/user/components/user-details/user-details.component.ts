import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { userRolesOptions } from 'src/app/shared/constants/user-roles-options';
import { DIALOG_TYPES } from 'src/app/shared/enums/dialog.enum';
import { DialogOptions } from 'src/app/shared/model/dialog-model';
import { UserDetails } from 'src/app/shared/model/user-model';
import { CustomDialogService } from 'src/app/shared/services/custom-dialog.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { userDetailsPolicyTableOptions } from './user-details-policy-table-options';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, AfterViewInit {
  formControl = new FormControl();
  firstLoad = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserDetails,
    private userService: UsersService,
    public dialogRef: MatDialogRef<UserDetailsComponent>,
    private dialog: CustomDialogService
  ) { }
 

  defaultValue: any; 
  disabled = false;
  public userRolesOptions = userRolesOptions;
  public tableOptions = userDetailsPolicyTableOptions;

  ngOnInit(): void {
    this.defaultValue = this.userRolesOptions.find(role => role.value === this.data.user.role);
    this.setFormControlValueThenPristine(this.defaultValue);
  }

  ngAfterViewInit(): void {
    this.firstLoad = false;
  }

  changeRole(event: any) {
    if(!this.firstLoad ) {
      const newUser = {...this.data.user,...{role: event.currentValue.value}};
      const dialogOptions: DialogOptions = {
        type: DIALOG_TYPES.WARNING,
        title: 'Warning',
        desc: `Are you sure you want to change this user's role?`,
        buttons: ['Save', 'Cancel']
      }

      this.dialog.openDialog(dialogOptions,
        () => {
          this.userService.editUserSubject.next(newUser);
          this.setFormControlValueThenPristine(event.currentValue);
        },
        () => {
          this.disabled = true;
          this.defaultValue = {...event.previousValue};
          this.setFormControlValueThenPristine(event.previousValue);
          setTimeout(() => {
            this.disabled = false;
          });
        }
      );
    }
  }

  setFormControlValueThenPristine(value: any){
    this.formControl.setValue(value);
    this.formControl.markAsPristine();
  }
}
