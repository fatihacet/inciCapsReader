module.exports = (grunt) ->

  options       =
    all         :
      options   :
        bare    : yes
      files     : [
        expand  : yes
        cwd     : 'src/'
        src     : '**/*.coffee'
        dest    : 'dist/js'
        ext     : '.js'
      ]

  grunt.config 'coffee', options
