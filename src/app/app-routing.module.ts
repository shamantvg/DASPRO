import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import {SuccessPageComponent} from './success-page/success-page.component';
import {VerifyComponent} from './verify/verify.component';
// import { AuthGuard } from './auth.guard';

const routes: Routes = [
 
 {
    path: '',
    component: HomePageComponent,
    data: { title: 'Home : ' }
  },
  {
    path: 'home',
    component: HomePageComponent,
    data: { title: 'Home : ' }
  },
  {
    path: 'verify/:searchVal',
    component: VerifyComponent,
    data: { title: 'verify : ' }
  },
  {
    path: 'success',
    component: SuccessPageComponent,
    data: { title: 'success : ' }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { title: 'PageNotfoundComponent : ' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
