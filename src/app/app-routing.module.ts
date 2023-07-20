import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/core/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./containers/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
      canActivate:[authGuard],
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
      {
        path: 'archive',
        loadComponent: () =>
          import('./containers/archive/archive.component').then(
            (c) => c.ArchiveComponent
          ),
      },
      {
        path: 'archive-gestionnaire',
        loadComponent: () =>
          import('./containers/archives/users/users.component').then(
            (c) => c.UsersComponent
          ),
      },
      {
        path: 'archive-materiel',
        loadComponent: () =>
          import('./containers/archives/assets/assets.component').then(
            (c) => c.AssetsComponent
          ),
      },
      {
        path: 'archive-employe',
        loadComponent: () =>
          import('./containers/archives/employes/employes.component').then(
            (c) => c.EmployesComponent
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
