import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ITemperatureResponse } from "../types/temperatures";
import { interval, Observable, startWith, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  // NOTE: This normally is written in a .env file, but for simplicity I set up here.
  private _baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  private _apiKey = '354b4e751f41872ac5ee002579748a47'

  constructor(private httpClient: HttpClient) { }

  getTemperature(lat: number, lon: number): Observable<ITemperatureResponse> {
    return interval(30000).pipe(
      startWith(0),  // Esto asegura que se haga la llamada inmediatamente
      switchMap(() =>
        this.httpClient.get<ITemperatureResponse>(`${this._baseUrl}`, {
          params: {
            lat: lat.toString(),
            lon: lon.toString(),
            appid: this._apiKey,
            units: 'metric'
          }
        })
      )
    );
  }
}