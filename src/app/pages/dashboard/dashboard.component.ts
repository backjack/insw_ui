import { Component, OnInit } from '@angular/core';
import {InvoiceSummary,InvoiceItem} from '../../models/models';
import { MatDialog } from '@angular/material/dialog';
import { CreateInvoiceComponent } from '../create-invoice/create-invoice.component';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  fyear:string;
  displayedColumns: string[] = ['invoiceId', 'invoiceDate','clientName','totalAmount','action'];
  loaded_data : InvoiceSummary[] = [];
  dataSource: InvoiceSummary[] = [];
  constructor(public dialog: MatDialog, public dashBoardService: DashboardService) { 

  }

  ngOnInit(): void {
    
    // let dateTemp = new InvoiceSummary();
    // dateTemp.fyear =2020;
    // dateTemp.invoiceDate= new Date();
    // dateTemp.invoiceId = "120";
    // dateTemp.clientId = "1";
    // dateTemp.clientName ="AbC0";
    // dateTemp.totalAmount = 788999;

    this.dashBoardService.messageSource$.subscribe((val:string)=>{ 

         this.fyear = val;
         this.dashBoardService.getInvoiceSummary(val).subscribe((data:InvoiceSummary[])=>{
            
          this.loaded_data  = data;
          this.dataSource = data;


         });
    });


    // this.loaded_data = [dateTemp,dateTemp,dateTemp ];
    // this.dataSource = this.loaded_data;
  }

  refresh() {

      this.dashBoardService.getInvoiceSummary(this.fyear).subscribe((data:InvoiceSummary[])=>{
            
          this.loaded_data  = data;
          this.dataSource = data;


         });
  }


  openDialog(command:string,row) {
    

    const dialogRef = this.dialog.open(CreateInvoiceComponent, {
      width: '100%',
      height: '700px',
      data: {row:row, update:true}
    });

    
  }

}
