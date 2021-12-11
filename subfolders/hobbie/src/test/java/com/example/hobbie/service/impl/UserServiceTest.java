package com.example.hobbie.service.impl;

import com.example.hobbie.handler.NotFoundException;
import com.example.hobbie.model.entities.*;
import com.example.hobbie.model.entities.enums.GenderEnum;
import com.example.hobbie.model.entities.enums.UserRoleEnum;
import com.example.hobbie.model.repostiory.AppClientRepository;
import com.example.hobbie.model.repostiory.BusinessOwnerRepository;
import com.example.hobbie.model.repostiory.HobbyRepository;
import com.example.hobbie.model.repostiory.UserRepository;
import com.example.hobbie.model.service.RegisterBusinessServiceModel;
import com.example.hobbie.model.service.SignUpServiceModel;
import com.example.hobbie.service.UserRoleService;
import com.example.hobbie.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;


class UserServiceTest {

    private UserService userServiceToTest;
    private UserRepository mockUserRepository;
    private AppClientRepository mockAppClientRepository;
    private BusinessOwnerRepository mockBusinessOwnerRepository;
    private UserRoleService mockUserRoleService;
    private UserEntity userEntity;
    private AppClient appClient;
    private BusinessOwner businessOwner;
    private SignUpServiceModel signUpServiceModel;
    private  RegisterBusinessServiceModel registerBusinessServiceModel;



    @BeforeEach
    public void setUp() {
        mockUserRepository = mock(UserRepository.class);
        mockAppClientRepository = mock(AppClientRepository.class);
        HobbyRepository mockHobbyRepository = mock(HobbyRepository.class);
        PasswordEncoder mockPasswordEncoder = mock(BCryptPasswordEncoder.class);
        mockBusinessOwnerRepository = mock(BusinessOwnerRepository.class);
        mockUserRoleService = mock(UserRoleService.class);
        ModelMapper modelMapper = new ModelMapper();
        userServiceToTest = new UserServiceImpl(modelMapper, mockUserRepository, mockPasswordEncoder, mockAppClientRepository,
                mockBusinessOwnerRepository, mockUserRoleService);
        // prepare data client
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
        appClient = modelMapper.map(signUpServiceModel, AppClient.class);
        appClient.setRoles(List.of(roleUser, roleAdmin));

        // prepare data business
        registerBusinessServiceModel = new RegisterBusinessServiceModel();
        registerBusinessServiceModel.setUsername("business");
        registerBusinessServiceModel.setPassword("topsecret");
        registerBusinessServiceModel.setConfirmPassword("topsecret");
        registerBusinessServiceModel.setEmail("test@gmail.com");
        registerBusinessServiceModel.setBusinessName("business name");
        registerBusinessServiceModel.setAddress("Business address");
        UserRoleEntity roleBusiness = new UserRoleEntity();
        roleBusiness.setRole(UserRoleEnum.BUSINESS_USER);
        businessOwner = modelMapper.map(registerBusinessServiceModel, BusinessOwner.class);
        businessOwner.setRoles(List.of(roleBusiness));
        businessOwner.setId(2L);

        // prepare data user Entity
        userEntity = new UserEntity();
        userEntity.setEmail("email@gmail");
        userEntity.setUsername("username");
        userEntity.setPassword("topsecret");
        UserRoleEntity role= new UserRoleEntity();
        role.setRole(UserRoleEnum.USER);
        userEntity.setRoles(List.of(role));
        userEntity.setId(1L);


        // configure mocks
        when(mockPasswordEncoder.encode("topsecret"))
                .thenReturn("topsecret");
        when(mockUserRepository.save(Mockito.any(UserEntity.class)))
                .thenAnswer(i -> i.getArguments()[0]);
        when(mockAppClientRepository.save(Mockito.any(AppClient.class)))
                .thenAnswer(i -> i.getArguments()[0]);
        when(mockBusinessOwnerRepository.save(Mockito.any(BusinessOwner.class)))
                .thenAnswer(i -> i.getArguments()[0]);
        when(mockUserRoleService.saveRole(Mockito.any(UserRoleEntity.class)))
                .thenAnswer(i -> i.getArguments()[0]);
        when(mockHobbyRepository.save(Mockito.any(Hobby.class)))
                .thenAnswer(i -> i.getArguments()[0]);
        when(mockUserRoleService.getUserRoleByEnumName(UserRoleEnum.USER))
                .thenReturn(new UserRoleEntity() {{
                    setRole(UserRoleEnum.USER);
                }});
        when(mockUserRoleService.getUserRoleByEnumName(UserRoleEnum.BUSINESS_USER))
                .thenReturn(new UserRoleEntity() {{
                    setRole(UserRoleEnum.BUSINESS_USER);
                }});
        when(mockUserRoleService.getUserRoleByEnumName(UserRoleEnum.ADMIN))
                .thenReturn(new UserRoleEntity() {{
                    setRole(UserRoleEnum.ADMIN);
                }});

    }

