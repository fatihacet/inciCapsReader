var taskLoader = require('load-grunt-tasks');
var livereload = require('electron-livereload');
var electron = livereload.server();

module.exports = function(grunt) {
  taskLoader(grunt);

  grunt.initConfig({
    watch: {
      options: { nospawn: true },
      client: {
        files: ['src/**/*.js', 'src/**/*.css', 'src/index.html'],
        tasks: ['restart-electron']
      }
    }
  });

  grunt.registerTask('default', function() {
    electron.start();
    return grunt.task.run('watch');
  });

  grunt.registerTask('restart-electron', function() {
    return electron.restart();
  });

  grunt.registerTask('reload-electron', function() {
    return electron.reload();
  });
};
