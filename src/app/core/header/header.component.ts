import { Component, Input, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  fyear_val:string;

  @Input() deviceXs: boolean;

  fyYears =[ "2020","2021","2022"]

  constructor(private dashboardService:DashboardService) { }

  ngOnInit(): void {

    this.dashboardService.getFyear().subscribe(x =>{

       this.fyear_val = x+"";
       this.dashboardService.triggerInvoiceSummary(this.fyear_val);
    })
  }

  selectedFyear(option) {
    this.fyear_val = option;
    this.dashboardService.triggerInvoiceSummary(this.fyear_val);
  }

}
