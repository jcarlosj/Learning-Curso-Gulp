/* start.js */
'use strict'

/* Usando module.exports es como 'browserify' nos permite importar archivos de la misma manera que lo hace NodeJS */
module .exports = {         /* Convertimos en un objeto */
    a: function ( x ){      /* Declaramos una nueva función */
        x = x + 1;
        return x;
    },
    b: function( x ) {
        x = x - 1;
        return x;
    }
}