import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Chart } from 'chart.js'
import { CurrencyService } from '../currency-service.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-price-chart',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.css']
})
export class PriceChartComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private router: Router, private _crypto: CurrencyService, private toastr: ToastrService, private location: Location) {
    this.toastr.success(' Section', 'Price Chart', {
      timeOut: 1000
    });
  }
  // Declarations
  public result: { [x: string]: any; };
  public singleid: { quote: { USD: { price: number; market_cap: number; percent_change_1h: number; percent_change_7d: number; percent_change_24h: number; }; }; name: string; };
  public marketCap: number;
  public percent_change_1h: number;
  public percent_change_24h: number;
  public percent_change_7d: number;
  public priceArray: any = [];
  public day: any = ['7d', '24h', '1h', 'current'];
  public price: number;
  chart: any = [];

  ngOnInit() {

    // storing id value of selected chart in variable id
    let id = this._route.snapshot.paramMap.get('id');
    // Fetching currency details
    this._crypto.getAllCurrency().subscribe((res: { [x: string]: { [x: string]: any; }; }) => {
      this.result = res['data'];
      for (let i in this.result) {
        if ((this.result[i].id) == id) {
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
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.day,
          datasets: [
            {
              label: "Price of " + this.singleid.name + " in $",
              data: this.priceArray.reverse(this.priceArray),
              backgroundColor: [
                'rgba(252, 99, 132, 0.2)',
                'rgba(52, 162, 235, 0.2)',
                'rgba(252, 206, 86, 0.2)',
                'rgba(72, 192, 192, 0.2)',
                'rgba(151, 102, 255, 0.2)',
                'rgba(252, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(252,99,132,1)',
                'rgba(52, 162, 235, 1)',
                'rgba(252, 206, 86, 1)',
                'rgba(72, 192, 192, 1)',
                'rgba(151, 102, 255, 1)',
                'rgba(252, 159, 64, 1)'
              ],
              fill: true
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: "Price of " + this.singleid.name + " in $"
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
  }
  // Method for previous page
  goBackToPreviousPage(): any {
    this.location.back();
  }
}
