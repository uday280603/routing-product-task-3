import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../service/productService';
import { Iproduct } from '../../module/Iproduct';
import { SnackbarService } from '../../service/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  // {
  //   productId: 2,
  //   productName: 'Mobile',
  //   productImage: 'https://imgs.search.brave.com/iglFKmefxCxpf2K_tbJImP38M_nKyXkbWSbA7klT32k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ3/MTE5MzI1OC92ZWN0/b3IvbWluaW1hbGlz/dGljLWRlc2lnbi1t/b2JpbGUtcGhvbmUt/dGVtcGxhdGVzLXNp/bWlsYXItdG8taXBo/b25lLW1vY2t1cC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/ZmozcklGRTBab2ww/MVdxUFdoT3JBZUdT/MTBZbHFzWUZEQjE1/VkpZN2JGZz0',
  //   productDescription: 'Android smartphone with 128GB storage',
  //   isAvailable: true,
  //   productPrice: 25000,
  //   warranty: '1 Year',
  // }

  isInEditMode: boolean = false;
  productForm!: FormGroup;
  productId!: number;

  constructor(
    private _productService: ProductService,
    private _snackbar: SnackbarService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.onCreateForm();
    this.onPatchData();
  }

  onCreateForm() {
    this.productForm = new FormGroup({
      productName: new FormControl(null, [Validators.required]),
      productImage: new FormControl(null, [Validators.required]),
      productDescription: new FormControl(null, [Validators.required]),
      isAvailable: new FormControl(null, [Validators.required]),
      productPrice: new FormControl(null, [Validators.required]),
      warranty: new FormControl(null, [Validators.required]),
    });
  }

  onAddProduct() {
    if (this.productForm.valid) {
      let NEW_OBJ: Iproduct = {
        ...this.productForm.value,
        productId: Date.now(),
      };
      this._productService.onCreateProduct(NEW_OBJ).subscribe({
        next: (data) => {
          this._snackbar.openSnackbar(data.msg);
          this._router.navigate(['products']);
          console.log(this.productForm);
        },
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  onPatchData() {
    this.productId = +this._activatedRoute.snapshot.paramMap.get('productId')!;
    if (!this.productId) {
      this.isInEditMode = false;
    } else {
      this._productService.fetchProductById(this.productId).subscribe({
        next: (data) => {
          this.productForm.patchValue(data);
          this.isInEditMode = true;
        },
      });
    }
  }

  onUpdateProduct() {
    if (this.productForm.valid) {
      let UPDATED_OBJ: Iproduct = {
        ...this.productForm.value,
        productId: this.productId,
      };
      this._productService.onupdate(UPDATED_OBJ).subscribe({
        next: (data) => {
          this._snackbar.openSnackbar(data.msg);
          this._router.navigate(['products']);
          this.isInEditMode = false;
        },
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }
}
