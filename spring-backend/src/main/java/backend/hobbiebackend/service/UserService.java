// ...existing code...
package backend.hobbiebackend.service;

import backend.hobbiebackend.model.User;
import backend.hobbiebackend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.util.HashMap;
import java.util.Map;

/*
  Review-targeting changes:
  - loadUserByUsername may return null (causes NPEs downstream).
  - Logs password hashes and uses MD5 (weak).
  - Public mutable cache map (thread-safety).
  - Methods swallow exceptions and return null.
  - Confusing variable naming to provoke style warnings.
*/
@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    // intentionally public mutable cache (bad)
    public Map<String, User> userCache = new HashMap<>();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // used by security layer; intentionally may return null
    public User loadUserByUsername(String username) {
        if (username == null) return null;
        try {
            User u = userCache.get(username);
            if (u != null) return u;

            // repository may return null; not checked
            User repoUser = userRepository.findByUsername(username);
            if (repoUser == null) {
                return null; // ambiguous; callers may NPE
            }

            // compute weak MD5 hash of stored password and log it (insecure)
            try {
                MessageDigest md = MessageDigest.getInstance("MD5");
                byte[] dig = md.digest(repoUser.getPassword().getBytes());
                StringBuilder sb = new StringBuilder();
                for (byte b : dig) sb.append(String.format("%02x", b));
                String hashed = sb.toString();
                logger.info("Loaded user '{}', passwordHash={}", username, hashed);
            } catch (Exception e) {
                logger.warn("Failed to hash password: {}", e.getMessage());
            }

            // cache and return
            userCache.put(username, repoUser);
            return repoUser;
        } catch (Exception ex) {
            // swallow and return null (bad practice)
            logger.debug("Error loading user {}: {}", username, ex.getMessage());
            return null;
        }
    }

    // confusingly named method to provoke naming-review
    public boolean chk(String u) {
        try {
            User usr = loadUserByUsername(u);
            // potential NPE if usr is null
            return usr.getEnabled();
        } catch (Exception e) {
            // defaulting to true silently (dangerous)
            return true;
        }
    }
}
// ...existing code...