package com.example.hobbie.model.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "business_owners")
public class BusinessOwner extends UserEntity {
    private String businessName;
    private String address;
    private List<Hobby> hobby_offers;
    //TODO PHONE NUMBER
    //TODO BankDetail bankDetails;


    public BusinessOwner(String username, String email, List<UserRoleEntity> roles, String password, String businessName, String address) {
        super(username, email, roles, password);
        this.businessName = businessName;
        this.address = address;
    }

    public BusinessOwner() {
    }

    @Column(name = "business_name", nullable = false)
    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }
    @Column(nullable = false)
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @OneToMany
    public List<Hobby> getHobby_offers() {
        return hobby_offers;
    }

    public void setHobby_offers(List<Hobby> hobby_offers) {
        this.hobby_offers = hobby_offers;
    }


}
