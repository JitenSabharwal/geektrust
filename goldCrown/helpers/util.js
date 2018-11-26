
module.exports = {
  getLettersWithCount : str => str.toLowerCase().split('').reduce((acc, val) => {
    acc[val] = acc[val] ? ++acc[val] : 1
    return acc
  }, {}),
  
  findExistence : (sub, obj) => {
    const keys = Object.keys(sub)
    for (let k of keys) {
      if (!obj[k] || obj[k] < sub[k]) return false
    }
    return true
  },
  genRandmNumber : (count, limit) => {
    const numbers = []
    while(numbers.length <= count) {
      const num = Math.floor(Math.random() * (limit - 1) ) + 1
      if (numbers.indexOf(num) < 0) {
        numbers[numbers.length] = num
      }
    }
    return numbers
  },
  getEmblem : (kingdoms, kingdom) => {
    return kingdoms.reduce((acc, val) => {
      if (val.kingdom && val.kingdom.toLowerCase() === kingdom.toLowerCase()) {
        acc = val.emblem
      }
      return acc
    }, '')
  }
}