/* Invocamos/Importamos las dependencias que necesitamos */
var gulp = require( 'gulp' ),
    sass = require( 'gulp-sass' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    cssnano = require( 'gulp-cssnano' ),
    argv = require( 'yargs' ) .argv,
    /* Configuración */ 
    path = {
        scss: './assets/scss',
        css: './assets/css'
    },
    isProduction;
/* Valida si el proyecto está en Desarrollo (o Producción) */
if( argv .prod ) {
    isProduction = true;
}
else {
    isProduction = false;
}

/* Task 'style' */    
gulp .task( 'style', ( done ) => {
    gulp .src( path .scss + '/*.scss' )       /* Indicamos archivos para procesar */
        .pipe( sourcemaps .init( {            /* Inicializa la dependencia 'sourcemaps' para empezar a guardar mapas de archivo de Sass */
            loadMaps: true                    /* Carga mapas de archivo de Sass existentes */
        }))           
        .pipe( sass() )                       /* Procesamos los archivos Sass a CSS */
            .on( 'error', sass .logError )    /* Captura los eventos (en este caso el evento 'error') */
        .pipe( cssnano() )                     /* Minificación de archivos CSS */
        .pipe( sourcemaps .write( './maps' ) )   /* Escribe los mapas de archivo de Sass */
        .pipe( gulp .dest( path .css ) );     /* Indicamos el destino de los archivos procesados */
    done();
});
/* Task 'watch' */    
gulp .task( 'watch', ( done ) => {
    gulp .watch( path .scss + '/**/*.scss', gulp .series( 'style' ) );   /* Observa cambios en la ruta asignada (** Patrón goblin) */
    console .log( '>> Production:', isProduction );
    done();
});