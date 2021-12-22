package backend.hobbiebackend.web;


import backend.hobbiebackend.model.entities.AppClient;
import backend.hobbiebackend.model.entities.Hobby;
import backend.hobbiebackend.model.entities.UserEntity;
import backend.hobbiebackend.service.HobbyService;
import backend.hobbiebackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class HomeController {
    private final HobbyService hobbyService;
    private final UserService userService;


    @Autowired
    public HomeController(HobbyService hobbyService, UserService userService) {
        this.hobbyService = hobbyService;
        this.userService = userService;
    }
    @GetMapping( "/")
    public String showHome(){

        return "Hello from the backend!";
    }

    @GetMapping( "/business-owner/{username}")
    public Set<Hobby> offersShow(@PathVariable String username) {

            return  this.hobbyService.getAllHobbiesForBusiness(username);

    }


    //TODO: IMPLEMENT /user as Admin page
//    @GetMapping("/user")
//    public ModelAndView userShow(@AuthenticationPrincipal UserDetails principal) {
//        ModelAndView mav= new ModelAndView("user");
//        mav.addObject("user", principal);
//        return mav;
//    }

    @GetMapping("/user-home/{username}")
    public Set<Hobby> userHobbiesShow(@PathVariable String username) {
//        AppClient currentUserAppClient = this.userService.findAppClientByUsername(username);
//        if(currentUserAppClient.getHobby_matches() == null){
//            return new HashSet<>();
//        }
        Set<Hobby> allHobbieMatchesForClient = this.hobbyService.getAllHobbieMatchesForClient(username);
        return allHobbieMatchesForClient;


    }
}
