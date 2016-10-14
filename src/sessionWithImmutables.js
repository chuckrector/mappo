"use strict"

// not all of the session is currently immutable.js-ified, so this converts
// the appropriate parts. the use-case being, state was just loaded from disk
module.exports = inputSession => {
  const session = Object.assign({}, inputSession)

  if (session.ui) {
    if (session.ui.camera) {
      session.ui.camera = Map(session.ui.camera)
    }
    if (session.ui.layerHidden) {
      session.ui.layerHidden = List(session.ui.layerHidden)
    }
  }

  if (session.plots) {
    session.plots = fromJS(session.plots)
  }

  if (session.map) {
    session.map = fromJS(session.map)
  }

  return session
}
