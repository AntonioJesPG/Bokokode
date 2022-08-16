import { Component, OnInit } from '@angular/core';
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { Product, Response, Data, CartProduct} from 'src/app/interfaces/interfaces';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  cart!: CartProduct[];
  cartCount!: number;

  constructor(private productService: ProductServiceService) { }

  faCart = faShoppingCart;


  ngOnInit(): void {
    this.countCart();
  }

  countCart() {
    var item = sessionStorage.getItem("cart");
    this.cart = [];

    if(item != null){
      this.cart = JSON.parse(item).cart;
      this.cartCount = this.cart.length;
    }else{
      this.cartCount = 0;
    }
  }

  clearCart(){
    this.productService.clearCart();
    this.productService.refresh();
  }

}
