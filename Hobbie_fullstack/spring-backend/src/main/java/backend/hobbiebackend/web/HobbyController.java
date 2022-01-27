package backend.hobbiebackend.web;


import backend.hobbiebackend.model.dto.HobbyInfoDto;
import backend.hobbiebackend.model.dto.HobbyInfoUpdateDto;
import backend.hobbiebackend.model.dto.UpdateBusinessDto;
import backend.hobbiebackend.model.entities.BusinessOwner;
import backend.hobbiebackend.model.entities.Category;
import backend.hobbiebackend.model.entities.Hobby;
import backend.hobbiebackend.model.entities.Location;
import backend.hobbiebackend.service.CategoryService;
import backend.hobbiebackend.service.HobbyService;
import backend.hobbiebackend.service.LocationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@RestController
@RequestMapping("/hobbies")
@CrossOrigin(origins = "http://localhost:4200")
public class HobbyController {


    private final HobbyService hobbyService;
    private final CategoryService categoryService;
    private final LocationService locationService;
    private final ModelMapper modelMapper;

    @Autowired
    public HobbyController(HobbyService hobbyService, CategoryService categoryService, LocationService locationService, ModelMapper modelMapper) {

        this.hobbyService = hobbyService;
        this.categoryService = categoryService;
        this.locationService = locationService;
        this.modelMapper = modelMapper;
    }




    @PostMapping("/create-offer")
    public  void saveHobby(@RequestBody HobbyInfoDto info){

        Hobby offer = this.modelMapper.map(info, Hobby.class);
        Category category = this.categoryService.findByName(info.getCategory());
        Location location = this.locationService.getLocationByName(info.getLocation());
        offer.setLocation(location);
        offer.setCategory(category);

        this.hobbyService.createHobby(offer);

    }

    @GetMapping(value ="/hobbie-details/{id}")
    public Hobby getHobbyDetails(@PathVariable Long id){

//          "isSaved", this.hobbyService.isHobbySaved(id));


            return this.hobbyService.findHobbieById(id);


    }

//
//    @GetMapping("/save-hobby/{id}")
//    public String saveHobbyForClient(){
//
////            Hobby hobby = this.hobbyService.findHobbieById(id);
////            this.hobbyService.saveHobbyForClient(hobby);
//
////          "isSaved", this.hobbyService.isHobbySaved(id));
//            return "hobbie-details";
//
//
//    }
//
//    @GetMapping("/remove-hobby/{id}")
//    public void removeHobby(@RequestParam(value = "id") Long id){
//
//            Hobby hobby = this.hobbyService.findHobbieById(id);
//            this.hobbyService.removeHobbyForClient(hobby);
//
//    }
//

    @PostMapping("/update-hobby")
    public ResponseEntity<?> updateHobby(@RequestBody HobbyInfoUpdateDto info) throws Exception {
        Hobby offer = this.modelMapper.map(info, Hobby.class);
        Category category = this.categoryService.findByName(info.getCategory());
        Location location = this.locationService.getLocationByName(info.getLocation());
        offer.setLocation(location);
        offer.setCategory(category);
            this.hobbyService.saveUpdatedHobby(offer);
            return  new ResponseEntity<Hobby>(offer, HttpStatus.CREATED);

    }

    @DeleteMapping("/delete-hobby/{id}")
    public ResponseEntity<Long> deleteHobby(@PathVariable Long id) throws IOException {
        boolean isRemoved = this.hobbyService.deleteHobby(id);

        if (!isRemoved) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}


//
//    String  profileImgUrl,
//    String name, String  slogan, CategoryNameEnum category, String intro, String description, String price, String  creator, LocationEnum  location, String    galleryImgUrl1, String    galleryImgUrl2, String   galleryImgUrl3, String  galleryImgUrl4, String  galleryImgUrl5, String  galleryImgUrl6, String  contactInfo,