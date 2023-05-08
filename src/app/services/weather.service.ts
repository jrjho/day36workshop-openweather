import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../models/city';
import { lastValueFrom } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  countries =[
    //{ country: 'Singapore', city:'Singapore'},
    { country: 'United Kingdom', city:'London'},
    { country: 'Malaysia', city:'Kuala Lumpur'},
    { country: 'Indonesia', city:'Jakarta'},
    { country: 'China', city:'Beijing'},
    { country: 'India', city:'New Delhi'},
    { country: 'Thailand', city:'Bangkok'},
  ];

  imageUrlCities = [
    //{city: 'Singapore', imageUrl: ''},
    {city: 'London', imageUrl: 'https://bit.ly/3AOZjl0'},
    {city: 'Kuala Lumpur', imageUrl: 'https://bit.ly/3AOZjl0'},
    {city: 'Jakarta', imageUrl: 'https://bit.ly/3AOZjl0'},
    {city: 'Beijing', imageUrl: 'https://bit.ly/3AOZjl0'},
    {city: 'New Delhi', imageUrl: 'https://bit.ly/3AOZjl0'}, 
    {city: 'Bangkok', imageUrl: 'https://bit.ly/3AOZjl0'},
  ];

  constructor(private httpClient:HttpClient) { }

  sortCities(){
    this.countries.sort((a,b) => (b.city>a.city) ? -1 : 1);
  }

  addCity(city:City){
    this.countries.push({country: city.country, city:city.city});
    this.imageUrlCities.push({city: city.city, imageUrl: city.imageUrl});
    this.sortCities
  }

  getCityUrl(city:string){
    const result = this.imageUrlCities.find( ({city: c}) => c === city);
    return result;
  }

  getWeather(city:string, apiKey:string):Promise<any>{
    const params = new HttpParams()
                    .set('q', city)
                    .set('units', 'metric')
                    .set('appid', apiKey);
    return lastValueFrom(
      this.httpClient.get(environment.openWeatherApiUrl, {params:params})
    )
  }

  
}
