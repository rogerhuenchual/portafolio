import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Producto} from '../interfaces/producto.interface'

@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  cargando = true;
  productos:Producto[] = [];
  productosFiltrados:Producto[] = [];

  constructor(private http:HttpClient) {

    this.cargarProductos();
   }

   private cargarProductos(){

    return new Promise((resolve, reject)=>{
      this.http.get('https://angular-html-218f4.firebaseio.com/productos_idx.json')
      .subscribe((resp: Producto[])=>{
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });

   }

   getProducto(id:string){

    return this.http.get('https://angular-html-218f4.firebaseio.com/productos/'+ id + '.json');
    this.cargando = false;
   }

   buscarProducto(termino: string){

    if (this.productos.length === 0){
      this.cargarProductos().then(()=>{
        this.filtrarProductos(termino);
      });
    } else {
      this.filtrarProductos(termino);
    }
    this.cargando = false;
   }

   private filtrarProductos(termino:string){

    this.productosFiltrados = [];
    console.log("lista limpia: " + this.productosFiltrados);
    console.log("se busca: " + termino);
    this.productos.forEach(prod => {
      if(prod.categoria.indexOf(termino) >= 0){

        this.productosFiltrados.push(prod);
      }
    });
    console.log("lista para iterar: " + this.productosFiltrados);
   }
}
