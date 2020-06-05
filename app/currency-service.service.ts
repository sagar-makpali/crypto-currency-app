import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  // apiKey = 'd8f69e9c-7fb5-4617-bd78-59aeee1f2403';
  public Currency: any
  public result: any
  constructor(private _http: HttpClient) { }

  public getAllCurrency(): any {
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-CMC_PRO_API_KEY': '215d6666-c0ed-4680-9450-7b54cf51b0c2'
      })
    }
    let res = this._http.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', httpOptions);
    return res;

  }
}
