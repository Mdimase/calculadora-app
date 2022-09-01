import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Estimation } from 'src/app/interfaces/estimation';
import { EstimationService } from 'src/app/services/estimation.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-estimation-history',
  templateUrl: './estimation-history.page.html',
  styleUrls: ['./estimation-history.page.scss'],
})
export class EstimationHistoryPage implements OnDestroy{

  estimations: Estimation[] = [];
  private suscription: Subscription;

  constructor(private estimationService: EstimationService, private platform: Platform, private navigationService: NavigationService){
    this.platform.backButton.subscribeWithPriority(10,()=>{
      this.navigationService.back();
    });
  }

  ionViewWillEnter(): void{
    this.suscription = this.estimationService.getEstimations$().subscribe((estimations: Estimation[]) =>{
      this.estimations = estimations;
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

}
