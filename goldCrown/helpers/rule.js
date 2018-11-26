const {
  getLettersWithCount,
  findExistence
} = require('./util')

function matchEmblem (emblem, message) {
  const letterMap = getLettersWithCount(emblem)
  const messageMap = getLettersWithCount(message)
  return findExistence(letterMap, messageMap)
}
function matchRulers (compition, ballotResult) {
  
}
module.exports = {
  matchEmblem,
  matchRulers,
}