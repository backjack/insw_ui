import { Injectable } from '@angular/core';
import { HttpClient,HttpParams} from '@angular/common/http'; 
import { InvoiceItem } from '../models/models';
import  {Observable,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http:HttpClient) { }



  getInvoiceItems(fyear :string,invoiceId:string):Observable<InvoiceItem[]> {

    let opts =  new HttpParams() ;
    opts = opts.append('fyear', fyear);
    opts = opts.append('invoiceId', invoiceId);

    return this.http.get<InvoiceItem[]>("/insw/invoice/items",{params:opts});
  }


  getClients():Observable<any[]> {

    return  this.http.get<InvoiceItem[]>("/insw/clients");
  }
}
