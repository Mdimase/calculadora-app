import { Component, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/interfaces/activity';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AlertService } from 'src/app/services/alert.service';
import { PopoverService } from 'src/app/services/popover.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { TimePipe } from 'src/app/pipes/time.pipe';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-standard-activity',
  templateUrl: './standard-activity.page.html',
  styleUrls: ['./standard-activity.page.scss'],
})
export class StandardActivityPage implements OnDestroy {

  searchValue = '';
  activities: Activity[];
  alphabeticalMap = [];
  timePipe = new TimePipe();
  private subscription: Subscription;

  constructor(private popoverService: PopoverService,
              private alertService: AlertService,
              private loadingService: LoadingService,
              private activitiesService: ActivitiesService, private platform: Platform, private navigationService: NavigationService){}

  async ionViewWillEnter(): Promise<void>{
    await this.loadingService.showLoading();
    this.subscription = this.activitiesService.getStandard$().subscribe({
      next: (activities: Activity[])=>{
        this.loadingService.dismiss();
        this.activities = activities;
        // ordenar alfabeticamente por nombre
        this.activitiesService.sortAlphabetically(this.activities);
        this.initAlphabeticalMap();
      }
    });
    this.activitiesService.getActivitiesStandard();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // map de letra del alfabeto + un arreglo con todas las actividades que comienzan con esa letra
  // [{letterA, [{activity1, activity2, etc}]}, {letterB, [{activity1, activity2, etc}]} ]

  initAlphabeticalMap(): void{
    let last: string = null;
    this.activities.forEach((a)=>{
      const activity = a;
      if(!last || last !== activity.name[0]){
        last = activity.name[0];
        this.alphabeticalMap.push({letter: last, activities:[]});
      }
      this.alphabeticalMap[this.alphabeticalMap.length - 1].activities.push(activity);
    });
  }

  /* popover info page*/
  async showPopover(event: any){
    const message = 'actividades académicas comúnmente utilizadas en plataformas de aprendizaje virtual';
    this.popoverService.simpleMessage(message,event);
  }

  /* alert -> informacion extra de una actividad*/
  async presentAlert(activity: Activity){
    const message = `tiempo estimado: ${this.timePipe.transform(activity.time_minutes)}`;
    this.alertService.itemDescription(activity.name,activity.description,message);
  }

  /*buscar en la lista -> search bar*/
  search(event){
    this.searchValue = event.detail.value;
  }

}
