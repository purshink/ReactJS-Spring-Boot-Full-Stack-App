package com.example.hobbie.web;

import com.example.hobbie.config.UserInterceptor;
import com.example.hobbie.model.entities.Abo;
import com.example.hobbie.model.entities.AppClient;
import com.example.hobbie.view.AboViewModel;
import com.example.hobbie.view.EntryViewModel;
import com.example.hobbie.service.AboService;
import com.example.hobbie.service.EntryService;
import com.example.hobbie.service.HobbyService;
import com.example.hobbie.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import java.text.ParseException;
import java.util.List;

@Controller
public class AboController {
    private final UserService userService;
    private final AboService aboService;
    private final HobbyService hobbyService;
    private final EntryService entryService;
    private final ModelMapper modelMapper;

    @Autowired
    public AboController(UserService userService, AboService aboService, HobbyService hobbyService, EntryService entryService, ModelMapper modelMapper) {
        this.userService = userService;
        this.aboService = aboService;
        this.hobbyService = hobbyService;
        this.entryService = entryService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/my-abos")
    public ModelAndView ShowAllAbos(@AuthenticationPrincipal UserDetails principal) {
        if (UserInterceptor.isUserLogged()) {
            ModelAndView mav = new ModelAndView("my-abos");
            mav.addObject("liked",this.hobbyService.findSavedHobbies(this.userService.findCurrentUserAppClient()    ));
            mav.addObject("abos", this.aboService.getUserAbos(this.userService.findCurrentUserAppClient().getId()));
            return mav;
        }
        else{
            ModelAndView mav = new ModelAndView("index");
            return mav;}
    }

    @GetMapping("/abo/{id}")
    public String showAbo(@PathVariable Long id, Model model) {
        if (UserInterceptor.isUserLogged()) {
            model.addAttribute("clientDetails", this.aboService.getClientDetails(id));
            AboViewModel aboById = this.aboService.findAboById(id);
            model.addAttribute("aboDetails", aboById);
            List<EntryViewModel> aboEntries = this.entryService.getAboEntries(id);
            model.addAttribute("entries",aboEntries);
            model.addAttribute("aboId", id);
            model.addAttribute("hobbyName", this.hobbyService.findHobbieById(aboById.getHobbyId()).getName());




            return "abo";
        } else {
            return "index";
        }
    }

    @GetMapping ("/confirm-update-entry/{id}")
    public String confirmUpdateEntry(@PathVariable Long id) throws ParseException {
            Long aboId = this.aboService.findAboId(id);
           this.entryService.confirmUpdatedEntry(id);
            return "redirect:/abo/" + aboId;
    }

    @PostMapping("/update-entry/{id}")
    public String updateEntry(@PathVariable Long id) throws ParseException {
        if (UserInterceptor.isUserLogged()) {
            Long aboId = this.aboService.findAboId(id);
            Abo abo = this.aboService.findAbo(aboId);
            AppClient appClientById = this.userService.findAppClientById(abo.getClientId());
            this.entryService.saveUpdatedEntry(appClientById,id);
            return "redirect:/abo/" + aboId;
        }
        else{
            return "index";
        }
    }

    @PostMapping("/delete-abo/{id}")
    public String deleteAbo(@PathVariable Long id, Model model) {
        if (UserInterceptor.isUserLogged()) {
            this.aboService.deleteAbo(id);
            return "redirect:/default";
        }
        else{
            return "index";
        }
    }

}
