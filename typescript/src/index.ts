import { CardStore, loadCards } from './data/store'
import { newCardDeck } from './ordering/cardproducer'
import { newCardShuffler } from './ordering/prioritization/cardshuffler'
import { newUI } from './ui'

/**
 * WHAT WAS DONE HERE!
 * 1. load command line options
 * 2. set up cards and card organizers depending on command line options
 * 3. create a card deck and the UI and start the UI with the card deck
 * A note about using yargs for your CLI:
 * .argv/.parse() may not work as expected in the latest version.
 * Instead, you can use .parseSync()
 * Commander.js is used here : refer to https://www.npmjs.com/package/commander#display-help-after-errors
 * Passing arguments through: node dist/index.js -h -i --order recent-mistakes-first --repetitions 1
 */

import { Command, InvalidArgumentError, Option } from 'commander'
import { CardOrganizer, newCombinedCardOrganizer } from './ordering/cardorganizer'
import { newMostMistakesFirstSorter } from './ordering/prioritization/mostmistakes'
import { newRecentMistakesFirstSorter } from './ordering/prioritization/recentmistakes'
import { newNonRepeatingCardOrganizer, newRepeatingCardOrganizer } from './ordering/repetition/cardrepeater'

const program = new Command()
function myParseInt (value: string, dummyPrevious: any): number {
  // parseInt takes a string and a radix
  const parsedValue = parseInt(value, 10)
  if (isNaN(parsedValue)) {
    throw new InvalidArgumentError('Not a number.')
  }
  return parsedValue
}
// load command line options
program
  .option('-i, --invertCards', 'If set, it flips answer and question for each card, promopting with the answer and ask user to provide corresponding quesiton.')
  .option('-r, --repetitions <order>', 'number of times to each card should be answered correctly. if not provided, every card is presented once, regardless of correctness', myParseInt)
program.addOption(new Option('-o, --order <order>', 'type of ordering to use, default random.').choices(['random', 'worst-first', 'recent-mistakes-first']))
// .option('-h, --help', 'show this help.')
program.addHelpCommand('assist [command]', 'show assistance')
program.parse(process.argv)
// pass cards file
console.log(process.argv.slice(2, 3))

const options = program.opts()
try {
  let cardStore: CardStore = loadCards(process.argv.slice(2, 3)[0])
  // console.log(options.invertCards)
  // const invert: boolean = options.invertCards
  if (options.invertCards !== undefined) {
    // console.log('here!')
    cardStore = cardStore.invertCards()
  }
  var cardOrganizer1: CardOrganizer = newCardShuffler()
  if (options.order === 'random') {
    cardOrganizer1 = newCardShuffler()
  } else if (options.order === 'worst-first') {
    cardOrganizer1 = newMostMistakesFirstSorter()
  } else if (options.order === 'recent-mistakes-first') {
    cardOrganizer1 = newRecentMistakesFirstSorter()
  }
  var cardOrganizer2: CardOrganizer = newNonRepeatingCardOrganizer()
  if (options.repetitions !== undefined) {
    cardOrganizer2 = newRepeatingCardOrganizer(options.repetitions)
  }
  const combinedCardOrganizer3: CardOrganizer = newCombinedCardOrganizer([cardOrganizer2, cardOrganizer1])
  const cardDeck = newCardDeck(
    cardStore.getAllCards(),
    combinedCardOrganizer3
  )

  newUI().studyCards(cardDeck)
} catch (err: any) {
  console.log(err.message)
}
