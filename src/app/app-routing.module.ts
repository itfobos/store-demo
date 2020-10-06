import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { GmtTimeComponent } from './generic-store/gmt-time/component/gmt-time.component';
import { NgxsGmtTimeComponent } from './ngxs-store/component/ngxs-gmt-time.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'generic-store',
    component: GmtTimeComponent,
  },
  {
    path: 'ngxs-store',
    component: NgxsGmtTimeComponent,
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
