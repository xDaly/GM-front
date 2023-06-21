import { Injectable, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

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
  localisations = ['Siège', 'Regions', 'Pépinières'];
  structures = ['cfga', 'audit', 'cdii', 'cidt', 'di', 'dg', 'dga'];
  constructor(private toastr: ToastrService) {

  }
  showSuccess(title:string,message:string) {
    this.toastr.success(message, title);
  }
  showError(title:string,error:string){
    this.toastr.error(error, title);
  }
}
