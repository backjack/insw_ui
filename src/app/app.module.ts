import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CustomDatePipe} from './common/custom.datepipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { BodyComponent } from './core/body/body.component';
import { CreateInvoiceComponent } from './pages/create-invoice/create-invoice.component';
import { DialogBoxComponent } from './core/dialog-box/dialog-box.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {FlexLayoutModule}  from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import "@angular/common/locales/global/en-IN";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    CreateInvoiceComponent,
    DialogBoxComponent,
    DashboardComponent,
    CustomDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "en-IN" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
