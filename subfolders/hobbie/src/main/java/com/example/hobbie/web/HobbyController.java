package com.example.hobbie.web;


import com.example.hobbie.config.UserInterceptor;
import com.example.hobbie.model.binding.HobbyBindingModel;
import com.example.hobbie.model.binding.UpdateHobbyBindingModel;
import com.example.hobbie.model.entities.AppClient;
import com.example.hobbie.model.entities.Hobby;
import com.example.hobbie.model.entities.UserRoleEntity;
import com.example.hobbie.model.entities.enums.UserRoleEnum;
import com.example.hobbie.model.service.HobbyServiceModel;
import com.example.hobbie.model.service.UpdateHobbyServiceModel;
import com.example.hobbie.service.CloudinaryService;
import com.example.hobbie.service.HobbyService;
import com.example.hobbie.service.UserService;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.BeanDefinitionDsl;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Objects;

import static java.lang.String.valueOf;

@Controller
@RequestMapping("/hobbies")
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
        if (UserInterceptor.isUserLogged()) {
            if (!model.containsAttribute("hobbyBindingModel")) {
                model.addAttribute("hobbyBindingModel", new HobbyBindingModel());
                model.addAttribute("isExists", false);
                model.addAttribute("noImg", false);
            }
            ModelAndView mav = new ModelAndView("create_offer");
            return mav;
        }
        else {   ModelAndView mav = new ModelAndView("index");
            return mav;}


    }

    @PostMapping("/create_offer")
    public  String saveHobby(@Valid HobbyBindingModel hobbyBindingModel, BindingResult bindingResult, RedirectAttributes redirectAttributes,

                             @RequestParam("img") MultipartFile multipartFile) throws IOException {
        if (UserInterceptor.isUserLogged()) {
            String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));

            if (bindingResult.hasErrors() || fileName.isBlank()) {
                redirectAttributes.addFlashAttribute("hobbyBindingModel", hobbyBindingModel);
                redirectAttributes.addFlashAttribute("org.springframework.validation.BindingResult.hobbyBindingModel", bindingResult);
                if (fileName.isBlank()) {
                    redirectAttributes.addFlashAttribute("noImg", true);
                }

                return ("create_offer");
            }
//            else {
//
//                String uploadDir = "hobby-photos/" + id;
//
//                FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
//            }
               this.hobbyService.createHobby(this.modelMapper.map(hobbyBindingModel, HobbyServiceModel.class), fileName);
            return ("redirect:/business_owner");
        }
        else{
            return "index";
        }
    }
    @GetMapping("/hobbie-details/{id}")
    public String showHome(@PathVariable Long id, Model model){

        if (UserInterceptor.isUserLogged()) {
            Hobby hobby = this.hobbyService.findHobbieById(id);
            model.addAttribute("hobbie", hobby);
                    model.addAttribute("isSaved", this.hobbyService.isHobbySaved(id));


            return "hobbie-details";
        }
        else{
            return "index";
        }
    }

    @GetMapping("/offer-details/{id}")
    public String showOffer(@PathVariable Long id, Model model){

        if (UserInterceptor.isUserLogged()) {
            Hobby hobby = this.hobbyService.findHobbieById(id);
            model.addAttribute("hobbie", hobby);

            return "offer-details";
        }
        else{
            return "index";
        }
    }
     @GetMapping("/save-hobby/{id}")
     public String saveHobby(@PathVariable Long id, Model model, RedirectAttributes redirectAttributes){

         if (UserInterceptor.isUserLogged()) {
             Hobby hobby = this.hobbyService.findHobbieById(id);
             this.hobbyService.saveHobbyForClient(hobby);
             model.addAttribute("hobbie", hobby);
             model.addAttribute("isSaved", this.hobbyService.isHobbySaved(id));
             return "hobbie-details";
         }
         else{
             return "index";
         }
     }
    @GetMapping("/remove-hobby/{id}")
    public String removeHobby(@PathVariable Long id, Model model, RedirectAttributes redirectAttributes){

        if (UserInterceptor.isUserLogged()) {
            Hobby hobby = this.hobbyService.findHobbieById(id);
            this.hobbyService.removeHobbyForClient(hobby);
            model.addAttribute("hobbie", hobby);
            model.addAttribute("isSaved", this.hobbyService.isHobbySaved(id));
            return "hobbie-details";
        }
        else{
            return "index";
        }
    }

    @GetMapping("/update-hobby/{id}")
    public String showUpdateHobbyForm(@PathVariable("id") long id, Model model) {
        if (UserInterceptor.isUserLogged()) {
            Hobby hobbie = this.hobbyService.findHobbieById(id);
            UpdateHobbyBindingModel updateHobbyBindingModel = this.modelMapper.map(hobbie, UpdateHobbyBindingModel.class);
            model.addAttribute("updateHobbyBindingModel", updateHobbyBindingModel);
            model.addAttribute("noImg2", false);

            return "update-hobby";
        }
        else{
            return "index";
        }
    }

        @PostMapping("/update-hobby/{id}")
        public String updateHobby(@PathVariable("id") long id,@Valid UpdateHobbyBindingModel updateHobbyBindingModel , BindingResult bindingResult, RedirectAttributes redirectAttributes,
                                        @RequestParam("img") MultipartFile multipartFile) throws IOException {
            String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));
            if (UserInterceptor.isUserLogged()) {
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

//                String uploadDir = "hobby-photos/" + id;
//                if (Files.exists(Path.of(uploadDir))) {
//                    FileUtils.cleanDirectory(new File(uploadDir));
//                }
//                FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
            }

            return "redirect:/business_owner";
        }
           else{
            return "index";
        }
        }

    @GetMapping("/delete-hobby/{id}")
    public String deleteAppClient(@PathVariable("id") long id) throws IOException {
        if (UserInterceptor.isUserLogged()) {
            this.hobbyService.deleteHobby(id);
            return "redirect:/business_owner";
        }
        else {
            return "index";
        }
    }
}



