import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  username: string = '';
  password: string = '';
  names: any;
  public type:string = 'password'
  constructor(
    private _authentification: AuthentificationService,
    private _router: Router,
  ) {
    this.getGestionnairesNames()
  }
  signin() {
    this._authentification
      .signin({
        userName: this.username,
        password: this.password,
      })
      .subscribe({
        next: (value: any) => {
          localStorage.setItem('id', value.data.id);
          localStorage.setItem('nom', value.data.nom);
          localStorage.setItem('prenom', value.data.prenom);
          localStorage.setItem('profil_id', value.data.profil_id);
          localStorage.setItem('role', value.data.role);
          localStorage.setItem('token', value.data.token);
          localStorage.setItem('userName', value.data.userName);
          this._router.navigate(['/']);
        },
        error(err) {},
      });
  }
  getGestionnairesNames(){
    this._authentification.getGestionnairesNames().subscribe((res:any)=>{
      this.names = res.data
    })
  }
}
