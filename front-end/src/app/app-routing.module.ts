import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppContainerComponent } from './app-container/app-container.component';
import { AboutComponent } from './about/about.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent 
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }