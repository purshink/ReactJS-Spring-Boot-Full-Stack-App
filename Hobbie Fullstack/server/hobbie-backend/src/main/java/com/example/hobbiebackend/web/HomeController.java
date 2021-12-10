package com.example.hobbiebackend.web;


import com.example.hobbiebackend.model.entities.AppClient;

import com.example.hobbiebackend.service.HobbyService;
import com.example.hobbiebackend.service.UserService;
import com.example.hobbiebackend.view.HobbyCardViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

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
    public ModelAndView adminShow(@AuthenticationPrincipal UserDetails principal) {

            ModelAndView mav = new ModelAndView("business_owner");
            mav.addObject("user", principal);
            mav.addObject("hobby_offers", hobbyService.getAllHobbyOffers());

            return mav;

    }


    //TODO: IMPLEMENT /user as Admin page
    @GetMapping("/user")
    public ModelAndView userShow(@AuthenticationPrincipal UserDetails principal) {
        ModelAndView mav= new ModelAndView("user");
        mav.addObject("user", principal);
        return mav;
    }

    @GetMapping("/user_home")
    public ModelAndView userHomeShow(@AuthenticationPrincipal UserDetails principal) {

            boolean isEmpty = false;
            boolean hasNoResults = false;
            ModelAndView mav = new ModelAndView("user_home");
            mav.addObject("user", principal);
            AppClient currentUserAppClient = this.userService.findCurrentUserAppClient();
            List<HobbyCardViewModel> hobbyMatches = this.hobbyService.getHobbyMatches(currentUserAppClient);
            if(currentUserAppClient.getTestResults() == null){
                hasNoResults = true;
            }
            else if(hobbyMatches.isEmpty()){
                isEmpty = true;
            }

                mav.addObject("hobby_matches", hobbyMatches);
                mav.addObject("hasNoMatches", isEmpty);
                mav.addObject("hasNoResults", hasNoResults);

            return mav;

    }
}
