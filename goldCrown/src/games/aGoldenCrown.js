const KingDom = require('../../helpers/kingdom')
const kingdoms = require('../../content/kingdoms')
const {
  kingName = '',
  aGoldenCrown
} = require('../../content/gameContent')
const { createQuestion, askQuestion, createList, heading, content, output } = require('../../helpers/cmdPrompt')

class GoldenCrown {
  constructor() {
    this.ruler = ''
    this.kingdom = ''
    this.king = kingName
    this.initalChoices = ['Select KingDom', 'Run Demo 1']
    this.startGame = this.startGame.bind(this)
    this.selectKingdom = this.selectKingdom.bind(this)
  }
  start() {
    heading(aGoldenCrown.name)
    content(aGoldenCrown.problem)
    this.initialize()
  }
  // Setup the inital game
  initialize() {
    const choices = this.initalChoices.map((k, i) => ({ name: k, value: i }))
    const message = createList('Initate Request', choices)
    const callBacks = [this.selectKingdom, this.run]
    askQuestion(message).then(ans => {
      const [key] = Object.values(ans)
      const callback = callBacks[key]
      return callback ? callback() : false
    })
  }
  // Start new game
  startGame(kingdom) {
    this.kingdom = new KingDom(kingdom)
    this.inGame()
  }
  // In between of the game
  inGame() {
    const choices = aGoldenCrown.questions.map((q, i) => ({ name: q, value: i + 1 }))
    const message = createList('Question', choices)
    askQuestion(message)
      .then(ans => {
        ans = ans['Question']
        const { supports } = this.kingdom
        switch (ans) {
          case 1: output(this.ruler || 'None')
            this.inGame()
            break;
          case 2: output(supports.length && this.ruler ? supports.join(', ') : 'None')
            this.inGame()
            break;
          case 3: this.getSupport()
            break;
        }
      })
  }
  // Select A Kingdom
  selectKingdom() {
    const choices = kingdoms.map(k => {
      return { name: k.kingdom, value: k.kingdom, message: 'Select a kingdom' }
    })
    const message = createList('Select a kingdom', choices)
    askQuestion(message)
      .then(ans => this.startGame(ans['Select a kingdom']))
  }

  setRuler() {
    if (this.kingdom.supports.length > 2) {
      this.ruler = this.kingdom.kingdom
    }
  }
  // Ask for SUpport
  getSupport() {
    const message = createQuestion('supportMsg', "Enter the message like '<Kindom>, <message>' or enter 'Q'to go back")
    askQuestion(message).then(ans => {
      const [supportKingdom, msg] = ans['supportMsg'].split(',')
      if (ans['supportMsg'] === 'Q') {
        return this.inGame()
      }
      if (!supportKingdom || !msg) {
        console.log('\n ***** Give proper message ******* \n')
      } else {
        this.kingdom.newSupport(supportKingdom, msg)
      }
      this.setRuler()
      this.getSupport()
    })
  }
  
  run() {

  }
}
module.exports = GoldenCrown