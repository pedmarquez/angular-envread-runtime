import { Component } from '@angular/core';
import { AppService } from './app.service'
import { environment } from '../environments/environment'
import { setTheme } from 'ngx-bootstrap/utils';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'envapp';
  appData: any;

  constructor(private appService: AppService) {
    setTheme('bs4'); 
      this.appData = environment;
  }
}
