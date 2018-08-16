const patchChess = {}

patchChess.gives = { app: { view: true, menu: true } }
patchChess.needs = { sbot: { onClient: 'first' } }

patchChess.create = function (api) {
  const ssbChess = require('ssb-chess/index')
  return {
    app: {
      view: function (src) {
        if (src !== 'chess') return
        const container = document.createElement('div')

        // manuel overwrite of styles
        container.className = 'ssb-chess-container'
        container.style.position = 'absolute'
        container.style.width = '100vw'
        container.style.height = '100vh'
        container.style.maxWidth = '100vw'

        api.sbot.onClient(function (sbot) {
          ssbChess(container, sbot)
        })

        return container
      },

      menu: function () {
        return 'chess'
      },
    },
  }
}

module.exports = { app: patchChess }
