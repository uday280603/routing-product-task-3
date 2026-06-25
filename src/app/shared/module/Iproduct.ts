

export interface Iproduct{
     productId: number;
    productName: string;
    productImage: string;
    productDescription: string;
    isAvailable: boolean;
    productPrice: number;
    warranty: string;
}

export interface Ires<T>{
    msg : string,
    data : T
}