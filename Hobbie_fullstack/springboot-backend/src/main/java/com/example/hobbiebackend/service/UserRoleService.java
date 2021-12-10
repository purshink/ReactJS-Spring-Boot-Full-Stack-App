package com.example.hobbiebackend.service;

import com.example.hobbiebackend.model.entities.UserRoleEntity;
import com.example.hobbiebackend.model.entities.enums.UserRoleEnum;

public interface UserRoleService {
    UserRoleEntity getUserRoleByEnumName(UserRoleEnum userRoleEnum);

    UserRoleEntity saveRole(UserRoleEntity userRoleEntity);
}
