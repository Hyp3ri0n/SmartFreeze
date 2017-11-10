(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'assets/vendors/libs/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app/',
            // angular bundles
            '@angular/core': 'npm:@angular/core.umd.min.js',
            '@angular/common': 'npm:@angular/common.umd.min.js',
            '@angular/compiler': 'npm:@angular/compiler.umd.min.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser.umd.min.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic.umd.min.js',
            '@angular/http': 'npm:@angular/http.umd.min.js',
            '@angular/router': 'npm:@angular/router.umd.min.js',
            '@angular/forms': 'npm:@angular/forms.umd.min.js',
            // other libraries
            'rxjs': 'npm:rxjs'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            }
        }
    });
})(this);