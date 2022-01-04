package backend.hobbiebackend.model.entities;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "hobbies")
public class Hobby extends BaseEntity{

    private String name;
    private String slogan;
    private String intro;
    private String description;
    private Category category;
    private String creator;
    private BigDecimal price;
    private Location location;
    private String profileImgUrl;
    private String galleryImgUrl1;
    private String galleryImgUrl2;
    private String galleryImgUrl3;

    private String contactInfo;

    //TODO HOBBY ADDRESS




    public Hobby() {
    }

    @Column(name = "profile_image_url")
    public String getProfileImgUrl() {
        return profileImgUrl;
    }

    public void setProfileImgUrl(String profileImgUrl) {
        this.profileImgUrl = profileImgUrl;
    }

    @Column(nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(columnDefinition = "TEXT")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    @ManyToOne(fetch = FetchType.EAGER)
    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    @Column(nullable = false)
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Column
    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    @ManyToOne
    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getSlogan() {
        return slogan;
    }
    @Column(name = "slogan")
    public void setSlogan(String slogan) {
        this.slogan = slogan;
    }

    @Column(columnDefinition = "TEXT")
    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }
    @Column(name = "gallery_image_url_1")
    public String getGalleryImgUrl1() {
        return galleryImgUrl1;
    }

    public void setGalleryImgUrl1(String galleryImgUrl1) {
        this.galleryImgUrl1 = galleryImgUrl1;
    }
    @Column(name = "gallery_image_url_2")
    public String getGalleryImgUrl2() {
        return galleryImgUrl2;
    }

    public void setGalleryImgUrl2(String galleryImgUrl2) {
        this.galleryImgUrl2 = galleryImgUrl2;
    }
    @Column(name = "gallery_image_url_3")
    public String getGalleryImgUrl3() {
        return galleryImgUrl3;
    }

    public void setGalleryImgUrl3(String galleryImgUrl3) {
        this.galleryImgUrl3 = galleryImgUrl3;
    }

    @Column(name = "contact_info")
    public String getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }


}
