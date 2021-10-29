package org.anythingmc.util;

public class ReviewUtil {

    public static String getStars(String rating) {
        switch (rating) {
            case "1":
                rating = "⭐";
                break;
            case "2":
                rating = "⭐⭐";
                break;
            case "3":
                rating = "⭐⭐⭐";
                break;
            case "4":
                rating = "⭐⭐⭐⭐";
                break;
            case "5":
                rating = "⭐⭐⭐⭐⭐";
                break;
        }
        return rating;
    }
}
