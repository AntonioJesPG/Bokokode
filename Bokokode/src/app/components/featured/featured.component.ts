import { Component, OnInit } from '@angular/core';
import { Product, Response} from 'src/app/interfaces/interfaces';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {

  featured !: Product;
  r !: Response;

  constructor(private productService : ProductServiceService) { }

  ngOnInit(): void {

    this.obtainFeatured();
  }

  //returns the featured product
  obtainFeatured(){
    this.productService.getFeatured().subscribe( data => {
      this.r = data;
      this.featured = this.r.data.data[0];
    })
  }

  //adds the featured product to the cart
  addToCart(product: Product){
    this.productService.addToCart(product);
    this.productService.refresh();
  }


}
