import { Component, OnInit } from '@angular/core';
import { Product, Response} from 'src/app/interfaces/interfaces';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-also-buy',
  templateUrl: './also-buy.component.html',
  styleUrls: ['./also-buy.component.scss']
})
export class AlsoBuyComponent implements OnInit {

    productList !: Product[];
    response !: Response;
    p !: Product;

  constructor(private productService: ProductServiceService) { 
    this.productList = []
  }

  ngOnInit(): void {
    this.obtainAlsoBuy();
  }

  //gets the values in the field people_also_buy from a product
  obtainAlsoBuy(){
    this.productService.getFeatured().subscribe( data => {
      this.response = data;
      this.p = this.response.data.data[0];
      console.log(this.p.people_also_buy.length);
    })
  }

  //adds the selected product to the cart
  addToCart(product: Product){
    this.productService.addToCart(product);
    this.productService.refresh();
  }

}
