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

  private _selectedCountryIso3 = "GBR";
  public get selectedCountryIso3(): string {
    return this._selectedCountryIso3;
  }
  public set selectedCountryIso3(v: string) {
    this.covidDataService.getDataByCountry(v).subscribe(
      country => (this.country = country),
      error => (this.country = undefined)
    );
    this._selectedCountryIso3 = v;
  }

  global: Global;
  countries = [];
  country;

  ngOnInit() {
    const observables = forkJoin(
      this.covidDataService.getGlobalData(),
      this.covidDataService.getCountries(),
      this.covidDataService.getDataByCountry(this.selectedCountryIso3)
    );
    observables.subscribe(responses => {
      console.log(responses)
      this.global = responses[0];
      this.countries = responses[1]["countries"];
      this.country = responses[2];
    });
  }

  getCountryNameByIso3(iso3) {
    let result;
    if (this.countries.length > 0) {
      result = this.countries.find(x => x.iso3 === iso3);
      return result.name;
    }
  }
}
