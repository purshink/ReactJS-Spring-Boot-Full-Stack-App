package backend.hobbiebackend.web;


import backend.hobbiebackend.model.entities.Hobby;
import backend.hobbiebackend.model.entities.Test;
import backend.hobbiebackend.service.HobbyService;
import backend.hobbiebackend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/hobbies")
@CrossOrigin(origins = "http://localhost:4200")
public class HobbyController {


    private final HobbyService hobbyService;
    private final UserService userService;

    @Autowired
    public HobbyController(ModelMapper modelMapper, HobbyService hobbyService,UserService userService) {

        this.hobbyService = hobbyService;
        this.userService = userService;
    }




    @PostMapping("/create-offer")
    public  void saveHobby(@RequestBody Hobby offer,List<String> urls){
     
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
//    public String removeHobby(){
//
////            Hobby hobby = this.hobbyService.findHobbieById(id);
////            this.hobbyService.removeHobbyForClient(hobby);
////
////            "isSaved", this.hobbyService.isHobbySaved(id));
//            return "hobbie-details";
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



