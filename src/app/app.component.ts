import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'day36workshop';

  constructor(private router: Router){
  }
  goHome(){
    this.router.navigate(['/']);
  }

  addCity(){
    this.router.navigate(['/add-city']);

  }
}
