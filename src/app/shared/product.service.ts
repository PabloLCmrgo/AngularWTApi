import { Injectable } from '@angular/core';
import { Product } from '../shared/product.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
formData: Product;
  constructor(private httpClient: HttpClient ) { }

  readonly rootURL="aquí va la URL del api";

  postProduct(formData: Product, fileToUpload: File) {
   /**
    * Es un método que será consumido por ProductService, como en el api pide un JSON y una imagen, por ende no sé puede enviar como tal
    * formData, es como se va convertir en formato JSON.
    */
   let formToPost = new FormData(); // se va a crear un nuevo formulario
   let requestToPost = JSON.stringify({ // se va crear un request donde irá el JSON
      Productname: formData.Productname,
      Price: formData.Price,
      Description: formData.Description,
      Image: fileToUpload.name
   });
   formToPost.append("product", requestToPost);  // se va a insertar en el nuevo formulario con el append
   formToPost.append("imagen", fileToUpload, fileToUpload.name); // con esto se va a insertar la imagen.
   /**
    * El método append de FormData agrega un nuevo valor a una llave existente dentro de un objeto Formdata, si no existe la llave
    * la agrega, a diferente de FormData.set que si la llave especificada ya existe set la sobreescribe, en cambio append agrega el
    * nuevo valor al final del conjunto de valores existente.
    */
   return this.httpClient.post(this.rootURL + "Products", formToPost);
   /**
    * Con esto se va a regresar el valor que venga desde el api en caso un error
    */
  }
}

