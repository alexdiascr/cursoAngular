import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  
  product!: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // pela rota, consegue pegar os parametros através do 
    // snapshot, e pegasse o parametro que veio atraves 
    // mapa de parametro com a chave id 
    const id = this.route.snapshot.paramMap.get('id') || ''
    this.productService.readById(id).subscribe(product => {
      this.product = product;
    });
  }

  deleteProduct(): void {
    const id = this.route.snapshot.paramMap.get('id') || ''
    this.productService.delete(id).subscribe(() => {
      this.productService.showMessage('Produto excluido com sucesso!')
      this.router.navigate(['/products']);
    });
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

}
