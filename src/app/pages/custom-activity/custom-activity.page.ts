import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/interfaces/activity';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AlertService } from 'src/app/services/alert.service';
import { PopoverService } from 'src/app/services/popover.service';
import { ToastService } from 'src/app/services/toast.service';

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
              private toastService: ToastService) { }

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
      const message = '¿ Deseas eliminar de forma permanente ' + activity.name + ' ?';
      if( await this.alertService.confirm(message,'Eliminar','alert-button-delete') === 'confirm'){
        this.activitiesService.deleteActivity(activity);
        this.toastService.showMessage('Actividad eliminada correctamente');
      }
    }
    if(data === 'Editar'){
      const modifiedActivity: Activity = await this.alertService.editForm(activity);
      if(!this.activitiesService.equal(activity,modifiedActivity)){
        this.activitiesService.editActivity(activity.id, modifiedActivity);
        this.toastService.showMessage('Actividad editada correctamente');
      }
    }
  }

  /* primero renderiza el alert input de agregar actividad */
  /* luego, si el usuario agrego una actividad, la persiste */
  async showAddForm(){
    const activity: Activity = await this.alertService.addForm();
    if(activity.name !== ''){
      this.activitiesService.addActivity(activity);
      this.toastService.showMessage('Actividad creada correctamente');
    }
  }

}
