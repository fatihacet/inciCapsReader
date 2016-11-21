var ipc = require('ipc');

window.addEventListener('load', function() {
  ipc.send('CapsRequested');
  var vue = new Vue({
    el: '#container',
    data: {
      capsList: []
    }
  });

  ipc.on('CapsFetched', function(err, capsList) {
    list = capsList.map(function(caps) {
      return {
        title: caps.title,
        caps: caps.caps,
        src: caps.src,
        desc: caps.desc,
        video: caps.video,
        poster: caps.poster
      };
    });

    console.log(list);
    vue.capsList = list;
  });
});
