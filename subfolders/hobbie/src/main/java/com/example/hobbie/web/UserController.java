package com.example.hobbie.web;

import com.example.hobbie.config.UserInterceptor;
import com.example.hobbie.handler.FailToDeleteException;
import com.example.hobbie.model.binding.RegisterBusinessBindingModel;
import com.example.hobbie.model.binding.SignUpBindingModel;
import com.example.hobbie.model.binding.UpdateBusinessBindingModel;
import com.example.hobbie.model.binding.UpdateClientBindingModel;
import com.example.hobbie.model.entities.AppClient;
import com.example.hobbie.model.entities.BusinessOwner;
import com.example.hobbie.model.entities.UserEntity;
import com.example.hobbie.model.service.RegisterBusinessServiceModel;
import com.example.hobbie.model.service.SignUpServiceModel;
import com.example.hobbie.service.AboService;
import com.example.hobbie.service.HobbyService;
import com.example.hobbie.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@Controller
@RequestMapping("/users")
public class UserController {


    //TODO CREATE POP UP THAT USER HAT SUCCESSFULLY SIGNED UP
    private final UserService userService;
    private final HobbyService hobbyService;
    private final AboService aboService;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService, HobbyService hobbyService, AboService aboService, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.hobbyService = hobbyService;
        this.aboService = aboService;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/signup")
    public String showSignUp(Model model){
        if(!model.containsAttribute("signUpBindingModel")){
            model.addAttribute("signUpBindingModel", new SignUpBindingModel());
            model.addAttribute("isExists",false);
            model.addAttribute("dontMatch",false);
            model.addAttribute("emptyGender", false);
        }

        return "signup";
    }

    @PostMapping("/signup")
    public String signup(@Valid SignUpBindingModel signUpBindingModel, BindingResult bindingResult, RedirectAttributes redirectAttributes){
        if (bindingResult.hasErrors() || !(signUpBindingModel.getPassword().equals(signUpBindingModel.getConfirmPassword()))||signUpBindingModel.getGender() == null){
            redirectAttributes.addFlashAttribute("signUpBindingModel", signUpBindingModel);
            redirectAttributes.addFlashAttribute("org.springframework.validation.BindingResult.signUpBindingModel", bindingResult);
            if(!(signUpBindingModel.getPassword().equals(signUpBindingModel.getConfirmPassword()))){
                redirectAttributes.addFlashAttribute("dontMatch", true);
            }
            if(signUpBindingModel.getGender() == null){
                redirectAttributes.addFlashAttribute("emptyGender", true);
            }
            return "redirect:/users/signup";
        }

        else if(this.userService.userExists(signUpBindingModel.getUsername(), signUpBindingModel.getEmail())) {


                redirectAttributes.addFlashAttribute("signUpBindingModel", signUpBindingModel);
                redirectAttributes.addFlashAttribute("isExists", true);
                return "redirect:/users/signup";
            }
            this.userService.register(this.modelMapper.map(signUpBindingModel, SignUpServiceModel.class));
            return "redirect:/users/login";
    }

    @GetMapping("/register-business")
    public String showRegisterBusiness(Model model){
        if(!model.containsAttribute("registerBusinessBindingModel")){
            model.addAttribute("registerBusinessBindingModel", new RegisterBusinessBindingModel());
            model.addAttribute("isExists",false);
            model.addAttribute("dontMatch",false);
        }

        return "register-business";
    }

