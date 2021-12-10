package com.example.hobbiebackend.web;



import com.example.hobbiebackend.model.binding.HobbyBindingModel;
import com.example.hobbiebackend.model.binding.UpdateHobbyBindingModel;
import com.example.hobbiebackend.model.entities.Hobby;
import com.example.hobbiebackend.model.service.HobbyServiceModel;
import com.example.hobbiebackend.model.service.UpdateHobbyServiceModel;
import com.example.hobbiebackend.service.HobbyService;
import com.example.hobbiebackend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;
import java.io.IOException;
import java.util.Objects;

@RestController
@RequestMapping("/hobbies")
@CrossOrigin(origins = "http://localhost:4200/")
public class HobbyController {

    private final ModelMapper modelMapper;
    private final HobbyService hobbyService;
    private final UserService userService;

    @Autowired
    public HobbyController(ModelMapper modelMapper, HobbyService hobbyService,UserService userService) {
        this.modelMapper = modelMapper;
        this.hobbyService = hobbyService;
        this.userService = userService;
    }


    @GetMapping("/create_offer")
    public ModelAndView showCreateOffer(Model model) {

            if (!model.containsAttribute("hobbyBindingModel")) {
                model.addAttribute("hobbyBindingModel", new HobbyBindingModel());
                model.addAttribute("isExists", false);
                model.addAttribute("noImg", false);
            }
            ModelAndView mav = new ModelAndView("create_offer");
            return mav;


    }

    @PostMapping("/create_offer")
    public  String saveHobby(@Valid HobbyBindingModel hobbyBindingModel, BindingResult bindingResult, RedirectAttributes redirectAttributes,

                             @RequestParam("img") MultipartFile multipartFile) throws IOException {

            String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));

            if (bindingResult.hasErrors() || fileName.isBlank()) {
                redirectAttributes.addFlashAttribute("hobbyBindingModel", hobbyBindingModel);
                redirectAttributes.addFlashAttribute("org.springframework.validation.BindingResult.hobbyBindingModel", bindingResult);
                if (fileName.isBlank()) {
                    redirectAttributes.addFlashAttribute("noImg", true);
                }

                return ("create_offer");
            }
            this.hobbyService.createHobby(this.modelMapper.map(hobbyBindingModel, HobbyServiceModel.class), fileName);
            return ("redirect:/business_owner");
    }

    @GetMapping("/hobbie-details/{id}")
    public String showHome(@PathVariable Long id, Model model){

            Hobby hobby = this.hobbyService.findHobbieById(id);
            model.addAttribute("hobbie", hobby);
            model.addAttribute("isSaved", this.hobbyService.isHobbySaved(id));


            return "hobbie-details";

    }

    @GetMapping("/offer-details/{id}")
    public String showOffer(@PathVariable Long id, Model model){


            Hobby hobby = this.hobbyService.findHobbieById(id);
            model.addAttribute("hobbie", hobby);

            return "offer-details";

    }

    @GetMapping("/save-hobby/{id}")
    public String saveHobby(@PathVariable Long id, Model model, RedirectAttributes redirectAttributes){


            Hobby hobby = this.hobbyService.findHobbieById(id);
            this.hobbyService.saveHobbyForClient(hobby);
            model.addAttribute("hobbie", hobby);
            model.addAttribute("isSaved", this.hobbyService.isHobbySaved(id));
            return "hobbie-details";


    }

    @GetMapping("/remove-hobby/{id}")
    public String removeHobby(@PathVariable Long id, Model model, RedirectAttributes redirectAttributes){

            Hobby hobby = this.hobbyService.findHobbieById(id);
            this.hobbyService.removeHobbyForClient(hobby);
            model.addAttribute("hobbie", hobby);
            model.addAttribute("isSaved", this.hobbyService.isHobbySaved(id));
            return "hobbie-details";

    }

    @GetMapping("/update-hobby/{id}")
    public String showUpdateHobbyForm(@PathVariable("id") long id, Model model) {

            Hobby hobbie = this.hobbyService.findHobbieById(id);
            UpdateHobbyBindingModel updateHobbyBindingModel = this.modelMapper.map(hobbie, UpdateHobbyBindingModel.class);
            model.addAttribute("updateHobbyBindingModel", updateHobbyBindingModel);
            model.addAttribute("noImg2", false);

            return "update-hobby";

    }

    @PostMapping("/update-hobby/{id}")
    public String updateHobby(@PathVariable("id") long id,@Valid UpdateHobbyBindingModel updateHobbyBindingModel , BindingResult bindingResult, RedirectAttributes redirectAttributes,
                              @RequestParam("img") MultipartFile multipartFile) throws IOException {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));

            if (bindingResult.hasErrors() || fileName.isBlank()) {
                redirectAttributes.addFlashAttribute("updateHobbyBindingModel", updateHobbyBindingModel);
                redirectAttributes.addFlashAttribute("org.springframework.validation.BindingResult.updateHobbyBindingModel", bindingResult);
                if (fileName.isBlank()) {
                    redirectAttributes.addFlashAttribute("noImg2", true);
                }
                return "update-hobby";
            } else {
                updateHobbyBindingModel.setId(id);
                this.hobbyService.saveUpdatedHobby(this.modelMapper.map(updateHobbyBindingModel, UpdateHobbyServiceModel.class), fileName);

            }

            return "redirect:/business_owner";

    }

    @GetMapping("/delete-hobby/{id}")
    public String deleteAppClient(@PathVariable("id") long id) throws IOException {

            this.hobbyService.deleteHobby(id);
            return "redirect:/business_owner";

    }
}



