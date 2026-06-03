package Game;
import java.util.Random;

public class Game {
  private int number,attempts ;
  private final int maxAttempts =10;

    public Game(int min, int max) {
        this.number = new Random().nextInt(min, max + 1);
        this.attempts = 0;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public int getAttempts() {
        return attempts;
    }

    public void setAttempts(int attempts) {
        this.attempts = attempts;
    }

    public int getMaxAttempts() {
        return maxAttempts;
    }


    public String checkGuess(int guess) {
        attempts++;
        if (number == guess)  return "Correct";
        if (number > guess)   return "Too Low";
        return "Too High";
    }
    public boolean isGameOver() {
        return attempts >= maxAttempts;
    }
    public int  getRemaining(){
        return maxAttempts-attempts;

    }






}
