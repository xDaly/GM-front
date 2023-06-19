import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralService } from 'src/app/services/general.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GestionnaireService } from 'src/app/services/gestionnaire.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
})
export class AdministrationComponent {
  closeResult = '';
  public selectedId: string;
  gestionnaires: any[];
  public gestForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    nom: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
    prenom: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
  });
  constructor(
    private modalService: NgbModal,
    private _gestionnaire: GestionnaireService,
    public _general: GeneralService
  ) {
    this.getGestionnaires();
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  get userName() {
    return this.gestForm.get('userName');
  }
  get password() {
    return this.gestForm.get('password');
  }
  get email() {
    return this.gestForm.get('email');
  }
  get nom() {
    return this.gestForm.get('nom');
  }
  get prenom() {
    return this.gestForm.get('prenom');
  }

  createGestionnaire() {
    console.log(this.gestForm);

    this._gestionnaire
      .createGestionnaire(this.gestForm.value)
      .subscribe((res: any) => {
        this.gestionnaires.push(res.data);
      });
  }
  getGestionnaires() {
    this._gestionnaire.getGestionnaires().subscribe((res: any) => {
      this.gestionnaires = res.data;
    });
  }
  selectGestionnaire(id: string) {
    this.gestForm.reset();
    const index = this.gestionnaires.findIndex((item) => item['id'] == id);
    this.gestForm.controls.userName.setValue(
      this.gestionnaires[index].userName
    );
    this.gestForm.controls.password.setValue(
      this.gestionnaires[index].password
    );
    this.gestForm.controls.nom.setValue(this.gestionnaires[index].Profil.nom);
    this.gestForm.controls.prenom.setValue(
      this.gestionnaires[index].Profil.prenom
    );
    this.gestForm.controls.email.setValue(
      this.gestionnaires[index].Profil.email
    );
  }
  deleteGestionnaire(id: string) {
    this._gestionnaire.deleteGestionnaire(id).subscribe((res: any) => {
      const index = this.gestionnaires.findIndex(
        (item) => item.Profil['id'] == id
      );
      if (index !== -1) {
        this.gestionnaires.splice(index, 1);
      }
    });
  }
  updateGestionnaire() {
    this._gestionnaire
      .updateGestionnaire(this.selectedId, this.gestForm.value)
      .subscribe((res: any) => {
        const index = this.gestionnaires.findIndex(
          (e) => e.Profil.id == this.selectedId
        );
        this.gestionnaires[index] = {
          id: this.gestionnaires[index].id,
          userName: this.gestForm.value.userName,
          password: this.gestForm.value.password,
          Profil: {
            nom: this.gestForm.value.nom,
            prenom: this.gestForm.value.prenom,
            email: this.gestForm.value.email,
          },
        };
      });
  }
}
