import { Component } from '@angular/core';
import { ProductService } from '../app/shared/product.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( private productService: ProductService, private toastr: ToastrService ) {}
  title = 'AngularWTApi';
  fileName: string = 'Seleccionar imagen';
  fileToUpload: File = null;
  imageURL: string = '/assets/img/noimage.png';

  /*
  En el source de una imagen para que dependa del cambio de una variable se tiene que poner entre llaves cuadradas
  por ejemplo [src]="imageURL"
  */

  updateControls(e): void {
    this.fileToUpload = e.target.files.item(0); // Se le agrega posición cero debido a que solo se sube un archivo por evento.
    this.fileName = this.fileToUpload.name;

    let reader = new FileReader();  // Variable para crear un lector

    reader.onload = (event: any) => {
      this.imageURL = event.target.result;
    }; // En la varible reader con la propiedad onload
    reader.readAsDataURL(this.fileToUpload);
  }

  resetForm(form?: NgForm) { // Método para resetear el formulario.
    if (form != null) { // Si el formulario no está vacío pasa la validación
      this.resetForm();
    }
    /**
     * Como se está trabajando con dataBinding si se hacen cambios a traves del servicio los campos también se verán afectados.
     * Es como si se cumple la condición el método va a envíar vacíos los campos.
     */
    this.productService.formData = {
      idProduct: '',
      Productname: '',
      Price: 0,
      Description: '',
      Image: ''
    };
  }

  onSubmit(form: NgForm) {
    this.productService.postProduct(form.value, this.fileToUpload).subscribe(
      result => {
        this.resetForm(form);
        this.toastr.success("Producto agregado", "AngularWTApi");
      }, 
      err => {
        this.toastr.error(err.error, "AngularWTApi");
      }
    );
  }
}

/**
 * DOCUMENTACIÓN
 * El objeto FileReader
 * El objeto FileReader permite que las aplicaciones web lean ficheros (o información en buffer) almacenados en el cliente de una forma
 * asíncrona, usando los objetos File o Blob dependiendo de los datos que se pretenden leer.
 * FileReader.readyState Read only
 * Devuelve un entero que indica el estado de FileReader. Puede ser uno de los siguientes:
 * EMPTY 0 no ha sido leído ningún dato aún.
 * LOADING 1 La información está siendo leída.
 * DONE 2 se ha completado la solicitud de la lectura.
 * FileRender.result Read only
 * el contenido del fichero. Esta propiedad es válida solo cuando la propiedad FileReader.readyState es 2, es decir, cuando la lectura
 * ha finaliado. El formato de la información depende de los métodos usados al iniciar la operación de lectura.
 * FileReader.readAsDataURL()
 * Comienza la lectura del contenido del objeto Blob, una vez termianda el atributo result contiene un data: URL que representa los datos
 * del fichero.
 *
 * LIBRERÍA TOASTR
 * Para instalar:
 * npm install ngx-toastr --save
 * Agregar al Module:
 * import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 * import { ToastrModule } from 'ngx-toastr';
 * si se utiliza una versión menor de CLI 6 agregar esto en styles al angular.json
 * "node_modules/ngx-toastr/toastr.css"
 * Es una librería para crear notificaciones de 4 tipos, informativas(info), éxito(success), advertencia(warning) y error (danger), aunado
 * toastr cuenta con otras opciones como * Posición donde va a aparecer la notificación * Animación de entrada y salida * Duración de
 * mostrar y tiempo en ocultar * Agregar un botón de cerrar * Mostrar barra de progreso del tiempo que falta para cerrar * Función en caso
 * de hacer clic a la notificación.
 */


 // Esto es una prueba para el branch version 2