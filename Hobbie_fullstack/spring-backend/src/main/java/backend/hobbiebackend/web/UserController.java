package backend.hobbiebackend.web;


import backend.hobbiebackend.model.dto.AppClientSignUpDto;
import backend.hobbiebackend.model.dto.BusinessRegisterDto;
import backend.hobbiebackend.model.dto.UpdateAppClientDto;
import backend.hobbiebackend.model.dto.UpdateBusinessDto;
import backend.hobbiebackend.model.entities.AppClient;
import backend.hobbiebackend.model.entities.BusinessOwner;
import backend.hobbiebackend.model.entities.UserEntity;
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




    @GetMapping("/show-client-details/{username}")
    public AppClient showUserDetails(@PathVariable String username) {
            return  this.userService.findAppClientByUsername(username);
    }


    @GetMapping("/show-business-details/{username}")
    public BusinessOwner showBusinessDetails(@PathVariable String username) {
        return  this.userService.findBusinessByUsername(username);
    }

        @PostMapping("/update-user")
        public ResponseEntity<?>  updateUser(@RequestBody UpdateAppClientDto user) {

                    AppClient client = this.userService.findAppClientById(user.getId());


                    client.setPassword(user.getPassword());
                    client.setGender(user.getGender());
                    client.setFullName(user.getFullName());

                    this.userService.saveUpdatedUserClient(client);
            return new ResponseEntity<AppClient>(client, HttpStatus.CREATED);

    }



    @PostMapping("/update-business")
    public ResponseEntity<?>  updateBusiness(@RequestBody UpdateBusinessDto business) {


        BusinessOwner businessOwner = this.userService.findBusinessOwnerById(business.getId());


                businessOwner.setBusinessName(business.getBusinessName());
                businessOwner.setPassword(business.getPassword());
                businessOwner.setAddress(business.getAddress());
                this.userService.saveUpdatedUser(businessOwner);

        return new ResponseEntity<BusinessOwner>(businessOwner, HttpStatus.CREATED);

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
    public String logInUser(@RequestParam String username) {
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


