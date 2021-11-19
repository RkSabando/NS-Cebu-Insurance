import { Component } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'ns-cebu-insurance';
  constructor( private loaderService: LoaderService){}

  public loader$ = this.loaderService.showLoader$;
}
