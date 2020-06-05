import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crypto-currency';
  public searchItem;
  constructor(public router: Router, private toastr: ToastrService) {}

  public searchFunction()
  {
    if(this.searchItem!=null && this.searchItem!='' && this.searchItem!=' ' && this.searchItem!='*  *')
    {
      
      console.log("search item1:"+ this.searchItem);
    this.router.navigate(['/search'],{queryParams: {searchItem: this.searchItem}})
    //window.location.reload()
    }
    else
    {
      this.toastr.warning("Kindly input currency to search")
    }
  }
}
