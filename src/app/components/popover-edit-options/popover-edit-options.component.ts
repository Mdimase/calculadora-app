import { Component} from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-edit-options',
  templateUrl: './popover-edit-options.component.html',
  styleUrls: ['./popover-edit-options.component.scss'],
})
export class PopoverEditOptionsComponent{

  optionsList = [
    { name: 'Editar', icon:'create-outline',color:'primary' },
    { name: 'Eliminar', icon: 'trash-outline',color:'danger' }
  ];

  constructor(private popoverController: PopoverController) { }

  selectedOption(optionName: string){
    this.popoverController.dismiss(optionName);
  }

}
