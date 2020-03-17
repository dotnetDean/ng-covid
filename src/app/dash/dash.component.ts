import { Component, OnInit } from "@angular/core";
import { CovidDataService } from "../covid-data.service";
import { Global } from "../interfaces/global";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-dash",
  templateUrl: "./dash.component.html",
  styleUrls: ["./dash.component.scss"]
})
export class DashComponent implements OnInit {
  constructor(private covidDataService: CovidDataService) {}

  private _selectedCountry = "GB";
  public get selectedCountry(): string {
    return this._selectedCountry;
  }
  public set selectedCountry(v: string) {
    this.covidDataService.getDataByCountry(v).subscribe(
      country => (this.country = country),
      error => (this.country = undefined)
    );
    this._selectedCountry = v;
  }

  global: Global;
  countries: {};
  countriesData: {};
  countryOptions = [];

  country;
  iso3;

  ngOnInit() {
    const observables = forkJoin(
      this.covidDataService.getGlobalData(),
      this.covidDataService.getCountries(),
      this.covidDataService.getDataByCountry(this.selectedCountry)
    );
    observables.subscribe(responses => {
      this.global = responses[0];
      this.country = responses[2];
      this.countries = responses[1]["countries"];
      this.iso3 = responses[1]["iso3"];

      this.mapCountryCodes();
    });
  }

  private mapCountryCodes() {
    for (let [key, value] of Object.entries(this.countries)) {
      this.countryOptions.push({
        name: key,
        code: value,
        iso3: this.iso3[value as string]
      });
    }
  }

  getCountryNameByCode(code) {
    let result;
    if (this.countryOptions.length > 0) {
      result = this.countryOptions.find(x => x.code === code);
      return result.name;
    }
  }
}
