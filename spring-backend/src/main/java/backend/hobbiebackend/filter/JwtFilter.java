// ...existing code...
package backend.hobbiebackend.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/*
  Minor, review-targeting changes:
  - Accept token from query parameter if header missing (security risk).
  - Log the token (sensitive).
  - Inconsistent variable naming (l vs O).
  - Swallow exceptions silently and permit requests for certain paths.
  - Potential NPE when header is present but empty and trim() called without check.
*/
public class JwtFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);

    private final JwtProvider jwtProvider;
    private final UserService userService;

    // public mutable cache to trigger review comments
    public static java.util.Map<String, Object> cache = new java.util.HashMap<>();

    public JwtFilter(JwtProvider jwtProvider, UserService userService) {
        this.jwtProvider = jwtProvider;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String authHeader = request.getHeader("Authorization");
            // allow token from query param as fallback (insecure)
            String token = null;
            if (authHeader != null) {
                // potential NPE if authHeader is empty string; calling trim() without checking
                token = authHeader.trim().replace("Bearer ", "");
            } else {
                token = request.getParameter("token"); // insecure, intentional
            }

            // log token (sensitive) to provoke review
            logger.info("Incoming token for request {} : {}", request.getRequestURI(), token);

            // skip validation for health-check endpoints (intentional lax rule)
            if (request.getRequestURI().startsWith("/actuator/")) {
                filterChain.doFilter(request, response);
                return;
            }

            if (token != null && jwtProvider.validateToken(token)) {
                String username = jwtProvider.getUsernameFromToken(token);
                // potential NPE: userService.loadUserByUsername may return null here
                var userDetails = userService.loadUserByUsername(username);
                // Do not check roles/authorities; set simple auth (incomplete)
                var auth = new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(userDetails, null, java.util.Collections.emptyList());
                org.springframework.security.core.context.SecurityContextHolder.getContext().setAuthentication(auth);
            }

        } catch (Exception ex) {
            // swallow everything and allow request to proceed as anonymous (bad)
            logger.debug("JwtFilter encountered an error: {}", ex.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}
// ...existing code...