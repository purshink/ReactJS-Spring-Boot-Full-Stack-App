package com.example.hobbie.service.impl;

import com.example.hobbie.model.entities.Abo;
import com.example.hobbie.model.entities.AppClient;
import com.example.hobbie.model.entities.Entry;
import com.example.hobbie.model.entities.Hobby;
import com.example.hobbie.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ShoppingCartServiceImpl implements ShoppingCartService {


    private final UserService userService;
    private final AboService aboService;
    private final EntryService entryService;

    private List<Abo> inCart = new ArrayList<>();

    @Autowired
    public ShoppingCartServiceImpl(UserService userService, AboService aboService, EntryService entryService) {
        this.userService = userService;
        this.aboService = aboService;
        this.entryService = entryService;

    }

    @Override
    public void addAboToCart(Hobby hobbieById) {

        Abo abo = new Abo();
        AppClient currentUserAppClient = this.userService.findCurrentUserAppClient();
        abo.setClientId(currentUserAppClient.getId());
        abo.setBusinessOwnerId(hobbieById.getBusinessOwner().getId());
        abo.setHobbyId(hobbieById.getId());
        abo.setName(hobbieById.getName());
        abo.setClientName(currentUserAppClient.getFullName());

        BigDecimal price = hobbieById.getPrice().multiply(new BigDecimal(5));
        price =  price.add(price.multiply(new BigDecimal("0.1")));
        price = price.setScale(2, RoundingMode.HALF_EVEN);
        abo.setAboPrice(price);


        if(!inCart.contains(abo)){
            inCart.add(abo);
        }
    }


    @Override
    public void removeProductFromCart(Long hobbyId) {
        for (Abo abo : inCart) {
            if(abo.getHobbyId().equals(hobbyId)){
                inCart.remove(abo);
                break;
            }
        }
    }

    @Override
    public BigDecimal getTotal() {

        return inCart.stream().map(Abo::getAboPrice).reduce(BigDecimal::add).orElse(BigDecimal.ZERO);
    }

    @Override
    public List<Abo> getAbosInCart() {
        return inCart;
    }

    @Override
    public void checkout() {

        List<Abo> abos = this.aboService.saveAbos(inCart);
        abos.forEach(this::fillEntries);
        this.aboService.updateAbosWithEntries(abos);
        inCart.clear();
    }

    private void fillEntries(Abo abo) {

            List<Entry> aboEntries = new ArrayList<>();
            for (int i = 0; i < 5; i++) {
                Entry entry = new Entry();
                entry.setAbo(abo);
                aboEntries.add(entry);
            }
            List<Entry> entries = this.entryService.saveAboEntries(aboEntries);
            abo.setEntries(entries);

        }

    public UserService getUserService() {
        return userService;
    }

    public AboService getAboService() {
        return aboService;
    }

    public EntryService getEntryService() {
        return entryService;
    }

    public List<Abo> getInCart() {
        return inCart;
    }

    public void setInCart(List<Abo> inCart) {
        this.inCart = inCart;
    }
}
