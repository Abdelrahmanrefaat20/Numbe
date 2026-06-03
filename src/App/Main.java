package App;
import Game.*;
import javax.swing.JOptionPane;



public class Main {
    public static void main(String[] args) {
        Validator validator = new Validator();
        while (true) {
            boolean won = false;
            Game game = new Game(1, 100);
            JOptionPane.showMessageDialog(null,"Welcome! Guess a number between 1 and 100. You have 10 attempts.");
            while (!game.isGameOver()) {
                int attemptNum = game.getAttempts() + 1;

                String input =  JOptionPane.showInputDialog("Attempt " + attemptNum + "/" + game.getMaxAttempts() + " — Enter your guess: or exit" );
                if (input.equals("exit")) {
                    return;
                }

                if (!validator.isValidNumber(input)) {
                    JOptionPane.showMessageDialog(null,"Invalid input");
                    continue;
                }

                int guess = Integer.parseInt(input);

                if (!validator.inRange(1, 100, guess)) {
                    JOptionPane.showMessageDialog(null,"Out of range");
                    continue;
                }

                String result = game.checkGuess(guess);

                if (result.equals("Correct")) {
                    JOptionPane.showMessageDialog(null,"Correct! You guessed it in " + game.getAttempts() + " attempts.");
                    won = true;
                    break;
                }
                JOptionPane.showMessageDialog(null,result + " " + game.getRemaining() + " attempts remaining.");
            }
            if (!won ) {
                JOptionPane.showMessageDialog(null,"You lose. The number was: " + game.getNumber());
            }
            String again = JOptionPane.showInputDialog("Play again? (yes/no): ");
            if (!again.equalsIgnoreCase("yes")) {
                break;
            }

        }
    }
}