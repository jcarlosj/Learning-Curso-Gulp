// start.js
'use strict'

function first_test() {
    return 'Esto es una prueba!';
}
// main.js
let firstTest = first_test();

if( firstTest == undefined  ) {
    var secodTest = function() {
        return firstTest;
    }
}
// end.js
var square = function( x ) {
    return x * x;
}