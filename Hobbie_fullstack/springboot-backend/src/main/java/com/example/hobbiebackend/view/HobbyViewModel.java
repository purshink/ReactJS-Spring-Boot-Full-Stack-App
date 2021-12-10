package com.example.hobbiebackend.view;

import com.example.hobbiebackend.model.entities.BusinessOwner;
import com.example.hobbiebackend.model.entities.Category;
import com.example.hobbiebackend.model.entities.Location;
import com.example.hobbiebackend.model.entities.enums.LocationEnum;

import java.math.BigDecimal;

public class HobbyViewModel {
    private Long id;
    private String name;
    private String description;
    private String profilePhoto;
    private BigDecimal price;
    private LocationEnum location;
    private String imgUrl;
    private String slogan;
    private String intro;
    private String profileImgUrl;
    private String galleryImgUrl1;
    private String galleryImgUrl2;
    private String galleryImgUrl3;
    private String galleryImgUrl4;
    private String galleryImgUrl5;
    private String galleryImgUrl6;
    private String contactInfo;

    public HobbyViewModel() {
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public LocationEnum getLocation() {
        return location;
    }

    public void setLocation(LocationEnum location) {
        this.location = location;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getSlogan() {
        return slogan;
    }

    public void setSlogan(String slogan) {
        this.slogan = slogan;
    }

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }

    public String getProfileImgUrl() {
        return profileImgUrl;
    }

    public void setProfileImgUrl(String profileImgUrl) {
        this.profileImgUrl = profileImgUrl;
    }

    public String getGalleryImgUrl1() {
        return galleryImgUrl1;
    }

    public void setGalleryImgUrl1(String galleryImgUrl1) {
        this.galleryImgUrl1 = galleryImgUrl1;
    }

    public String getGalleryImgUrl2() {
        return galleryImgUrl2;
    }

    public void setGalleryImgUrl2(String galleryImgUrl2) {
        this.galleryImgUrl2 = galleryImgUrl2;
    }

    public String getGalleryImgUrl3() {
        return galleryImgUrl3;
    }

    public void setGalleryImgUrl3(String galleryImgUrl3) {
        this.galleryImgUrl3 = galleryImgUrl3;
    }

    public String getGalleryImgUrl4() {
        return galleryImgUrl4;
    }

    public void setGalleryImgUrl4(String galleryImgUrl4) {
        this.galleryImgUrl4 = galleryImgUrl4;
    }

    public String getGalleryImgUrl5() {
        return galleryImgUrl5;
    }

    public void setGalleryImgUrl5(String galleryImgUrl5) {
        this.galleryImgUrl5 = galleryImgUrl5;
    }

    public String getGalleryImgUrl6() {
        return galleryImgUrl6;
    }

    public void setGalleryImgUrl6(String galleryImgUrl6) {
        this.galleryImgUrl6 = galleryImgUrl6;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }
}
