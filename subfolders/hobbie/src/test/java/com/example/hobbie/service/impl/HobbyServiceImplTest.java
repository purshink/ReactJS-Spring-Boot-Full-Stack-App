package com.example.hobbie.service.impl;

import com.example.hobbie.handler.NotFoundException;
import com.example.hobbie.model.entities.*;
import com.example.hobbie.model.entities.enums.CategoryNameEnum;
import com.example.hobbie.model.entities.enums.LocationEnum;
import com.example.hobbie.model.repostiory.*;
import com.example.hobbie.model.service.HobbyServiceModel;
import com.example.hobbie.service.*;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.Mockito;
import org.modelmapper.ModelMapper;


import java.io.IOException;
import java.math.BigDecimal;

import java.util.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;


class HobbyServiceImplTest {
    private HobbyRepository mockHobbyRepository;
    private NotificationService  notificationService;
    private HobbyService hobbyServiceToTest;
    private AppClient appClient;
    private  Hobby hobby;


    @BeforeEach
    void setUp()  {
        EntryRepository mockEntryRepository = mock(EntryRepository.class);
        BusinessOwner businessOwner = new BusinessOwner();
        AboRepository aboRepository = mock(AboRepository.class);
        mockHobbyRepository= mock(HobbyRepository.class);
        CategoryRepository mockCategoryRepository = mock(CategoryRepository.class);
        CategoryService categoryServiceTest = mock(CategoryService.class);
        LocationService locationServiceTest = mock(LocationService.class);
        mockCategoryRepository = mock(CategoryRepository.class);
        ModelMapper modelMapper = new ModelMapper();
        appClient = new AppClient();
        CloudinaryService cloudinaryServiceTest = mock(CloudinaryService.class);
        UserService userServiceTest = mock(UserService.class);
        AboService aboServiceTest = new AboServiceImpl(aboRepository, userServiceTest, modelMapper);
        EntryService entryServiceTest = new EntryServiceImpl( mockEntryRepository, modelMapper, notificationService);
        ShoppingCartService shoppingCartServiceTest = new ShoppingCartServiceImpl(userServiceTest, aboServiceTest, entryServiceTest);
        hobbyServiceToTest = new HobbyServiceImpl(modelMapper,mockHobbyRepository, mockCategoryRepository, categoryServiceTest, userServiceTest, locationServiceTest, aboServiceTest, shoppingCartServiceTest,cloudinaryServiceTest);


        // prepare hobby data
        hobby = new Hobby();
        hobby.setId(1L);
        HobbyServiceModel hobbyServiceModel = new HobbyServiceModel();
        hobbyServiceModel.setCategory(CategoryNameEnum.ACTIVE);
        hobbyServiceModel.setLocation(LocationEnum.ZURICH);
        hobby.setImgUrl("img_url");
        Location location = new Location();
        location.setName(LocationEnum.ZURICH);
        hobby.setLocation(location);
        hobby.setBusinessOwner(businessOwner);
        hobby.setPrice(new BigDecimal("100"));
        Category category = new Category();
        category.setName(CategoryNameEnum.ACTIVE);
        hobby.setCategory(category);
        hobby.setName("hobbyName");

        //config mock
        when(mockCategoryRepository.save(Mockito.any(Category.class)))
                .thenAnswer(i -> i.getArguments()[0]);
        when(mockHobbyRepository.save(Mockito.any(Hobby.class)))
                .thenAnswer(i -> i.getArguments()[0]);
        when(categoryServiceTest.findByName(CategoryNameEnum.ACTIVE)).
                thenReturn(new Category() {{
                    setName(CategoryNameEnum.ACTIVE);
                }});

        when(userServiceTest.findCurrentUserBusinessOwner()).
                thenReturn(businessOwner);
        when(locationServiceTest.getLocationByName(LocationEnum.ZURICH)).
                thenReturn(location);
        when(mockHobbyRepository.findById(1L)).
                thenReturn(Optional.of(hobby));
        when(userServiceTest.findCurrentUserAppClient()).
                thenReturn(appClient);

    }



    @Test
    void testUserNotFound() {
        Assertions.assertThrows(
                NotFoundException.class, () -> {
                    hobbyServiceToTest.findHobbieById(null);
                    hobbyServiceToTest.deleteHobby(0L);
                }
        );
    }

        @Test
    void findHobbieById_should_Work() {
            Assertions.assertEquals(hobby, hobbyServiceToTest.findHobbieById(1L) );
    }

        @Test
    void deleteHobby_should_work() throws IOException {
            when(mockHobbyRepository.findById(1L))
                    .thenReturn(Optional.of(hobby));

            hobbyServiceToTest.deleteHobby(1L);

            Mockito.verify(mockHobbyRepository, times(1)).deleteById(1L);
    }

    @Test
    void initHobbyOffers_should_work() {
        hobbyServiceToTest.initHobbyOffers();
        assertEquals(5,  hobbyServiceToTest.initHobbyOffers().size());
    }

    @Test
    void saveHobbyForClient_should_work() {
        appClient.setSaved_hobbies(new ArrayList<>());
        hobbyServiceToTest.saveHobbyForClient(hobby);
        assertEquals(1, appClient.getSaved_hobbies().size());
    }

    @Test
    void removeHobbyForClient_should_work() {
        List<Hobby> saved = new ArrayList<>();
        saved.add(hobby);
        appClient.setSaved_hobbies(saved);
        hobbyServiceToTest.removeHobbyForClient(hobby);
        assertEquals(0, appClient.getSaved_hobbies().size());
    }

    @Test
    void isHobbySaved_should_work() {
        appClient.setSaved_hobbies(new ArrayList<>());
        hobbyServiceToTest.saveHobbyForClient(hobby);
        assertTrue(hobbyServiceToTest.isHobbySaved(1L));
    }

    @Test
    void findSavedHobbies_should_work() {
        appClient.setSaved_hobbies(new ArrayList<>());
        hobbyServiceToTest.saveHobbyForClient(hobby);
        assertEquals(1, hobbyServiceToTest.findSavedHobbies(appClient).size());
    }
}