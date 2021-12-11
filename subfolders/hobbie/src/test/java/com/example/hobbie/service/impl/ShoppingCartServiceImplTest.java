package com.example.hobbie.service.impl;

import com.example.hobbie.model.entities.*;
import com.example.hobbie.model.entities.enums.CategoryNameEnum;
import com.example.hobbie.model.entities.enums.GenderEnum;
import com.example.hobbie.model.entities.enums.LocationEnum;
import com.example.hobbie.model.entities.enums.UserRoleEnum;
import com.example.hobbie.model.repostiory.AboRepository;
import com.example.hobbie.model.repostiory.AppClientRepository;
import com.example.hobbie.model.service.RegisterBusinessServiceModel;
import com.example.hobbie.model.service.SignUpServiceModel;
import com.example.hobbie.service.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;


import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ShoppingCartServiceImplTest {
    private UserService userService;
    UserRoleService mockUserRoleService;
    private ShoppingCartService shoppingCartService;
    private AboRepository aboRepository;
    private AboService aboService;
    private EntryService entryService;
    private AppClient appClient;
    private SignUpServiceModel signUpServiceModel;
    private ModelMapper modelMapper;
    private BusinessOwner businessOwner;
    private RegisterBusinessServiceModel registerBusinessServiceModel;
    private List<Abo> inCart = new ArrayList<>();
    AppClientRepository mockAppClientRepository;
    private  Hobby hobby;
    private Abo abo;



    @BeforeEach
    void setUp() {
        appClient = new AppClient();
        businessOwner = new BusinessOwner();
        mockUserRoleService = mock(UserRoleService.class);
                mockAppClientRepository = mock(AppClientRepository.class);
                aboRepository = mock(AboRepository.class);
        userService = mock(UserService.class);
        aboService = new AboServiceImpl(aboRepository, userService, modelMapper);
        entryService = mock(EntryService.class);
        modelMapper = new ModelMapper();
        shoppingCartService = new ShoppingCartServiceImpl(userService, aboService, entryService);
//        // prepare data client
        signUpServiceModel = new SignUpServiceModel();
        signUpServiceModel.setUsername("user");
        signUpServiceModel.setPassword("topsecret");
        signUpServiceModel.setConfirmPassword("topsecret");
        signUpServiceModel.setEmail("testemail@gmail.com");
        signUpServiceModel.setFullName("full name");
        signUpServiceModel.setGender(GenderEnum.FEMALE);
        UserRoleEntity roleUser = new UserRoleEntity();
        roleUser.setRole(UserRoleEnum.USER);
        UserRoleEntity roleAdmin = new UserRoleEntity();
        roleAdmin.setRole(UserRoleEnum.ADMIN);
        appClient = this.modelMapper.map(signUpServiceModel, AppClient.class);
        appClient.setRoles(List.of(roleUser, roleAdmin));
        appClient.setId(1L);

//        // prepare data business
        registerBusinessServiceModel = new RegisterBusinessServiceModel();
        registerBusinessServiceModel.setUsername("business");
        registerBusinessServiceModel.setPassword("topsecret");
        registerBusinessServiceModel.setConfirmPassword("topsecret");
        registerBusinessServiceModel.setEmail("test@gmail.com");
        registerBusinessServiceModel.setBusinessName("business name");
        registerBusinessServiceModel.setAddress("Business address");
        UserRoleEntity roleBusiness = new UserRoleEntity();
        roleBusiness.setRole(UserRoleEnum.BUSINESS_USER);
        businessOwner = this.modelMapper.map(registerBusinessServiceModel, BusinessOwner.class);
        businessOwner.setRoles(List.of(roleBusiness));
        businessOwner.setId(2L);


        // prepare hobby data
        hobby = new Hobby();
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
//

        // prepare data abo
        abo = new Abo();
        abo.setClientId(1L);
        abo.setBusinessOwnerId(2L);
        abo.setHobbyId(hobby.getId());
        abo.setName(hobby.getName());
        abo.setClientName("client name");

        BigDecimal price = hobby.getPrice().multiply(new BigDecimal(5));
        price =  price.add(price.multiply(new BigDecimal("0.1")));
        price = price.setScale(2, RoundingMode.HALF_EVEN);
        abo.setAboPrice(price);

        //config mock

        when(mockAppClientRepository.save(Mockito.any(AppClient.class)))
                .thenAnswer(i -> i.getArguments()[0]);

        when(userService.findCurrentUserAppClient()).
                thenReturn(appClient);





    }

    @Test
    void addAboToCart() {
        shoppingCartService.addAboToCart(hobby);
        Assertions.assertEquals(1,shoppingCartService.getAbosInCart().size());
    }

    @Test
    void removeProductFromCart() {
        shoppingCartService.removeProductFromCart(hobby.getId());
        Assertions.assertEquals(0,shoppingCartService.getAbosInCart().size());
    }

    @Test
    void getTotal() {
        shoppingCartService.addAboToCart(hobby);
        Assertions.assertEquals(new BigDecimal("550.00"),shoppingCartService.getTotal());
    }

    @Test
    void checkout_should_work() {
        inCart.add(abo);
        shoppingCartService.checkout();
        Assertions.assertEquals(0,shoppingCartService.getAbosInCart().size());



    }


}