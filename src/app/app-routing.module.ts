import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/component/home/home.component';
import { ProductDashboardComponent } from './shared/component/product-dashboard/product-dashboard.component';
import { ProductComponent } from './shared/component/product/product.component';
import { ProductFormComponent } from './shared/component/product-form/product-form.component';
import { UserDashboardComponent } from './shared/component/USER/user-dashboard/user-dashboard.component';
import { UserFormComponent } from './shared/component/USER/user-form/user-form.component';
import { UserComponent } from './shared/component/USER/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductDashboardComponent,
    children: [
      {
        path: 'addProduct',
        component: ProductFormComponent,
      },
      {
        path: ':productId',
        component: ProductComponent,
      },
      {
        path: ':productId/edit',
        component: ProductFormComponent,
      },
    ],
  },
  {
    path: 'users',
    component: UserDashboardComponent,
    children: [
      {
        path: 'addUser',
        component: UserFormComponent,
      },
      {
        path: ':id',
        component: UserComponent,
      },
      {
        path: ':id/edit',
        component: UserFormComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
