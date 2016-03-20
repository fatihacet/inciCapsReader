menubar         = require 'menubar'
ipc             = require 'ipc'
xray            = require('x-ray')()
mb              = menubar
  width         : 600
  height        : 800
  preloadWindow : yes


mb.on 'ready', ->
  mb.window.openDevTools()


fetchCaps = (callback) ->

  xray('http://incicaps.com', '.content_left-in .content_middle_left ', [{
    title  : 'h4',
    caps   : 'img@src',
    src    : 'img@data-original',
    desc   : 'p',
    video  : 'video source@src',
    poster : 'video@poster'
  }])( (err, data) -> callback(err, data) )


ipc.on 'CapsRequested', (event, data) ->
  fetchCaps (err, caps) ->
    event.sender.send 'CapsFetched', err, caps
