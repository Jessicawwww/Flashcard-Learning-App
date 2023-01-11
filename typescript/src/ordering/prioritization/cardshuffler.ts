import { CardStatus } from '../../cards/cardstatus'
import { CardOrganizer } from '../cardorganizer'

function newCardShuffler (): CardOrganizer {
  return {

    /**
     * Randomly shuffles the provided cards.
     *
     * @param cards The {@link CardStatus} objects to order.
     * @return The shuffled cards.
     */
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      const c = cards.slice()
      c.sort(() => Math.random() - 0.5)
      return c
    }
  }
}

export { newCardShuffler }
