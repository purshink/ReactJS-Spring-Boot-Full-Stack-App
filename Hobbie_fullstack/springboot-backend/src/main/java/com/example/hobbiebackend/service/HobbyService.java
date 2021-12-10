package com.example.hobbiebackend.service;

import com.example.hobbiebackend.model.entities.AppClient;
import com.example.hobbiebackend.model.entities.Hobby;
import com.example.hobbiebackend.model.service.HobbyServiceModel;
import com.example.hobbiebackend.model.service.UpdateHobbyServiceModel;
import com.example.hobbiebackend.view.HobbyCardViewModel;
import com.example.hobbiebackend.view.HobbyViewModel;

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
