export class Product {
    // Se replica la tabla de la BD
    idProduct: string;
    Productname: string;
    Price: number;
    Description: string;
    Image: string;
}

/**
 * ng g cl product --spec false --type model
 * cl para generar una clase, spec false para no agregar fichero de pruebas unitarias y
 * type model para argumentar que el tipo será el modelo. En otras palabras agrega un tipo
 * definido, en este caso fue model, entonces el fichero se llamará product.model.ts
 */
