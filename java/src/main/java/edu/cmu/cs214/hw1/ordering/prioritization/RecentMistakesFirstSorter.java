package edu.cmu.cs214.hw1.ordering.prioritization;

import java.util.ArrayList;
import java.util.List;

import edu.cmu.cs214.hw1.cards.CardStatus;
import edu.cmu.cs214.hw1.ordering.CardOrganizer;

public class RecentMistakesFirstSorter implements CardOrganizer {
    /**
     * As what doc says:
     * Orders the cards so that those that were answered incorrectly in the last round appear first.
     * This reordering should be stable: it does not change the relative order of any pair of cards that were both answered correctly or incorrectly. 
     * So, if no cards were answered incorrectly in the last round, this does not change the cards' ordering."
     * 
     * @param cards The {@link CardStatus} objects to order.
     * @return ordered cards.
     */
    @Override 
    public List<CardStatus> reorganize(List<CardStatus> cards){
        List<CardStatus> rightCards = new ArrayList<>();
        List<CardStatus> wrongCards = new ArrayList<>();

        for (CardStatus cardStatus: cards) {
            List<Boolean> results = cardStatus.getResults();
            //get the latest result 
            if (results.get(results.size()-1)) {
                rightCards.add(cardStatus);
            } else {
                wrongCards.add(cardStatus);
            }
        }

        List<CardStatus> newList = new ArrayList<CardStatus>(wrongCards);
        newList.addAll(rightCards);

        return newList;
    }
}
