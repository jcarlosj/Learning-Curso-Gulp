/* Gracias a 'browserify' se pueden importar archivos aquí 
 * Lo hemos indicado previamente en la tarea 'browserify' en Gulp */
var start = require( './start' ),   /* Archivo convencional de JavaScript */
    unique = require( 'uniq' );     /* Dependencia de NPM (No necesitamos instalarla como dependencia en el archivo de configuracipon de Gulp) */

// Usando un paquete de NPM
let data = [ 1, 2 ,2 ,3 ,4 ,5 ,5, 5, 6 ];
console .log( unique( data ) );

var item = 3,
    y = start( item );
console .log( 'item(', item, '):', y );