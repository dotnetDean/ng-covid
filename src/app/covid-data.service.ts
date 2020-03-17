import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Global } from "./interfaces/global";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CovidDataService {
  api = "https://covid19.mathdro.id/api";

  constructor(private http: HttpClient) {}

  getGlobalData() {
    return this.http.get<Global>(`${this.api}`);
  }

  getDataByCountry(countryCode) {
    return this.http.get(`${this.api}/countries/${countryCode}`);
  }

  getCountries() {
    return this.http.get(`${this.api}/countries`);
  }
}
