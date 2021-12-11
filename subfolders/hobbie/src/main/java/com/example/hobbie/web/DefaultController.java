package com.example.hobbie.web;

import com.example.hobbie.config.UserInterceptor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

@Controller

public class DefaultController {
    @RequestMapping("/default")
    public String defaultAfterLogin(HttpServletRequest request) {
        if (UserInterceptor.isUserLogged()) {
            if (request.isUserInRole("ROLE_BUSINESS_USER")) {
                return "redirect:/business_owner/";
            } else if (request.isUserInRole("ROLE_USER")) {
                return "redirect:/user_home/";
            }
            return "redirect:/";
        }
       return "index";
        }

    }


