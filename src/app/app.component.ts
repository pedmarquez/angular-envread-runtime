import { Component } from '@angular/core';
import { AppService } from './app.service'
import { environment } from '../environments/environment'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'envapp';
  appData: any;

  constructor(private appService: AppService) {
      this.appData = environment;
  }
}