    @Test
    void testUserNotFound() {
        Assertions.assertThrows(
                NotFoundException.class, () -> {
                    userServiceToTest.findUserById(null);
                    userServiceToTest.findBusinessOwnerById(null);
                    userServiceToTest.findUserByUsername("can-not-find-user");
                    userServiceToTest.deleteBusinessOwner(null);
                    userServiceToTest.deleteAppClient(null);
                    userServiceToTest.findAppClientById(null);
                    mockBusinessOwnerRepository.findByUsername("can-not-find-user");
                    mockAppClientRepository.findByUsername("can-not-find-user");
                }


        );
    }



    @Test
    void register_should_work() {

        when(mockAppClientRepository.findByUsername("user")).
                thenReturn(Optional.of(appClient));

        AppClient register = userServiceToTest.register(signUpServiceModel);
        assertEquals(appClient.getUsername(), register.getUsername());


    }

    @Test
    void registerBusiness_should_work() {

        Mockito.when(mockBusinessOwnerRepository.findByUsername("business")).
                thenReturn(Optional.of(businessOwner));


        BusinessOwner registerBusiness = userServiceToTest.registerBusiness(registerBusinessServiceModel);

        assertEquals(businessOwner.getUsername(), registerBusiness.getUsername());
    }

    @Test
    void findUserById_should_Work() {

        when(mockUserRepository.findById(1L)).
                thenReturn(Optional.of(userEntity));
        Assertions.assertEquals(userEntity, userServiceToTest.findUserById(1L) );
    }

    @Test
    void findBusinessOwnerById_should_work() {

        when(mockBusinessOwnerRepository.findById(2L)).
                thenReturn(Optional.of(businessOwner));
        Assertions.assertEquals(businessOwner, userServiceToTest.findBusinessOwnerById(2L) );

    }
    //
    @Test
    void findUserByUsername_should_work() {
        when(mockUserRepository.findByUsername("user")).
                thenReturn(Optional.of(userEntity));
        Assertions.assertEquals(userEntity, userServiceToTest.findUserByUsername("user"));
    }


    @Test
    void userExists_should_work() {
        when(mockUserRepository.findByUsername("user")).
                thenReturn(Optional.of(userEntity));

        Assertions.assertTrue(userServiceToTest.userExists("user", "email"));

    }
    @Test
    void seedUsersAndUserRoles_should_work() {

        userServiceToTest.seedUsersAndUserRoles();
        assertEquals(3, userServiceToTest.seedUsersAndUserRoles().size());
    }


    @Test
    void deleteUser_should_work() {
        when(mockUserRepository.findById(1L))
                .thenReturn(Optional.of(userEntity));

        userServiceToTest.deleteUser(userEntity.getId());

        Mockito.verify(mockUserRepository, times(1)).delete(userEntity);
    }


    @Test
    void deleteBusinessOwner_should_work() {
        when(mockBusinessOwnerRepository.findById(2L))
                .thenReturn(Optional.of(businessOwner));

        userServiceToTest.deleteBusinessOwner(2L);

        Mockito.verify(mockUserRepository, times(1)).delete(businessOwner);

    }

    @Test
    void deleteAppClient_should_work() {
        when(mockAppClientRepository.findById(1L))
                .thenReturn(Optional.of(appClient));

        userServiceToTest.deleteAppClient(1L);

        Mockito.verify(mockAppClientRepository, times(1)).delete(appClient);
    }


    @Test
    void findAppClientById_should_work() {
        when(mockAppClientRepository.findById(1L)).
                thenReturn(Optional.of(appClient));
        Assertions.assertEquals(appClient, userServiceToTest.findAppClientById(1L));
    }


    @Test
    void expireUserSessions_should_work() {

        Authentication authentication = mock(Authentication.class);

        userServiceToTest.expireUserSessions();
        Assertions.assertFalse(authentication.isAuthenticated());
    }


}