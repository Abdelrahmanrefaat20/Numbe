package Game;

public interface Checker {
    boolean isValidNumber(String input);
    boolean inRange(int min, int max, int num);
}
