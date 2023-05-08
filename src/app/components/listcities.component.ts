import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-listcities',
  templateUrl: './listcities.component.html',
  styleUrls: ['./listcities.component.css']
})
export class ListcitiesComponent {
  cities: any;

  constructor(private weatherSvc: WeatherService) { }

  ngOnInit(): void {
    this.weatherSvc.sortCities();
    this.cities = this.weatherSvc.countries;
  }
}
