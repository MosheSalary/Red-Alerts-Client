import {Component, Input} from '@angular/core';

@Component({
  selector: 'custom-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {

  @Input() header: string = 'פרויקט צבע אדום 🚀';

}
