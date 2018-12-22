(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* Gracias a 'browserify' se pueden importar archivos aquí 
 * Lo hemos indicado previamente en la tarea 'browserify' en Gulp */
var start = require( './start' ),   /* Archivo convencional de JavaScript */
    unique = require( 'uniq' );     /* Dependencia de NPM (No necesitamos instalarla como dependencia en el archivo de configuracipon de Gulp) */

// Usando un paquete de NPM
let data = [ 1, 2 ,2 ,3 ,4 ,5 ,5, 5, 6 ];
console .log( unique( data ) );

var item = 3,
    y = start .a( item );
console .log( 'item(', item, '):', y );
},{"./start":2,"uniq":3}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
"use strict"

function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return list
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique

},{}]},{},[1]);
