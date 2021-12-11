package com.example.hobbie.web;

import com.example.hobbie.model.entities.*;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;

import com.example.hobbie.model.entities.enums.CategoryNameEnum;
import com.example.hobbie.model.entities.enums.GenderEnum;
import com.example.hobbie.model.entities.enums.LocationEnum;
import com.example.hobbie.model.entities.enums.UserRoleEnum;
import com.example.hobbie.model.repostiory.*;
import com.example.hobbie.service.UserRoleService;
import com.example.hobbie.service.impl.UserRoleServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;


import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class AboControllerTest {
    private static final String ABO_CONTROLLER_PREFIX = "/my-abos";

    @Autowired
    private MockMvc mockMvc;




    @Test
    @WithMockUser(value = "user", roles = {"USER", "ADMIN"})
    public void testShowAllAbosOK() throws Exception {
        this.mockMvc.perform(get("/my-abos")).
                andExpect(view().name("my-abos")).
                andExpect(status().isOk());
    }

    @Test
    @WithMockUser(value = "user", roles = {"USER", "ADMIN"})
    public void testShowAboOK() throws Exception {
        this.mockMvc.
                perform(get("/abo/{id}", 1L)).
                andExpect(status().isOk());
    }


    @Test
    @WithMockUser(value = "user", roles = {"USER", "ADMIN"})
    void deleteAboThrows() throws Exception {
        this.mockMvc.
                perform(post("/delete-abo/{id}", 1L)).
                andExpect(status().is(403));
    }
}