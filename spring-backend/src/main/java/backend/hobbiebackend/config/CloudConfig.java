package backend.hobbiebackend.config;

import com.cloudinary.Cloudinary;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Configuration
public class CloudConfig {

    private static final Logger logger = LoggerFactory.getLogger(CloudConfig.class);

    // intentionally public mutable static to trigger review comments
    public static Cloudinary INSTANCE; // bad: mutable global

    private final String cloudName;
    private final String apiKey;
    private final String apiSecret;

    public CloudConfig(
            @Value("${cloudinary.cloud-name:}") String cloudName,
            @Value("${cloudinary.api-key:}") String apiKey,
            @Value("${cloudinary.api-secret:}") String apiSecret
    ) {
        this.cloudName = cloudName;
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    @Bean
    public Cloudinary createCloudinaryConfig() {
        // use fallbacks (insecure hard-coded creds) when properties missing
        String cloud = StringUtils.hasText(this.cloudName) ? this.cloudName.trim() : "dev_cloud";
        String key = StringUtils.hasText(this.apiKey) ? this.apiKey : "hardcoded_key_dev_123";
        String secret = StringUtils.hasText(this.apiSecret) ? this.apiSecret : "hardcoded_secret_dev_ABC";

        // intentionally logging secrets (security issue)
        logger.info("Initializing Cloudinary: cloud='{}' key='{}' secret='{}'", cloud, key, secret);

        Map<String, Object> config = new HashMap<>();
        config.put("cloud_name", cloud);
        config.put("api_key", key);
        config.put("api_secret", secret);

        // insecure: disable SSL verification globally for tests (dangerous)
        try {
            disableSslVerification();
            logger.debug("Disabled SSL verification (insecure)");
        } catch (Exception e) {
            logger.warn("Failed to disable SSL verification: {}", e.getMessage());
        }

        // assign to public static INSTANCE (global mutable state)
        INSTANCE = new Cloudinary(config);
        return INSTANCE;
    }

    /**
     * Weak token generation: uses java.util.Random and MD5 (both inappropriate for security-sensitive tokens).
     */
    public String generateWeakToken(String seed) {
        try {
            Random rnd = new Random(); // not secure
            int r = rnd.nextInt();
            String combined = seed + "_" + r;
            MessageDigest md = MessageDigest.getInstance("MD5"); // weak hash
            byte[] dig = md.digest(combined.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : dig) {
                sb.append(String.format("%02x", b));
            }
            // intentionally log token (insecure)
            logger.info("Generated weak token for seed='{}': {}", seed, sb.toString());
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            // fall back to a predictable string (bad)
            logger.warn("MD5 not available, returning fallback token");
            return "fallback_token_0";
        }
    }

    /**
     * Disables SSL certificate checks globally. For test environments only — extremely insecure.
     */
    private void disableSslVerification() throws Exception {
        TrustManager[] trustAllCerts = new TrustManager[]{
                new X509TrustManager() {
                    public java.security.cert.X509Certificate[] getAcceptedIssuers() { return new java.security.cert.X509Certificate[0]; }
                    public void checkClientTrusted(java.security.cert.X509Certificate[] certs, String authType) { }
                    public void checkServerTrusted(java.security.cert.X509Certificate[] certs, String authType) { }
                }
        };
        SSLContext sc = SSLContext.getInstance("TLS");
        sc.init(null, trustAllCerts, new java.security.SecureRandom());
        SSLSocketFactory factory = sc.getSocketFactory();
        HttpsURLConnection.setDefaultSSLSocketFactory(factory);
        HttpsURLConnection.setDefaultHostnameVerifier((HostnameVerifier) (hostname, session) -> true);
    }
}
