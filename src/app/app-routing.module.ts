import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {path:'webhome',component:WebHomeComponent},
  {
    path: '',
    loadChildren: () =>
      import('./features/web/web.module').then((m) => m.WebModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/delegate/delegate.module').then((m) => m.DelegateModule)
  },

  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./shared/shared.module').then((m) => m.SharedModule)
  // },

  // { path: '**', redirectTo: '/web', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
