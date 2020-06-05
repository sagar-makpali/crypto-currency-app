import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import 'hammerjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  // Declerations
  public arr = [];
  public allCurrency = [];
  public key = 'id';
  public myItem = [];
  public comparsionId = [];
  public favouriteCoin = [];
  public displaycheckbox: boolean = false;
  public flagID = 1;
  public arrCopy: any[];
  public p: number = 1;
  public id: any;

  constructor(private _route: ActivatedRoute, private router: Router, private toastr: ToastrService, public listService: CurrencyService, private location: Location) {
    this.toastr.info(' Section', 'Favourites', {
      timeOut: 1000
    });
  }

  ngOnInit() {

    this.listService.getAllCurrency().subscribe(
      (data: { data: any[]; }) => {
        this.allCurrency = data.data;
        for(let element in this.allCurrency) {
          this.arr.push(this.allCurrency[element]);
        }
        this.arrCopy = this.arr;
        //console.log("print local storage if any2:" + localStorage.getItem(this.key));
       // this.myItem = JSON.parse(localStorage.getItem(this.key));
       console.log("print local storage if any2:" + Cookie.get(this.key));
       //console.log("print local storage if any3:" + JSON.parse(localStorage.getItem(this.key)));
       this.myItem= JSON.parse(Cookie.get(this.key));
        if (this.myItem) {
          this.favouriteCoin = this.arr.filter((word) => this.myItem.includes(word.id));
        }
      },
      (error: any) => {
        console.log(error);
      }
    )

  }

  // Price chart
  public gopricechart(id: any) {
    this.router.navigate(['/priceChart', id]);
  }

  // Check box methods starts here
  // Method for checkbox on a click  
  public checkboxdisplay() {
    this.displaycheckbox = !this.displaycheckbox;
  }

  // function for select coin by checkbox 
  onChange(id: number, isChecked: boolean) {
    if (isChecked) {
      this.comparsionId.push(id);
    } else {
      this.comparsionId.splice(0, this.comparsionId.length);

      if (isChecked) {
        this.comparsionId.push(id);
      }
    }
  }
  // Check box methods ends here

  // navigate comparison chart component 
  OnSelectCurrency() {
    if (this.comparsionId.length > 2) {
      this.toastr.error('Select only 2 checkbox', 'To Compare', {
        timeOut: 3000
      });
    }
    else if (this.comparsionId.length < 2) {
      this.toastr.error('Select atleast 2 items', 'To Compare', {
        timeOut: 3000
      });
    }
    else {
      this.router.navigate(['/comparisonView', this.comparsionId[0], this.comparsionId[1]]);
      this.toastr.info('Comparision View', 'Welocme To', {
        timeOut: 2000
      });
    }
  }

  // Sorting starts here
  //Sort by Name
  sortByName(favouriteCoin: any) {
    this.flagID++;
    if (this.flagID % 2 == 1) {
      favouriteCoin.sort(function (a: { name: { toLowerCase: () => void; }; }, b: { name: { toLowerCase: () => void; }; }) {
        let textA = a.name.toLowerCase();
        let textB = b.name.toLowerCase();
        return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
      })
    }
    else {
      favouriteCoin.sort(function (a: { name: any; }, b: { name: any; }) {
        let textA = a.name;
        let textB = b.name;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
    }
  }

  //Sort by Price
  sortByPrice(favouriteCoin: any) {
    this.flagID++;
    if (this.flagID % 2 == 1) {
      favouriteCoin.sort(function (a, b) {
        let textA = a.quote.USD.price;
        let textB = b.quote.USD.price;
        return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
      })
    }
    else {
      favouriteCoin.sort(function (a: { quote: { USD: { price: any; }; }; }, b: { quote: { USD: { price: any; }; }; }) {
        let textA = a.quote.USD.price;
        let textB = b.quote.USD.price;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
    }
  }

  //Sort by MarketCap 
  sortByMarketCap(favouriteCoin: any) {
    this.flagID++;
    if (this.flagID % 2 == 1) {
      favouriteCoin.sort(function (a: { quote: { USD: { market_cap: any; }; }; }, b: { quote: { USD: { market_cap: any; }; }; }) {
        let textA = a.quote.USD.market_cap;
        let textB = b.quote.USD.market_cap;
        return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
      })
    }
    else {
      favouriteCoin.sort(function (a: { quote: { USD: { market_cap: any; }; }; }, b: { quote: { USD: { market_cap: any; }; }; }) {
        let textA = a.quote.USD.market_cap;
        let textB = b.quote.USD.market_cap;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
    }
  }

  // Sort by symbol
  sortBySymbol(favouriteCoin: any) {
    this.flagID++;
    if (this.flagID % 2 == 1) {
      favouriteCoin.sort(function (a: { symbol: { toLowerCase: () => void; }; }, b: { symbol: { toLowerCase: () => void; }; }) {
        let textA = a.symbol.toLowerCase();
        let textB = b.symbol.toLowerCase();
        return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
      })
    }
    else {
      favouriteCoin.sort(function (a: { symbol: any; }, b: { symbol: any; }) {
        let textA = a.symbol;
        let textB = b.symbol;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
    }
  }
  // Sorting ends here 

  // Method for previous page
  goBackToPreviousPage(): any {
    this.location.back();
  }
}
