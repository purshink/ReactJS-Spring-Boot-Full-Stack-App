package com.example.hobbie.view;

import com.example.hobbie.model.entities.AppClient;
import com.example.hobbie.model.entities.Hobby;
import com.sun.xml.bind.v2.TODO;

import java.math.BigDecimal;

public class AboViewModel {
    private Long id;
    private String clientName;
    private Long hobbyId;
    private String name;
    private BigDecimal aboPrice;

    public AboViewModel() {
    }
        //TODO: AboViewModel
    //TODO DELETE ABO
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public BigDecimal getAboPrice() {
        return aboPrice;
    }

    public void setAboPrice(BigDecimal aboPrice) {
        this.aboPrice = aboPrice;
    }

    public Long getHobbyId() {
        return hobbyId;
    }

    public void setHobbyId(Long hobbyId) {
        this.hobbyId = hobbyId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
