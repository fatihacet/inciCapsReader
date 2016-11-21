var menubar = require('menubar');
var ipc = require('ipc');
var xray = require('x-ray')();

var mb = menubar({
  width: 600,
  height: 800,
  preloadWindow: true
});

mb.on('ready', function() {
  mb.window.openDevTools();
});

var fetchCaps = function(callback) {
  xray('http://incicaps.com', '.content_left-in .content_middle_left ', [
    {
      title: 'h4',
      caps: 'img@src',
      src: 'img@data-original',
      desc: 'p',
      video: 'video source@src',
      poster: 'video@poster'
    }
  ])(function(err, data) {
    callback(err, data);
  });
};

ipc.on('CapsRequested', function(e, data) {
  fetchCaps(function(err, caps) {
    e.sender.send('CapsFetched', err, caps);
  });
});
