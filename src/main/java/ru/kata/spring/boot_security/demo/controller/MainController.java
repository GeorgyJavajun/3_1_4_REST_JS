package ru.kata.spring.boot_security.demo.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.service.AdminService;

@Controller
public class MainController {

    private final AdminService service;
    public MainController(AdminService service) { this.service = service; }

@RequestMapping("/login")
public String showIndexString() { return "loginPage"; }// may be "index"!!!!!!!!!!!!!!!

@GetMapping("/test")
public String showTestString(Model model) {
    model.addAttribute("user", service.getUserById(1L));//Ronney reference with ID!!!!
    model.addAttribute("roles", service.findAllRoles());
        return "test";
    }
//
//@GetMapping("/user")
//public String showUserInfo(@AuthenticationPrincipal() UserDetails user, Model model) {
//    model.addAttribute("user", service.getUserByName(user.getUsername()));
//    return "user";
//}

}
