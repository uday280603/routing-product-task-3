import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/productService';
import { Iproduct } from '../../module/Iproduct';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {

  getAllProducts !: Iproduct[]

  constructor(private _productService : ProductService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this._productService.fetchAllProduct()
    .subscribe({
      next : data =>{
        this.getAllProducts = data

      }
    })
  }

}
