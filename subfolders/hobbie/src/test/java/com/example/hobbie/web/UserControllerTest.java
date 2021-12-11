package com.example.hobbie.web;

import com.example.hobbie.model.entities.enums.GenderEnum;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;


    @Test
    @WithMockUser(value = "user", roles = {"USER", "ADMIN"})
    void showSignUp_should_work() throws Exception {
        this.mockMvc.perform(get("/users/signup")).
                andExpect(view().name("signup")).
                andExpect(status().isOk());
    }

    @Test
    void signup_should_work() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/users/signup")
                .param("username", "user")
                .param("fullName", "full name").
                        param("gender", GenderEnum.FEMALE.name()).
                        param("email", "test@patient.com").
                        param("password", "h[v`8r2TA')!-Ln3").
                        param("confirmPassword", "h[v`8r2TA')!-Ln3").
                        with(csrf())).
                andExpect(status().is3xxRedirection());
    }

    @Test
    @WithMockUser(value = "user", roles = {"USER", "ADMIN"})
    void showRegisterBusiness_should_work() throws Exception {
        this.mockMvc.perform(get("/users/register-business")).
                andExpect(view().name("register-business")).
                andExpect(status().isOk());
    }

    @Test
    void registerBusiness_should_work() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/users/signup")
                .param("username", "business")
                .param("businessName", "business name").
                        param("address", "address 7").
                        param("email", "test@patient.com").
                        param("password", "h[v`8r2TA')!-Ln3").
                        param("confirmPassword", "h[v`8r2TA')!-Ln3").
                        with(csrf())).
                andExpect(status().is3xxRedirection());
    }
//
//    @Test
//    void showLogin() {
//    }
//
//    @Test
//    void failedLogin() {
//    }
//
//    @Test
//    void showBusinessAccountInfo() {
//    }
//
//    @Test
//    void showUpdateForm() {
//    }
//
//    @Test
//    void updateUser() {
//    }

}