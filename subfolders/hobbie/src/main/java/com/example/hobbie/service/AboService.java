package com.example.hobbie.service;

import com.example.hobbie.model.entities.Abo;
import com.example.hobbie.model.entities.AppClient;
import com.example.hobbie.view.AboViewModel;

import java.util.List;
import java.util.Map;

public interface AboService {

    List<Abo> saveAbos(List<Abo> inCart);

    List<AboViewModel> getUserAbos(Long id);


    void updateAbosWithEntries(List<Abo> abos);

    Long findAboId(Long id);

    List<AboViewModel> getAbosPerBusiness();


    AppClient getClientDetails(Long id);

    AboViewModel findAboById(Long id);

    List<Abo> getExcistingAbosForClient(Long id);

    void deleteAbo(Long id);

    void findExcistingAbosWithHobbyId(Long id);

    Abo findAbo(Long id);
}
