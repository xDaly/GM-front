import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralService } from 'src/app/services/general.service';
import { NgbDropdownConfig, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,NgbDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  role = 2
  constructor(public GeneralService: GeneralService,config: NgbDropdownConfig) {
		// customize default values of dropdowns used by this component tree
		config.placement = 'bottom-start';
		config.autoClose = false;
	}
  openSidebar(){
    this.GeneralService.sideBarOpened.next(true)
  }
  disconnect(){
    localStorage.clear()
    window.location.reload()
  }
}
