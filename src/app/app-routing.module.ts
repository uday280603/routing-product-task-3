import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/component/home/home.component';
import { ProductDashboardComponent } from './shared/component/product-dashboard/product-dashboard.component';
import { ProductComponent } from './shared/component/product/product.component';
import { ProductFormComponent } from './shared/component/product-form/product-form.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductDashboardComponent,
  },
  
  {
    path :'products/addProduct',
    component : ProductFormComponent
  }
  ,
  {
    path: 'products/:productId',
    component: ProductComponent
  }
  ,
  {
    path: 'products/:productId/edit',
    component: ProductFormComponent
  }
];

@NgModule({
  imports :[RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule {}
