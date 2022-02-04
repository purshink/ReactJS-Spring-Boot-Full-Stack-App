package backend.hobbiebackend.web;


import backend.hobbiebackend.model.dto.AppClientSignUpDto;
import backend.hobbiebackend.model.dto.BusinessRegisterDto;
import backend.hobbiebackend.model.dto.UpdateAppClientDto;
import backend.hobbiebackend.model.dto.UpdateBusinessDto;
import backend.hobbiebackend.model.entities.AppClient;
import backend.hobbiebackend.model.entities.BusinessOwner;
import backend.hobbiebackend.model.entities.UserEntity;
import backend.hobbiebackend.model.entities.enums.UserRoleEnum;
import backend.hobbiebackend.model.jwt.JwtRequest;
import backend.hobbiebackend.model.jwt.JwtResponse;
import backend.hobbiebackend.security.HobbieUserDetailsService;
import backend.hobbiebackend.service.HobbyService;
import backend.hobbiebackend.service.UserService;
import backend.hobbiebackend.utility.JWTUtility;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;




@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {



    private final UserService userService;
    private final HobbyService hobbyService;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    @Autowired
    private JWTUtility jwtUtility;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private HobbieUserDetailsService hobbieUserDetailsService;

    @Autowired
    public UserController(UserService userService, HobbyService hobbyService, PasswordEncoder passwordEncoder, ModelMapper modelMapper) {
        this.userService = userService;
        this.hobbyService = hobbyService;
        this.passwordEncoder = passwordEncoder;
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


                    client.setPassword(this.passwordEncoder.encode(user.getPassword()));
                    client.setGender(user.getGender());
                    client.setFullName(user.getFullName());

                    this.userService.saveUpdatedUserClient(client);
            return new ResponseEntity<AppClient>(client, HttpStatus.CREATED);

    }



    @PostMapping("/update-business")
    public ResponseEntity<?>  updateBusiness(@RequestBody UpdateBusinessDto business) {

        BusinessOwner businessOwner = this.userService.findBusinessOwnerById(business.getId());

                businessOwner.setBusinessName(business.getBusinessName());
                businessOwner.setPassword(this.passwordEncoder.encode(business.getPassword()));
                businessOwner.setAddress(business.getAddress());
                this.userService.saveUpdatedUser(businessOwner);

        return new ResponseEntity<BusinessOwner>(businessOwner, HttpStatus.CREATED);

    }
    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<Long> deleteUser(@PathVariable Long id){
        boolean isRemoved = this.userService.deleteUser(id);

        if (!isRemoved) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @PostMapping("/authenticate")
    public JwtResponse authenticate(@RequestBody JwtRequest jwtRequest) throws Exception{

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            jwtRequest.getUsername(),
                            jwtRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }

        final UserDetails userDetails
                = hobbieUserDetailsService.loadUserByUsername(jwtRequest.getUsername());

        final String token =
                jwtUtility.generateToken(userDetails);

        return  new JwtResponse(token);
    }


    @PostMapping("/login/{username}")
    @CrossOrigin(origins = "http://localhost:4200")
    public String logInUser(@PathVariable String username) {
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


