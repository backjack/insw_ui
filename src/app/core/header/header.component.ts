import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  fyear_val:string;

  @Input() deviceXs: boolean;

  fyYears =[ "2020","2021","2022"]

  constructor() { }

  ngOnInit(): void {
  }

  selectedFyear(option) {

    this.fyear_val = option;
  }

}
