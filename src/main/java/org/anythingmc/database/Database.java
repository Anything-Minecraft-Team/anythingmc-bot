package org.anythingmc.database;

import lombok.Getter;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

@Getter
public class Database {

    private Statement stmt;

    public Database(String host, String password, String user, String port, String database) {
        //Connect and setup database
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(
                    "jdbc:mysql://" + host + ":" + port + "/" + database, user, password);
            stmt = con.createStatement();
            String sql = "CREATE TABLE IF NOT EXISTS reviews (" +
                    "`id` VARCHAR(36) NOT NULL, " +
                    "`review_id` VARCHAR(36) NOT NULL, " +
                    "`rating` INT NOT NULL, " +
                    "`review` VARCHAR(512) NOT NULL, " +
                    "`host` VARCHAR(128) NOT NULL, " +
                    "`awaiting_review` VARCHAR(5) NOT NULL, " +
                    "PRIMARY KEY (`review_id`) " +
                    ")";

            stmt.executeUpdate(sql);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
