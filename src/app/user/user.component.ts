import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user = this.storage.getCookie('user');
  currentRoute = '';
  constructor(
    private storage: StorageService,
    public route: Router
  ) {}

  ngOnInit(): void {}

  getPageName(route: string): string {
    return route.replace('/','') ? route.includes('?') ? route.replace('/','').split('?')[0].toUpperCase() : route.replace('/','').toUpperCase() : 'Dashboard';
  }

}
