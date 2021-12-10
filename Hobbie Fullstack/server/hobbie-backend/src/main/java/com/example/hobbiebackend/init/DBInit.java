package com.example.hobbiebackend.init;



import com.example.hobbiebackend.service.CategoryService;
import com.example.hobbiebackend.service.HobbyService;
import com.example.hobbiebackend.service.LocationService;
import com.example.hobbiebackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DBInit implements CommandLineRunner {

    private final UserService userService;
    private final CategoryService categoryService;
    private final HobbyService hobbyService;
    private final LocationService locationService;

    @Autowired
    public DBInit(UserService userService, CategoryService categoryService, HobbyService hobbyService, LocationService locationService) {
        this.userService = userService;
        this.categoryService = categoryService;
        this.hobbyService = hobbyService;
        this.locationService = locationService;
    }


    @Override
        public void run(String... args) throws Exception {
        this.userService.seedUsersAndUserRoles();
        this.categoryService.initCategories();
        this.locationService.initLocations();

        //TODO PHOTOS??
        this.hobbyService.initHobbyOffers();

    }

}
