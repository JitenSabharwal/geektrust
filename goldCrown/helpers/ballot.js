
const { matchEmblem } = require('./rule')
const messageList = require('../content/messageList')
const { genRandmNumber } = require('./util')
const kingdoms = require('../content/kingdoms')

class Ballot {
  constructor(messageList, breakerOfChains, competing) {
    this.competing = competing || []
    this.messageList = messageList || []
    this.defaultCount = breakerOfChains.messageCount
  }
  start() {
    this.shuffleMessage()
  }
  shuffleMessage() {
    const rdmNo = genRandmNumber(this.defaultCount, this.messageList.length - 1)
    this.messages = rdmNo.map(x => messageList[x])
    this.mapAllies()
  }
  mapAllies() {
    this.ballotResult = this.messages.reduce((acc, val) => {
      const allie = kingdoms.find(k => matchEmblem(k.emblem, val))
      const { emblem } = allie
      if (emblem) {
        acc[emblem] = acc[emblem] ? acc[emblem] + 1 : 1
      }
      return acc
    }, {})
    console.log(this.ballotResult)
  }
}

module.exports = Ballot