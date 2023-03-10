"use strict";
exports.__esModule = true;
exports.newRecentMistakesFirstSorter = void 0;
function newRecentMistakesFirstSorter() {
    function isRecentRight(element) {
        return element.getResults()[element.getResults().length - 1];
    }
    function isRecentWrong(element) {
        return !element.getResults()[element.getResults().length - 1];
    }
    return {
        /**
             * Orders the cards so that those that were answered incorrectly in the last round appear first.
             * this reordering should be stable: it does not change the relative order of any pair of cards that were both answered correctly or incorrectly.
             * So, if no cards were answered incorrectly in the last round, this does not change the cards' ordering."
             * @param cards The {@link CardStatus} objects to order.
             * @return ordered cards.
             */
        reorganize: function (cards) {
            var wrongcards = cards.filter(isRecentWrong);
            var rightcards = cards.filter(isRecentRight);
            var newcards = wrongcards.concat(rightcards);
            return newcards;
        }
    };
}
exports.newRecentMistakesFirstSorter = newRecentMistakesFirstSorter;
