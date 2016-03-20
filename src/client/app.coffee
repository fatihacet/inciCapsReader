ipc = require 'ipc'

window.addEventListener 'load', -> ipc.send 'CapsRequested'

ipc.on 'CapsFetched', (err, capsList) ->

  main    = document.getElementById 'main-container'
  wrapper = document.createElement 'div'
  wrapper.className = 'caps-container'

  for caps in capsList
    { title, caps, src, desc, video, poster } = caps

    template =  """
      <h4>#{title or ''}</h4>
      <img src="#{caps or src}" />
      <p>#{desc or ''}</p>
    """

    el = document.createElement 'div'
    el.className = 'caps'
    el.innerHTML = template

    wrapper.appendChild el

  main.appendChild wrapper
