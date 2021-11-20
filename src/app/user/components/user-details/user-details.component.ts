import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDetails } from 'src/app/shared/model/user-model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserDetails
  ) { }


  ngOnInit(): void {
    console.log('modal data', this.data);
  }

}
