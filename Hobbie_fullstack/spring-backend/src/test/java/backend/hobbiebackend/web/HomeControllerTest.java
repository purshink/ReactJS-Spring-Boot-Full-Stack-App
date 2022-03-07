package backend.hobbiebackend.web;

import backend.hobbiebackend.model.entities.Hobby;
import backend.hobbiebackend.model.entities.enums.CategoryNameEnum;
import backend.hobbiebackend.model.entities.enums.LocationEnum;
import backend.hobbiebackend.service.HobbyService;
import backend.hobbiebackend.service.TestService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class HomeControllerTest extends AbstractTest{


    @Autowired
    private HomeController controller;
    private String username;
    private Set<Hobby> hobbies;

    @MockBean
    private HobbyService service;

    @Before
    public void setUp() {
        username = "user";
        hobbies = new HashSet<>();
        Hobby hobby = new Hobby();
        hobbies.add(hobby);

        super.setUp();
    }


    @Test
    public void contextLoads()  {
        assertThat(controller).isNotNull();
    }

    @Test
    public void get_all_offers_should_work() throws Exception {
        String uri = "/business-owner/user";
        when(service.getAllHobbiesForBusiness(username)).thenReturn(hobbies);
        String inputJson = super.mapToJson(username);
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                .contentType(MediaType.APPLICATION_JSON_VALUE).content(inputJson)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);

        String content = mvcResult.getResponse().getContentAsString();
        Hobby[] hobbyList = super.mapFromJson(content, Hobby[].class);
        assertTrue(hobbyList.length > 0);
    }

    @Test
    public void get_all_hobbies_should_work() throws Exception {
        String uri = "/user-home/user";
        when(service.getAllHobbieMatchesForClient(username)).thenReturn(hobbies);
        String inputJson = super.mapToJson(username);
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                .contentType(MediaType.APPLICATION_JSON_VALUE).content(inputJson)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);

        String content = mvcResult.getResponse().getContentAsString();
        Hobby[] hobbyList = super.mapFromJson(content, Hobby[].class);
        assertTrue(hobbyList.length > 0);
    }

}
