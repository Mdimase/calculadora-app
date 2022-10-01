import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-header-back',
  templateUrl: './header-back.component.html',
  styleUrls: ['./header-back.component.scss'],
})
export class HeaderBackComponent{

  @Input() title: string;

  constructor() { }

}
