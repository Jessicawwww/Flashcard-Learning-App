"use strict";
exports.__esModule = true;
exports.newCombinedCardOrganizer = void 0;
/**
 * A <b>composite</b> class that wraps other {@link CardOrganizer} instances and a list of {@link CardStatus} cards.
 */
function newCombinedCardOrganizer(cardOrganizers) {
    return {
        /**
             * Applies each {@link CardOrganizer} instance to the provided collection of cards. This method makes no guarantees
             * about the order in which the underlying sorters are invoked; the final order may be dependent on this order when
             * conflicting priorities are involved.
             *
             * @param cards The {@link CardStatus} objects to order.
             * @return The final, filtered and ordered list of cards.
             */
        reorganize: function (cards) {
            var status = cards.slice();
            for (var _i = 0, cardOrganizers_1 = cardOrganizers; _i < cardOrganizers_1.length; _i++) {
                var cardOrganizer = cardOrganizers_1[_i];
                status = cardOrganizer.reorganize(status);
            }
            return status;
        }
    };
}
exports.newCombinedCardOrganizer = newCombinedCardOrganizer;
