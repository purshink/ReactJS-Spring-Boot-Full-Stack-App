package com.example.hobbie.view;

import com.example.hobbie.model.entities.enums.CategoryNameEnum;

import javax.persistence.Transient;
import java.math.BigDecimal;

public class HobbyCardViewModel {
    private Long id;
    private String name;
    private BigDecimal price;
    private String profilePhoto;
    private String imgUrl;

    public HobbyCardViewModel() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProfilePhoto() {
        return profilePhoto;
    }

    public void setProfilePhoto(String profilePhoto) {
        this.profilePhoto = profilePhoto;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Transient()
    public String getProfilePhotoImagePath() {
        if (profilePhoto == null || id == null) return null;

        return "/hobby-photos/" + id + "/" + profilePhoto;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }
}
