package ru.kata.spring.boot_security.demo.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.service.UserService;


@Controller
@RequestMapping("users")
public class UserController {

    private final UserService service;
    public UserController(UserService service) { this.service = service; }


    @RequestMapping("/login")
    public String showIndexString() { return "login"; }


    @GetMapping()
    public String showUserInfo(@AuthenticationPrincipal() UserDetails user, Model model) {
        model.addAttribute("user", service.findByUserName(user.getUsername()));
        return "users";
    }
}
