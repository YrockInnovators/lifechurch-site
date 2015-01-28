module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {   
      dist: {
        src: [
          'js/libs/jquery.event.move.js',
          'js/libs/jquery.event.swipe.js',
          'js/libs/jquery.stellar.min.js',
          'js/components/*.js',
          'js/layout/*.js'
        ],
        dest: 'js/production.js',
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'js/production.min.js': ['<%= concat.dist.dest %>']
        }
      }
    } 

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['concat', 'uglify']);
};
