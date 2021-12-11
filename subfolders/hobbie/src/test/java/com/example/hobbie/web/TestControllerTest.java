package com.example.hobbie.web;

import com.example.hobbie.model.entities.enums.CategoryNameEnum;
import com.example.hobbie.model.entities.enums.GenderEnum;
import com.example.hobbie.model.entities.enums.LocationEnum;
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
class TestControllerTest {
    @Autowired
    private MockMvc mockMvc;

//    private CategoryNameEnum categoryOne;
//    private CategoryNameEnum categoryTwo;
//    private CategoryNameEnum categoryThree;
//    private CategoryNameEnum categoryFour;
//    private CategoryNameEnum categoryFive;
//    private CategoryNameEnum categorySix;
//    private CategoryNameEnum categorySeven;
//    private LocationEnum location;


    @Test
    @WithMockUser(value = "user", roles = {"USER", "ADMIN"})
    void showTest_should_work() throws Exception {
        this.mockMvc.perform(get("/test")).
                andExpect(view().name("test")).
                andExpect(status().isOk());
    }


    @Test
    @WithMockUser(value = "user", roles = {"USER", "ADMIN"})
    void saveTestResults_should_work() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/test")
                .param("categoryOne", CategoryNameEnum.CREATIVE.name())
                .param("categoryTwo", CategoryNameEnum.CREATIVE.name())
                .param("categoryThree", CategoryNameEnum.CREATIVE.name())
                .param("categoryFour", CategoryNameEnum.CREATIVE.name())
                .param("categoryFive", CategoryNameEnum.CREATIVE.name())
                .param("categorySix", CategoryNameEnum.CREATIVE.name())
                .param("categorySeven", CategoryNameEnum.CREATIVE.name())
                .param("location", LocationEnum.ZURICH.name())
                .with(csrf())).
                andExpect(status().is3xxRedirection());

    }
}