import { Component, OnDestroy} from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Estimation } from 'src/app/interfaces/estimation';
import { AlertService } from 'src/app/services/alert.service';
import { EstimationService } from 'src/app/services/estimation.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { TimePipe } from 'src/app/pipes/time.pipe';
import { Activity } from 'src/app/interfaces/activity';
import { PopoverService } from 'src/app/services/popover.service';

@Component({
  selector: 'app-estimation-history',
  templateUrl: './estimation-history.page.html',
  styleUrls: ['./estimation-history.page.scss'],
})
export class EstimationHistoryPage implements OnDestroy{

  estimations: Estimation[] = [];
  timePipe = new TimePipe();
  private subscription: Subscription;

  constructor(private estimationService: EstimationService,
              private platform: Platform,
              private modalService: ModalService,
              private alertService: AlertService,
              private popoverService: PopoverService,
              private toastService: ToastService,
              private file: File,
              private fileOpener: FileOpener,
              private navigationService: NavigationService){}

  ionViewWillEnter(): void{
    this.subscription = this.estimationService.getEstimations$().subscribe((estimations: Estimation[]) =>{
      this.estimations = estimations;
    });
  }

  /* popover info*/
  async showPopover(event: any){
    const message = 'consulte informacion y/o genere reportes de sus estimaciones previas';
    this.popoverService.simpleMessage(message,event);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getMinutesObjective(workload: number, percent: number): number{
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

  generatePDF(estimation: Estimation){
    const docDef = {
      info:{title:'reporte_estimacion'},
      pageSize: 'A4',
      content:[
        { text: 'Reporte de estimacion calculadora-app\n', style: 'header' },
        { text: [
            { text: 'Institucion : ', style: 'subheader'},
            { text: estimation.institute + '\n' }
          ],
          style: 'description'
        },
        { columns: [
            { text: 'Periodo Lectivo : ', style: 'subheader' },
            { text: estimation.period },
            { text: 'Año Academico : ', style: 'subheader' },
            { text: estimation.year }
          ],
          style:'description'
        },
        { text: [
            { text: 'Materia : ', style: 'subheader' },
            { text: estimation.subject + '\n' }
          ],
          style: 'description'
        },
        { columns: [
            { text: 'Carga Horaria : ', style: 'subheader' },
            { text: estimation.workload + ' Hs' },
            { text: 'Virtualizacion (%) : ', style: 'subheader'},
            { text: estimation.percent}
          ],
          style: 'description'
        },
        { columns: [
            { text: 'Tiempo Objetivo : ', style: 'subheader'},
            { text: this.timePipe.transform(this.getMinutesObjective(estimation.workload,estimation.percent))},
            { text: 'Tiempo estimado : ', style: 'subheader' },
            { text: this.timePipe.transform(estimation.estimatedTime)}
          ],
          style: 'description'
        },
        // tabla
        { text: 'Listado de Actividades', fontSize:16,style: 'header' },
        { table:
          { headersRows:1,dontBreakRows:true, widths:['*',180,80,60,80], body: this.initTable(estimation.activities) }
        }
      ],
      footer: (currentPage, pageCount)=> ({
            columns: [
            { text: estimation.dateCreation,  italics: true, color: 'gray', margin:[30,10,0,0]},
            { text: 'Página ' + currentPage.toString() + ' de ' + pageCount,
              alignment: 'right',  italics: true, color: 'gray', margin:[0,10,30,0] }
            ]
        }),
      styles: {
        header: { fontSize: 18, bold: true, alignment:'center', margin:[0,30] },
        subheader:{ fontSize:14, bold:true },
        description:{ margin:[0,10] },
        tableHeader:{ fontSize:14, bold:true, alignment:'center', color:'white',fillColor:'blue' }
      }
    };

    const pdfObj = pdfMake.createPdf(docDef);
    if(this.platform.is('capacitor')){  //native
      this.openFile(pdfObj);
    }
    else{
      pdfObj.open();  // browser
    }
  }

  private openFile(pdfObj){
    pdfObj.getBlob((blob)=>{
      //const blob = new Blob([buffer],{type:'application/pdf'});  //generate blob
      // guardar el pdf en el directorio de la app
      this.file.writeFile(this.file.dataDirectory,'reporte_estimacion.pdf',blob,{replace:true}).then(fileEntry =>{
        this.fileOpener.open(this.file.dataDirectory + 'reporte_estimacion.pdf','application/pdf');
      });
    });
  }

  private initTable(activities: Activity[]){
    const body = [];
    const header = [];
    header.push({ text:'Nombre', style:'tableHeader'});
    header.push({ text:'Descripcion', style:'tableHeader'});
    header.push({ text:'Tiempo Estimado', style:'tableHeader'});
    header.push({ text:'Cantidad', style:'tableHeader'});
    header.push({ text:'Tiempo Total', style:'tableHeader'});
    body.push(header);
    activities.forEach((a)=>{
      const row = [];
      row.push(a.name);
      row.push(a.description);
      row.push({text:this.timePipe.transform(a.time_minutes), alignment:'center'});
      row.push({text:a.amount, alignment:'center'});
      row.push({text:this.timePipe.transform(a.time_minutes * a.amount), alignment:'center'});
      body.push(row);
    });
    return body;
  }

}
