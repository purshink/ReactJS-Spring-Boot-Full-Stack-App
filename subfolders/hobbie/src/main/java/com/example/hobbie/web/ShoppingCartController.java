package com.example.hobbie.web;

import com.example.hobbie.model.entities.Hobby;
import com.example.hobbie.service.AboService;
import com.example.hobbie.service.HobbyService;
import com.example.hobbie.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ShoppingCartController {

    private final ShoppingCartService shoppingCartService;
    private final HobbyService hobbyService;
    private final AboService aboService;


    @Autowired
    public ShoppingCartController(ShoppingCartService shoppingCartService, HobbyService hobbyService, AboService aboService) {
        this.shoppingCartService = shoppingCartService;
        this.hobbyService = hobbyService;
        this.aboService = aboService;
    }

    @GetMapping("/shoppingCart")
    public ModelAndView shoppingCart() {
        ModelAndView modelAndView = new ModelAndView("/shoppingCart");
        modelAndView.addObject("abos", shoppingCartService.getAbosInCart());
        modelAndView.addObject("total", shoppingCartService.getTotal().toString());
        return modelAndView;
    }

    @GetMapping("/shoppingCart/addProduct/{hobbyId}")
    public ModelAndView addProductToCart(@PathVariable("hobbyId") Long hobbyId) {
        Hobby hobbieById = this.hobbyService.findHobbieById(hobbyId);
        this.shoppingCartService.addAboToCart(hobbieById);
        return shoppingCart();
    }

    @GetMapping("/shoppingCart/removeProduct/{hobbyId}")
    public ModelAndView removeProductFromCart(@PathVariable("hobbyId") Long hobbyId) {
        this.shoppingCartService.removeProductFromCart(hobbyId);
        return shoppingCart();
    }

    @GetMapping("/shoppingCart/checkout")
    public String checkout() {

            shoppingCartService.checkout();

        return "success";
    }

}
