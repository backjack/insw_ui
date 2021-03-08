import { Component, Input, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import {InvoiceService} from '../../services/invoice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  fyear_val:string;

  @Input() deviceXs: boolean;

  fyYears =[ "2020","2021","2022"]

  constructor(private dashboardService:DashboardService,private invoiceService:InvoiceService) { }

  ngOnInit(): void {

    this.dashboardService.getFyear().subscribe(x =>{

       this.fyear_val = x+"";
       this.invoiceService.onFyearChange(this.fyear_val);
       this.dashboardService.triggerInvoiceSummary(this.fyear_val);
    })
  }

  selectedFyear(option) {
    this.fyear_val = option;
    this.dashboardService.triggerInvoiceSummary(this.fyear_val);
    this.invoiceService.onFyearChange(this.fyear_val);
  }

}
