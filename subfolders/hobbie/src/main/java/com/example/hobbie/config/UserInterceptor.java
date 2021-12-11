package com.example.hobbie.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Enumeration;

@Component
public class UserInterceptor implements HandlerInterceptor {

    Logger log = LoggerFactory.getLogger(UserInterceptor.class);
    public static boolean isUserLogged() {
        try {
            return !SecurityContextHolder.getContext().getAuthentication()
                    .getName().equals("anonymousUser");
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object object) throws Exception {
        if (isUserLogged()) {
            addToModelUserDetails(request.getSession());
        }
        return true;
    }

    private void addToModelUserDetails(HttpSession session) {
        log.info("=============== addToModelUserDetails =========================");

        String loggedUsername
                = SecurityContextHolder.getContext().getAuthentication().getName();
        session.setAttribute("username", loggedUsername);

        log.info("user(" + loggedUsername + ") session : " + session);
        log.info("=============== addToModelUserDetails =========================");
    }

    @Override
    public void postHandle(
            HttpServletRequest req,
            HttpServletResponse res,
            Object o,
            ModelAndView model) throws Exception {

        if (model != null && !isRedirectView(model)) {
            if (isUserLogged()) {
                addToModelUserDetails(model);
            }
        }
    }
    public static boolean isRedirectView(ModelAndView mv) {
        String viewName = mv.getViewName();
        if (viewName.startsWith("redirect:/")) {
            return true;
        }
        View view = mv.getView();
        return (view != null && view instanceof SmartView
                && ((SmartView) view).isRedirectView());
    }
    private void addToModelUserDetails(ModelAndView model) {
        log.info("=============== addToModelUserDetails =========================");

        String loggedUsername = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        model.addObject("loggedUsername", loggedUsername);

        log.trace("session : " + model.getModel());
        log.info("=============== addToModelUserDetails =========================");
    }

}
