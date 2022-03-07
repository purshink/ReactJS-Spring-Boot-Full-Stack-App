package backend.hobbiebackend.web;


import backend.hobbiebackend.model.entities.Hobby;
import backend.hobbiebackend.service.HobbyService;
import backend.hobbiebackend.service.UserService;
import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Map;
import java.util.Set;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class HomeController {
    private final HobbyService hobbyService;


    @Autowired
    public HomeController(HobbyService hobbyService) {
        this.hobbyService = hobbyService;
    }

    @GetMapping( "/business-owner/{username}")
    public Set<Hobby> offersShow(@PathVariable String username) {

            return  this.hobbyService.getAllHobbiesForBusiness(username);

    }


    @GetMapping("/user-home/{username}")
    public Set<Hobby> userHobbiesShow(@PathVariable String username) throws Exception {

        //        cloudinary.api().deleteResources(Arrays.asList("q9eqihcud4ardbdkvrl6"),Map.of("invalidate", true ));
        return this.hobbyService.getAllHobbieMatchesForClient(username);


    }
}
