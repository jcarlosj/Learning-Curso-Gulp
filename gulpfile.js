/* Invocamos/Importamos las dependencias que necesitamos */
var gulp = require( 'gulp' ),
    sass = require( 'gulp-sass' ),
    watch = require( 'gulp-watch' ),
    /* Configuración */ 
    path = {
        scss: './assets/scss',
        css: './assets/css'
    };

/* Task 'style' */    
gulp .task( 'style', ( done ) => {
    gulp .src( path .scss + '/*.scss' )       /* Indicamos archivos para procesar */
        .pipe( sass() )                       /* Procesamos los archivos Sass a CSS */
            .on( 'error', sass .logError )    /* Captura los eventos (en este caso el evento 'error') */
        .pipe( gulp .dest( path .css ) );     /* Indicamos el destino de los archivos procesados */
    done();
});
/* Task 'watch' */    
gulp .task( 'watch', ( done ) => {
    watch( path .scss + '/**/*.scss', () => {   /* Observa cambios en la ruta asignada (** Patrón goblin) */
        gulp .start( 'style' );                 /* Inicia las tareas que se le indiquen (en este caso 'style') */
    });       
    done();
});