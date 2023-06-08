import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  role = 2
  constructor(private GeneralService: GeneralService){}
  openSidebar(){
    this.GeneralService.sideBarOpened.next(true)
  }
}
