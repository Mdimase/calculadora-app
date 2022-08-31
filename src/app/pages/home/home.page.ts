import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router, private platform: Platform, private navigationService: NavigationService){
    this.platform.backButton.subscribeWithPriority(10,()=>{
      //this.router.navigate(['login']);
      this.navigationService.back();
    });
  }

  ngOnInit() {
  }

}
