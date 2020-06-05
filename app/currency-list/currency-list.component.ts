import { Component, OnInit } from '@angular/core';
//import { HammerModule } from '@angular/platform-browser';
import { CurrencyService } from '../currency-service.service'
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import 'hammerjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})

export class CurrencyListComponent implements OnInit {
  // Decleration
  public key: string;
  public displaycheckbox: boolean = false;
  public reverse: boolean = false;
  public allCurrency = [];
  public arr = [];
  public arrCopy = [];
  public result = [];
  public Length: any;
  public selected: any;
  public selectedIndex: number = null;
  public favData = [];
  public favouriteCoin = [];
  public selectedCoin = [];
  public comparsionId = [];
  public flagID = 1;
  public p: number = 1;
  public id: any;

  constructor(private _route: ActivatedRoute, private router: Router, private toastr: ToastrService, public listService: CurrencyService, private location: Location) {
   
    this.toastr.success("Welcome to Crypto Currency");
            setTimeout(() => {              
            }, 2000);
  }

  ngOnInit() {
    // Method for getting currency details
    this.listService.getAllCurrency().subscribe(
      (data: { data: any[]; }) => {
        this.allCurrency = data.data;
        console.log("logging allCurrency arr:" + JSON.stringify(data.data));
        for (let element in this.allCurrency) {
          this.arr.push(this.allCurrency[element]);
          
        }
        
        this.arrCopy = this.arr;
      },
      (error: any) => {
      }
    )
  }

  // for range slider function
  public myOnChange(event1: { from: number; to: number; }, type: string) {
    let min = event1.from;
    let max = event1.to;

    if (type === 'marketCap') {
      if (this.result.length > 0) {
        this.result = this.arrCopy.filter(word => (word.quote.USD.market_cap > min && word.quote.USD.market_cap < max));
      } else {
        this.result = this.arrCopy.filter(word => (word.quote.USD.market_cap > min && word.quote.USD.market_cap < max));
      }
    } else {
      if (this.result.length > 0) {
        this.result = this.arrCopy.filter(word => (word.quote.USD.price > min && word.quote.USD.price < max));
      } else {
        this.result = this.arrCopy.filter(word => (word.quote.USD.price > min && word.quote.USD.price < max));
      }
    }
    this.arr = this.result;
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

     // if (isChecked) {
     //   this.comparsionId.push(id);
     // }
    }
  }
  // Check box methods ends here

  // Favourite selection methods starts here
  // favourite selected coin in cookie
  onSelect(j: any) {
    this.key = 'id';
    console.log("checkking if local storage has cookie");
    console.log("print cookie previous ids if any:" + Cookie.get(this.key));

   // if( Cookie.get(this.key) != null)
    //{
    //  console.log("local storage has cookie")
     // for()
     // this.favData=Cookie.get(this.key);

    //}
    if(Cookie.get(this.key)!= null)
    {
    this.favData=JSON.parse(Cookie.get(this.key));
    }
    this.favData.push(j);
    Cookie.set(this.key,JSON.stringify(this.favData));
    console.log("current cookie value: "+ Cookie.get(this.key))
   // localStorage.setItem(key, JSON.stringify(this.favData));
    this.selected = (this.selected === j ? null : j);
  }

  isActive(j: any) {
    return this.selected === j;
  };
  // Favourite selection methods ends here


  // Price and comparision charts starts here 
  //navigate to price chart component
  public gopricechart(id: any) {
    this.router.navigate(['/priceChart', id]);
  }

  // navigate to comparison chart component 
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
      this.toastr.info('Comparison View', 'Welcome To', {
        timeOut: 2000
      });
    }

  }
  // Price and comparision charts ends here 

  // Sorting starts here
  //Sort by Name
  sortByName(arr: any) {
    this.flagID++;
    if (this.flagID % 2 == 1) {
      arr.sort(function (a: { name: { toLowerCase: () => void; }; }, b: { name: { toLowerCase: () => void; }; }) {
        let textA = a.name.toLowerCase();
        let textB = b.name.toLowerCase();
        return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
      })
    }
    else {
      arr.sort(function (a: { name: any; }, b: { name: any; }) {
        let textA = a.name;
        let textB = b.name;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
    }
  }

  // Sort by symbol
  sortBySymbol(arr: any) {
    this.flagID++;
    if (this.flagID % 2 == 1) {
      arr.sort(function (a: { symbol: { toLowerCase: () => void; }; }, b: { symbol: { toLowerCase: () => void; }; }) {
        let textA = a.symbol.toLowerCase();
        let textB = b.symbol.toLowerCase();
        return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
      })
    }
    else {
      arr.sort(function (a, b) {
        let textA = a.symbol;
        let textB = b.symbol;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
    }
  }

  //Sort by Price
  sortByPrice(arr: any) {
    this.flagID++;
    if (this.flagID % 2 == 1) {
      arr.sort(function (a, b) {
        let textA = a.quote.USD.price;
        let textB = b.quote.USD.price;
        return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
      })
    }
    else {
      arr.sort(function (a: { quote: { USD: { price: any; }; }; }, b: { quote: { USD: { price: any; }; }; }) {
        let textA = a.quote.USD.price;
        let textB = b.quote.USD.price;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
    }
  }

  //Sort by MarketCap 
  sortByMarketCap(arr: any) {
    this.flagID++;
    if (this.flagID % 2 == 1) {
      arr.sort(function (a: { quote: { USD: { market_cap: any; }; }; }, b: { quote: { USD: { market_cap: any; }; }; }) {
        let textA = a.quote.USD.market_cap;
        let textB = b.quote.USD.market_cap;
        return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
      })
    }
    else {
      arr.sort(function (a: { quote: { USD: { market_cap: any; }; }; }, b: { quote: { USD: { market_cap: any; }; }; }) {
        let textA = a.quote.USD.market_cap;
        let textB = b.quote.USD.market_cap;
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
