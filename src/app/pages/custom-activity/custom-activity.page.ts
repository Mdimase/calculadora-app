import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/interfaces/activity';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AlertService } from 'src/app/services/alert.service';
import { ModalService } from 'src/app/services/modal.service';
import { PopoverService } from 'src/app/services/popover.service';

@Component({
  selector: 'app-custom-activity',
  templateUrl: './custom-activity.page.html',
  styleUrls: ['./custom-activity.page.scss'],
})
export class CustomActivityPage implements OnDestroy {

  searchValue = '';
  activities: Activity[] = [];
  private suscription: Subscription;

  constructor(private popoverService: PopoverService,
              private alertService: AlertService,
              private activitiesService: ActivitiesService,
              private modalService: ModalService) { }

  ionViewWillEnter(): void{
    this.suscription = this.activitiesService.getActivitiesCustom$().subscribe((activities: Activity[]) =>{
      this.activities = activities;
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  /* popover info*/
  async showPopover(event: any){
    const message = 'actividades academicas creadas por el usuario';
    this.popoverService.simpleMessage(message,event);
  }

  /* alert -> informacion extra de una actividad*/
  async presentAlert(activity: Activity){
    this.alertService.itemDescription(activity);
  }

  /*buscar en la lista -> search bar*/
  search(event): void{
    this.searchValue = event.detail.value;
  }

  /* primero renderiza el popover de acciones sobre una actividad */
  /* luego, dependiendo de lo que el usuario selecciona, realiza dicha accion */
  async showEditOptions(event, activity: Activity){
    const { data } = await this.popoverService.editOptions(event, activity);
    if(data === 'Eliminar'){
      if( await this.alertService.confirm(activity, 'Eliminar') === 'confirm'){
        this.activitiesService.deleteActivity(activity);
      }
    }
    if(data === 'Editar'){
      const modifiedActivity: Activity = await this.modalService.editActivity(activity);
      if(modifiedActivity){
        this.activitiesService.editActivity(activity.id, modifiedActivity);
      }
    }
  }

  /* primero renderiza el modal de agregar actividad*/
  /* luego, si el usuario agrego una actividad, la persiste */
  async showAddModal(){
    const activity: Activity = await this.modalService.addActivity();
    if(activity){
      this.activitiesService.addActivity(activity);
    }
  }

}
