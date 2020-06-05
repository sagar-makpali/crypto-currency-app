import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModuleModule } from './app-routing-module/app-routing-module.module';
import { AppComponent } from './app.component';
import { ComparisonComponent } from './comparison/comparison.component';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { PriceChartComponent } from './price-chart/price-chart.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { ChartModule } from 'angular-highcharts';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import 'hammerjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    ComparisonComponent,
    CurrencyListComponent,
    FavouritesComponent,
    PriceChartComponent,
    
    SearchComponent
  ],
  imports: [
   
    CommonModule,
    NgxPaginationModule,
    ChartModule,
    AppRoutingModuleModule,
    HttpClientModule,
    ChartsModule,
    BrowserAnimationsModule, 
    BrowserModule,
    FontAwesomeModule,
    IonRangeSliderModule,
    FormsModule,
    ToastrModule.forRoot({
      
      positionClass: 'toast-center-center',
      preventDuplicates: true,
      
      

    })
  ],
  providers: [Cookie],
  bootstrap: [AppComponent]
})
export class AppModule { }
