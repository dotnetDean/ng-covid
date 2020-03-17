export interface Confirmed {
  value: number;
  detail: string;
}

export interface Recovered {
  value: number;
  detail: string;
}

export interface Deaths {
  value: number;
  detail: string;
}

export interface DailyTimeSeries {
  pattern: string;
  example: string;
}

export interface CountryDetail {
  pattern: string;
  example: string;
}

export interface Global {
  confirmed: Confirmed;
  recovered: Recovered;
  deaths: Deaths;
  dailySummary: string;
  dailyTimeSeries: DailyTimeSeries;
  image: string;
  source: string;
  countries: string;
  countryDetail: CountryDetail;
  lastUpdate: Date;
}
