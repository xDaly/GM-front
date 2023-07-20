import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from 'src/app/services/general.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AssetService } from 'src/app/services/asset.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { EmployeService } from 'src/app/services/employe.service';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-asset-manager',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbPaginationModule,
    FormsModule,
  ],
  templateUrl: './asset-manager.component.html',
  styleUrls: ['./asset-manager.component.scss'],
})
export class AssetManagerComponent {
  public selectedAsset: any;
  assetToPrint: any;
  currentDate: Date;
  closeResult = '';
  filters = {
    page: 1,
    size: 10,
    SN: '',
    model: '',
    buy_date: '',
    structure: '',
    region: '',
    localisation: '',
    type: '',
    etat: '',
    observation: '',
    employeId: '',
  };
  totalPages: number;
  count: number;
  assets: any[] = [];
  employes: any[] = [];
  assetForm = new FormGroup({
    SN: new FormControl(''),
    model: new FormControl(''),
    buy_date: new FormControl(''),
    current_owner: new FormControl(''),
    type: new FormControl('Type'),
    etat: new FormControl('en stock'),
    observation: new FormControl(''),
  });

  public selectedOwner: any;

  cars = [
    { name: 'Ichrak' },
    { name: 'Foued' },
    { name: 'Samir' },
    { name: 'Monsef' },
  ];
  histories: any
  constructor(
    private modalService: NgbModal,
    private _asset: AssetService,
    private _employe: EmployeService,
    public _general: GeneralService,
    private renderer: Renderer2
  ) {
    this.currentDate = new Date();
    this.getAssets();
    this.getEmployesForAffectation();
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
  openFullScreen(content: any, asset: any) {
    this.assetToPrint = asset;
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
  createAsset() {
    this._asset.createAsset(this.assetForm.value).subscribe({
      next: (res: any) => {
        this.assets.push(res.data);
      },
      error: (err: any) => {
        this._general.showError('erreur', err.error.message);
      },
      complete: () => {},
    });
  }

  getAssets() {
    this._asset.getAssets(this.filters).subscribe({
      next: (res: any) => {
        this.assets = res.data.rows;
        this.count = res.data.count;
        this.totalPages = res.data.count / this.filters.size;
      },
      error: (err: any) => {
        this._general.showError('erreur', err.error.message);
      },
      complete: () => {},
    });
  }
  getEmployesForAffectation() {
    this._employe.getEmployesForAffectation().subscribe({
      next: (res: any) => {
        this.employes = res.data;
      },
      error: (err: any) => {
        this._general.showError('erreur', err.error.message);
      },
      complete: () => {},
    });
  }
  paginateNext() {
    this.filters.page = this.filters.page + 1;
    this.getAssets();
  }
  paginatePrev() {
    this.filters.page = this.filters.page - 1;
    this.getAssets();
  }
  setUpdateForm() {
    this.assetForm = new FormGroup({
      SN: new FormControl(this.selectedAsset.SN),
      model: new FormControl(this.selectedAsset.model),
      buy_date: new FormControl(this.selectedAsset.buy_date),
      current_owner: new FormControl(this.selectedAsset.current_owner),
      type: new FormControl(this.selectedAsset.type),
      etat: new FormControl(this.selectedAsset.etat),
      observation: new FormControl(this.selectedAsset.observation),
    });
  }
  setAddForm() {
    this.assetForm = new FormGroup({
      SN: new FormControl(''),
      model: new FormControl(''),
      buy_date: new FormControl(''),
      current_owner: new FormControl(''),
      type: new FormControl('Type'),
      etat: new FormControl('etat'),
      observation: new FormControl(''),
    });
  }
  updateAsset() {
    this._asset
      .updateAsset(
        { ...this.assetForm.value, EmployeId: this.selectedOwner },
        this.selectedAsset.id
      )
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
  deleteAsset(modal: any) {
    console.log(this.selectedAsset);
    this._asset.deleteAsset(this.selectedAsset.id).subscribe({
      next: (res: any) => {
        this.assets = this.assets.filter((e) => e.id != this.selectedAsset.id);
        modal.dismiss('Cross click');
      },
      error: (err: any) => {
        this._general.showError('erreur', err.error.message);
      },
      complete: () => {},
    });
  }
  getEmployeNameById() {
    const employe =
      this.employes.filter((e) => e.id == this.filters.employeId)[0] || '';
    return employe ? employe.nom : 'Tous les employes';
  }
  printDiv() {
    const printBtn = document.getElementById('printableDiv');
    printDiv('printableDiv');
  }
  getHistory(){
    
    this._asset.historyAsset(this.assetToPrint.id).subscribe((res:any)=>{
      this.histories = res.data
    })
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
