import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/productService';
import { Iproduct } from '../../module/Iproduct';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfrimComponent } from '../get-confrim/get-confrim.component';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  productId!: number;
  productObj!: Iproduct;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productservice: ProductService,
    private _matDialog: MatDialog,
    private _snackbar: SnackbarService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.onGetProduct();
  }

  onGetProduct() {
    this.productId = +this._activatedRoute.snapshot.paramMap.get('productId')!;
    this._productservice.fetchProductById(this.productId).subscribe({
      next: (data) => {
        this.productObj = data;
      },
    });
  }

  onRemoveProduct() {
    let config = new MatDialogConfig();
    ((config.width = '400px'), (config.disableClose = true));
    config.data = `Are you sure to remove the product with id ${this.productId}..?`;
    let _matRef = this._matDialog.open(GetConfrimComponent, config);
    _matRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this._productservice.onRemove(this.productId).subscribe({
          next: (data) => {
            this._snackbar.openSnackbar(data.msg);
            this._router.navigate(['products']);
          },
        });
      }
    });
  }
}
