package com.example.hobbie.web;

import com.example.hobbie.model.entities.enums.CategoryNameEnum;
import com.example.hobbie.model.entities.enums.LocationEnum;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class HobbyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser(value = "user", roles = {"USER", "ADMIN"})
    void showOffer_should_work() throws Exception {
        this.mockMvc.perform(get("/hobbies/create_offer")).
                andExpect(view().name("create_offer")).
                andExpect(status().isOk());
    }

    @Test
    void saveHobby_should_work() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.post( "/hobbies/create_offer")
                .param("img", "file")
                .param("name", "Nikoleta").
                        param("description", "bla").
                        param("category", CategoryNameEnum.ACTIVE.name()).
                        param("price", String.valueOf(new BigDecimal("100"))).
                        param("location", LocationEnum.ZURICH.name()).
                        with(csrf())).
                andExpect(status().is3xxRedirection());
    }

    @Test
    @WithMockUser(value = "user", roles = {"USER", "ADMIN"})
    void showHome_should_work() throws Exception {
        this.mockMvc.
                perform(get("/hobbies/save-hobby/{id}", 1L)).
                andExpect(status().isOk());
    }

    @Test
    @WithMockUser(value = "user", roles = {"USER", "ADMIN"})
    void removeHobby_should_work() throws Exception {
        this.mockMvc.
                perform(get("/hobbies/remove-hobby/{id}", 1L)).
                andExpect(status().isOk());
    }
}