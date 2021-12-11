package com.example.hobbie.service.impl;

import com.example.hobbie.handler.NotFoundException;
import com.example.hobbie.model.entities.AppClient;
import com.example.hobbie.service.NotificationService;
import com.example.hobbie.view.EntryViewModel;
import com.example.hobbie.model.entities.Entry;
import com.example.hobbie.model.repostiory.EntryRepository;
import com.example.hobbie.service.EntryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EntryServiceImpl implements EntryService {

    private final EntryRepository entryRepository;
    private final ModelMapper modelMapper;
    private final NotificationService notificationService;


    @Autowired
    public EntryServiceImpl( EntryRepository entryRepository, ModelMapper modelMapper, NotificationService notificationService) {
        this.entryRepository = entryRepository;
        this.modelMapper = modelMapper;
        this.notificationService = notificationService;
    }


    @Override
    public List<EntryViewModel> getAboEntries(Long id) {
        List<Entry> allByAboId = this.entryRepository.findAllByAboId(id);
        return allByAboId.stream().map(entry -> this.modelMapper.map(entry, EntryViewModel.class)).collect(Collectors.toList());
    }

    @Override
    public List<Entry> saveAboEntries(List<Entry> aboEntries) {

        return this.entryRepository.saveAll(aboEntries);
    }

    @Override
    public void saveUpdatedEntry(AppClient appClient, Long entryId) {
//
        Optional<Entry> entry = this.entryRepository.findById(entryId);
        if(entry.isPresent()){
            try {
                this.notificationService.sendNotification(appClient,entry.get());
            }
            catch (MailException e){

                System.out.println(e.toString());

            }
           entry.get().setInProcess(true);
            this.entryRepository.save(entry.get());
        }
        else {
            throw new NotFoundException("Entry not found");
        }

    }

    @Override
    public void confirmUpdatedEntry(Long entryId) {
        Optional<Entry> entry = this.entryRepository.findById(entryId);
        if(entry.isPresent()){
            entry.get().setDate(new SimpleDateFormat("MM.dd.yyyy").format(Calendar.getInstance().getTime()));
            entry.get().setInProcess(false);
            this.entryRepository.save(entry.get());

        }
        else {
            throw new NotFoundException("Entry not found");
        }

    }


}
