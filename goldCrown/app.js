const KingDom = require('./helpers/kingdom')
const { heading, askQuestion, createQuestion, createList } = require('./helpers/cmdPrompt')
const { title1, title2, problem1, problem2, questions } = require('./content/gameContent')
const kingdoms = require('./content/kingdoms')

class App {
  constructor() {
    this.ruler = ''
    this.kingdom = ''
    heading(title1)
    heading(title2)
    this.initialize()
  }
  // Setup the inital game
  initialize() {
    const initalChoices = ['Select KingDom', 'Run Demo Problem 1', 'Run Demo Problem 2']
    const choices = initalChoices.map((k, i) => ({ name: k, value: i + 1 }))
    const message = createList('Initate Request', choices)
    askQuestion(message).then(ans => {
      ans = ans['Initate Request']
      switch (ans) {
        case 1: this.selectKingdom()
          break;
        case 2: this.run('Demo1')
          break;
        case 3: this.run('Demo2')
          break;
      }
    })
  }

  // Start new game
  startGame(kingdom) {
    this.kingdom = new KingDom(kingdom)
    console.log(this.kingdom)
    this.inGame()
  }
  // In between of the game
  inGame() {
    const choices = questions.map((q, i) => ({ name: q, value: i + 1 }))
    const message = createList('Select', choices)
    askQuestion(message)
      .then(ans => {
        ans = ans['Select']
        const { supports } = this.kingdom
        switch (ans) {
          case 1: console.log(this.ruler || 'No one')
            this.inGame()
            break;
          case 2: console.log(supports.length ? supports.join(', ') : 'No allies')
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
  // Ask for SUpport
  getSupport() {
    const message = createQuestion('supportMsg', "Enter the message with 'Kindom, message'")
    askQuestion(message).then(ans => {
      const [supportKingdom, msg] = ans['supportMsg']
      this.kingdom.newSupport(supportKingdom , msg)
      if (this.kingdom.supports.length > 2) {
        this.ruler = this.kingdom.kingdom
      }
      this.inGame()
    })
  }
}
let a = new App()