const {matchEmblem} = require('./rule')
const kingdoms = require('../content/kingdoms')
const {getEmblem} = require('./util')

class Kingdom {
  constructor(kingdom) {
    this.kingdom = kingdom || kingdoms[kingdoms.length -1]
    this.supports = []
  }  
  newSupport(kingdom, message) {
    const supporting = this.supportedBy()
    if (supporting.indexOf(kingdom) < 0 ) {
      this._newSupport = kingdom
      this._newSupportMsg = message
      this._newSupportResult = this.askSupport(message)
      this.addSupport(kingdom)
    }
    return this
  }

  askSupport(message) {
    const emblem = getEmblem(kingdoms, this._newSupport)
    return matchEmblem(emblem, message)
  }

  addSupport(kingdom) {
    console.log(this.kingdom, kingdom)
    if (this.kingdom.toUpperCase() !== kingdom.toUpperCase())
    this.supports = [...this.supports, kingdom]
  }
  
  supportedBy() {
    return this.supports || []
  }
}
module.exports = Kingdom