import { Component, OnInit } from '@angular/core';
import { Product, Response, Data, CartProduct} from 'src/app/interfaces/interfaces';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { faFilter} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  faFilter = faFilter;
  data !:Data;
  products !: Product[];

  //Saved in session storage to mantain data
  actualPage !: number;
  lastPage !: number;
  AllFilters = ['People', 'Premium', 'Pets', 'Food', 'Landmarks', 'Cities', 'Nature'];
  filters !: string[];
  key !: string;
  type !: string;
  pages !: number[];

  constructor(private productService: ProductServiceService) { }

  ngOnInit(): void {
    this.filters = [];
    this.obtainPage(1);
    this.actualPage= 1;
  }

  //returns the data from the page n
  obtainPage(n: number){
    this.productService.getResponseFromPage(n, this.filters).subscribe( data => {
      var response = data;
      this.data = response.data;
      console.log(this.actualPage);
      console.log(this.lastPage);
      this.getProducts(this.data);
    })
  }

  //get the list of products returned
  getProducts(d : Data){
    this.products = [];
    this.products = d.data;

    this.actualPage = d.current_page;
    this.lastPage = d.last_page;
    this.listPages(this.lastPage);

    console.log(this.products);
  }

  filterBy(){
    this.productService.getResponseFromPage(1, this.filters).subscribe( data => {
      var response = data;
      this.data = response.data;
      this.lastPage = this.data.last_page;
      this.getProducts(this.data);
    })
  }

  //if filter is not selected  method adds it to the list
  updateFilter( filter: string){
    if(!this.checked(filter)){
      this.addFilter(filter);
    }
    else{
      this.removeFilter(filter);
    }
    if(this.key != "price"){
      this.filterBy();
    }else{
      this.getSort(1,this.key, this.type);
    }
  }

  //checks if a filter is already selected
  checked(filter:string){
    filter = filter.toLocaleLowerCase();
    return this.filters.includes(filter);
  }

  //adds a filter to the list
  addFilter(filter: string){
    filter = filter.toLocaleLowerCase();
    if(!this.filters.includes(filter)){
      this.filters.push(filter);
    }
  }

  //removes a filter from de list
  removeFilter(filter: string){
    filter = filter.toLocaleLowerCase();
    this.filters.forEach((item, index) => {
      if(item === filter) this.filters.splice(index,1);
    })
  }

  sortBy(key:string, type:string){
    this.key = key;
    this.type = type;
    console.log(this.type);
    this.getSort(1,this.key,this.type);
  }

  //return the selected page ordered by price
  getSort(page: number,key:string, type:string){
    this.productService.getSorted(page, key, type, this.filters).subscribe( data => {
      var response = data;
      this.data = response.data;
      console.log(response);
      this.lastPage = this.data.last_page;
      this.getProducts(response.data);
    })
  }

  //returns the products of the page provided
  goToPage(page: number){
    if(this.key != "price"){
      this.obtainPage(page);
    }else{
      this.getSort(page,this.key, this.type);
    }
  }

  //provides a list of all the available pages
  listPages(lastPage: number){
    this.pages = [];
    console.log(lastPage);
    for (let index = 1; index <= lastPage; index++) {
      this.pages.push(index);
    }
  }

  //Calls product service method to fill the cart
  addToCart(product: Product){
    this.productService.addToCart(product);
    this.productService.refresh();
  }

}
