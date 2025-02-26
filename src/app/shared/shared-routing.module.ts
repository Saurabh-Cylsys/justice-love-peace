import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebHeaderComponent } from './components/web-header/web-header.component';
import { WebFooterComponent } from './components/web-footer/web-footer.component';


const routes: Routes = [

  {
    path: 'webheader', 
    component: WebFooterComponent,

    children:[
      {path:'webheader',component:WebHeaderComponent},
      // {path:'register',component:},
      { path: 'footer', component: WebFooterComponent },
      // {path:'reset-password',component:ResetPasswordComponent},
      {path:'', redirectTo:'/webheader', pathMatch:'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
