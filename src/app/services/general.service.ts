import { HttpClient } from '@angular/common/http';
import { Injectable, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  sideBarOpened = new BehaviorSubject(false);
  toasts: any[] = [];
  roles = 'admin , gestionnaire';
  locations = [
    {
      name: 'Ariana',
    },
    {
      name: 'Ben Arous',
    },
    {
      name: 'Béja',
    },
    {
      name: 'Bizerte',
    },
    {
      name: 'Gabès',
    },
    {
      name: 'Gafsa',
    },
    {
      name: 'Jendouba',
    },
    {
      name: 'Kebili',
    },
    {
      name: 'Le Kef',
    },
    {
      name: 'Kairouan',
    },
    {
      name: 'Médenine',
    },
    {
      name: 'Mahdia',
    },
    {
      name: 'Monastir',
    },
    {
      name: 'Nabeul',
    },
    {
      name: 'Sfax',
    },
    {
      name: 'Siliana',
    },
    {
      name: 'Sousse',
    },
    {
      name: 'Tataouine',
    },
    {
      name: 'Tozeur',
    },
    {
      name: 'Tunis',
    },
    {
      name: 'Zaghouan',
    },
    {
      name: 'Médenine-Djerba',
    },
    {
      name: 'Mannouba',
    },
    {
      name: 'Kasserine',
    },
    {
      name: 'Sidi Bouzid',
    },
  ];
  etats = ['en stock', 'en utilisation', 'en panne', 'declassé'];
  localisations = [];
  structures = [];
  types  = [];
  public user = {
    id: '',
    nom: '',
    prenom: '',
    profil_id: '',
    role: '',
    token: '',
    userName: '',
  };

  constructor(private toastr: ToastrService, private http: HttpClient) {
    this.user.id = localStorage.getItem('id') as string;
    this.user.nom = localStorage.getItem('nom') as string;
    this.user.prenom = localStorage.getItem('prenom') as string;
    this.user.profil_id = localStorage.getItem('profil_id') as string;
    this.user.role = localStorage.getItem('role') as string;
    this.user.token = localStorage.getItem('token') as string;
    this.user.userName = localStorage.getItem('userName') as string;
    console.log(this.user);
    this.getLocalisations()
    this.getStructures()
    this.getTypes()
  }
  showSuccess(title: string, message: string) {
    this.toastr.success(message, title);
  }
  showError(title: string, error: string) {
    this.toastr.error(error, title);
  }
  getLocalisations() {
    this.http.get(environment.BASE_URL + 'data/localisations').subscribe({
      next: (response:any) => {
        this.localisations = response.data.map((e:any)=>e.name)
      },
      error: (err) => {
        this.toastr.error(err,'erreur')
      },
      complete: () => {},
    });
  }
  getStructures() {
    this.http.get(environment.BASE_URL + 'data/structures').subscribe({
      next: (response:any) => {
        this.structures = response.data.map((e:any)=>e.name)
      },
      error: (err) => {
        this.toastr.error(err,'erreur')
      },
      complete: () => {},
    });
  }
  getTypes() {
    this.http.get(environment.BASE_URL + 'data/types').subscribe({
      next: (response:any) => {
        this.types = response.data.map((e:any)=>e.name)
      },
      error: (err) => {
        this.toastr.error(err,'erreur')
      },
      complete: () => {},
    });
  }
  getCounts() {
  return  this.http.get(environment.BASE_URL + 'data/counts')
  }
}
