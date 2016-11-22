var menubar = require('menubar');
var ipc = require('electron').ipcMain;
var xray = require('x-ray')();

var callCount = 0;
var index = 0;

var mb = menubar({
  width: 570,
  height: 800,
  preloadWindow: true
});

// mb.on('ready', function() {
//   mb.window.openDevTools();
// });

var fetchCaps = function(callback) {
  var url = 'http://www.incicaps.com';

  if (index) {
    url += '/ax/?ne=caps_more&nw=kapak&limits=' + index + '&itip=&ne1=';
  }

  xray(url, '.content_left-in', [
    {
      title: '.content_middle_left h4',
      caps: '.content_middle_left img@src',
      src: '.content_middle_left img@data-original',
      desc: '.content_middle_left p',
      video: '.content_middle_left video source@src',
      poster: '.content_middle_left video@poster',
      author: {
        avatar: '.content_middle_right .uye_ozet img@src',
        nick: '.content_middle_right .uye_ozet h2'
      }
    }
  ])(function(err, data) {
    callback(err, data);
  });
};

ipc.on('CapsRequested', function(e, data) {
  fetchCaps(function(err, capsList) {
    capsList = capsList.map(function(caps) {
      var meta = caps.author.nick.trim().split('\n');
      var nick = meta[0];
      var info = meta[1].trim();
      caps.author.nick = '<p>' + nick + '</p><p>' + info + '</p>';

      return caps;
    });
    e.sender.send('CapsFetched', capsList);
  });

  index = (callCount + 1) * 5 + 15;
  callCount++;
});
