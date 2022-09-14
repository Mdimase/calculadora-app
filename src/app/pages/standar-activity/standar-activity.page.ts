import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { App } from '@capacitor/app';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/interfaces/activity';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AlertService } from 'src/app/services/alert.service';
import { PopoverService } from 'src/app/services/popover.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-standar-activity',
  templateUrl: './standar-activity.page.html',
  styleUrls: ['./standar-activity.page.scss'],
})
export class StandarActivityPage implements OnDestroy {

  searchValue = '';
  activities: Activity[];
  private suscription: Subscription;

  constructor(private popoverService: PopoverService,
              private alertService: AlertService,
              private activitiesService: ActivitiesService, private platform: Platform, private navigationService: NavigationService){
                this.platform.backButton.subscribeWithPriority(10,()=>{
                  this.navigationService.back();
                });
              }

  ionViewWillEnter(): void{
    this.suscription = this.activitiesService.getActivitiesStandar$().subscribe(activities =>{
      this.activities = activities;
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  /* popover info page*/
  async showPopover(event: any){
    const message = 'actividades academicas comumente utilizadas en plataformas de aprendizaje virtual';
    this.popoverService.simpleMessage(message,event);
  }

  /* alert -> informacion extra de una actividad*/
  async presentAlert(activity: Activity){
    const message = `tiempo estimado: ${activity.time} minuto/s`;
    this.alertService.itemDescription(activity.name,activity.description,message);
  }

  /*buscar en la lista -> search bar*/
  search(event){
    this.searchValue = event.detail.value;
  }

}
