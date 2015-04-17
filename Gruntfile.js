module.exports = function (grunt) {
  'use strict';

    grunt.initConfig({
      pkg: grunt.file.readJSON('./package.json'),

      copy: {
        main: {
          files: [
            {
              expand: true,
              flatten: true,
              cwd: 'bower_components/foundation/scss',
              src: ['normalize.scss'],
              dest: '_sass/',

              /* Rename the SCSS file to include the underscore naming convention. */
              rename: function (dest, matchedSrcPath) {
                /* Check if the Sass file has a leading underscore. */
                if (matchedSrcPath.substring(0, 1) !== '_') {
                  return dest + '_' + matchedSrcPath;
                }
              },
            },

            {expand: true, cwd: 'bower_components/foundation/scss/foundation/', src: ['**'], dest: '_sass/foundation'},

            {
              expand: true,
              flatten: true,
              src: ['bower_components/jquery/dist/jquery.min.js', 'bower_components/modernizr/modernizr.js', 'bower_components/foundation/js/foundation.min.js'],
              dest: 'js',
              filter: 'isFile'
            }
          ]
        }
      },

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
        tasks : [ 'copy', 'shell:jekyllServe' ],
        options : {
          spawn : false,
          interrupt : true,
          atBegin : true,
          livereload : true
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');

    // register custom grunt tasks
    grunt.registerTask( 'default', ['copy', 'shell:jekyllServe'] )
};
