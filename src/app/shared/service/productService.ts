import { Injectable } from '@angular/core';
import { Iproduct, Ires } from '../module/Iproduct';
import { Observable, of } from 'rxjs';


@Injectable({
    providedIn : 'root'
})
export class ProductService {
  productsArray: Iproduct[] = [
    {
      productId: 1,
      productName: 'Laptop',
      productImage: 'https://imgs.search.brave.com/sMFlGDRGRO6i0cwrYgy0yEBUYfFip7odcpjY-D4zA8A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9wbHVz/LnVuc3BsYXNoLmNv/bS9wcmVtaXVtX3Bo/b3RvLTE2ODE1NjY5/MjUyNDYtY2M1ODRh/NDRkN2ZlP2ZtPWpw/ZyZxPTYwJnc9MzAw/MCZhdXRvPWZvcm1h/dCZmaXQ9Y3JvcCZp/eGxpYj1yYi00LjEu/MCZpeGlkPU0zd3hN/akEzZkRCOE1IeHpa/V0Z5WTJoOE5YeDha/R1ZzYkNVeU1HeGhj/SFJ2Y0h4bGJud3dm/SHd3Zkh4OE1BPT0',
      productDescription: 'Dell laptop with 8GB RAM and 512GB SSD',
      isAvailable: true,
      productPrice: 55000,
      warranty: '2 Years',
    },
    {
      productId: 2,
      productName: 'Mobile',
      productImage: 'https://imgs.search.brave.com/iglFKmefxCxpf2K_tbJImP38M_nKyXkbWSbA7klT32k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ3/MTE5MzI1OC92ZWN0/b3IvbWluaW1hbGlz/dGljLWRlc2lnbi1t/b2JpbGUtcGhvbmUt/dGVtcGxhdGVzLXNp/bWlsYXItdG8taXBo/b25lLW1vY2t1cC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/ZmozcklGRTBab2ww/MVdxUFdoT3JBZUdT/MTBZbHFzWUZEQjE1/VkpZN2JGZz0',
      productDescription: 'Android smartphone with 128GB storage',
      isAvailable: true,
      productPrice: 25000,
      warranty: '1 Year',
    },
    {
      productId: 3,
      productName: 'Headphones',
      productImage: 'https://imgs.search.brave.com/1u2W5QHixPataIxAwHKis7wRh9Cx6eeMby53zd8umSQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzkv/MTAwLzI0OC9zbWFs/bC93aGl0ZS13aXJl/bGVzcy1ibHVldG9v/dGgtaGVhZHBob25l/cy1vbi1ibGFjay1i/YWNrZ3JvdW5kLXRo/ZS1oaWdobGlnaHQt/b2Ytd2lyZWxlc3Mt/Ymx1ZXRvb3RoLWhl/YWRwaG9uZXMtaXMt/bm8tY29ubmVjdG9y/LXRoZXJlLWlzLW5v/LWNvbm5lY3Rpbmct/Y2FibGUtYmV0d2Vl/bi10aGUtbGVmdC1h/bmQtcmlnaHQtaGVh/ZHBob25lcy1waG90/by5qcGc',
      productDescription: 'Wireless Bluetooth headphones',
      isAvailable: false,
      productPrice: 3000,
      warranty: '6 Months',
    }
  ];

  fetchAllProduct() : Observable<Iproduct[]>{
    return of(this.productsArray)
  }
  fetchProductById(id : number) : Observable<Iproduct>{
    let productObj = this.productsArray.find(p => p.productId === id)!;
    return of(productObj)
  }
  onCreateProduct(productObj : Iproduct) : Observable<Ires<Iproduct>>{
    this.productsArray.unshift(productObj)
    return of({
      msg : `The product with id ${productObj.productId} is added successfully..!`,
      data : productObj
    })

  }

  onupdate(updatedObj : Iproduct) : Observable<Ires<Iproduct>>{
    let GETINDEX = this.productsArray.findIndex(p => p.productId === updatedObj.productId)!;
    this.productsArray[GETINDEX] = updatedObj;
    return of({
      msg : `The product with id ${updatedObj.productId} is updated successfully...!`,
      data : updatedObj
    })
  }

  onRemove(id : number) : Observable<Ires<Iproduct>>{
    let GETINDEX = this.productsArray.findIndex(p => p.productId === id);
    let array = this.productsArray.splice(GETINDEX,1);
    return of({
      msg : `Product with id ${id} is removed successfully..!`,
      data : array[0]
    })
  }
}
