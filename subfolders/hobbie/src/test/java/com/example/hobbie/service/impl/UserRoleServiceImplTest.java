package com.example.hobbie.service.impl;

import com.example.hobbie.handler.NotFoundException;
import com.example.hobbie.model.entities.UserRoleEntity;
import com.example.hobbie.model.entities.enums.UserRoleEnum;
import com.example.hobbie.model.repostiory.AppClientRepository;
import com.example.hobbie.model.repostiory.BusinessOwnerRepository;
import com.example.hobbie.model.repostiory.UserRepository;
import com.example.hobbie.model.repostiory.UserRoleRepository;
import com.example.hobbie.service.UserRoleService;
import org.junit.Assert;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserRoleServiceImplTest {
    private UserRoleService mockUserRoleServiceToTest;
    private     UserRoleEntity userRoleEntity;
    private   UserRoleRepository mockUserRoleRepository;

    @BeforeEach
    public void setUp() {
       mockUserRoleRepository = mock(UserRoleRepository.class);
        mockUserRoleServiceToTest = new UserRoleServiceImpl(mockUserRoleRepository);
        userRoleEntity = new UserRoleEntity();
        userRoleEntity.setRole(UserRoleEnum.USER);
        when(mockUserRoleRepository.save(any(UserRoleEntity.class)))
                .thenAnswer(i -> i.getArguments()[0]);

    }

    @Test
    void getUserRoleByEnumName_Should_Work() {

        Mockito.when(mockUserRoleRepository.findByRole(UserRoleEnum.USER)).
                thenReturn(Optional.of(userRoleEntity));
        UserRoleEntity userRoleByEnumName = mockUserRoleServiceToTest.getUserRoleByEnumName(UserRoleEnum.USER);

        assertEquals(userRoleEntity.getRole(),userRoleByEnumName.getRole());
    }

    @Test
    void role_should_be_Saved() {
        Mockito.when(mockUserRoleRepository.save(any(UserRoleEntity.class))).
                thenReturn(userRoleEntity);
        UserRoleEntity userRole= mockUserRoleServiceToTest.saveRole(this.userRoleEntity);

        assertEquals(userRole.getId(), userRoleEntity.getId());
    }

  @Test
    void testUserNotFound() {
      Assertions.assertThrows(
                NotFoundException.class,
                () -> mockUserRoleServiceToTest.getUserRoleByEnumName(UserRoleEnum.USER));
    }



}