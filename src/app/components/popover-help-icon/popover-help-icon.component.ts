import { Component} from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-help-icon',
  templateUrl: './popover-help-icon.component.html',
  styleUrls: ['./popover-help-icon.component.scss'],
})
export class PopoverHelpIconComponent{

  message: string;

  constructor(private popoverController: PopoverController) { }

}
