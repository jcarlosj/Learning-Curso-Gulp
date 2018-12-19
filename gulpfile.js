/* Invocamos/Importamos las dependencias que necesitamos */
var gulp = require( 'gulp' ),
    sass = require( 'gulp-sass' ),
    /* Configuración */ 
    path = {
        scss: './assets/scss',
        css: './assets/css'
    };

/* Task 'style' */    
gulp .task( 'style', () => {
    gulp .src( path .scss + '/*.scss' )       /* Indicamos archivos para procesar */
        .pipe( sass() )                       /* Procesamos los archivos Sass a CSS */
        .pipe( gulp .dest( path .css ) );     /* Indicamos el destino de los archivos procesados */
});