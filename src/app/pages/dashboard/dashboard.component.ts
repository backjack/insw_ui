import { Component, OnInit } from '@angular/core';
import {InvoiceSummary,InvoiceItem} from '../../models/models';
import { MatDialog } from '@angular/material/dialog';
import { CreateInvoiceComponent } from '../create-invoice/create-invoice.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  displayedColumns: string[] = ['invoiceId', 'invoiceDate','clientName','totalAmount','action'];
  loaded_data : InvoiceSummary[] = [];
  dataSource: InvoiceSummary[] = [];
  constructor(public dialog: MatDialog) { 

  }

  ngOnInit(): void {
    
    let dateTemp = new InvoiceSummary();
    dateTemp.fyear =2020;
    dateTemp.invoiceDate= new Date();
    dateTemp.invoiceId = "120";
    dateTemp.clientId = "1";
    dateTemp.clientName ="AbC0";
    dateTemp.totalAmount = 788999;


    this.loaded_data = [dateTemp,dateTemp,dateTemp ];
    this.dataSource = this.loaded_data;
  }

  refresh() {

  }


  openDialog(command:string,row) {
    

    const dialogRef = this.dialog.open(CreateInvoiceComponent, {
      width: '100%',
      height: '700px',
      data: {row:row, update:true}
    });

    
  }

}
