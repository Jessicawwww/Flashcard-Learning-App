"use strict";
exports.__esModule = true;
exports.newCardDeck = void 0;
var cardstatus_1 = require("../cards/cardstatus");
/**
  * Initializes a new {@link CardDeck} instance.
  *
  * @param cards         The {@link FlashCard} cards to store in this deck, to be paired with a status into
  *                      a {@link CardStatus}.
  * @param cardOrganizer The (potentially composite) {@link CardOrganizer} instance to sort and filter the cards with
  *                      based on the correctness of responses.
  */
function newCardDeck(cards, cardOrganizer) {
    var status = cards.map(cardstatus_1.newCardStatus);
    return {
        /**
         * Retrieves the remaining stored cards.
         *
         * @return The {@link CardStatus} cards in this deck.
         */
        getCards: function () {
            return status.slice();
        },
        /**
         * Retrieves the associated card organizer.
         *
         * @return The {@link CardOrganizer} used to sort this deck.
         */
        getOrganizer: function () {
            return cardOrganizer;
        },
        /**
         * A helper method, that calls {@link CardOrganizer#reorganize(List)} with the global cards field and overwrites
         * it with the result.
         *
         * @return The final, filtered and ordered list of cards.
         */
        reorganize: function () {
            status = cardOrganizer.reorganize(status);
        },
        /**
         * Checks whether any more cards need to be tested.
         *
         * @return {@code true} if all cards have been filtered.
         */
        isComplete: function () {
            return status.length === 0;
        },
        /**
         * Gets the size of the remaining cards in this deck.
         *
         * @return The number of cards in this deck.
         */
        countCards: function () {
            return status.length;
        }
    };
}
exports.newCardDeck = newCardDeck;
