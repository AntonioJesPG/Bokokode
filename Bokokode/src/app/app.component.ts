import { Component } from '@angular/core';
import { Product } from './interfaces/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bokokode';
  //products : Product[];

  getFeatured(){
    //this.products = [];
  }

  getProducts(){
  }
}
