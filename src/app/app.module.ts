import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { ProductDashboardComponent } from './shared/component/product-dashboard/product-dashboard.component';
import { ProductComponent } from './shared/component/product/product.component';
import { ProductFormComponent } from './shared/component/product-form/product-form.component';
import { GetConfrimComponent } from './shared/component/get-confrim/get-confrim.component';
import { MaterialModule } from './shared/module/material.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './shared/component/home/home.component';
import { RouterOutlet } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { UserDashboardComponent } from './shared/component/USER/user-dashboard/user-dashboard.component';
import { UserComponent } from './shared/component/USER/user/user.component';
import { UserFormComponent } from './shared/component/USER/user-form/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductDashboardComponent,
    ProductComponent,
    ProductFormComponent,
    GetConfrimComponent,
    HomeComponent,
    UserDashboardComponent,
    UserComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    RouterOutlet,
    ReactiveFormsModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
