import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { City } from '../models/city';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-addcity',
  templateUrl: './addcity.component.html',
  styleUrls: ['./addcity.component.css']
})
export class AddcityComponent implements OnInit,OnDestroy{
  form!:FormGroup
  country!: string
  city!: string
  imageUrl!: string
  cityObj!: City

  constructor(private formBuilder:FormBuilder, private router: Router, private weatherSvc :WeatherService) { }
    
  ngOnInit(): void {
    this.form= this.createForm()
  }

  ngOnDestroy(): void {}

  add(){
    this.country = this.form?.value["countryName"];
    this.city = this.form?.value["city"];
    this.imageUrl = this.form?.value["imageUrl"];
    this.cityObj = { country: this.country, city: this.city, imageUrl: this.imageUrl};
    this.weatherSvc.addCity(this.cityObj);
    this.router.navigate(['/']);
  }

  private createForm():FormGroup{
    return this.formBuilder.group({
      countryName:this.formBuilder.control(''),
      city:this.formBuilder.control(''),
      imageUrl:this.formBuilder.control('')
    });
  }

}
