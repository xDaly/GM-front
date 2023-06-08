import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isOpened: any;
  constructor(private GeneralService: GeneralService) {
    this.GeneralService.sideBarOpened.subscribe((isOpened:boolean)=>{
      this.isOpened = isOpened
    })
  }
  closeSidebar() {
    this.GeneralService.sideBarOpened.next(false);
  }
}
