import { Component, OnDestroy, OnInit } from '@angular/core';
import {MediaObserver,MediaChange} from '@angular/flex-layout';
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {



  constructor(public mediaObserver:MediaObserver) {
    
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
     
    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange) =>{

         this.xsDevice = result.mqAlias === 'xs' ?true:false;
    });


  }
  title = 'insw-ui';
  mediaSub: Subscription;
  xsDevice:boolean
}
