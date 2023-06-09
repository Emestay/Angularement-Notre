import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { DatePipe } from '@angular/common';

interface WeatherData {
  hourly: {
    temperature_2m: number[];
    apparent_temperature: number[];
    time: string[];
  };
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-fetch',
  templateUrl: './fetch.component.html',
  styleUrls: ['./fetch.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }]
})
export class FetchComponent implements OnInit {
  temperatures: number[] = [];
  temperaturesApparente: number[] = [];
  time: string[] = [];
  locationInfo: string = '';

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchWeatherData();
  }

  fetchWeatherData(): void {
    const apiUrl: string = `https://api.open-meteo.com/v1/forecast?latitude=43.6042600&longitude=1.4436700&hourly=temperature_2m,apparent_temperature&forecast_days=3`;
    fetch(apiUrl)
      .then((hop) => {
        if (hop.ok) {
          return hop.json();
        } else {
          throw new Error('Erreur lors de la récupération des données météo');
        }
      })
      .then((data: WeatherData) => {
        console.log(data);
        this.temperaturesApparente = data.hourly.apparent_temperature;
        this.temperatures = data.hourly.temperature_2m;
        this.time = data.hourly.time.map(dateString => this.datePipe.transform(dateString, 'cccc  HH:mm') ?? '');
        return this.reverseGeocode(data.latitude, data.longitude);
      })
      .then((city) => {
        this.locationInfo = `Ville: ${city}`;
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données météo:', error);
      })
  }

  reverseGeocode(latitude: number, longitude: number): Promise<string> {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

    return fetch(apiUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erreur lors de la récupération des données de géocodage inverse');
        }
      })
      .then((data) => {
        return data.address.city || data.address.town || data.address.village || 'Inconnu';
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données de géocodage inverse:', error);
        return 'Inconnu';
      });
  }
}
