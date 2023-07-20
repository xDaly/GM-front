import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralService } from 'src/app/services/general.service';
import { EmployeService } from 'src/app/services/employe.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employes',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule],
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.scss'],
})
export class EmployesComponent {
  filters = {
    page: 1,
    size: 10,
    nom: '',
    cin: '',
    structure: '',
    etage: '',
    region: '',
    localisation: '',
    archived: true,
  };
  totalPages: number;
  count: number;
  employes: any[] = [];
  constructor(
    public _general: GeneralService,
    private _employe: EmployeService
  ) {
    this.getEmployes();
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
  activate(id: string) {
    this._employe
      .updateEmploye({ archived: false }, id)
      .subscribe((res: any) => {
        console.log(res);
        
        window.location.reload();
      });
  }
}
