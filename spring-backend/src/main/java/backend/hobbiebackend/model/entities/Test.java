package backend.hobbiebackend.model.entities;

import backend.hobbiebackend.model.entities.enums.CategoryNameEnum;
import backend.hobbiebackend.model.entities.enums.LocationEnum;

import javax.persistence.*;

@Entity
@Table(name = "test_results")
public class Test extends BaseEntity {
    private String username;
    private CategoryNameEnum categoryOne;
    private CategoryNameEnum categoryTwo;
    private CategoryNameEnum categoryThree;
    private CategoryNameEnum categoryFour;
    private CategoryNameEnum categoryFive;
    private CategoryNameEnum categorySix;
    private CategoryNameEnum categorySeven;
    private LocationEnum location;

    public Test() {
    }

    @Column
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "category_one")
    public CategoryNameEnum getCategoryOne() {
        return categoryOne;
    }

    public void setCategoryOne(CategoryNameEnum categoryOne) {
        this.categoryOne = categoryOne;
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "category_two")
    public CategoryNameEnum getCategoryTwo() {
        return categoryTwo;
    }

    public void setCategoryTwo(CategoryNameEnum categoryTwo) {
        this.categoryTwo = categoryTwo;
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "category_three")
    public CategoryNameEnum getCategoryThree() {
        return categoryThree;
    }

    public void setCategoryThree(CategoryNameEnum categoryThree) {
        this.categoryThree = categoryThree;
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "category_four")
    public CategoryNameEnum getCategoryFour() {
        return categoryFour;
    }

    public void setCategoryFour(CategoryNameEnum categoryFour) {
        this.categoryFour = categoryFour;
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "category_five")
    public CategoryNameEnum getCategoryFive() {
        return categoryFive;
    }

    public void setCategoryFive(CategoryNameEnum categoryFive) {
        this.categoryFive = categoryFive;
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "category_six")
    public CategoryNameEnum getCategorySix() {
        return categorySix;
    }

    public void setCategorySix(CategoryNameEnum categorySix) {
        this.categorySix = categorySix;
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "category_seven")
    public CategoryNameEnum getCategorySeven() {
        return categorySeven;
    }

    public void setCategorySeven(CategoryNameEnum categorySeven) {
        this.categorySeven = categorySeven;
    }

    @Enumerated(EnumType.STRING)
    public LocationEnum getLocation() {
        return location;
    }

    public void setLocation(LocationEnum location) {
        this.location = location;
    }
}
