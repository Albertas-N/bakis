import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { IntroGalleryComponent } from './intro-gallery/intro-gallery.component';
import { FilterComponent } from './filter/filter.component';
import { NavbarComponent } from './nav-bar/nav-bar.component';
import { AboutComponent } from './about/about.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './auth/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { FilterTableComponent } from './filter-table/filter-table.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { AppContainerComponent } from './app-container/app-container.component';
import { MainComponent } from './main/main.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { RegisterService } from './auth/register/register.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { ResultDetailsComponent } from './result-details/result-details.component';
import { ProfileComponent } from './profile/profile.component';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';



@NgModule({
  declarations: [
    AppComponent,
    IntroGalleryComponent,
    FilterComponent,
    NavbarComponent,
    AboutComponent,
    CategoriesComponent,
    LoginComponent,
    FilterTableComponent,
    AuthComponent,
    RegisterComponent,
    AppContainerComponent,
    MainComponent,
    ResultDetailsComponent,
    ProfileComponent
  ],
  imports: [
    MatGridListModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatFormFieldModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatExpansionModule,
    MatDialogModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ScrollingModule,
    GoogleMapsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

