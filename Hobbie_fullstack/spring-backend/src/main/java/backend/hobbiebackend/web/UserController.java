package backend.hobbiebackend.web;


import backend.hobbiebackend.model.dto.AppClientSignUpDto;
import backend.hobbiebackend.model.dto.BusinessRegisterDto;
import backend.hobbiebackend.model.entities.AppClient;
import backend.hobbiebackend.model.entities.BusinessOwner;
import backend.hobbiebackend.model.entities.UserEntity;
import backend.hobbiebackend.model.entities.UserRoleEntity;
import backend.hobbiebackend.model.entities.enums.UserRoleEnum;
import backend.hobbiebackend.service.HobbyService;
import backend.hobbiebackend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {


    //TODO CREATE POP UP THAT USER HAT SUCCESSFULLY SIGNED UP
    private final UserService userService;
    private final HobbyService hobbyService;
//    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    @Autowired
    public UserController(UserService userService, HobbyService hobbyService, ModelMapper modelMapper) {
        this.userService = userService;
        this.hobbyService = hobbyService;
        this.modelMapper = modelMapper;

    }



    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody AppClientSignUpDto user){

        if( this.userService.userExists(user.getUsername(), user.getEmail())) {
            throw new RuntimeException("Username or email address already in use.");
        }

        AppClient client = this.userService.register(user);
        return new ResponseEntity<AppClient>(client, HttpStatus.CREATED);
    }


    @PostMapping("/register-business")
    public ResponseEntity<?> registerBusiness(@RequestBody BusinessRegisterDto business){


    if(this.userService.businessExists(business.getBusinessName() ) || this.userService.userExists(business.getUsername(), business.getEmail())){
        throw new RuntimeException("Username or email address already in use.");
    }

        BusinessOwner businessOwner = this.userService.registerBusiness(business);

        return new ResponseEntity<BusinessOwner>(businessOwner, HttpStatus.CREATED);
    }


//
//    @PostMapping("/login-error")
//    public String failedLogin(@ModelAttribute(UsernamePasswordAuthenticationFilter.SPRING_SECURITY_FORM_USERNAME_KEY)
//                                            String username) {
//
//        return "bad credentials";
//    }




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

    @PostMapping("/login")
    public String logInUser(@RequestParam String username ) {
        UserEntity userByUsername = this.userService.findUserByUsername(username);
        if (userByUsername.getRoles().stream()
                .anyMatch(u-> u.getRole().equals(UserRoleEnum.USER))) {
            return  "USER";
        }
        else if(userByUsername.getRoles().stream()
                .anyMatch(u-> u.getRole().equals(UserRoleEnum.BUSINESS_USER))){
            return  "BUSINESS_USER";
        }
        return null;
    }
}


