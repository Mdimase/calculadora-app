import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Estimation } from 'src/app/interfaces/estimation';
import { AlertService } from 'src/app/services/alert.service';
import { EstimationService } from 'src/app/services/estimation.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-estimation-history',
  templateUrl: './estimation-history.page.html',
  styleUrls: ['./estimation-history.page.scss'],
})
export class EstimationHistoryPage implements OnDestroy{

  estimations: Estimation[] = [];
  private suscription: Subscription;

  constructor(private estimationService: EstimationService,
              private platform: Platform,
              private modalService: ModalService,
              private alertService: AlertService,
              private toastService: ToastService,
              private navigationService: NavigationService){
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

  getMinutesObjetive(workload: number, percent: number): number{
    return this.estimationService.valueOfPercent(this.estimationService.toMinutes(workload),percent);  //carga horaria a virtualizar (min)
  }

  showActivities(idEstimation: number){
    const activities = this.estimationService.getActivities(idEstimation);
    this.modalService.showActivities(activities);
  }

  async remove(estimation: Estimation){
    const message = '¿ Deseas eliminar de forma permanente la estimacion ?';
    if( await this.alertService.confirm(message,'Eliminar','alert-button-delete') === 'confirm'){
      this.estimationService.deleteEstimation(estimation);
      this.toastService.showMessage('Estimacion eliminada correctamente');
    }
  }

}
