import { Component, OnDestroy} from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Estimation } from 'src/app/interfaces/estimation';
import { AlertService } from 'src/app/services/alert.service';
import { EstimationService } from 'src/app/services/estimation.service';
import { ModalService } from 'src/app/services/modal.service';
import { ToastService } from 'src/app/services/toast.service';
import { TimePipe } from 'src/app/pipes/time.pipe';
import { Activity } from 'src/app/interfaces/activity';
import { PopoverService } from 'src/app/services/popover.service';
import { LoadingService } from 'src/app/services/loading.service';

// dependencia para generar el pdf
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// dependencia para gestion de archivos locales en native
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

@Component({
  selector: 'app-estimation-history',
  templateUrl: './estimation-history.page.html',
  styleUrls: ['./estimation-history.page.scss'],
})
export class EstimationHistoryPage implements OnDestroy{

  estimations: Estimation[] = [];
  timePipe = new TimePipe();
  private subscription: Subscription;

  constructor(
    private estimationService: EstimationService,
    private platform: Platform,
    private modalService: ModalService,
    private alertService: AlertService,
    private popoverService: PopoverService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private file: File,
    private fileOpener: FileOpener,
  ){}

  async ionViewWillEnter(): Promise<void>{
    await this.loadingService.showLoading();
    this.subscription = this.estimationService.getEstimations$().subscribe({
      next: (estimations: Estimation[]) =>{
        this.loadingService.dismiss();
        this.estimations = estimations;
      }
    });
    this.estimationService.getEstimations();
  }

  /* popover info*/
  async showPopover(event: any){
    const message = 'consulte información y/o genere reportes de sus estimaciones previas';
    this.popoverService.simpleMessage(message,event);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //carga horaria a virtualizar en minutos
  getMinutesObjective(workloadHs: number, percent: number): number{
    return this.estimationService.valueOfPercent(this.estimationService.toMinutes(workloadHs),percent);  
  }

  // mostar actividades de una estimacion
  showActivities(idEstimation: number){
    const activities = this.estimationService.getActivities(idEstimation);
    this.modalService.showActivities(activities);
  }

  // eliminar estimacion
  async remove(estimation: Estimation){
    const message = '¿ Deseas eliminar de forma permanente la estimación ?';
    if( await this.alertService.confirm(message,'Eliminar','alert-button-delete') === 'confirm'){
      this.loadingService.showLoading();
      this.estimationService.deleteEstimation(estimation);
      this.toastService.showMessage('Estimación eliminada correctamente');
    }
  }

  // generar pdf
  generatePDF(estimation: Estimation){
    const docDef = {
      info:{title:'reporte_estimación'},
      pageSize: 'A4',
      content:[
        { text: 'Reporte de Estimación calculadora-app\n', style: 'header' },
        { text: [
            { text: 'Institución : ', style: 'subheader'},
            { text: estimation.institute + '\n' }
          ],
          style: 'description'
        },
        { columns: [
            { text: 'Período Lectivo : ', style: 'subheader' },
            { text: estimation.period },
            { text: 'Año Académico : ', style: 'subheader' },
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
            { text: estimation.workloadHs + ' Hs' },
            { text: 'Virtualización (%) : ', style: 'subheader'},
            { text: estimation.virtualizationPercent}
          ],
          style: 'description'
        },
        { columns: [
            { text: 'Tiempo Objetivo : ', style: 'subheader'},
            { text: this.timePipe.transform(this.getMinutesObjective(estimation.workloadHs,estimation.virtualizationPercent))},
            { text: 'Tiempo Estimado : ', style: 'subheader' },
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
      footer: (currentPage: number, pageCount: number)=> ({
            columns: [
            { text: estimation.creation,  italics: true, color: 'gray', margin:[30,10,0,0]},
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

  // guarda y abre el archivo pdf generado
  private openFile(pdfObj){
    pdfObj.getBlob((blob)=>{
      // guardar el pdf en el directorio de la app
      this.file.writeFile(this.file.dataDirectory,'reporte_estimacion.pdf',blob,{replace:true}).then(fileEntry =>{
        this.fileOpener.open(this.file.dataDirectory + 'reporte_estimacion.pdf','application/pdf');
      });
    });
  }

  /* tabla con actividades en formato para la generacion del pdf */
  private initTable(activities: Activity[]){
    const body = [];
    const header = [];
    header.push({ text:'Nombre', style:'tableHeader'});
    header.push({ text:'Descripción', style:'tableHeader'});
    header.push({ text:'Tiempo Estimado', style:'tableHeader'});
    header.push({ text:'Cantidad', style:'tableHeader'});
    header.push({ text:'Tiempo Total', style:'tableHeader'});
    body.push(header);
    activities.forEach((a)=>{
      const row = [];
      row.push(a.name);
      row.push(a.description);
      row.push({text:this.timePipe.transform(a.timeMinutes), alignment:'center'});
      row.push({text:a.amount, alignment:'center'});
      row.push({text:this.timePipe.transform(a.timeMinutes * a.amount), alignment:'center'});
      body.push(row);
    });
    return body;
  }

}
