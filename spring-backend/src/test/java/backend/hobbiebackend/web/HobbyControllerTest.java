package backend.hobbiebackend.web;

import backend.hobbiebackend.model.dto.HobbyInfoDto;
import backend.hobbiebackend.model.dto.HobbyInfoUpdateDto;
import backend.hobbiebackend.model.entities.*;
import backend.hobbiebackend.model.entities.enums.CategoryNameEnum;
import backend.hobbiebackend.model.entities.enums.LocationEnum;
import backend.hobbiebackend.service.HobbyService;
import backend.hobbiebackend.service.UserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class HobbyControllerTest extends AbstractTest {
    @Autowired
    private HobbyController controller;
    private HobbyInfoDto hobbyInfoDto;
    private HobbyInfoUpdateDto hobbyInfoUpdateDto;
    private Hobby hobby;

    @Before
    public void setUp() {
        // prepare data
        hobbyInfoDto = new HobbyInfoDto();
        hobbyInfoDto.setCreator("user");
        hobbyInfoDto.setDescription("What is Equestrian Tourism?\n" +
                "The Equestrian Tourism is an activity that combines the passion for horse riding with the interest to visit different regions, provinces and countries, which allows to discover different cultures, other people and typical gastronomy.\n" +
                "\n" +
                "Is it difficult to ride a horse?\n" +
                "The practice of horse riding is known as equitation and it is relatively simple to start with, at least to be able to go on rides in the countryside. If your interest grows further, you will want to improve your riding skills and acquire more knowledge about horses.\n" +
                "\n" +
                "How fast your skills improve depend on every individual and on your purpose, you can ride for pleasure in the nature in all types of terrain or choose an equestrian sport and train professionally.\n" +
                "\n");
        hobbyInfoDto.setIntro("What is Equestrian Tourism?\n" +
                "The Equestrian Tourism is an activity that combines the passion for horse riding with the interest to visit different regions, provinces and countries, which allows to discover different cultures, other people and typical gastronomy.\n" +
                "\n" +
                "Is it difficult to ride a horse?\n" +
                "The practice of horse riding is known as equitation and it is relatively simple to start with, at least to be able to go on rides in the countryside. If your interest grows further, you will want to improve your riding skills and acquire more knowledge about horses.\n" +
                "\n" +
                "How fast your skills improve depend on every individual and on your purpose, you can ride for pleasure in the nature in all types of terrain or choose an equestrian sport and train professionally.\n" +
                "\n");
        hobbyInfoDto.setSlogan("slogan");
        hobbyInfoDto.setProfileImgUrl("url");
        hobbyInfoDto.setGalleryImgUrl1("url");
        hobbyInfoDto.setGalleryImgUrl2("url");
        hobbyInfoDto.setGalleryImgUrl3("url");
        hobbyInfoDto.setProfileImg_id("id");
        hobbyInfoDto.setGalleryImg1_id("id");
        hobbyInfoDto.setGalleryImg2_id("id");
        hobbyInfoDto.setGalleryImg3_id("id");
        hobbyInfoDto.setPrice(BigDecimal.valueOf(123));
        hobbyInfoDto.setContactInfo("How fast your skills improve depend on every individual and on your purpose.");


        hobbyInfoUpdateDto = new HobbyInfoUpdateDto();
        hobbyInfoUpdateDto.setCreator("user");
        hobbyInfoUpdateDto.setCategory(CategoryNameEnum.ACTIVE);
        hobbyInfoUpdateDto.setLocation(LocationEnum.ZURICH);
        hobbyInfoUpdateDto.setDescription("What is Equestrian Tourism?\n" +
                "The Equestrian Tourism is an activity that combines the passion for horse riding with the interest to visit different regions, provinces and countries, which allows to discover different cultures, other people and typical gastronomy.\n" +
                "\n" +
                "Is it difficult to ride a horse?\n" +
                "The practice of horse riding is known as equitation and it is relatively simple to start with, at least to be able to go on rides in the countryside. If your interest grows further, you will want to improve your riding skills and acquire more knowledge about horses.\n" +
                "\n" +
                "How fast your skills improve depend on every individual and on your purpose, you can ride for pleasure in the nature in all types of terrain or choose an equestrian sport and train professionally.\n" +
                "\n");
        hobbyInfoUpdateDto.setIntro("What is Equestrian Tourism?\n" +
                "The Equestrian Tourism is an activity that combines the passion for horse riding with the interest to visit different regions, provinces and countries, which allows to discover different cultures, other people and typical gastronomy.\n" +
                "\n" +
                "Is it difficult to ride a horse?\n" +
                "The practice of horse riding is known as equitation and it is relatively simple to start with, at least to be able to go on rides in the countryside. If your interest grows further, you will want to improve your riding skills and acquire more knowledge about horses.\n" +
                "\n" +
                "How fast your skills improve depend on every individual and on your purpose, you can ride for pleasure in the nature in all types of terrain or choose an equestrian sport and train professionally.\n" +
                "\n");
        hobbyInfoUpdateDto.setId(1L);
        hobbyInfoUpdateDto.setSlogan("slogan");
        hobbyInfoUpdateDto.setProfileImgUrl("url");
        hobbyInfoUpdateDto.setGalleryImgUrl1("url");
        hobbyInfoUpdateDto.setGalleryImgUrl2("url");
        hobbyInfoUpdateDto.setGalleryImgUrl3("url");
        hobbyInfoUpdateDto.setProfileImg_id("id");
        hobbyInfoUpdateDto.setGalleryImg1_id("id");
        hobbyInfoUpdateDto.setGalleryImg2_id("id");
        hobbyInfoUpdateDto.setGalleryImg3_id("id");
        hobbyInfoUpdateDto.setPrice(BigDecimal.valueOf(123));
        hobbyInfoUpdateDto.setContactInfo("How fast your skills improve depend on every individual and on your purpose.");

        ModelMapper modelMapper = new ModelMapper();
        Category category = new Category(CategoryNameEnum.ACTIVE);
        Location location = new Location(LocationEnum.ZURICH);
        hobby = modelMapper.map(hobbyInfoDto, Hobby.class);
        hobby.setCategory(category);
        hobby.setLocation(location);
        AppClient client = new AppClient();
        client.setUsername("user");
        String username = "user";
        List<Hobby> hobbies = new ArrayList<>();
        hobby = new Hobby();
        hobbies.add(hobby);

        super.setUp();
    }

    @MockBean
    private HobbyService service;
    @MockBean
    private UserService userService;

    @Test
    public void contextLoads() {
        assertThat(controller).isNotNull();
    }

    @Test
    public void create_offer_should_work() throws Exception {
        String uri = "/hobbies";
        String inputJson = super.mapToJson(hobbyInfoDto);
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post(uri)
                .contentType(MediaType.APPLICATION_JSON_VALUE).content(inputJson)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
    }

    @Test
    public void hobby_details_should_work() throws Exception {
        String uri = "/hobbies/1";
        Long id = 1L;
        String inputJson = super.mapToJson(id);
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                .contentType(MediaType.APPLICATION_JSON_VALUE).content(inputJson)).andReturn();

        when(service.findHobbieById(id)).thenReturn(hobby);

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
    }

    @Test
    public void delete_hobby_should_work() throws Exception {
        String uri = "/hobbies/1";
        long id = 1L;
        when(service.deleteHobby(id)).thenReturn(true);
        String inputJson = super.mapToJson(id);
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.delete(uri)
                .contentType(MediaType.APPLICATION_JSON_VALUE).content(inputJson)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
    }

    @Test
    public void delete_hobby_should_work_when_not_found() throws Exception {
        String uri = "/hobbies/1";
        long id = 1L;
        when(service.deleteHobby(id)).thenReturn(false);

        String inputJson = super.mapToJson(id);
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.delete(uri)
                .contentType(MediaType.APPLICATION_JSON_VALUE).content(inputJson)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(404, status);
    }

    @Test
    public void update_hobby_should_work() throws Exception {
        String uri = "/hobbies";
        String inputJson = super.mapToJson(hobbyInfoUpdateDto);

        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.put(uri)
                .contentType(MediaType.APPLICATION_JSON_VALUE).content(inputJson)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(201, status);
    }
}
