"use strict";
exports.__esModule = true;
exports.newCardShuffler = void 0;
function newCardShuffler() {
    return {
        /**
         * Randomly shuffles the provided cards.
         *
         * @param cards The {@link CardStatus} objects to order.
         * @return The shuffled cards.
         */
        reorganize: function (cards) {
            var c = cards.slice();
            c.sort(function () { return Math.random() - 0.5; });
            return c;
        }
    };
}
exports.newCardShuffler = newCardShuffler;
