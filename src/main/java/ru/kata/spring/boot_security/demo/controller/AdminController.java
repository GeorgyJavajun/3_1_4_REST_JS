package ru.kata.spring.boot_security.demo.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.AdminService;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final AdminService service;
    public AdminController(AdminService service) { this.service = service; }



    @GetMapping()
    public String showAllUser(@AuthenticationPrincipal UserDetails userDetails, Model model) {
        List<User> allUsers = service.getAllUsers();
        User user = service.findByUserName(userDetails.getUsername());
        user.setRoleName(service.RoleNames(user));
        model.addAttribute("allUsers", allUsers);
        model.addAttribute("newUser", new User());
        model.addAttribute("user", user);
        model.addAttribute("roles", service.findAllRoles());
        return "admin";
    }

    //         ----------------------------------------------Add/Edit User----------------------------------------------//
    @PostMapping("/save")
    public String saveUser(@ModelAttribute("user") User user) {
        service.saveUser(user);
        return "redirect:/admin";
    }
    //      ------------------------------------------------------------------------------------------------------------//


    //    ----------------------------------------------Delete User-----------------------------------------------------//
    @PostMapping("/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        service.deleteUser(id);
        return "redirect:/admin";
    }
    //      ------------------------------------------------------------------------------------------------------------//
}

