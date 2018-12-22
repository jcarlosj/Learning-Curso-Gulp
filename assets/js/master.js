/* start.js */
'use strict'

alert( 'Bienvenido al curso de Gulp 3.x!' );
function first_test() {
    return 'Esto es una prueba!';
}
/* main.js */
var firstTest = first_test();

if( firstTest == undefined  ) {
    var secondTest = function() {
        return firstTest;
    };
};
// end.js
var square = function( x ) {
    return x * x;
}