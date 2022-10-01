import { Component, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/interfaces/activity';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AlertService } from 'src/app/services/alert.service';
import { PopoverService } from 'src/app/services/popover.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { TimePipe } from 'src/app/pipes/time.pipe';

@Component({
  selector: 'app-standar-activity',
  templateUrl: './standar-activity.page.html',
  styleUrls: ['./standar-activity.page.scss'],
})
export class StandarActivityPage implements OnDestroy {

  searchValue = '';
  activities: Activity[];
  alphabeticalMap = [];
  timePipe = new TimePipe();
  private suscription: Subscription;

  constructor(private popoverService: PopoverService,
              private alertService: AlertService,
              private activitiesService: ActivitiesService, private platform: Platform, private navigationService: NavigationService){}

  ionViewWillEnter(): void{
    this.suscription = this.activitiesService.getActivitiesStandar$().subscribe(activities =>{
      this.activities = activities;
      // ordenar alfabeticamente por nombre
      this.activitiesService.sortAlphabetically(this.activities);
      this.initAlphabeticalMap();
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
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
    const message = 'actividades academicas comumente utilizadas en plataformas de aprendizaje virtual';
    this.popoverService.simpleMessage(message,event);
  }

  /* alert -> informacion extra de una actividad*/
  async presentAlert(activity: Activity){
    const message = `tiempo estimado: ${this.timePipe.transform(activity.time)}`;
    this.alertService.itemDescription(activity.name,activity.description,message);
  }

  /*buscar en la lista -> search bar*/
  search(event){
    this.searchValue = event.detail.value;
  }

}
