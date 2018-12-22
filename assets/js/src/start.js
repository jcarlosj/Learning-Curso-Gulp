/* start.js */
'use strict'

/* Usando module.exports es como 'browserify' nos permite importar archivos de la misma manera que lo hace NodeJS */
module .exports = function ( x ) {
    x = x + 1;
    return x;
}