const { askQuestion, createList } = require('../helpers/cmdPrompt')
const { gameList } = require('../content/gameContent')
const aGoldenCrown = require('./games/aGoldenCrown')
const breakerOfChains = require('./games/breakerOfChains')

class Game {
  constructor() {
    this.initalizeGame()
  }
  initalizeGame() {
    const choices = gameList.map((k, i) => ({ name: k, value: i + 1 }))
    const message = createList('Choose the game to play', choices)
    askQuestion(message).then(this.startGame).then(this.play).catch(console.log)
  }
  startGame(ans) {
    const [key] = Object.values(ans)
    switch(key) {
      case 1: return new aGoldenCrown()
      case 2: return new breakerOfChains(this)
      default: return false
    }
  }
  play(obj) {
    if (!obj) this.gameExit()
    obj.start()
  }
  gameExit() {
    console.log('Exiting Game')
  }
}

module.exports = new Game()