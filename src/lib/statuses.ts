export type CharStatus = 'unknown' | 'absent' | 'present' | 'correct'

const checkValidGuess = (
  validWord: string,
  guess: string,
  statuses: Array<string>
) => {
  var validWordArray = Array.from(validWord)
  //console.log(validWord)
  for (let i = 0; i < guess.length; i++) {
    if (statuses[i] === 'correct') {
      if (validWordArray[i] !== guess[i]) {
        //console.log(validWord, "green doens't match", i)
        //console.log(validWord, validWordArray, guess)
        return false
      }
      validWordArray[i] = ''
    } else if (statuses[i] === 'present') {
      var found = false
      for (let j = 0; j < validWordArray.length; j++) {
        if (
          i !== j && // can't be same index b/c yellow
          validWordArray[j] === guess[i] && // make sure match
          statuses[j] !== 'correct'
        ) {
          // isn't reserved for green
          //console.log(validWord)
          found = true
          validWordArray[j] = ''
          break
        }
      }
      if (!found) {
        //console.log(validWord, "yellow doens't match")
        return false
      }
    } else {
      for (let j = 0; j < validWordArray.length; j++) {
        if (validWordArray[j] === guess[i] && statuses[j] !== 'correct') {
          //console.log(validWord, "grey doens't match", i)
          return false
        }
      }
    }
  }
  return true
}

export const getValidGuesses = (
  validWords: Array<string>,
  guess: string,
  statuses: Array<string>
) => {
  var remainder = validWords.filter((validWord) =>
    checkValidGuess(validWord, guess, statuses)
  )
  return remainder
}
