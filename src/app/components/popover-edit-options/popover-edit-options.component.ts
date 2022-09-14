import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-edit-options',
  templateUrl: './popover-edit-options.component.html',
  styleUrls: ['./popover-edit-options.component.scss'],
})
export class PopoverEditOptionsComponent implements OnInit {

  optionsList = [
    { name: 'Editar', icon:'create-outline',color:'primary' },
    { name: 'Eliminar', icon: 'trash-outline',color:'danger' }
  ];

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  selectedOption(optionName: string){
    this.popoverController.dismiss(optionName);
  }

}
