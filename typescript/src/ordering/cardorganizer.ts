import { CardStatus } from '../cards/cardstatus'

interface CardOrganizer {

  /**
     * Orders, and potentially filters, the provided cards.
     *
     * @param cards The {@link CardStatus} objects to order.
     * @return The provided cards, sorted and/or filtered based on the implementing class.
     */
  reorganize: (cards: CardStatus[]) => CardStatus[]

}

/**
 * A <b>composite</b> class that wraps other {@link CardOrganizer} instances and a list of {@link CardStatus} cards.
 */
function newCombinedCardOrganizer (cardOrganizers: CardOrganizer[]): CardOrganizer {
  return {

    /**
         * Applies each {@link CardOrganizer} instance to the provided collection of cards. This method makes no guarantees
         * about the order in which the underlying sorters are invoked; the final order may be dependent on this order when
         * conflicting priorities are involved.
         *
         * @param cards The {@link CardStatus} objects to order.
         * @return The final, filtered and ordered list of cards.
         */
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      let status = cards.slice()
      for (const cardOrganizer of cardOrganizers) {
        status = cardOrganizer.reorganize(status)
      }
      return status
    }
  }
}

export { CardOrganizer, newCombinedCardOrganizer }
