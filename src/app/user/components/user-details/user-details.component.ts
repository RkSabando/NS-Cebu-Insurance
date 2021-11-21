import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { distinctUntilChanged, pairwise, switchMap, tap } from 'rxjs/operators';
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
  onGoingChange = false;
  public userRolesOptions = userRolesOptions;
  public tableOptions = userDetailsPolicyTableOptions;

  ngOnInit(): void {
    this.defaultValue = this.userRolesOptions.find(role => role.value === this.data.user.role);
    this.formControl.setValue(this.defaultValue);
    this.formControl.markAsPristine();
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
          this.formControl.setValue(event.currentValue);
          this.formControl.markAsPristine();
        },
        () => {
          console.log('newUser', event.previousValue);
          this.defaultValue = event.previousValue;
          this.formControl.setValue(event.previousValue);
          this.formControl.markAsPristine();
        }
      );
    }
  }



}
