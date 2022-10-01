import { Component, OnDestroy} from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Activity, Type } from 'src/app/interfaces/activity';
import { TimePipe } from 'src/app/pipes/time.pipe';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AlertService } from 'src/app/services/alert.service';
import { NavigationService } from 'src/app/services/navigation.service';
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
  alphabeticalMap = [];
  timePipe = new TimePipe();
  private suscription: Subscription;
  private suscriptionBackButton: Subscription;

  constructor(private popoverService: PopoverService,
              private alertService: AlertService,
              private activitiesService: ActivitiesService,
              private toastService: ToastService, private platform: Platform, private navigationService: NavigationService){
              }

  ionViewWillEnter(): void{
    this.suscriptionBackButton =  this.platform.backButton.subscribeWithPriority(10,async ()=>{
      await this.alertService.hideAlert().then((res)=>{
        if(!res){
          this.navigationService.back();
        }
      });
    });
    this.suscription = this.activitiesService.getActivitiesCustom$().subscribe((activities: Activity[]) =>{
      this.activities = activities;
      // ordenar alfabeticamente por nombre
      this.activitiesService.sortAlphabetically(this.activities);
      this.initAlphabeticalMap();
    });
  }

  ngOnDestroy(): void {
    this.suscriptionBackButton.unsubscribe();
    this.suscription.unsubscribe();
  }

  initAlphabeticalMap(): void{
    this.alphabeticalMap = [];
    let last: string = null;
    this.activities.forEach((a)=>{
      const activity = a;
      if(!last || last.toLowerCase() !== activity.name[0].toLowerCase()){
        last = activity.name[0];
        this.alphabeticalMap.push({letter: last, activities:[]});
      }
      this.alphabeticalMap[this.alphabeticalMap.length - 1].activities.push(activity);
    });
  }

  /* popover info*/
  async showPopover(event: any){
    const message = 'actividades academicas creadas por el usuario';
    this.popoverService.simpleMessage(message,event);
  }

  /* alert -> informacion extra de una actividad*/
  async presentAlert(activity: Activity){
    const message = `tiempo estimado: ${this.timePipe.transform(activity.time)}`;
    this.alertService.itemDescription(activity.name,activity.description,message);
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
      if(modifiedActivity && !this.activitiesService.equal(activity,modifiedActivity)){
        this.activitiesService.editActivity(activity.id, modifiedActivity);
        this.toastService.showMessage('Actividad editada correctamente');
      }
    }
  }

  /* primero renderiza el alert input de agregar actividad */
  /* luego, si el usuario agrego una actividad, la persiste */
  async showAddForm(){
    await this.alertService.addForm().then((res: Activity)=>{
      if(res){
        this.activitiesService.addActivity(res);
        this.toastService.showMessage('Actividad creada correctamente');
      }
    });
  }

}
