import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./containers/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'acceuil',
        pathMatch: 'prefix',
      },
      {
        path: 'acceuil',
        loadComponent: () =>
          import('./containers/acceuil/acceuil.component').then(
            (c) => c.AcceuilComponent
          ),
      },
      {
        path: 'consultation',
        loadComponent: () =>
          import('./containers/consultation/consultation.component').then(
            (c) => c.ConsultationComponent
          ),
      },
      {
        path: 'gestion-materiel',
        loadComponent: () =>
          import('./containers/asset-manager/asset-manager.component').then(
            (c) => c.AssetManagerComponent
          ),
      },
      {
        path: 'gestion-utilisateurs',
        loadComponent: () =>
          import('./containers/user-manager/user-manager.component').then(
            (c) => c.UserManagerComponent
          ),
      },
      {
        path: 'gestion-gestionnaire',
        loadComponent: () =>
          import('./containers/gest-manager/gest-manager.component').then(
            (c) => c.GestManagerComponent
          ),
      },
      {
        path: 'administration',
        loadComponent: () =>
          import('./containers/administration/administration.component').then(
            (c) => c.AdministrationComponent
          ),
      },
    ],
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./containers/signin/signin.component').then(
        (c) => c.SigninComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./containers/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
