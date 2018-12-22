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
    del = require( 'del' ),
    browserify = require( 'browserify' ),
    transform = require( 'vinyl-source-stream' ),
    sync = require( 'browser-sync' ),
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
        .pipe( gulp .dest( path .css ) )      /* Indicamos el destino de los archivos procesados */
        .pipe( sync .stream() );              /* Genera un flujo o string de datos que va a sincronizar para poder inyectar los cambios de archivos Sass en el navegador */
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
        .pipe( gulp .dest( path .img + '/*' ) );     /* Indicamos el destino de los archivos procesados */
    done();
});
/* Task 'cleanup' */    
gulp .task( 'cleanup', ( done ) => {
    del( path .css + '/maps/*' );       /* Elimina todos los archivos del directorio maps (gracias al 'glob' * ) */
    del( path .css + '/maps/' );        /* Elimina el directorio 'maps' */
    done();
});
/* Task 'browserify' */    
gulp .task( 'browserify', ( done ) => {
    return browserify( path .js + '/src/master.js' )        /* La salida de 'browserify' es un string */
                .bundle()                                   /* Concatena todos los paquetes que se han solicitado */
                .pipe( transform( 'bundle.js' ) )           /* Convierte la salida de 'browserify' en un archivo y le asigna un nombre */
                .pipe( gulp .dest( path .js + '/min' ) );   /* Indicamos el destino de los archivos procesados */
    done();
});
/* Task 'js-sync': Se recomienda hacerlo de esta manera ya que no es recomendable inyectar JavaScript en los navegadores */ 
gulp .task( 'js-sync', ( done ) => {
    sync .reload();        /* Recarga el/los navegadores */
    done();
});
/* Task 'browsersync' */ 
gulp .task( 'browsersync', ( done ) => {
    /* Configuración */
    sync .init({        /* Inicializa el servidor de 'BrowserSync' */
        proxy: '',      /* Genera un servidor a partir de un servidor local existente, se puede especificar aquí (Ej: dominio.local ) */
        server: {       /* Genera un servidor local estático */
            baseDir: './',                             /* Ruta donde se encuentran los archivos estáticos */
            browser: [ 'firefox', 'google-chrome' ]    /* Sincronización de los navegadores donde se desea lanzar el servidor */
        }      
    }); 
    /* Observa por cambios en los archivos HTML */
    gulp .watch( './*.html' )
         .on( 'change', sync .reload );       /* Captura los eventos (en este caso el evento 'change') para el/los navegadores se recarguen */
    gulp. watch( path .scss + '/**/*.scss', gulp .series( 'style' ) ); /* Observa cambios en la ruta asignada (Gracias a sync.stream aqui inyectamos el CSS al navegador) y ejecuta la tarea 'styles' si observa cambios */
    gulp .watch( path .js + '/*.js', gulp .series( 'js-sync' ) );      /* Observa cambios en la ruta asignada y ejecuta la tarea 'js-sync' si observa cambios */
    done();
});
/* Task 'watch' */    
gulp .task( 'watch', ( done ) => {
    gulp .watch( path .scss + '/**/*.scss', gulp .series( 'style' ) );   /* Observa cambios en la ruta asignada (** Patrón goblin) */
    console .log( '>> Production:', isProduction );
    done();
});