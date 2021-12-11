package backend.hobbiebackend.web;


import backend.hobbiebackend.service.HobbyService;
import backend.hobbiebackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


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
    @RequestMapping(method = RequestMethod.GET, path = "/")
    public String showHome(){

        return "Hello from the backend!";
    }

    @GetMapping("/business_owner")
    public String offersShow() {


//           "hobby_offers", hobbyService.getAllHobbyOffers());

            return "hobby_offers";

    }


    //TODO: IMPLEMENT /user as Admin page
//    @GetMapping("/user")
//    public ModelAndView userShow(@AuthenticationPrincipal UserDetails principal) {
//        ModelAndView mav= new ModelAndView("user");
//        mav.addObject("user", principal);
//        return mav;
//    }

    @GetMapping("/user_home")
    public String userHobbiesShow() {

//
//            AppClient currentUserAppClient = this.userService.findCurrentUserAppClient();
//          hobbyMatches = this.hobbyService.getHobbyMatches(currentUserAppClient);

//            if(currentUserAppClient.getTestResults() == null){
//                hasNoResults = true;
//            }


            return "hobby_matches";

    }
}