    @PostMapping("/register-business")
    public String registerBusiness(@Valid RegisterBusinessBindingModel registerBusinessBindingModel, BindingResult bindingResult, RedirectAttributes redirectAttributes){
        if (bindingResult.hasErrors() || !(registerBusinessBindingModel.getPassword().equals(registerBusinessBindingModel.getConfirmPassword()))){
            redirectAttributes.addFlashAttribute("registerBusinessBindingModel", registerBusinessBindingModel);
            redirectAttributes.addFlashAttribute("org.springframework.validation.BindingResult.registerBusinessBindingModel", bindingResult);
            if(!(registerBusinessBindingModel.getPassword().equals(registerBusinessBindingModel.getConfirmPassword()))){
                    redirectAttributes.addFlashAttribute("dontMatch", true);
            }
            return "redirect:/users/register-business";
        }

        else if (this.userService.userExists(registerBusinessBindingModel.getUsername(), registerBusinessBindingModel.getEmail())||
        this.userService.businessExists(registerBusinessBindingModel.getBusinessName())){


                redirectAttributes.addFlashAttribute("registerBusinessBindingModel", registerBusinessBindingModel);
                redirectAttributes.addFlashAttribute("isExists", true);
                return "redirect:/users/register-business";
        }
        this.userService.registerBusiness(this.modelMapper.map(registerBusinessBindingModel, RegisterBusinessServiceModel.class));
        return "redirect:/users/login";
    }

    @GetMapping("/login")
    public String showLogin(){

        return "login";
    }

    @PostMapping("/login-error")
    public ModelAndView failedLogin(@ModelAttribute(UsernamePasswordAuthenticationFilter.SPRING_SECURITY_FORM_USERNAME_KEY)
                                            String username) {
        ModelAndView modelAndView = new ModelAndView();

        modelAndView.addObject("bad_credentials", true);
        modelAndView.addObject("username", username);

        modelAndView.setViewName("/login");

        return modelAndView;
    }

    @GetMapping("/account-info")
    public String showAccountInfo(Model model){
        if(UserInterceptor.isUserLogged()) {
            model.addAttribute("client", this.userService.findCurrentUserAppClient());
            return "account-info";
        }
        return "index";
    }

    @GetMapping("/business-account-info")
    public String showBusinessAccountInfo(Model model){
        if(UserInterceptor.isUserLogged()) {
            model.addAttribute("business", this.userService.findCurrentUserBusinessOwner());
            return "business-account-info";
        }
        return "index";
    }


    //CRUD
    @GetMapping("/update-user")
    public String showUpdateForm(Model model) {
        if (UserInterceptor.isUserLogged()) {
            AppClient currentUserAppClient = this.userService.findCurrentUserAppClient();
            UpdateClientBindingModel updateClientBindingModel = this.modelMapper.map(currentUserAppClient, UpdateClientBindingModel.class);
            model.addAttribute("updateClientBindingModel", updateClientBindingModel);
            model.addAttribute("dontMatch", false);
            model.addAttribute("emptyGender", false);
            model.addAttribute("isExists",false);
            return "update-user";
        }
        else {
            return "index";
        }
    }

        @PostMapping("/update-user")
        public String updateUser( @Valid UpdateClientBindingModel updateClientBindingModel,
                                  BindingResult bindingResult, RedirectAttributes redirectAttributes) {
            if (UserInterceptor.isUserLogged()) {
                if (bindingResult.hasErrors() || !(updateClientBindingModel.getPassword().equals(updateClientBindingModel.getConfirmPassword()))) {
                    redirectAttributes.addFlashAttribute("updateClientBindingModel", updateClientBindingModel);
                    redirectAttributes.addFlashAttribute("org.springframework.validation.BindingResult.updateClientBindingModel", bindingResult);
                    if (!(updateClientBindingModel.getPassword().equals(updateClientBindingModel.getConfirmPassword()))) {
                        redirectAttributes.addFlashAttribute("dontMatch", true);
                    }
                    return "redirect:/users/update-user";
                }


                else {
                    AppClient currentUserAppClient = this.userService.findCurrentUserAppClient();
                    AppClient appClient = this.modelMapper.map(updateClientBindingModel, AppClient.class);
                    appClient.setId(currentUserAppClient.getId());
                    appClient.setUsername(currentUserAppClient.getUsername());
                    appClient.setPassword(this.passwordEncoder.encode(updateClientBindingModel.getPassword()));
                    appClient.setRoles(currentUserAppClient.getRoles());
                    this.userService.saveUpdatedUserClient(appClient);
                    return "redirect:/users/account-info";
                }
            }
            else{
                return "index";
            }
    }

