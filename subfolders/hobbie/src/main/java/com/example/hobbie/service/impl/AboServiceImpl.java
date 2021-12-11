package com.example.hobbie.service.impl;

import com.example.hobbie.handler.FailToDeleteException;
import com.example.hobbie.handler.NotFoundException;
import com.example.hobbie.model.entities.Abo;
import com.example.hobbie.model.entities.AppClient;
import com.example.hobbie.model.repostiory.AboRepository;
import com.example.hobbie.service.AboService;
import com.example.hobbie.service.NotificationService;
import com.example.hobbie.service.UserService;
import com.example.hobbie.view.AboViewModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AboServiceImpl implements AboService {
    private final AboRepository aboRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;


    @Autowired
    public AboServiceImpl(AboRepository aboRepository, UserService userService, ModelMapper modelMapper) {
        this.aboRepository = aboRepository;
        this.userService = userService;
        this.modelMapper = modelMapper;

    }

    @Override
    public List<Abo> saveAbos(List<Abo> inCart) {

       return this.aboRepository.saveAll(inCart);
    }

    @Override
    public List<AboViewModel> getUserAbos(Long id) {


        List<Abo> byClientId = this.aboRepository.findByClientId(id);

        return byClientId.stream().map(abo -> this.modelMapper.map(abo, AboViewModel.class)).collect(Collectors.toList());
    }

    @Override
    public void updateAbosWithEntries(List<Abo> abos) {
            this.aboRepository.saveAll(abos);
    }

    @Override
    public Long findAboId(Long id) {
        Optional<Abo> byEntriesId = this.aboRepository.findByEntriesId(id);

        if(byEntriesId.isPresent()){
            return byEntriesId.get().getId();
        }

        else{
            throw new NotFoundException("This abo does not exist.");
        }
    }

    @Override
    public List<AboViewModel> getAbosPerBusiness() {
        Long id = this.userService.findCurrentUserBusinessOwner().getId();
        List<Abo> abos = this.aboRepository.findAllByBusinessOwnerId(id);
        return abos.stream().map(abo -> this.modelMapper.map(abo,AboViewModel.class)).collect(Collectors.toList());
    }

    @Override
    public AppClient getClientDetails(Long id) {

        Optional<Abo> byId = this.aboRepository.findById(id);

        if(byId.isPresent()){
            return this.userService.findAppClientById(byId.get().getClientId());
        }
        else{
            throw new NotFoundException("No such client. This abo does not exist.");
        }

    }

    @Override
    public AboViewModel findAboById(Long id) {
        Optional<Abo> byId = this.aboRepository.findById(id);

        if(byId.isPresent()){
            return this.modelMapper.map(byId.get(), AboViewModel.class);
        }
        else {
            throw new NotFoundException("This abo does not exist.");
        }
    }

    @Override
    public List<Abo> getExcistingAbosForClient(Long id) {

        return this.aboRepository.findByClientId(id);

    }

    @Override
    public void deleteAbo(Long id) {
        Optional<Abo> byId = this.aboRepository.findById(id);
        if(byId.isPresent()){
            this.aboRepository.delete( byId.get());
        }
        else {
            throw new NotFoundException("Abo does not exist");
        }

    }

    @Override
    public void findExcistingAbosWithHobbyId(Long id) {
        List<Abo> byHobbyId = this.aboRepository.findByHobbyId(id);
        if(byHobbyId.size() > 0){
            throw new FailToDeleteException("Can not delete hobby. There are existing Abos for this offer.");
        }
    }

    @Override
    public Abo findAbo(Long id) {
        Optional<Abo> byId = this.aboRepository.findById(id);

        if(byId.isPresent()){
            return byId.get();
        }
        else {

            throw new NotFoundException("Abo does not exist");
        }

    }


}
