package com.example.hobbie.web;

import com.example.hobbie.model.entities.Abo;
import com.example.hobbie.model.entities.AppClient;
import com.example.hobbie.model.entities.BusinessOwner;
import com.example.hobbie.model.entities.UserRoleEntity;
import com.example.hobbie.model.entities.enums.GenderEnum;
import com.example.hobbie.model.entities.enums.UserRoleEnum;
import com.example.hobbie.model.repostiory.AppClientRepository;
import com.example.hobbie.model.repostiory.BusinessOwnerRepository;
import com.example.hobbie.model.repostiory.UserRoleRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

import java.util.List;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class DefaultControllerTest {

    @Autowired
    private MockMvc mockMvc;


    @Test
    @WithMockUser(value = "user", roles = {"USER", "ADMIN"})
    void defaultAfterLoginWithUser_should_work() throws Exception {
        this.mockMvc.perform(get("/user_home/")).
                andExpect(view().name("user_home")).
                andExpect(status().isOk());
    }

    @Test
    @WithMockUser(value = "business", roles = {"BUSINESS_USER"})
    void defaultAfterLoginWithBusiness_should_work() throws Exception {
        this.mockMvc.perform(get("/business_owner/")).
                andExpect(view().name("business_owner")).
                andExpect(status().isOk());
    }
    @Test
    void defaultRedirect_should_work() throws Exception {
        this.mockMvc.perform(get("/default/")).
                andExpect(status().is(302));
    }
    @Test
    void defaultBeforeLogin_should_work() throws Exception {
        this.mockMvc.perform(get("/")).
                andExpect(view().name("index")).
                andExpect(status().isOk());
    }
}