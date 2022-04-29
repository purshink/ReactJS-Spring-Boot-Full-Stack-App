package backend.hobbiebackend.web;

import backend.hobbiebackend.model.entities.Hobby;
import backend.hobbiebackend.model.entities.UserEntity;
import backend.hobbiebackend.model.entities.enums.UserRoleEnum;
import backend.hobbiebackend.service.HobbyService;
import backend.hobbiebackend.service.UserRoleService;
import backend.hobbiebackend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class HomeController {
    private final HobbyService hobbyService;

    @Autowired
    public HomeController(HobbyService hobbyService) {
        this.hobbyService = hobbyService;
    }

    @GetMapping("/home")
    @Operation(summary = "Show client/business homepage", security = @SecurityRequirement(name = "bearerAuth"))
    public Set<Hobby> hobbiesShow(@RequestParam String username, @RequestParam String role) {
        if (role.equals("user")) {
            return this.hobbyService.getAllHobbieMatchesForClient(username);
        }
        return this.hobbyService.getAllHobbiesForBusiness(username);
    }
}
