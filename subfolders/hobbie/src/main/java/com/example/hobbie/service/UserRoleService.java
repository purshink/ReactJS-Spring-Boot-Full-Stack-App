package com.example.hobbie.service;

import com.example.hobbie.model.entities.UserRoleEntity;
import com.example.hobbie.model.entities.enums.UserRoleEnum;

public interface UserRoleService {
    UserRoleEntity getUserRoleByEnumName(UserRoleEnum userRoleEnum);

    UserRoleEntity saveRole(UserRoleEntity userRoleEntity);
}
