var ipc = require('ipc');

window.addEventListener('load', function() {
  ipc.send('CapsRequested');

  var vue = new Vue({
    el: '#wall',
    data: {
      capsList: [],
      isLoading: true
    },
    methods: {
      loadMore: function() {
        ipc.send('CapsRequested');
      }
    }
  });

  ipc.on('CapsFetched', function(err, capsList) {
    var items = vue.capsList.concat(capsList);
    vue.capsList = items;
    vue.isLoading = false;
  });
});
