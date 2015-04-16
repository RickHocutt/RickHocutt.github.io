module.exports = function (grunt) {
  'use strict';

    grunt.initConfig({
      pkg: grunt.file.readJSON('./package.json'),

      shell : {
        jekyllServe : {
          command : 'jekyll serve'
        }
      },

      watch : {
        files : [ '_layouts/*.html',
                  '_posts/*.markdown',
                  'css/*.css',
                  '_config.yml',
                  'index.html' ],
        tasks : [ 'shell:jekyllServe' ],
        options : {
          spawn : false,
          interrupt : true,
          atBegin : true,
          livereload : true
        }
      }
    });

    grunt.loadNpmTasks('grunt-shell');

    // register custom grunt tasks
    grunt.registerTask( 'default', ['shell:jekyllServe'] )
};
