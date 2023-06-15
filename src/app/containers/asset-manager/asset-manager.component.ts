import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from 'src/app/services/general.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-asset-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './asset-manager.component.html',
  styleUrls: ['./asset-manager.component.scss'],
})
export class AssetManagerComponent {
  closeResult = '';
  assetForm = new FormGroup({
    SN: new FormControl(''),
    model: new FormControl(''),
    buy_date: new FormControl(''),
    structure: new FormControl('Structure'),
    localisation: new FormControl('Localisation'),
    etat: new FormControl(''),
    observation: new FormControl(''),
  });
  constructor(
    private modalService: NgbModal,
    public _general: GeneralService
  ) {}

  open(content: any) {
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
