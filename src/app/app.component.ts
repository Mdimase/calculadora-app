import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { AlertService } from './services/alert.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{


  //@ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;

  constructor(private platform: Platform, private location: Location){
  }

  ngOnInit(): void {
  }

  /*
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit(){
    this.platform.backButton.subscribeWithPriority(10,()=>{
      if(!this.routerOutlet.canGoBack()){
        App.exitApp();
      }
      else{
        this.location.back();
      }
    });
  }*/

}
