/* Invocamos/Importamos las dependencias que necesitamos */
var gulp = require( 'gulp' ),
    sass = require( 'gulp-sass' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    cssnano = require( 'gulp-cssnano' ),
    argv = require( 'yargs' ) .argv,
    gulpif = require( 'gulp-if' ),
    concat = require( 'gulp-concat' ),
    uglify = require( 'gulp-uglify' ),
    imagemin = require( 'gulp-imagemin' ),
    /* Configuración */ 
    path = {
        scss: './assets/scss',
        css: './assets/css',
        js: './assets/js',
        img: './assets/img'
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
    return gulp .src( path .scss + '/*.scss' )       /* Indicamos archivos para procesar */
        .pipe( sourcemaps .init( {            /* Inicializa la dependencia 'sourcemaps' para empezar a guardar mapas de archivo de Sass */
            loadMaps: true                    /* Carga mapas de archivo de Sass existentes */
        }))           
        .pipe( sass() )                       /* Procesamos los archivos Sass a CSS */
            .on( 'error', sass .logError )    /* Captura los eventos (en este caso el evento 'error') */
        .pipe( gulpif( isProduction, cssnano(), sourcemaps .write( './maps' ) ) )                     /* Minificación de archivos CSS condicionada a SI el proyecto es lanzado para producción usando el flag --prod minifica el CSS, SI NO: Entonces escribe los mapas de archivo de Sass*/
        .pipe( gulp .dest( path .css ) );     /* Indicamos el destino de los archivos procesados */
    done();
});
/* Task 'concat' */
gulp .task( 'concat', ( done ) => {
    return gulp .src([                               /* Array de archivos para procesar (En el orden que se pongan se van a concatenar) */
        path .js + '/start.js',
        path .js + '/main.js',
        path .js + '/end.js'
    ])
        .pipe( concat( 'master.js' ) )        /* Función para concatenar archivos (nombre del archivo final) */
        .pipe( gulp .dest( path .js ) );      /* Indicamos el destino de los archivos procesados */
    done();
});
/* Task 'compress' */ 
gulp .task( 'compress', gulp .series( [ 'concat' ] ), ( done ) => {
    return gulp .src( path .js + '/master.js' )      /* Indicamos el archivo a procesar */
        .pipe( uglify() )
            .on( 'error', console .error .bind( console ) )     /* Captura los eventos (en este caso el evento 'error') para que se impriman en la consola */
        .pipe( gulp .dest( path .js + '/min' ) );               /* Indicamos el destino de los archivos procesados */
    done();
});
/* Task 'imagemin' */ 
gulp .task( 'imagemin', ( done ) => {
    return gulp .src([ 
        path .img + '/*.{jpg,jpeg,png}',        /* Indicamos los archivos a procesar. En este caso solo las extensiones jpg, jpeg y png usando globs */
        '!' + path .img + '/full-stack.jpeg',   /* Archivo excluido por la tarea usando el glob ! (Símbolo de exclamación) */
        '!' + path .img + '/productos/'         /* Directorio excluido por la tarea usando el glob ! (Símbolo de exclamación) */
    ])                                      
        .pipe( imagemin() )                          /* Función para minificar imagenes: PNG, JPG, GIF y SVG */
        .pipe( gulp .dest( path .img + '/*' ) )      /* Indicamos el destino de los archivos procesados */
    done();
});
/* Task 'watch' */    
gulp .task( 'watch', ( done ) => {
    gulp .watch( path .scss + '/**/*.scss', gulp .series( 'style' ) );   /* Observa cambios en la ruta asignada (** Patrón goblin) */
    console .log( '>> Production:', isProduction );
    done();
});