package com.example.hobbiebackend.web;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class DefaultController {
    @RequestMapping(method = RequestMethod.GET, path = "/default")
    public String defaultAfterLogin(HttpServletRequest request) {
        if (request.isUserInRole("ROLE_BUSINESS_USER")) {
            return "redirect:/business_owner/";
        } else if (request.isUserInRole("ROLE_USER")) {
            return "redirect:/user_home/";
        }
        return "redirect:/";
        }
    }


