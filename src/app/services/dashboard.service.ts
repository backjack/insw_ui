import { Injectable } from '@angular/core';
import { HttpClient,HttpParams} from '@angular/common/http'; 
import { InvoiceSummary } from '../models/models';
import  {Observable,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private messageSource = new Subject();
  public messageSource$ = this.messageSource.asObservable();

  constructor(private http:HttpClient) { }


  triggerInvoiceSummary(fyear:string) {
    this.messageSource.next(fyear);
  }

  deleteInvoice(fyear:string,invoiceId:number):Observable<string> {

    let opts =  new HttpParams() ;
    opts = opts.append('fyear', ""+fyear);
    opts = opts.append('invoiceId', ""+invoiceId);
    return this.http.get<string>("/insw/invoice/delete", {params:opts});
  }


  getInvoiceSummary(fyyear:string):Observable<InvoiceSummary[]> {
    
    let opts =  new HttpParams() ;
    opts = opts.append('fyear', fyyear);
    return this.http.get<InvoiceSummary[]>("/insw/invoice/summary", {params:opts});
  }


  getFyear():Observable<Number> {

    return this.http.get<Number>("/insw/fy/current");
  }


}
