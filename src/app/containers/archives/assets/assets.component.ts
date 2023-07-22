import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDismissReasons, NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AssetService } from 'src/app/services/asset.service';
import { EmployeService } from 'src/app/services/employe.service';
import { GeneralService } from 'src/app/services/general.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule, FormsModule],
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent {
  public selectedAsset: any;
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
    etat: 'declassé',
    observation: '',
    employeId: '',
  };
  assets: any;
  count: any;
  totalPages: number;
  histories: any

  constructor(
    private modalService: NgbModal,
    private _asset: AssetService,
    private _employe: EmployeService,
    public _general: GeneralService
  ) {
    this.getAssets();
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

  activate(id: string) {
    this._asset.updateAsset({ etat: 'en stock' }, id).subscribe((res: any) => {
      window.location.reload();
    });
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

  getHistory(){
    
    this._asset.historyAsset(this.selectedAsset.id).subscribe((res:any)=>{
      this.histories = res.data
    })
  }

  openFullScreen(content: any, asset: any) {
    this.selectedAsset = asset;
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
}
