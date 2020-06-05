import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { CurrencyService } from '../currency-service.service';
import { Location } from '@angular/common';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})

export class ComparisonComponent implements OnInit {

  // Declerations
  public currency: any;
  public currency2: any;
  public allCountries: any;
  public y: any;
  public Chart: any;
  public results: any;
  public prices: any;
  public singleid: { quote: { USD: { price: number; market_cap: number; percent_change_1h: number; percent_change_7d: number; percent_change_24h: number; }; }; name: string; };
  public singleid2: { quote: { USD: { price: any; market_cap: number; percent_change_1h: number; percent_change_7d: number; percent_change_24h: number; }; }; name: string; };
  public marketCaps: number;
  public percent_change_1hs: number;
  public percent_change_24hs: number;
  public percent_change_7ds: number;
  public priceArrays: any = [];
  public result: any;
  public marketCap: number;
  public percent_change_1h: number;
  public percent_change_24h: number;
  public percent_change_7d: number;
  public priceArray: any = [];
  public day: any = ['7d', '24h', '1h', 'current'];
  public price: number;
  chart: any = [];

  constructor(private _route: ActivatedRoute, private router: Router, private _crypto: CurrencyService, private location: Location) { }

  ngOnInit() {
    // storing id value of selected chart in variable id and id2
    let id = this._route.snapshot.paramMap.get('id1');
    let id2 = this._route.snapshot.paramMap.get('id2');
    this._crypto.getAllCurrency().subscribe((res: { [x: string]: any; }) => {
      this.result = res['data'];
      for (let i in this.result) {
        if (this.result[i].id == id) {
          this.singleid = this.result[i];
        }
      }
      this.price = this.singleid.quote.USD.price;
      this.marketCap = this.singleid.quote.USD.market_cap;
      this.percent_change_1h = this.singleid.quote.USD.percent_change_1h;
      this.percent_change_7d = this.singleid.quote.USD.percent_change_7d;
      this.percent_change_24h = this.singleid.quote.USD.percent_change_24h;
      this.priceArray[0] = this.price;
      this.priceArray[1] = this.price + ((this.price * this.percent_change_1h) / 100);
      this.priceArray[2] = this.price + ((this.price * this.percent_change_24h) / 100);
      this.priceArray[3] = this.price + ((this.price * this.percent_change_7d) / 100);

      // Fetching currency details
      this._crypto.getAllCurrency().subscribe((res: { [x: string]: any; }) => {
        this.results = res['data'];
        for (let i in this.results) {
          if (this.results[i].id == id2) {
            this.singleid2 = this.results[i];
          }
        }
        this.prices = this.singleid2.quote.USD.price;
        this.marketCaps = this.singleid2.quote.USD.market_cap;
        this.percent_change_1hs = this.singleid2.quote.USD.percent_change_1h;
        this.percent_change_7ds = this.singleid2.quote.USD.percent_change_7d;
        this.percent_change_24hs = this.singleid2.quote.USD.percent_change_24h;
        this.priceArrays[0] = this.prices;
        this.priceArrays[1] = this.prices + ((this.prices * this.percent_change_1hs) / 100);
        this.priceArrays[2] = this.prices + ((this.prices * this.percent_change_24hs) / 100);
        this.priceArrays[3] = this.prices + ((this.prices * this.percent_change_7ds) / 100);

        // chart data section
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: this.day,
            datasets: [
              {
                label: "Price of " + this.singleid.name,
                data: this.priceArray.reverse(this.priceArray),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                fill: true
              },
              {
                label: "Price of " + this.singleid2.name + " in $",
                data: this.priceArrays.reverse(this.priceArrays),
                borderColor: "#3cba9f"
              }

            ]
          },
          options: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: "Price of " + this.singleid.name + " " + "and" + " " + this.singleid2.name + " in $"
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }
          }
        })
      })
    })
  }
  // Method for previous page
  goBackToPreviousPage(): any {
    this.location.back();
  }
}