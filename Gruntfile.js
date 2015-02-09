module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          paths: ["./public/stylesheets"]
        },
        files: {
          "./public/stylesheets/main.css": "./public/stylesheets/main.less"
        }
      }
    },
    watch: {
      styles: {
        // Which files to watch (all .less files recursively in the less directory)
        files: ['./public/stylesheets/less/main/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    },
    execute: {
      target: {
        src: ['app.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-execute');

  grunt.registerTask('default', ['less','watch']);
};