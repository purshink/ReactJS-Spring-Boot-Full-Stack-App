package backend.hobbiebackend.service;


import backend.hobbiebackend.model.entities.AppClient;
import backend.hobbiebackend.model.entities.BusinessOwner;
import backend.hobbiebackend.model.entities.Hobby;
import backend.hobbiebackend.model.entities.UserEntity;

import java.util.List;

public interface UserService {
    List<UserEntity> seedUsersAndUserRoles();

//    AppClient register(SignUpServiceModel signUpServiceModel);
//    BusinessOwner findCurrentUserBusinessOwner();
//    AppClient findCurrentUserAppClient();
//    String findCurrentUsername();
//    BusinessOwner registerBusiness(RegisterBusinessServiceModel map);

    BusinessOwner saveUpdatedUser(BusinessOwner businessOwner);

    AppClient saveUpdatedUserClient(AppClient appClient);

    UserEntity findUserById(Long userId);

    void deleteUser(Long id);

    BusinessOwner findBusinessOwnerById(Long id);


    UserEntity findUserByUsername(String username);

    boolean userExists(String username, String email);

    void deleteBusinessOwner(Long id);

    void deleteAppClient(Long id);

    AppClient findAppClientById(Long clientId);

    void findAndRemoveHobbyFromClientsRecords(Hobby hobby);
//    void expireUserSessions();

    boolean businessExists(String businessName);

    AppClient findAppClientByUsername(String username);
}


