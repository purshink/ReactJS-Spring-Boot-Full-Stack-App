package backend.hobbiebackend.web;


import backend.hobbiebackend.model.dto.HobbyInfoDto;
import backend.hobbiebackend.model.entities.Category;
import backend.hobbiebackend.model.entities.Hobby;
import backend.hobbiebackend.model.entities.Location;
import backend.hobbiebackend.service.CategoryService;
import backend.hobbiebackend.service.HobbyService;
import backend.hobbiebackend.service.LocationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


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
//
//    @GetMapping("/hobbie-details/{id}")
//    public String getHobbyDetails(){
//
////            Hobby hobby = this.hobbyService.findHobbieById(id);
//
////          "isSaved", this.hobbyService.isHobbySaved(id));
//
//
//            return "hobbie-details-by-id";
//
//    }
//
//    @GetMapping("/offer-details/{id}")
//    public String showOffer(){
//
//
////            Hobby hobby = this.hobbyService.findHobbieById(id);
//
//            return "offer-details";
//
//    }
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
//    @GetMapping("/update-hobby/{id}")
//    public String showUpdateHobbyForm(@PathVariable("id") long id, Model model) {
//
////            Hobby hobbie = this.hobbyService.findHobbieById(id);
//
//
//            return "update-hobby";
//
//    }
//
//    @PostMapping("/update-hobby/{id}")
//    public String updateHobby() {
//
////
////                updateHobbyBindingModel.setId(id);
////                this.hobbyService.saveUpdatedHobby();
//
//
//
//            return "updated_hobby";
//
//    }
//
//    @GetMapping("/delete-hobby/{id}")
//    public String deleteAppClient() {
//
////            this.hobbyService.deleteHobby(id);
//            return "deleted_hobby";
//
//    }
}


//
//    String  profileImgUrl,
//    String name, String  slogan, CategoryNameEnum category, String intro, String description, String price, String  creator, LocationEnum  location, String    galleryImgUrl1, String    galleryImgUrl2, String   galleryImgUrl3, String  galleryImgUrl4, String  galleryImgUrl5, String  galleryImgUrl6, String  contactInfo,