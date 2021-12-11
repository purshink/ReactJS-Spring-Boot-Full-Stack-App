package backend.hobbiebackend.service;

import backend.hobbiebackend.model.entities.UserRoleEntity;
import backend.hobbiebackend.model.entities.enums.UserRoleEnum;

public interface UserRoleService {
    UserRoleEntity getUserRoleByEnumName(UserRoleEnum userRoleEnum);

    UserRoleEntity saveRole(UserRoleEntity userRoleEntity);
}
