package com.example.hobbie.model.entities;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "abos")
public class Abo extends BaseEntity{
    private Long clientId;
    private Long businessOwnerId;
    private Long hobbyId;
    private List<Entry> entries;
    private BigDecimal aboPrice;
    private String name;
    private String clientName;

    public Abo() {
    }

    @Column
    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    @Column(nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @OneToMany(cascade = CascadeType.REMOVE)
    public List<Entry> getEntries() {
        return entries;
    }

    public void setEntries(List<Entry> entries) {
        this.entries = entries;
    }

    @Column(nullable = false)
    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }
    @Column(nullable = false)
    public Long getBusinessOwnerId() {
        return businessOwnerId;
    }

    public void setBusinessOwnerId(Long businessOwnerId) {
        this.businessOwnerId = businessOwnerId;
    }

    @Column(nullable = false)
    public Long getHobbyId() {
        return hobbyId;
    }

    public void setHobbyId(Long hobbyId) {
        this.hobbyId = hobbyId;
    }

    @Column
    public BigDecimal getAboPrice() {
        return aboPrice;
    }

    public void setAboPrice(BigDecimal aboPrice) {
        this.aboPrice = aboPrice;
    }
}
