import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  fyear_val:string;

  fyears =[ {id:2020,name:"2019-20"},{id:2021,name:"2020-21"}]

  constructor() { }

  ngOnInit(): void {
  }

}
