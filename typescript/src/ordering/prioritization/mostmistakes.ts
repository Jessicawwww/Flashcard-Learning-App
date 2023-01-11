import { CardStatus } from '../../cards/cardstatus'
import { CardOrganizer } from '../cardorganizer'

function newMostMistakesFirstSorter (): CardOrganizer {
  function numberOfFailures (cardStatus: CardStatus): number {
    return cardStatus.getResults().filter((e) => !e).length
  }

  return {
    /**
         * Orders the cards by the number of incorrect answers provided for them.
         *
         * @param cards The {@link CardStatus} objects to order.
         * @return The ordered cards.
         */
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      const c = cards.slice()
      c.sort((a, b) => numberOfFailures(a) > numberOfFailures(b) ? -1 : (numberOfFailures(a) < numberOfFailures(b) ? 1 : 0))
      return c
    }

  }
}

export { newMostMistakesFirstSorter }
