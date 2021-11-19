import { Component, OnInit } from '@angular/core';
import { USER_ROUTES } from 'src/app/shared/enums/routes.enum';
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
    private storage: StorageService
  ) { }

  ngOnInit(): void {
  }

}
