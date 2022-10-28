import { Component, OnDestroy} from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Activity} from 'src/app/interfaces/activity';
import { TimePipe } from 'src/app/pipes/time.pipe';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
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
  private subscription: Subscription;
  private subscriptionBackButton: Subscription;

  constructor(
    private popoverService: PopoverService,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private activitiesService: ActivitiesService,
    private toastService: ToastService,
    private platform: Platform,
    private navigationService: NavigationService
  ){}

  async ionViewWillEnter(): Promise<void>{
    /* hardware back button android*/
    this.subscriptionBackButton =  this.platform.backButton.subscribeWithPriority(10,async ()=>{
      await this.alertService.hideAlert().then((res)=>{
        if(!res){
          this.navigationService.back();
        }
      });
    });
    await this.loadingService.showLoading();
    this.subscription = this.activitiesService.getCustom$().subscribe({
      next:(activities: Activity[]) =>{
        this.loadingService.dismiss();
        this.activities = activities;
        this.activitiesService.sortAlphabetically(this.activities);
        this.alphabeticalMap = this.activitiesService.initAlphabeticalMap(this.activities);
      }
    });
    this.activitiesService.getActivitiesCustom();
  }

  ngOnDestroy(): void {
    this.subscriptionBackButton.unsubscribe();
    this.subscription.unsubscribe();
  }

  /* popover info*/
  async showPopover(event: any){
    const message = 'actividades académicas creadas por el usuario';
    this.popoverService.simpleMessage(message,event);
  }

  /* alert -> informacion extra de una actividad*/
  async presentAlert(activity: Activity){
    const message = `Tiempo estimado: ${this.timePipe.transform(activity.timeMinutes)}`;
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
        await this.loadingService.showLoading();
        this.activitiesService.deleteActivity(activity);
        this.toastService.showMessage('Actividad eliminada correctamente');
      }
    }
    if(data === 'Editar'){
      const modifiedActivity: Activity = await this.alertService.editForm(activity);
      if(modifiedActivity && !this.activitiesService.equal(activity,modifiedActivity)){
        await this.loadingService.showLoading();
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
        this.loadingService.showLoading();
        this.activitiesService.addActivity(res);
        this.toastService.showMessage('Actividad creada correctamente');
      }
    });
  }
  
}
