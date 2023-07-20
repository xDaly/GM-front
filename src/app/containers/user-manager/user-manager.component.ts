import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from 'src/app/services/general.service';
import { EmployeService } from 'src/app/services/employe.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [
    CommonModule,
    NgbDatepickerModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss'],
})
export class UserManagerComponent {
  closeResult = '';
  currentDate: Date;
  filters = {
    page: 1,
    size: 10,
    nom: '',
    cin: '',
    structure: '',
    etage: '',
    region: '',
    localisation: '',
    archived: false,
  };
  totalPages: number;
  count: number;
  employes: any[] = [];
  employeForm = new FormGroup({
    nom: new FormControl(''),
    cin: new FormControl(''),
    structure: new FormControl(''),
    etage: new FormControl(''),
    bureau: new FormControl(''),
    poste: new FormControl(''),
    region: new FormControl(''),
    localisation: new FormControl(''),
  });
  public selectedEmploye: any;
  public employeAssets: any;
  constructor(
    private modalService: NgbModal,
    public _general: GeneralService,
    private _employe: EmployeService
  ) {
    this.currentDate = new Date();
    this.getEmployes();
  }

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

  openFullScreen(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', fullscreen: true })
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
  createEmploye() {
    this._employe.createEmploye(this.employeForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.employes.push(res.data);
      },
      error: (err: any) => {
        this._general.showError('erreur', err.error.message);
      },
      complete: () => {},
    });
  }
  getEmployes() {
    this._employe.getEmployes(this.filters).subscribe({
      next: (res: any) => {
        console.log(res);
        this.employes = res.data.rows;
        this.count = res.data.count;
      },
      error: (err: any) => {
        this._general.showError('erreur', err.error.message);
      },
      complete: () => {},
    });
  }

  setUpdateForm() {

    this.employeForm = new FormGroup({
      nom: new FormControl(this.selectedEmploye.nom),
      cin: new FormControl(this.selectedEmploye.cin),
      structure: new FormControl(this.selectedEmploye.structure),
      etage: new FormControl(this.selectedEmploye.etage),
      bureau: new FormControl(this.selectedEmploye.bureau),
      poste: new FormControl(this.selectedEmploye.poste),
      region: new FormControl(this.selectedEmploye.region),
      localisation: new FormControl(this.selectedEmploye.localisation),
    });
  }
  updateEmploye() {
    this._employe
      .updateEmploye(this.employeForm.value, this.selectedEmploye.id)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          window.location.reload();
        },
        error: (err: any) => {
          console.log(err);
          // this._general.showError('erreur', err.error.message);
        },
        complete: () => {},
      });
  }
  deleteEmploye(modal: any) {
    this._employe
      .updateEmploye({ archived: true }, this.selectedEmploye.id)
      .subscribe({
        next: (res: any) => {
          this.employes = this.employes.filter(
            (e) => e.id != this.selectedEmploye.id
          );
          modal.dismiss('Cross click');
        },
        error: (err: any) => {
          console.log(err);
          // this._general.showError('erreur', err.error.message);
        },
        complete: () => {},
      });
  }

  getEmployeAssets() {
    this._employe.getEmployeAssets(this.selectedEmploye.id).subscribe({
      next: (res: any) => {
        this.employeAssets = res.data;
      },
      error: (err: any) => {
        console.log(err);
        // this._general.showError('erreur', err.error.message);
      },
      complete: () => {},
    });
  }


  printDiv() {
    const printBtn = document.getElementById('printableDiv');
    printDiv('printableDiv');
  }
}

export function printDiv(divId: string) {
  const css = `    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
  `;
  const printContents = document.getElementById(divId)!.innerHTML;
  const pageContent = `<!DOCTYPE html><html><head>${css}</head><body onload="window.print()"><style>
  @import url('https://fonts.googleapis.com/css2?family=Aoboshi+One&display=swap');
  @page { size: auto;  margin: 0mm; }
  </style>${printContents}</html>`;
  let popupWindow: any;
  if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
    popupWindow = window.open(
      ' ',
      ' ',
      'width=100%,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no'
    );
    popupWindow.window.focus();
    popupWindow.document.write(pageContent);
    popupWindow.document.close();
    popupWindow.onbeforeunload = (event: any) => {
      popupWindow.close();
    };
    popupWindow.onabort = (event: any) => {
      popupWindow.document.close();
      popupWindow.close();
    };
  } else {
    popupWindow = window.open('', '_blank', 'width=100%');
    popupWindow.document.open();
    popupWindow.document.write(pageContent);
    popupWindow.document.close();
  }
}
