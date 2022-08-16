import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product, Data, Link, Response, CartProduct } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private url = 'https://technical-frontend-api.bokokode.com/api/products'
  response !: Response;
  featured !: Product;
  data !: Data;
  cartProduct !: CartProduct;
  cart !: CartProduct[];

  constructor(private http: HttpClient) { }

  // returns the products from a page, also works with filters ["people","nature","etc"]
  getResponseFromPage(page:number, filter:string[]): Observable<Response>{
    console.log(filter);
    if(filter.length != 0){
      const headers = { 'Content-Type': 'application/json' };
      var body = {"categories": filter};
      var obj = JSON.stringify(body);
      return this.http.post<Response>(this.url + '?page='+ page +'', obj,{headers}).pipe();
    }
    return this.http.post<Response>( this.url + '?page='+ page +'','').pipe();
  }

  //With this method we force to receive as first item a featured == true if exist
  getFeatured(): Observable<Response>{
    const headers = { "X-HTTP-Method-Override": "POST" };
    const body = {"sort": {"key": "featured", "type":"DESC"}};
    return this.http.post<Response>(this.url + '', body,{headers}).pipe();
  }

  //This method returns a list of 6 products not featured
  getNotFeatured(): Observable<Response>{
    const headers = { "X-HTTP-Method-Override": "POST" };
    const body = {"sort": {"key": "featured", "type":"ASC"}};
    return this.http.post<Response>(this.url + '', body,{headers}).pipe();
  }

//Returns a list of products sorted and filtered
  getSorted(page:number, key:string, type:string, filter:string[]){
    const headers = { 'Content-Type': 'application/json' };
    var body = {"sort": {"key":   key , "type": type}, "categories": filter};
    var body2 ={"sort": { "key": key, "type": type}};
    var obj;
    if(filter.length != 0){
      obj = JSON.stringify(body);
      return this.http.post<Response>(this.url + '?page='+ page +'', obj,{headers}).pipe();
    } else{
      obj = JSON.stringify(body2);
      return this.http.post<Response>(this.url + '?page='+ page +'', obj,{headers}).pipe();
    }
  }

  initializeCart(){
    this.cartProduct = {
      _id: '1',
      name: '',
      image: { src: '' , alt:''},
      currency: 'EUR',
      price: 0
    }
  }

  //Adds the product to the shop cart
  addToCart(product: Product){

    this.initializeCart();
    this.cartProduct._id = product._id;
    var item = sessionStorage.getItem("cart");
    this.cart = [];

    if(item != null){
      this.cart = JSON.parse(item).cart;
    }
      this.cartProduct.name = product.name;
      this.cartProduct.image = product.image;
      this.cartProduct.currency = product.currency;
      this.cartProduct.price = product.price;

      this.cart.push(this.cartProduct);
    
      console.log(this.cart);

    this.updateCart(this.cart);

  }

  //clears the cart data
  clearCart(){
      this.cart = [];
      this.updateCart(this.cart);
  }

  //saves the cart in the session storage
  updateCart(cart: CartProduct[]){
    var c = JSON.stringify({"cart" : cart});
    sessionStorage.setItem("cart",c);
  }

  //reloads
  refresh(): void {
    window.location.reload();
  }

}