    @GetMapping("/update-business")
    public String showUpdateBusinessForm(Model model, HttpServletRequest request) {
        if (UserInterceptor.isUserLogged()) {
            BusinessOwner currentUserBusinessOwner = this.userService.findCurrentUserBusinessOwner();
            UpdateBusinessBindingModel updateBusinessBindingModel = this.modelMapper.map(currentUserBusinessOwner, UpdateBusinessBindingModel.class);
            request.getSession().setAttribute("userId", currentUserBusinessOwner.getId());
            model.addAttribute("updateBusinessBindingModel", updateBusinessBindingModel);
            model.addAttribute("dontMatch", false);
            model.addAttribute("isExists",false);
            return "update-business";
        }
        else{
            return "index";
        }
    }

    @PostMapping("/update-business")
    public String updateBusiness(@Valid UpdateBusinessBindingModel updateBusinessBindingModel ,
                                 BindingResult bindingResult, RedirectAttributes redirectAttributes, HttpServletRequest request) {
        if (UserInterceptor.isUserLogged()) {
            if (bindingResult.hasErrors() || !(updateBusinessBindingModel.getPassword().equals(updateBusinessBindingModel.getConfirmPassword()))||
                    this.userService.businessExists(updateBusinessBindingModel.getBusinessName())) {
                redirectAttributes.addFlashAttribute("updateBusinessBindingModel", updateBusinessBindingModel);
                redirectAttributes.addFlashAttribute("org.springframework.validation.BindingResult.updateBusinessBindingModel", bindingResult);
                if (!(updateBusinessBindingModel.getPassword().equals(updateBusinessBindingModel.getConfirmPassword()))) {
                    redirectAttributes.addAttribute("dontMatch", true);
                }
                return "redirect:/users/update-business";

            }

            else {
                Long userId = (Long) request.getSession().getAttribute("userId");
                UserEntity user = this.userService.findUserById(userId);
                BusinessOwner businessOwner = this.modelMapper.map(updateBusinessBindingModel, BusinessOwner.class);
                businessOwner.setId(userId);
                businessOwner.setUsername(user.getUsername());
                businessOwner.setPassword(this.passwordEncoder.encode(updateBusinessBindingModel.getPassword()));
                businessOwner.setRoles(user.getRoles());
                this.userService.saveUpdatedUser(businessOwner);
                return "redirect:/users/business-account-info";
            }
        }
        else {
            return "index";
        }
    }
    @GetMapping("/deleteAppClient")
    public String deleteAppClient(){
        if (UserInterceptor.isUserLogged()) {
            AppClient currentUserAppClient = this.userService.findCurrentUserAppClient();
            if(aboService.getExcistingAbosForClient(currentUserAppClient.getId()).isEmpty()) {
                this.userService.deleteAppClient(currentUserAppClient.getId());
                return "redirect:/";
            }

            else {
                throw new FailToDeleteException("Failed to delete user. You have existing Abos.");
            }
        }
        else {
            return "index";
        }
    }
    @GetMapping("/deleteBusinessOwner")
    public String deleteBusinessOwner() {
        if (UserInterceptor.isUserLogged()) {
            BusinessOwner currentUserBusinessOwner = this.userService.findCurrentUserBusinessOwner();
            if(this.aboService.getAbosPerBusiness().isEmpty() && this.hobbyService.getAllHobbyOffers().isEmpty()) {
                this.userService.deleteBusinessOwner(currentUserBusinessOwner.getId());
                return "redirect:/";
            }
            else {
                throw new FailToDeleteException("Failed to delete user. You have existing clients or offers.");
            }
        }
        else {
            return "index";
        }
    }

}


