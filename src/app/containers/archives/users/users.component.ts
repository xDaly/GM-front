import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionnaireService } from 'src/app/services/gestionnaire.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  gestionnaires: any[];
  constructor(private _gestionnaire: GestionnaireService) {
    this.getArchivedGestionnaires();
  }
  getArchivedGestionnaires() {
    this._gestionnaire.getArchivedGestionnaires().subscribe((res: any) => {
      this.gestionnaires = res.data;
    });
  }

  activate(id: string) {
    this._gestionnaire
      .updateGestionnaire(id, { archived: false })
      .subscribe((res: any) => {
        window.location.reload();
      });
  }
}
