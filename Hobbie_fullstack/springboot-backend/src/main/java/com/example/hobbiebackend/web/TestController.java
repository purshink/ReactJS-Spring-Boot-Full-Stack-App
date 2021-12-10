package com.example.hobbiebackend.web;


import com.example.hobbiebackend.model.binding.TestBindingModel;
import com.example.hobbiebackend.model.service.TestServiceModel;
import com.example.hobbiebackend.service.TestService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class TestController {

    private final TestService testService;
    private final ModelMapper modelMapper;

    @Autowired
    public TestController(TestService testService, ModelMapper modelMapper) {
        this.testService = testService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/test")
    public String showTest(Model model){

            model.addAttribute("testBindingModel", new TestBindingModel());
            return "test";

    }

    @PostMapping("/test")
    public String saveTestResults(@Valid TestBindingModel testBindingModel, BindingResult bindingResult, RedirectAttributes redirectAttributes){

            if (bindingResult.hasErrors()) {
                redirectAttributes.addFlashAttribute("testBindingModel", testBindingModel);
                redirectAttributes.addFlashAttribute("org.springframework.validation.BindingResult.testBindingModel", bindingResult);


                return "redirect:/test";
            } else {
                this.testService.saveTest(this.modelMapper.map(testBindingModel, TestServiceModel.class));

                return "redirect:/default";
            }

    }
}
