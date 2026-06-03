package Game;

public class Validator implements Checker {
    @Override
    public boolean isValidNumber(String input) {
        try {
            Integer.parseInt(input);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    @Override
    public boolean inRange(int min, int max, int num) {
        return min <= num && num <= max;
    }

}
