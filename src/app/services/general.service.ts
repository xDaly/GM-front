import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  sideBarOpened = new BehaviorSubject(false);
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
  localisations = ['Siège','Regions','Pépinières']
  constructor() {}
}
