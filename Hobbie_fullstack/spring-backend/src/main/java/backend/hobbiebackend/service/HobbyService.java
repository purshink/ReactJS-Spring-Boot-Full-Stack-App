package backend.hobbiebackend.service;


import backend.hobbiebackend.model.entities.AppClient;
import backend.hobbiebackend.model.entities.Hobby;

import java.io.IOException;
import java.util.List;
import java.util.Set;

public interface HobbyService {
//    Long createHobby(HobbyServiceModel hobbyServiceModel,  String fileName) throws IOException;

//    List<Hobby> getAllHobbyOffers();

    Hobby findHobbieById(Long id);


//    void saveUpdatedHobby(UpdateHobbyServiceModel map, String fileName) throws IOException;

    void deleteHobby(long id) throws IOException;

    List<Hobby> initHobbyOffers();

    Set<Hobby> findHobbyMatches(String username);



    void saveHobbyForClient(Hobby hobby);

    void removeHobbyForClient(Hobby hobby);

    boolean isHobbySaved(Long hobbyId);
    List<Hobby> findSavedHobbies(AppClient appClient);

    //Just for learning
    Set<Hobby> getAllHobbiesForBusiness(String username);


    Set<Hobby> getAllHobbieMatchesForClient(String username);

    void createHobby(Hobby offer);
}
