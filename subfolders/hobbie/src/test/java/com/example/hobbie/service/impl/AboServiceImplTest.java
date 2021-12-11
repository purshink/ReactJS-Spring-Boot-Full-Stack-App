package com.example.hobbie.service.impl;

import com.example.hobbie.handler.FailToDeleteException;
import com.example.hobbie.handler.NotFoundException;
import com.example.hobbie.model.entities.Abo;
import com.example.hobbie.model.entities.AppClient;
import com.example.hobbie.model.entities.BusinessOwner;
import com.example.hobbie.model.repostiory.AboRepository;
import com.example.hobbie.service.AboService;
import com.example.hobbie.service.UserService;
import com.example.hobbie.view.AboViewModel;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.BDDAssumptions.given;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyVararg;
import static org.mockito.Mockito.*;

class AboServiceImplTest {

    private AboService aboServiceTest;
    private AboRepository mockAboRepository;
    private UserService userService;
    private ModelMapper modelMapper;
    private Abo abo;

    @BeforeEach
    void setUp() {
        modelMapper = new ModelMapper();
        userService = mock(UserService.class);
        mockAboRepository = mock(AboRepository.class);
        abo = new Abo();
        abo.setId(1L);
        aboServiceTest = new AboServiceImpl(mockAboRepository, userService, modelMapper);

        //abo data

        //config mock
        when(mockAboRepository.save(Mockito.any(Abo.class)))
                .thenAnswer(i -> i.getArguments()[0]);

    }


    @Test
    void getUserAbos_should_work() {
        List<Abo> byId = new ArrayList<>();
        byId.add(abo);
        when(mockAboRepository.findByClientId(1L)).thenReturn(byId);
        aboServiceTest.getUserAbos(1L);
        assertEquals(1, aboServiceTest.getUserAbos(1L).size());
    }

    @Test
    void testUserNotFound() {
        Assertions.assertThrows(
                NotFoundException.class, () -> {
                    aboServiceTest.findAboById(null);
                    aboServiceTest.findAboId(null);
                    aboServiceTest.getClientDetails(null);
                    aboServiceTest.deleteAbo(null);
                }
        );
    }

    @Test
    void FailToDeleteException() {
        Assertions.assertThrows(
                FailToDeleteException.class, () -> {
                    List<Abo> byId = new ArrayList<>();
                    byId.add(abo);
                    mockAboRepository.save(abo);
                    when(mockAboRepository.findByHobbyId(1L)).thenReturn(byId);
                    aboServiceTest.findExcistingAbosWithHobbyId(1L);

                }
        );
    }

    @Test
    void findAboById_should_work() {
        when(mockAboRepository.findById(1L)).thenReturn(Optional.of(abo));
        AboViewModel aboViewModel = this.modelMapper.map(abo, AboViewModel.class);
        AboViewModel aboById = aboServiceTest.findAboById(1L);
        assertEquals(aboById.getId(), aboViewModel.getId());
    }

    @Test
    void findAboById_should_throw() {
        Assertions.assertThrows(
                NotFoundException.class, () -> {
                    aboServiceTest.findAboById(null);

                }
        );

    }

    @Test
    void findAboId_should_work() {
        when(mockAboRepository.findByEntriesId(1L)).thenReturn(Optional.of(abo));
        Long aboId = aboServiceTest.findAboId(1L);
        assertEquals(aboId, abo.getId());
    }

    @Test
    void findAboId_should_throw() {
        Assertions.assertThrows(
                NotFoundException.class, () -> {
                    aboServiceTest.findAboId(null);

                }
        );
    }

    @Test
    void deleteAbo_should_throw() {
        Assertions.assertThrows(
                NotFoundException.class, () -> {
                    aboServiceTest.deleteAbo(null);

                }
        );
    }

    @Test
    void deleteAbo_should_work() {
        when(mockAboRepository.findById(1L))
                .thenReturn(Optional.of(abo));

        aboServiceTest.deleteAbo(1L);

        Mockito.verify(mockAboRepository, times(1)).delete(abo);
    }

    @Test
    void findExcistingAbosWithHobbyId_should_work() {
        aboServiceTest.findExcistingAbosWithHobbyId(1L);
        Mockito.verify(mockAboRepository, times(1)).findByHobbyId(1L);
    }


    @Test
    void findAbo_should_work() {
        when(mockAboRepository.findById(1L))
                .thenReturn(Optional.of(abo));

        Abo abo1 = aboServiceTest.findAbo(1L);
        assertEquals(abo.getId(), abo1.getId());
    }

    @Test
    void findAbo_should_throw() {
        Assertions.assertThrows(
                NotFoundException.class, () -> {
                    aboServiceTest.findAbo(null);

                }
        );
    }

    @Test
    void getExcistingAbosForClient() {
        List<Abo> abos = new ArrayList<>();
        abos.add(abo);
        when(mockAboRepository.findByClientId(1L))
                .thenReturn(abos);
        aboServiceTest.getExcistingAbosForClient(1L);
        assertEquals(1, aboServiceTest.getExcistingAbosForClient(1L).size());

    }

    @Test
    void getAbosPerBusiness() {
        BusinessOwner bs = new BusinessOwner();
        bs.setId(1L);
        when(userService.findCurrentUserBusinessOwner())
                .thenReturn(bs);

        List<Abo> abos = new ArrayList<>();
        abos.add(abo);
        when(mockAboRepository.findAllByBusinessOwnerId(1L))
                .thenReturn(abos);
        assertEquals(1, aboServiceTest.getAbosPerBusiness().size());
    }

    @Test
    void getClientDetails() {
        when(mockAboRepository.findById(1L))
                .thenReturn(Optional.of(abo));
        abo.setClientId(2L);
        AppClient appClient = new AppClient();
        appClient.setId(2L);
        when(userService.findAppClientById(2L))
                .thenReturn(appClient);
        assertEquals(abo.getClientId(), aboServiceTest.getClientDetails(1L).getId());


    }
    @Test
    void updateAbosWithEntries() {
        List<Abo> abos = new ArrayList<>();
        abos.add(abo);

        aboServiceTest.updateAbosWithEntries(abos);
        Mockito.verify(mockAboRepository, times(1)).saveAll(abos);

    }
}




