var ipc = window.require('electron').ipcRenderer;

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
      },
      refresh: function() {
        vue.isLoading = true;
        ipc.send('RefreshCaps');
      }
    }
  });

  ipc.on('CapsFetched', function(err, capsList) {
    vue.capsList = vue.capsList.concat(capsList);
    vue.isLoading = false;
  });

  ipc.on('CapsRefreshed', function(err, capsList) {
    vue.capsList = capsList;
    vue.isLoading = false;
  });

});
