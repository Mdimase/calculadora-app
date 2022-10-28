import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/interfaces/activity';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AlertService } from 'src/app/services/alert.service';
import { PopoverService } from 'src/app/services/popover.service';
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

  constructor(
    private popoverService: PopoverService,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private activitiesService: ActivitiesService
  ){}

  async ionViewWillEnter(): Promise<void>{
    await this.loadingService.showLoading();
    this.subscription = this.activitiesService.getStandard$().subscribe({
      next: (activities: Activity[])=>{
        this.loadingService.dismiss();
        this.activities = activities;
        this.activitiesService.sortAlphabetically(this.activities);
        this.alphabeticalMap = this.activitiesService.initAlphabeticalMap(this.activities);
      }
    });
    this.activitiesService.getActivitiesStandard();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /* popover info page*/
  async showPopover(event: any){
    const message = 'Actividades académicas comúnmente utilizadas en plataformas de aprendizaje virtual';
    this.popoverService.simpleMessage(message,event);
  }

  /* alert -> informacion extra de una actividad*/
  async presentAlert(activity: Activity){
    const message = `Tiempo estimado: ${this.timePipe.transform(activity.timeMinutes)}`;
    this.alertService.itemDescription(activity.name,activity.description,message);
  }

  /*buscar en la lista -> search bar*/
  search(event){
    this.searchValue = event.detail.value;
  }

}
