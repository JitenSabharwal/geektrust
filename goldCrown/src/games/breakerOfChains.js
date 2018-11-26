const KingDom = require('../../helpers/kingdom')
const kingdoms = require('../../content/kingdoms')
const messageList = require('../../content/messageList')
const {
  breakerOfChains
} = require('../../content/gameContent')
const { createQuestion, askQuestion, createList, heading, content, output } = require('../../helpers/cmdPrompt')
const Ballot = require('../../helpers/ballot')

class BreakerOfChains extends Ballot {
  constructor() {
    super(messageList, breakerOfChains)
    this.ruler = ''
    this.kingdom = ''
    this.initalChoices = ['Select KingDoms for competing', 'Run Demo 1'].concat(breakerOfChains.questions)
    this.startGame = this.startGame.bind(this)
    this.selectKingdoms = this.selectKingdoms.bind(this)
    this.run = this.run.bind(this)
    this.getRuler = this.getRuler.bind(this)
    this.getAllies = this.getAllies.bind(this)
    this.inGame = this.inGame.bind(this)
  }
  start() {
    heading(breakerOfChains.name)
    content(breakerOfChains.problem)
    this.inGame()
  }
  getRuler() {
    output(this.ruler || 'None')
  }
  getAllies() {
    const { supports = [] } = this.kingdom
    output(supports.length && this.ruler ? supports.join(', ') : 'None')
  }
  // Start new game
  startGame(arr) {
    this.shuffleMessage()
    arr.map((kingdom, i) => {
      kingdom = kingdom.toUpperCase()
      this.competing[kingdom] = new KingDom(kingdom)
    })
    this.inGame()
  }
  // Playing the game
  inGame() {
    const choices = this.initalChoices.map((k, i) => ({ name: k, value: i }))
    const message = createList('Select ', choices)
    const callBacks = [this.selectKingdoms, this.run, this.getRuler, this.getAllies]
    return askQuestion(message)
      .then(ans => {
        const [key] = Object.values(ans)
        const callback = callBacks[key]
        return callback ? callback() : false
      }).then(this.inGame)
  }
  // Select A Kingdom
  selectKingdoms() {
    const message = createQuestion('kingdoms', `Enter the kingdoms competing to be the ruler from ${kingdoms.map(k => k.kingdom).join(', ')} <separated by ','>: `)
    return askQuestion(message)
      .then(ans => this.startGame(ans['kingdoms'].split(',').map(a => a.trim())))
  }
  // Define the ruler
  setRuler() {
    if (this.kingdom.supports.length > 2) {
      this.ruler = this.kingdom.kingdom
    }
  }
  run() {
    const demo = new problem1Demo()
  }
}

module.exports = BreakerOfChains
