import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-asset-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asset-manager.component.html',
  styleUrls: ['./asset-manager.component.scss']
})
export class AssetManagerComponent {
  closeResult = '';
  constructor(private modalService: NgbModal,public _general:GeneralService) {}

  open(content:any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}


// id	
// SN	
// model	
// buy_date	
// current_owner	
// structure	
// localisation	
// etat	
// observation	
// createdAt	datetime	