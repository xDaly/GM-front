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
        path: 'gestion-utilisateurs',
        loadComponent: () =>
          import('./containers/user-manager/user-manager.component').then(
            (c) => c.UserManagerComponent
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
