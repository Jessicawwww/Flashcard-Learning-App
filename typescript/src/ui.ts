import { FlashCard } from './cards/flashcard'
import { CardDeck } from './ordering/cardproducer'
// import readline from 'readline-sync'
import * as readline from 'readline-sync'

interface UI {
  studyCards: (producer: CardDeck) => void
}

function newUI (): UI {
  function cueAllCards (producer: CardDeck): void {
    for (const cardStatus of producer.getCards()) {
      const card = cardStatus.getCard()
      const correctAnswer = cueCard(card)
      cardStatus.recordResult(correctAnswer)
    }
  }

  function cueCard (card: FlashCard): boolean {
    console.log('\nNext cue: ' + card.getQuestion())
    const line = readline.question('answer> ')
    const success = card.checkSuccess(line)
    if (success) { console.log("That's correct!") } else {
      console.log('That is incorrect; the correct response was: ' +
                  card.getAnswer())
    }
    return success
  }

  return {

    /**
         * Prompts the user with {@link FlashCard} cards until the {@link CardProducer} is exhausted.
         * @param cardProducer The {@link CardProducer} to use for organizing cards.
         * @param learnTitles Whether to prompt with definitions and require the user to provide titles.
         */
    studyCards (producer: CardDeck): void {
      while (!producer.isComplete()) {
        console.log(`${producer.countCards()} cards to go...`)
        cueAllCards(producer)
        console.log('Reached the end of the card deck, reorganizing...')
        producer.reorganize()
      }
      console.log('Finished all cards. Yay.')
    }

  }
}

export { newUI }
