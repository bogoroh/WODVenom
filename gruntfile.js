module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 5080,
          base: 'www',
          hostname: 'localhost',
          livereload: 35720
        }
      }
    },

    sass: {
      dist: {
        files: {
          'www/css/main.css':'pre/sass/*.scss'
        }   
      }
    },

    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: 'pre/**/*.scss',
        tasks: ['sass']
      },
      css: {
        files:'www/css/**/*.css'
      },
      html:{
        files: 'www/**/*.html'
      },
      js:{
        files: 'js/**/*.js'
      }
    },

    wiredep:{
      target:{
        src: [
        'www/index.html'
        ]
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-sass');




  // Default task(s).
  // Always put watch on last because it's going to continue run
  grunt.registerTask('serve', ['connect','sass','wiredep','watch']);

};