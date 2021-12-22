package backend.hobbiebackend.web;


import backend.hobbiebackend.service.HobbyService;
import backend.hobbiebackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200/")
public class UserController {


    //TODO CREATE POP UP THAT USER HAT SUCCESSFULLY SIGNED UP
    private final UserService userService;
    private final HobbyService hobbyService;
//    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService, HobbyService hobbyService) {
        this.userService = userService;
        this.hobbyService = hobbyService;
//        this.passwordEncoder = passwordEncoder;
    }



    @PostMapping("/signup")
    public String signup(){

//        this.userService.userExists())

//            this.userService.register();
            return "user_data";
    }


    @PostMapping("/register-business")
    public String registerBusiness(){


//        this.userService.businessExists()

//        this.userService.registerBusiness();

        return "business_data";
    }


//
//    @PostMapping("/login-error")
//    public String failedLogin(@ModelAttribute(UsernamePasswordAuthenticationFilter.SPRING_SECURITY_FORM_USERNAME_KEY)
//                                            String username) {
//
//        return "bad credentials";
//    }

    @GetMapping("/account-info")
    public String showAccountInfo(){

//            "client", this.userService.findCurrentUserAppClient();
            return "account-info";

    }

    @GetMapping("/business-account-info")
    public String showBusinessAccountInfo() {

//        "business", this.userService.findCurrentUserBusinessOwner();
        return "business-account-info";
    }



    @GetMapping("/update-user")
    public String showUpdateForm() {

//            AppClient currentUserAppClient = this.userService.findCurrentUserAppClient();
            return "update-user";

    }

        @PostMapping("/update-user")
        public String updateUser() {

//                    AppClient currentUserAppClient = this.userService.findCurrentUserAppClient();
//                    appClient.setId(currentUserAppClient.getId());
//                    appClient.setUsername(currentUserAppClient.getUsername());
//                    appClient.setPassword(this.passwordEncoder.encode(updateClientBindingModel.getPassword()));
//                    appClient.setRoles(currentUserAppClient.getRoles());
//                    this.userService.saveUpdatedUserClient(appClient);
//            model.addAttribute("isExists",false);
                    return "updated_user";

    }

    @GetMapping("/update-business")
    public String showUpdateBusinessForm() {

//            BusinessOwner currentUserBusinessOwner = this.userService.findCurrentUserBusinessOwner();


            return "business_data";

    }

    @PostMapping("/update-business")
    public String updateBusiness() {


//                Long userId = (Long) request.getSession().getAttribute("userId");
//                    UserEntity user = this.userService.findUserById(userId);

//                businessOwner.setId(userId);
//                businessOwner.setUsername(user.getUsername());
//                businessOwner.setPassword(this.passwordEncoder.encode(updateBusinessBindingModel.getPassword()));
//                businessOwner.setRoles(user.getRoles());
//                this.userService.saveUpdatedUser(businessOwner);

                return "updated_business";

    }
    @GetMapping("/deleteAppClient")
    public String deleteAppClient(){

//            AppClient currentUserAppClient = this.userService.findCurrentUserAppClient();
//
//                this.userService.deleteAppClient(currentUserAppClient.getId());
                return "deleted_user";
    }

    @GetMapping("/deleteBusinessOwner")
    public String deleteBusinessOwner() {
//
//            BusinessOwner currentUserBusinessOwner = this.userService.findCurrentUserBusinessOwner();
//
//                this.userService.deleteBusinessOwner(currentUserBusinessOwner.getId());
                return "deleted_business";
    }

}


