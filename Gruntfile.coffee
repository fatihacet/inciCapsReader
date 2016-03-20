taskLoader = require 'load-grunt-tasks'
livereload = require 'electron-livereload'
electron   = livereload.server()

module.exports = (grunt) ->

  grunt.loadTasks 'build/'
  taskLoader grunt

  grunt.initConfig

    coffee        :
      all         :
        options   :
          bare    : yes
        files     : [
          expand  : yes
          cwd     : 'src/'
          src     : '**/*.coffee'
          dest    : 'dist'
          ext     : '.js'
        ]

    watch         :
      options     :
        nospawn   : true # !IMPORTANT!
      client      :
        files     : [ 'src/client/**/*.coffee', 'src/index.html' ]
        tasks     : [ 'coffee', 'restart-electron' ]
      server      :
        files     : [ 'src/server/**/*.coffee' ]
        tasks     : [ 'coffee', 'restart-electron' ]

    grunt.registerTask 'default', ->
      electron.start()
      grunt.task.run 'coffee'
      grunt.task.run 'watch'

    grunt.registerTask 'restart-electron', ->
      electron.restart()

    grunt.registerTask 'reload-electron', ->
      electron.reload()
