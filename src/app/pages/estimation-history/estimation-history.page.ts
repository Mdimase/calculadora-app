import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-estimation-history',
  templateUrl: './estimation-history.page.html',
  styleUrls: ['./estimation-history.page.scss'],
})
export class EstimationHistoryPage implements OnInit {

  constructor(private platform: Platform, private navigationService: NavigationService){
    this.platform.backButton.subscribeWithPriority(10,()=>{
      this.navigationService.back();
    });
  }

  ngOnInit() {
  }

}
