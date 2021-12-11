package com.example.hobbie.config;

import com.example.hobbie.security.HobbieUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig  extends WebSecurityConfigurerAdapter {
    private final HobbieUserDetailsService hobbieUserDetailsService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public SecurityConfig(HobbieUserDetailsService hobbieUserDetailsService, PasswordEncoder passwordEncoder) {
        this.hobbieUserDetailsService = hobbieUserDetailsService;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    protected void configure (AuthenticationManagerBuilder auth) throws Exception   {
        auth.userDetailsService(hobbieUserDetailsService).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure (HttpSecurity http) throws Exception   {

        http.authorizeRequests().antMatchers("/css/**","/img/**","/js/**").permitAll()
                .antMatchers("/", "/users/login","/users/signup", "/users/register-business").permitAll()
        .antMatchers("/**").authenticated()
                .and()
                .formLogin().loginPage("/users/login")
                .usernameParameter(UsernamePasswordAuthenticationFilter.SPRING_SECURITY_FORM_USERNAME_KEY)
                .passwordParameter(UsernamePasswordAuthenticationFilter.SPRING_SECURITY_FORM_PASSWORD_KEY)
                .defaultSuccessUrl("/default")
                .failureForwardUrl("/users/login-error")
                .and()
                .logout()
                .logoutSuccessUrl("/")
                // remove the session from the server
                        .invalidateHttpSession(true).
                // delete the session cookie
                        deleteCookies("JSESSIONID");

    }


}
