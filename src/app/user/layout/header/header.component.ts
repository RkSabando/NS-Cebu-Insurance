import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DIALOG_TYPES } from 'src/app/shared/enums/dialog.enum';
import { AUTH_ROUTES, USER_ROUTES } from 'src/app/shared/enums/routes.enum';
import { DialogOptions } from 'src/app/shared/model/dialog-model';
import { CustomDialogService } from 'src/app/shared/services/custom-dialog.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user = this.storage.getCookie('user');
  public ROUTES = USER_ROUTES;
  constructor(
    private storage: StorageService,
    private dialog: CustomDialogService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    const dialogOptions: DialogOptions = {
      type: DIALOG_TYPES.WARNING,
      title: 'Warning',
      desc: `Are you sure you want to log out?`,
      buttons: ['Yes', 'No']
    }

    this.dialog.openDialog(dialogOptions,
      () => {
        this.storage.deleteCookie('user');
        this.router.navigate([AUTH_ROUTES.LOGIN]);
      }
    );
  }

}
