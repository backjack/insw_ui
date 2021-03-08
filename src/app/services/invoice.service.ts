import { Injectable } from '@angular/core';
import { HttpClient,HttpParams} from '@angular/common/http'; 
import { InvoiceItem,Invoice } from '../models/models';
import  {Observable,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private fyearSource = new Subject<string>();
  fyearSource$ = this.fyearSource.asObservable();

  constructor(private http:HttpClient) { }

  
  onFyearChange(fyear:string) {

    this.fyearSource.next(fyear);
  }


  getInvoiceItems(fyear :string,invoiceId:string):Observable<InvoiceItem[]> {

    let opts =  new HttpParams() ;
    opts = opts.append('fyear', fyear);
    opts = opts.append('invoiceId', invoiceId);

    return this.http.get<InvoiceItem[]>("/insw/invoice/items",{params:opts});
  }


  getClients():Observable<any[]> {

    return  this.http.get<InvoiceItem[]>("/insw/clients");
  }


  saveInvoice(invoice:Invoice): Observable<any>{

    return this.http.post<any>("/insw/invoice/save",invoice);
  }
}
