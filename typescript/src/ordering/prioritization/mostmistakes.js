"use strict";
exports.__esModule = true;
exports.newMostMistakesFirstSorter = void 0;
function newMostMistakesFirstSorter() {
    function numberOfFailures(cardStatus) {
        return cardStatus.getResults().filter(function (e) { return !e; }).length;
    }
    return {
        /**
             * Orders the cards by the number of incorrect answers provided for them.
             *
             * @param cards The {@link CardStatus} objects to order.
             * @return The ordered cards.
             */
        reorganize: function (cards) {
            var c = cards.slice();
            c.sort(function (a, b) { return numberOfFailures(a) > numberOfFailures(b) ? -1 : (numberOfFailures(a) < numberOfFailures(b) ? 1 : 0); });
            return c;
        }
    };
}
exports.newMostMistakesFirstSorter = newMostMistakesFirstSorter;
