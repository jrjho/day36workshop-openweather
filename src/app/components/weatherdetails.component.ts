import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment';
import { Weather } from '../models/weather';
import { Router, ActivatedRoute } from '@angular/router';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weatherdetails',
  templateUrl: './weatherdetails.component.html',
  styleUrls: ['./weatherdetails.component.css']
})
export class WeatherdetailsComponent implements OnInit, OnDestroy {
  openweatherApiKey: string = environment.openWeatherApiKey;
  private city: string = "London";
  params$!: Subscription;
  model = new Weather(this.city, 0, 0, 0, "", "", 0, 0);

  constructor(private weatherSvc: WeatherService, private router: Router,
    private activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.params$ = this.activatedRoute.params.subscribe(
      (params) => {
        this.city = params['city'];
      }
    );
    this.getWeatherDetailsFromAPI(this.city);
  }

  ngOnDestroy(): void {
    this.params$.unsubscribe();
  }

  getWeatherDetailsFromAPI(city: string) {
    this.weatherSvc.getWeather(city, this.openweatherApiKey)
      .then((result) => {
        const cityObj = this.weatherSvc.getCityUrl(city);
        this.model = new Weather(
          city,
          result.main.temp,
          result.main.pressure,
          result.main.humidity,
          result.weather[0].description,
          cityObj!.imageUrl,
          result.wind.degree,
          result.wind.speed
        )
      }).catch((err) => {
        console.log(err);
        this.router.navigate(['']);
      })
  }

}
