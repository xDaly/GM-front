import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralService } from 'src/app/services/general.service';
import { RouterModule } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule,NgbAccordionModule,NgbCollapseModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isOpened: any;


  public consultation  : boolean = false
  constructor(public GeneralService: GeneralService) {
    this.GeneralService.sideBarOpened.subscribe((isOpened:boolean)=>{
      this.isOpened = isOpened
    })
  }
  closeSidebar() {
    this.GeneralService.sideBarOpened.next(false);
  }
  disconnect(){
    localStorage.clear()
    window.location.reload()
  }
}
