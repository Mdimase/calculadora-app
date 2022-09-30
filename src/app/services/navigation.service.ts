import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { App } from '@capacitor/app';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private history: string[] = [];

  constructor(private router: Router, private location: Location){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  clear(){
    this.history = [];
  }

  back(): void {
    this.history.pop();
    if(this.router.url === '/login'){
      App.exitApp();
    }
    if (this.history.length > 0) {
      this.location.back();
    }
    else{
      this.router.navigateByUrl('/');
    }
  }

}
