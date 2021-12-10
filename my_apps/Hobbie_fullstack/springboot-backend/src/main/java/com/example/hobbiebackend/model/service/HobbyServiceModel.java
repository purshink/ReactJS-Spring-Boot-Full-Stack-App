package com.example.hobbiebackend.model.service;

import com.example.hobbiebackend.model.entities.BusinessOwner;
import com.example.hobbiebackend.model.entities.Category;
import com.example.hobbiebackend.model.entities.Location;
import com.example.hobbiebackend.model.entities.enums.CategoryNameEnum;
import com.example.hobbiebackend.model.entities.enums.LocationEnum;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

public class HobbyServiceModel {
    private String name;
    private String description;
    private CategoryNameEnum category;
    private BigDecimal price;
    private LocationEnum location;
    private MultipartFile img;
    private String slogan;
    private String intro;
    private MultipartFile img1;
    private MultipartFile img2;
    private MultipartFile img3;
    private MultipartFile img4;
    private MultipartFile img5;
    private MultipartFile img6;
    private String contactInfo;

    public HobbyServiceModel() {
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

    public CategoryNameEnum getCategory() {
        return category;
    }

    public void setCategory(CategoryNameEnum category) {
        this.category = category;
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

    public MultipartFile getImg() {
        return img;
    }

    public void setImg(MultipartFile img) {
        this.img = img;
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

    public MultipartFile getImg1() {
        return img1;
    }

    public void setImg1(MultipartFile img1) {
        this.img1 = img1;
    }

    public MultipartFile getImg2() {
        return img2;
    }

    public void setImg2(MultipartFile img2) {
        this.img2 = img2;
    }

    public MultipartFile getImg3() {
        return img3;
    }

    public void setImg3(MultipartFile img3) {
        this.img3 = img3;
    }

    public MultipartFile getImg4() {
        return img4;
    }

    public void setImg4(MultipartFile img4) {
        this.img4 = img4;
    }

    public MultipartFile getImg5() {
        return img5;
    }

    public void setImg5(MultipartFile img5) {
        this.img5 = img5;
    }

    public MultipartFile getImg6() {
        return img6;
    }

    public void setImg6(MultipartFile img6) {
        this.img6 = img6;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }
}
