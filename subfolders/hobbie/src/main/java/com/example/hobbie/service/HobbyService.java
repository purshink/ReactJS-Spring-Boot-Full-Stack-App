package com.example.hobbie.service;

import com.example.hobbie.model.entities.AppClient;
import com.example.hobbie.model.entities.BusinessOwner;
import com.example.hobbie.model.entities.Hobby;
import com.example.hobbie.model.entities.UserEntity;
import com.example.hobbie.model.service.HobbyServiceModel;
import com.example.hobbie.model.service.UpdateHobbyServiceModel;
import com.example.hobbie.view.HobbyCardViewModel;
import com.example.hobbie.view.HobbyViewModel;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface HobbyService {
    Long createHobby(HobbyServiceModel hobbyServiceModel,  String fileName) throws IOException;

    List<HobbyViewModel> getAllHobbyOffers();

    Hobby findHobbieById(Long id);


    void saveUpdatedHobby(UpdateHobbyServiceModel map, String fileName) throws IOException;

    void deleteHobby(long id) throws IOException;

    List<Hobby> initHobbyOffers();

    List<Hobby> findHobbyMatches(AppClient currentUserAppClient);
    List<HobbyCardViewModel> getHobbyMatches(AppClient currentAppClient);


    void saveHobbyForClient(Hobby hobby);

    void removeHobbyForClient(Hobby hobby);

    boolean isHobbySaved(Long hobbyId);
    List<Hobby> findSavedHobbies(AppClient appClient);

}
