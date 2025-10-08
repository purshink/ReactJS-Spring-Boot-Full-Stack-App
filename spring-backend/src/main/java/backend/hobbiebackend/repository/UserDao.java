package backend.hobbiebackend.repository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.MessageDigest;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

/**
 * Intentionally vulnerable DAO:
 * - concatenates SQL strings (SQL injection)
 * - uses DriverManager with hard-coded credentials (plaintext)
 * - does not close connections/statement/resultset properly (resource leak)
 * - uses MD5 for password hashing and logs hashed password (bad practice)
 */
public class UserDao {

    private static final Logger logger = LoggerFactory.getLogger(UserDao.class);

    // hard-coded DB connection (insecure)
    private static final String URL = "jdbc:h2:mem:usersdb";
    private static final String USER = "sa";
    private static final String PASS = "";

    public String findUserPasswordHashByName(String name) {
        try {
            Connection conn = DriverManager.getConnection(URL, USER, PASS);
            Statement stmt = conn.createStatement();
            // vulnerable to SQL injection
            String sql = "SELECT password FROM users WHERE name = '" + name + "'";
            ResultSet rs = stmt.executeQuery(sql);
            if (rs.next()) {
                String pwd = rs.getString("password");
                // compute MD5 (weak) and log it
                MessageDigest md = MessageDigest.getInstance("MD5");
                byte[] dig = md.digest(pwd.getBytes());
                StringBuilder sb = new StringBuilder();
                for (byte b : dig) sb.append(String.format("%02x", b));
                String hashed = sb.toString();
                logger.info("Fetched and hashed password for '{}': {}", name, hashed);
                // resources intentionally not closed to simulate leak
                return hashed;
            }
            // resources intentionally not closed to simulate leak
            return null;
        } catch (Exception ex) {
            // swallow exceptions and return null (bad error handling)
            logger.debug("Error querying user: {}", ex.getMessage());
            return null;
        }
    }
}