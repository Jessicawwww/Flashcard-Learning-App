package edu.cmu.cs214.hw1;

import edu.cmu.cs214.hw1.cli.UI;
import edu.cmu.cs214.hw1.data.CardLoader;
import edu.cmu.cs214.hw1.data.CardStore;
import edu.cmu.cs214.hw1.ordering.CardDeck;
import edu.cmu.cs214.hw1.ordering.CardOrganizer;
import edu.cmu.cs214.hw1.ordering.CombinedCardOrganizer;
import edu.cmu.cs214.hw1.ordering.prioritization.CardShuffler;
import edu.cmu.cs214.hw1.ordering.prioritization.MostMistakesFirstSorter;
import edu.cmu.cs214.hw1.ordering.prioritization.RecentMistakesFirstSorter;
import edu.cmu.cs214.hw1.ordering.repetition.NonRepeatingCardOrganizer;
import edu.cmu.cs214.hw1.ordering.repetition.RepeatingCardOrganizer;

import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.HelpFormatter;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.ParseException;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public final class Main {

    private Main() {
        // Disable instantiating this class.
        throw new UnsupportedOperationException();
    }

    /**
     * Start command line interface based on passed arguments:
     * Users must specify one cards file containing what you want to learn.
     * Options that could pass in arguments:
     * --order: choices [random, worst-first, recent-mistakes-first]
     * --repetition: number of time that each card should be answered correctly
     * --invertCards: flip the answer and questions
     * --help: show these instructions
     * Here we set up all the options
     * and use functions we declared in other files based on the options we passed in arguments.
     * Passed arguments in launch json file should be like:
     * "args":["cards/german.csv", "-repetitions","1","-order","recent-mistakes-first","-help","-invertCards","wrong"]
     * I used apache command cli here, refer to https://commons.apache.org/proper/commons-cli/usage.html
     * @param args
     */
    public static void main(String[] args) throws IOException {
        //Parsing stage:parse the options passed using command line arguments
        CommandLineParser parser = new DefaultParser();
        //create options object
        Options options = new Options();
        //set up options
        Option helpOption = new Option("help", "Show this help");
        Option invertOption = new Option("invertCards", false, "If set, it flips answer and question for each card. That is, it "
                                                            + "prompts with the card's answer and asks the user "
                                                            + "to provide the corresponding question. "
                                                            + "Default: false");
        options.addOption(helpOption);
        options.addOption(invertOption);
        Option orderOption = Option.builder("order")
                         .argName("order")
                         .hasArg()
                         .desc("The type of ordering to use, default random. "
                         +"[choices: random, worst-first, recent-mistakes-first]")
                         .build(); 

        Option repetitionOption = Option.builder("repetitions")
                         .argName("number")
                         .hasArg()
                         .desc( "The number of times to each card should be answered"
                         + "successfully. If not provided, every card is presented once,"
                         +"regardless of the correctness of answer.")
                         .build();

        options.addOption(orderOption);
        options.addOption(repetitionOption);
        
        try {
            CommandLine commandLine = parser.parse(options, args);
            String[] arguments = commandLine.getArgs();
            List<String> argumentList = Arrays.asList(arguments);
            //invalid cases: empty arguments or too many arguments.
            if (argumentList.size()>1){
                System.out.println("Too many arguments passed here: "+argumentList.size()+" arguments!\n"+
                "Only 1 file arguments expected here");
                for (int idx = 0; idx<argumentList.size(); idx++){
                    System.out.println("Argument "+idx+": "+arguments[idx]);
                }
                System.exit(1);
            } else if (argumentList.size()<1) {
                System.out.println("Missing arguments here: "+argumentList.size()+" arguments!\n"+
                "1 file arguments expected here");
                System.exit(1);
            }
            System.out.println("File passed: "+arguments[0]);

            String order = commandLine.getOptionValue("order");
            System.out.println("The ordering you passed is "+ order);
            String reptitionString = commandLine.getOptionValue("repetitions");
            System.out.println("The repetition you passed is "+reptitionString);
            
            if (commandLine.hasOption("help")) {
                HelpFormatter formatter = new HelpFormatter();
                formatter.printHelp("CommandLineParameters", options);
                if ((order==null)&&(reptitionString==null)){
                    System.exit(0);
                }
            } 
            CardStore cards = new CardLoader().loadCardsFromFile(new File(arguments[0])); //pass the file to cardloader, IOException may happen.

            if (commandLine.hasOption("invertCards")){
                cards = cards.invertCards();
            }
            
            CardOrganizer cardOrganizer1 = new CardShuffler();
            if (order == null || order.length() == 0) {
                cardOrganizer1 = new CardShuffler();
            } else if (order.equals("random")){
                cardOrganizer1 = new CardShuffler();
            } else if (order.equals("worst-first")){
                cardOrganizer1 = new MostMistakesFirstSorter();
            } else if (order.equals("recent-mistakes-first")){
                cardOrganizer1 = new RecentMistakesFirstSorter();
            } else {
                System.out.println("Invalid Argument for order option!");
                System.exit(1);
            }
            
            CardOrganizer cardOrganizer2 = new NonRepeatingCardOrganizer();
            if (reptitionString==null){
                cardOrganizer2 = new NonRepeatingCardOrganizer();
            } else {
                int repetitions = Integer.parseInt(reptitionString); //if letter is passed into paserInt, expected to lead to number format error.
                //System.out.println("repetitions: "+repetitions);
                assert repetitions > 0 : "repetitions must > 0";//in case of non-positive options here.
                cardOrganizer2 = new RepeatingCardOrganizer(repetitions);
            }

            List<CardOrganizer> cardOrganizers = new ArrayList<>();
            cardOrganizers.add(cardOrganizer2);
            cardOrganizers.add(cardOrganizer1);
            
            CardOrganizer combinedCardOrganizer = new CombinedCardOrganizer(cardOrganizers);
            CardDeck cardDeck = new CardDeck(cards.getAllCards(), combinedCardOrganizer);
            new UI().studyCards(cardDeck);
            
        } catch (ParseException e) {
            System.err.println("Parsing failed.  Reason: " + e.getMessage());
            System.exit(1);
        } catch (IOException e) {
            System.err.println("Error happened.  Reason: " + e.getMessage());
            System.exit(1);
        } catch (NumberFormatException e) {
            System.err.println("Invalid argumeng for argument:" + e.getMessage());
            System.exit(1);
        } catch (ArrayIndexOutOfBoundsException e){
            System.err.println("Missing arguments! You must pass at least one argument cards file." + e.getMessage());
            System.exit(1);
        }

    }

}
